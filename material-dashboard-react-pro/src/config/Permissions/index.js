import CrudService from "services/cruds-service";

export const getPermissions = async (id) => {
  try {
    const res = await CrudService.getUserWithPermissions(id);
    const permissions = res.included;;
    let jsonPermissions = [];
    permissions.map((permission) => {
      if (permission.type == "permissions") {
        const namePermission = permission.attributes.name.split(" ");
        if (namePermission.length === 2) {
          const action = namePermission[0];
          const subject = namePermission[1];
          if ((action === "delete" || action === "edit") && subject === "users") {
            jsonPermissions = [
              ...jsonPermissions,
              { action, subject, conditions: { id: { $ne: id } } },
            ];
          } else {
            jsonPermissions = [...jsonPermissions, { action, subject }];
          }
        }
      }
    });
    return jsonPermissions;
  } catch (err) {
    console.error(err);
    return null;
  }
};
