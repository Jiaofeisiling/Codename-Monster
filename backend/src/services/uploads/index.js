import dotenv from 'dotenv';
import { itemModel } from '../../schemas/item.schema.js';
import { userModel } from '../../schemas/user.schema.js';

dotenv.config();

export const setUserProfileImageRoute = async (randomId, req, res) => {
  const id = req.params.id;

  if (!req.file) {
    return res.status(400).send({ message: "No image was set" });
  } else {
    const foundUser = await userModel.findById(id);
    if (!foundUser) {
      return res.status(400).send({ message: "No user found" });
    } else {
      const image = req.file;
      const addProfilePicture = await userModel.updateOne({ _id: foundUser.id  },
        {
          profile_image: `${process.env.APP_URL_API}/public/images/users/${id}/${randomId}-${image.originalname}`,
        }
      );
      const sentData = {
        url: `${process.env.APP_URL_API}/public/images/users/${id}/${randomId}-${image.originalname}`,
      };
      return res.status(201).send(sentData);
    }
  }
};

export const setItemImage = async (randomId, req, res) => {
  const id = req.params.id;

  if (!req.file) {
    return res.status(400).send({ message: "No image was set" });
  } else {
    const foundItem = await itemModel.findById(id);
    if (!foundItem) {
      return res.status(400).send({ message: "No item found" });
    } else {
      const image = req.file;
      const addImage = await itemModel.updateOne({ _id: foundItem.id  },
        {
          image: `${process.env.APP_URL_API}/public/images/items/${id}/${randomId}-${image.originalname}`,
        }
      );
      const sentData = {
        url: `${process.env.APP_URL_API}/public/images/items/${id}/${randomId}-${image.originalname}`,
      };
      return res.status(201).send(sentData);
    }
  }
};
