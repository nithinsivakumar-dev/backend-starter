import { User } from "../../model/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import bcrypt from "bcrypt";

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing."));
    }

    const exists = await User.findOne({ email: email });

    if (!exists) {
      return res
        .status(404)
        .send(
          new ApiResponse(
            404,
            null,
            "User with the provided email does not exist. Kindly create one."
          )
        );
    }

    if (exists.deleted) {
      return res
        .status(400)
        .send(
          new ApiResponse(
            400,
            null,
            "Account with the provided details seems to have been deleted."
          )
        );
    }

    const verified = await bcrypt.compare(password, exists.password);

    if (!verified) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Invalid credentials."));
    }

    const at = exists.generateAccessToken();
    const rt = exists.generateRefreshToken();

    res.cookie("at", at);
    res.cookie("rt", rt);

    exists.refreshToken = rt;
    await exists.save();

    res.status(201).send(
      new ApiResponse(
        201,
        {
          user: exists,
          accessToken: at,
          refreshToken: rt,
        },
        "User logged in successfully."
      )
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Error logging in user."));
  }
};

export { loginUser };
