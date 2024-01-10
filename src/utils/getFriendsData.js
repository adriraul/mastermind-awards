import axios from "axios";

const getFriendsData = async () => {
  try {
    const response = await axios.get("http://localhost:5000/friends");
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos de amigos", error);
    throw error;
  }
};

export default getFriendsData;
