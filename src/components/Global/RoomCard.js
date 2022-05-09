import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { styles } from "../../styles/myroom/my_room_card_design";
import { AntDesign } from "@expo/vector-icons";
const RoomCard = ({ data, render_location }) => {
  const { address, photo, price, room_id } = data;
  console.log();
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.left_side}>
          <Image style={styles.img} source={photo} />
        </View>
        <View style={styles.right_side}>
          <View style={styles.content}>
            <Text style={styles.address}>{address} </Text>
            <Text style={styles.price}>R.s {price}</Text>
            <View style={styles.btn_grp}>
              {render_location === "my_rooms" ? (
                <>
                  <Pressable style={styles.btn}>
                    <Text style={styles.btn_text}>Edit Room</Text>
                  </Pressable>
                  <AntDesign
                    style={styles.dlt}
                    name="delete"
                    size={20}
                    color="#5B628F"
                  />
                </>
              ) : (
                <Pressable style={styles.btn}>
                  <Text style={styles.btn_text}>Remove From Fav</Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RoomCard;
