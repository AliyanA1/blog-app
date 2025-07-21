import { checkToken } from "../services/authentication.service.js";


export const middleware = function () {
  return (req, res, next) => {
    const token = req.cookies["token"];
    if (!token) return next(); 

    try {
      const data = checkToken(token);
      // console.log(data)
      req.user = data;
      res.locals.user = data;
      return next(); 
    } catch (error) {
      console.log("Token verification error:", error.message);
      return next(); 
    }
  };
};
