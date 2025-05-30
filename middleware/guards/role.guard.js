const jwtService = require("../../services/jwt.service");
const { sendErrorResponse } = require("../../helpers/send_error_res");

module.exports = (requiredRoles = []) => {
  return async (req, res, next) => {
    try {
      const userRoles = req.user.roles.map((role) => role.name);
      const hasRole = requiredRoles.some((reqRole) =>
        userRoles.includes(reqRole)
      );

      if (!hasRole) {
        return sendErrorResponse(
          { message: "Sizda bunday role yoq" },
          res,
          403
        );
      } else {
        console.log(hasRole);
      }
      next();
    } catch (error) {
      sendErrorResponse(error, res, 403);
    }
  };
};
