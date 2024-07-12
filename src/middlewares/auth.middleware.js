import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
  const bearerAuth = req.headers.authorization;

  console.log(req.headers);

  if (!bearerAuth) {
    return res
      .status(400)
      .send(
        new ApiResponse(400, null, "Missing Bearer Authentication header.")
      );
  }

  const token = bearerAuth.split(" ")[1];

  if (!token) {
    return res.status(400).send(new ApiResponse(400, null, "Token missing."));
  }

  const userDetails = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  console.log(userDetails);

  if (!userDetails) {
    return res.status(401).send(new ApiResponse(401, null, "Token invalid."));
  }

  req.user = userDetails;
  next();
};

export { checkAuth };
