import axios from "axios";

const postFriendsData = async (updatedFriends) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/friends",
      updatedFriends
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error al guardar los datos:", error);
    throw error;
  }
};

export default postFriendsData;
