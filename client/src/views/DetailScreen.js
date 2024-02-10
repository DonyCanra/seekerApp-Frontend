import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "../components/baseUrl";
// ...
export default function DetailScreen({ navigation, route }) {
  const { url, data } = route.params;
  console.log(data, "ini data");

  // function handlePostBookmarks() {
  //   console.log("handle post bookmarks");
  // }

  async function handlePostBookmarks() {
    try {
      const res = await axios({
        method: "post",
        url: `${baseUrl}/bookmarks`,
        headers: { access_token: await AsyncStorage.getItem("access_token") },
        data: {
          url: data.url,
          logo: data.logo,
          jobTitle: data.jobTitle,
          companyName: data.companyName,
          companyLocation: data.companyLocation,
          salary: data.salary,
        },
      });
      console.log(res, "<<<");
      navigation.navigate("Bookmark");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: url }} style={{ flex: 1 }} />
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 80,
          right: 110,
          backgroundColor: "#ffde59",
          width: 170,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          elevation: 4,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
        onPress={() => handlePostBookmarks()}
      >
        <Text style={{ color: "black", fontSize: 16, fontWeight: "bold" }}>
          Add to Bookmarks
        </Text>
      </TouchableOpacity>
    </View>
  );
}
