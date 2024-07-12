import bcrypt from "bcrypt";
import { User } from "../../model/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;

    const { password } = req.body;

    if (!id || !password) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing."));
    }

    const exists = await User.findById(id);

    if (!exists) {
      return res
        .status(404)
        .send(
          new ApiResponse(
            404,
            null,
            "User with the provided ID does not exist."
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
            "Account with the provided details seems to be deleted."
          )
        );
    }

    const hashed = await bcrypt.hash(password, 10);

    exists.password = hashed;
    await exists.save();

    res
      .status(200)
      .send(new ApiResponse(200, null, "Password changed successfully."));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to update password."));
  }
};

export { updatePassword };
