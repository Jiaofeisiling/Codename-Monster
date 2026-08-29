import { permissionModel } from "../../schemas/permission.schema.js";


export const getPermissionsRoute = async (req, res) => {
  let permissionsObjectArray = [];
  let jsonArrayPermissions = {};

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

  // choose fields
  let fieldsPerms;
  if (req.query.fields) {
    if (req.query.fields.permissions) {
      fieldsPerms = req.query.fields.permissions.split(",");
    }
  }

  const allPermissions = await permissionModel.find().select(fieldsPerms).limit(paginationSize).skip((pageNumber - 1) * paginationSize);

  permissionsObjectArray = allPermissions.map((element) => {
    let jsonObj = {
      type: "permissions",
      id: element.id,
      attributes: {
        ...element._doc,
      },
    };
    return (jsonArrayPermissions = { ...jsonArrayPermissions, ...jsonObj });
  });

  const sentData = { data: [...permissionsObjectArray] };
  return res.status(200).send(sentData);
};
