import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useState, useEffect, createContext } from "react";
import { db } from "../../config/firebase";
export const ContexStore = createContext();
const Context = ({ children }) => {
  const [user, setUser] = useState([]); // setup the logined in user
  const [token, setToken] = useState("");
  const getToken = async () => {
    const _id = await AsyncStorage.getItem("auth_token");
    setToken(_id);
  };
  useEffect(() => {
    getToken();
  }, [token]);

  useEffect(async () => {
    try {
      const q = query(collection(db, "users"), where("user_id", "==", token));
      onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          setUser([{ ...doc.data(), _id: doc.id }]);
        });
      });
    } catch (error) {
      console.log("err while geting data", error);
    }
  }, [token]);
  console.log(user);
  // state for the model
  const [isModel, setisModel] = useState(false);

  // pst
  const [img, setImg] = useState([]);
  const [data, setData] = useState({
    address: "",
    district: "",
    rate: "",
    rooms_count: "",
    iskitchen: false,
    isFlat: false,
    desc: "",
  });
  const [images, setimages] = useState({
    one: "",
    two: "",
    three: "",
    four: "",
  });
  // state for the post success track
  const [isRoomuploading, setisRoomuploading] = useState(false);
  return (
    <ContexStore.Provider
      value={{
        user,
        setUser,
        isModel,
        setisModel,
        data,
        setData,
        images,
        setimages,
        isRoomuploading,
        setisRoomuploading,
      }}
    >
      {children}
    </ContexStore.Provider>
  );
};
export default Context;
