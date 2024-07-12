import { User } from "../../model/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { firstName, lastName, email, phone } = req.body;

    if (!id || !firstName || !lastName || !email || !phone) {
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

    exists.firstName = firstName;
    exists.lastName = lastName;
    exists.email = email;
    exists.phone = phone;
    await exists.save();

    res
      .status(200)
      .send(
        new ApiResponse(200, exists, "Account details updated successfully.")
      );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to update user details."));
  }
};

export { updateUser };
