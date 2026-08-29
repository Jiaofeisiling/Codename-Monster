import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { roleModel } from "../../schemas/role.schema.js";
import { permissionModel } from "../../schemas/permission.schema.js";
import { userModel } from "../../schemas/user.schema.js";

export const getProfileRouteHandler = async (req, res) => {
  let fieldsUsers = [];
  let fieldsRoles = [];
  let fieldsPerms = [];
  if (req.query.fields) {
    if (req.query.fields.users) {
      fieldsUsers = req.query.fields.users.split(",");
    }
    if (req.query.fields.roles) {
      fieldsRoles = req.query.fields.roles.split(",");
    }
    if (req.query.fields.permissions) {
      fieldsPerms = req.query.fields.permissions.split(",");
    }
  }

  const meUser = await userModel.findOne({ _id: req.user._id }).select(fieldsUsers);
  const role = await roleModel.findOne({ _id: req.user.role }).select(fieldsRoles);
  let permissions = await permissionModel.find({ _id: { $in: role["permissions"] } }).select(fieldsPerms);

  let options = [];
  let includedDataPermissions = [];
  if (req.query.include) {
    options = req.query.include.split(",");
  }

  // included options
  let objectRoles = {};
  if (options.length > 0) {
    if (options.find((el) => el == "roles")) {
      objectRoles = {
        type: "roles",
        id: role.id,
        attributes: {
          ...role._doc,
        },
      };
    }

    if (options.find((el) => el == "roles.permissions")) {
      let jsonArray = {};
      includedDataPermissions = permissions.map((element) => {
        let jsonObj = {
          type: "permissions",
          id: element.id,
          attributes: {
            ...element._doc,
          },
        };
        return (jsonArray = { ...jsonArray, ...jsonObj });
      });
    }
  };

  const sentData = {
    data: {
      type: "users",
      id: meUser.id,
      attributes: meUser,
    },
    included: [objectRoles, ...includedDataPermissions],
  };
  delete sentData.data.attributes.password;
  res.send(sentData);
};

export const patchProfileRouteHandler = async (req, res) => {
  const currentDataOfUser = req.user;
  const { name, email } = req.body.data.attributes;
  const newPassword = req.body.data.attributes.password_new;
  const confirmPassword = req.body.data.attributes.password_confirmation;
  const foundUser = await userModel.findOne({ email: currentDataOfUser.email });

  if (!foundUser) {
    res.status(400).json({ error: "No user matches the credentials" });
  } else {
    // check password more than 8 characters, new password matched the password confirmation
    if ((newPassword && newPassword < 7) || newPassword != confirmPassword) {
      res.status(400).json({
        errors: {
          password: [
            "The password should have at lest 8 characters and match the password confirmation.",
          ],
        },
      });
    } else if ( newPassword && newPassword > 7 && newPassword == confirmPassword ) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPassword, salt);
      try {
        const response = await userModel.updateOne( { email: foundUser.email }, { $set :{ "name": name, "email": email, "password": hashPassword } });
      } catch (err) {
        console.error(err);
      }
      const sentData = {
        data: {
          type: "users",
          id: foundUser.id,
          attributes: {
            name: name,
            email: email,
            profile_image: foundUser.profile_image,
          },
        },
      };
      res.send(sentData);
    } else if (!newPassword) {
      try {
        await userModel.updateOne( { email: foundUser.email }, { $set :{ "name": name, "email": email } });
      } catch (err) {
        console.error(err);
      }
      const sentData = {
        data: {
          type: "users",
          id: foundUser.id,
          attributes: {
            name: name,
            email: email,
            profile_image: foundUser.profile_image,
          },
        },
      };
      res.send(sentData);
    }
  }
};
