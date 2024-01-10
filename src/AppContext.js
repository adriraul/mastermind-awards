import React, { createContext, useContext, useState, useEffect } from "react";
import getFriendsData from "./utils/getFriendsData";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [friends, setFriendsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFriendsData();
        setFriendsData(data);
      } catch (error) {
        console.error("Error al obtener datos de amigos", error);
      }
    };

    fetchData();
  }, []);

  const updateFriendsData = (newFriendsData) => {
    setFriendsData(newFriendsData);
  };

  return (
    <AppContext.Provider value={{ friends, updateFriendsData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
