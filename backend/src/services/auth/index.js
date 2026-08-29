import dotenv from "dotenv";
import nodemailer from "nodemailer";
import randomToken from "random-token/index.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken/index.js';
import { userModel } from "../../schemas/user.schema.js";
import { roleModel } from "../../schemas/role.schema.js"
import { passwordResetModel } from "../../schemas/passwordResets.schema.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

export const loginRouteHandler = async (req, res, email, password) => {
  //Check If User Exists
  let foundUser = await userModel.findOne({ email: email });
  if (foundUser == null) {
    return res.status(400).json({
      errors: [{ detail: "The provided authorization grant (e.g., authorization code, resource owner credentials) or refresh token is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client." }],
    });
  } else {
    const validPassword = await bcrypt.compare(password, foundUser.password);
    if (validPassword) {
      // Generate JWT token
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        return res.status(500).json({ errors: [{ detail: "JWT_SECRET is not configured." }] });
      }
      const token = jwt.sign(
        { id: foundUser.id, email: foundUser.email },
        jwtSecret,
        {
          expiresIn: "24h",
        }
      );
      return res.json({
        token_type: "Bearer",
        expires_in: "24h",
        access_token: token,
        refresh_token: token,
      });
    } else {
      return res.status(400).json({
        errors: [{ detail: "Invalid password" }],
      });
    }
  }
};

export const registerRouteHandler = async (req, res, name, email, password) => {
  // check if user already exists
  let foundUser = await userModel.findOne({ email: email });
  if (foundUser) {
    // does not get the error
    return res.status(400).json({ message: "The email is already in use" });
  }

  // check password to exist and be at least 8 characters long
  if (!password || password.length < 8) {
    return res.status(400).json({ message: "The password must be at least 8 characters long." });
  }

  // hash password to save in db
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  let adminRole = await roleModel.findOne({ name: 'admin' });

  const newUser = new userModel({
    name: name,
    email: email,
    password: hashPassword,
  });
  newUser.role = adminRole;
  await newUser.save();

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return res.status(500).json({ message: "JWT_SECRET is not configured." });
  }
  const token = jwt.sign({ id: newUser.id, email: newUser.email }, jwtSecret, {
    expiresIn: "24h",
  });
  return res.status(200).json({
    token_type: "Bearer",
    expires_in: "24h",
    access_token: token,
    refresh_token: token,
  });
};

export const forgotPasswordRouteHandler = async (req, res, email) => {
  let foundUser = await userModel.findOne({ email: email });

  if (!foundUser) {
    return res.status(400).json({errors: { email: ["The email does not match any existing user."] }});
  } else {
    let token = randomToken(20);
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "admin@jsonapi.com", // sender address
      to: email, // list of receivers
      subject: "Reset Password", // Subject line
      html: `<p>You requested to change your password.If this request was not made by you please contact us. Access <a href='${process.env.APP_URL_CLIENT}/auth/reset-password?token=${token}&email=${email}'>this link</a> to reste your password </p>`, // html body
    });
    const dataSent = {
      data: "password-forgot",
      attributes: {
        redirect_url: `${process.env.APP_URL_API}/password-reset`,
        email: email,
      },
    };

    // save token in db
    await passwordResetModel.create({
        email: foundUser.email,
        token: token,
        created_at: new Date(),
    });

    return res.status(204).json(dataSent);
  }
}

export const resetPasswordRouteHandler = async (req, res) => {
  const foundUser = await userModel.findOne({ email: req.body.data.attributes.email  });
  const foundToken = await passwordResetModel.findOne({ email: req.body.data.attributes.email, token: req.body.data.attributes.token });

  if (!foundUser || !foundToken) {
    return res.status(400).json({errors: { email: ["The email or token does not match any existing user."] }});
  } else {
    const { password, password_confirmation } = req.body.data.attributes;
    // validate password
    if (password.length < 8) {
      return res.status(400).json({errors: { password: ["The password should have at lest 8 characters."] }});
    }

    if (password != password_confirmation) {
      return res.status(400).json({errors: { password: ["The password and password confirmation must match."] }});
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await passwordResetModel.deleteOne({ email: foundUser.email });

    await userModel.updateOne(
      { email: foundUser.email },
      { $set: { "password": hashPassword } }
    );
    return res.sendStatus(204);
  }
}