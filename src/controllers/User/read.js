import { User } from "../../model/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ deleted: false });

    res
      .status(200)
      .send(
        new ApiResponse(
          200,
          { users: users, count: users.length },
          "Active users fetched successfully."
        )
      );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to get all users."));
  }
};

export { getAllUsers };
