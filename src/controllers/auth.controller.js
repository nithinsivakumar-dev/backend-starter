import { loginUser } from "./Auth/login.js";
import { registerUser } from "./Auth/register.js";

const authController = {
  register: registerUser,
  login: loginUser,
};

export { authController };
