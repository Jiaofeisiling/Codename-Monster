import dotenv from "dotenv";
import { roleModel } from "../../schemas/role.schema.js";
import { permissionModel } from "../../schemas/permission.schema.js";

dotenv.config();

export const createRoleForUser = async (obj) => {
  return await models.ModelHasRole.create(obj);
};

export const findRoleOfUser = async (whereClause) => {
  return await models.ModelHasRole(whereClause);
};

export const getRolesRoute = async (req, res) => {
  let rolesObjectArray = [];
  let jsonArrayRoles = {};

  // include
  let options = [];
  if (req.query.include) {
    options = req.query.include.split(",");
  }

  // pagination
  let paginationSize = null;
  let pageNumber = null;
  if (req.query.page) {
    if (req.query.page.number) {
      pageNumber = +req.query.page.number;
    }
    if (req.query.page.size) {
      paginationSize = +req.query.page.size;
    }
  }

  // filtering
  let filters = {};
  if (req.query.filter) {
    filters = req.query.filter;
  }

  // sorting
  let sortValue;
  if (req.query.sort) {
    sortValue = req.query.sort;
  }

  // choose fields
  let fieldsRoles;
  let fieldsPerms;
  let relObj;
  if (req.query.fields) {
    if (req.query.fields.roles) {
      fieldsRoles = req.query.fields.roles.split(",");
    }
    if (req.query.fields.permissions) {
      fieldsPerms = req.query.fields.permissions.split(",");
    }
  }

  const allRoles = await roleModel
    .find(filters)
    .select(fieldsRoles)
    .limit(paginationSize)
    .skip((pageNumber - 1) * paginationSize)
    .sort(sortValue);

  rolesObjectArray = allRoles.map((element) => {
    let jsonObj;
    jsonObj = {
      type: "roles",
      id: element.id,
      attributes: {
        ...element._doc,
      },
    };
    return (jsonArrayRoles = { ...jsonArrayRoles, ...jsonObj });
  });

  let includedDataPermissions = [];
  if (options.length > 0) {
    if (options.find((el) => el == "permissions")) {
      let permissions = await permissionModel.find().select(fieldsPerms);
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
  }

  let sentData = {
    data: [...rolesObjectArray],
    included: [...includedDataPermissions],
  };
  return res.send(sentData);
};

export const getRoleRoute = async (req, res) => {
  let options = [];
  if (req.query.include) {
    options = req.query.include;
  }

  let fieldsRoles;
  let fieldsPerms;
  if (req.query.fields) {
    if (req.query.fields.roles) {
      fieldsRoles = req.query.fields.roles.split(",");
    }
    if (req.query.fields.permissions) {
      fieldsPerms = req.query.fields.permissions.split(",");
    }
  }

  const role = await roleModel.findById(req.params.id).populate('permissions').select(fieldsRoles);

  let sentData = {
    type: "roles",
    id: role.id,
    attributes: {
      ...role._doc,
    },
  };

  let permObjectArray = [];
  if (options.length > 0) {
    const permissions = await permissionModel
      .find({ _id: { $in: role["permissions"] } })
      .select(fieldsPerms);
    let jsonArrayPermissions = {};
    permObjectArray = permissions.map((element) => {
      let jsonObj = {
        type: "permissions",
        id: element.id,
        attributes: {
          ...element._doc,
        },
      };
      return (jsonArrayPermissions = { ...jsonArrayPermissions, ...jsonObj });
    });
  }
  const finalData = { data: { ...sentData }, included: [...permObjectArray] };
  return res.status(200).send(finalData);
};

export const createRoleRoute = async (req, res) => {
  const { name } = req.body.data.attributes;
  if (!name) {
    return res.status(400).json({ errors: [{ detail: "Name is required" }] });
  }

  const existingRole = await roleModel.findOne({ name: name });
  if (existingRole) {
    return res
      .status(400)
      .json({ errors: [{ detail: "The name is already taken" }] });
  } else {
    const newRole = new roleModel({
      name: name,
      created_at: Date.now(),
      updated_at: Date.now(),
    });
    await newRole.save();
    const sentData = {
      data: "roles",
      id: newRole.id,
      attributes: {
        ...newRole._doc
      },
    };
    return res.status(201).send(sentData);
  }
};

export const editRoleRoute = async (req, res) => {
  const { name } = req.body.data.attributes;
  const roleId = req.params.id;

  if (!name) {
    return res
      .status(400)
      .send({ errors: [{ detail: "The name is required" }] });
  }

  const foundRole = await roleModel.findById(roleId);
  if (!foundRole) {
    return res.status(400).json({ errors: [{ detail: "No role was found" }] });
  }
  const existingRolesWithName = await roleModel.find({ name: name, _id: { $ne: roleId }});
  if (existingRolesWithName.length > 0) {
    return res
      .status(400)
      .send({ errors: [{ detail: "Already exists a role with this name" }] });
  }
  const updatedRole = await roleModel.updateOne({ _id: roleId },
    { name: name, created_at: Date.now(), updated_at: Date.now() },
  );
  const sentData = {
    data: {
      type: "roles",
      id: roleId,
      attributes: {
        ...updatedRole._doc
      },
    },
  };
  return res.status(200).send(sentData);
};

export const deleteRoleRoute = async (req, res) => {
  // can delete it if it is not linked to a user
  const toDeleteRole = await roleModel.findById(req.params.id);

  if (toDeleteRole.users.length > 0) {
    return res.status(400).json({
      errors: [{ title: "The role has users attached and can not be deleted" }],
    });
  } else {
    try {
      await roleModel.deleteOne({ _id: toDeleteRole._id });
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
    }
  }
};
