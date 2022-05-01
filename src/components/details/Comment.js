import { View, Text, TextInput, TouchableWithoutFeedback } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../../styles/details/comment_design";
import { collection, query, where, orderBy, addDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import SingleComment from "./SingleComment";
import { Feather } from "@expo/vector-icons";

const Comment = ({ room_id }) => {
  //post the comments
  const [comment, setComment] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const postComment = async () => {
    if (!comment) {
      return alert("Comment cannot be empty !");
    } else if (comment.length < 3) {
      return alert("Commnt is to short");
    }
    try {
      setisLoading(true);
      const res = await addDoc(collection(db, "comments"), {
        room_id: 5,
        user_id: 1,
        user_name: "utsav bhattarai",
        comment,
        user_profile: "user is live",
        createdAt: Date.now(),
      });
      setisLoading(false);
      alert("Thanks for feedback");
      setComment("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <View style={styles.cmt_wrapper}>
      <Text style={styles.cmt_header_text}>Leave a feedback</Text>
      <View style={styles.inp_wrapper}>
        <TextInput
          value={comment}
          onChangeText={(text) => {
            setComment(text);
          }}
          style={styles.input}
          placeholder="comment goes here"
        ></TextInput>
        <TouchableWithoutFeedback disabled={isLoading}>
          <Feather
            onPress={postComment}
            style={styles.send_btn}
            name="send"
            size={24}
            color="#fff"
          />
        </TouchableWithoutFeedback>
      </View>
      <SingleComment room_id={room_id} />
    </View>
  );
};

export default Comment;