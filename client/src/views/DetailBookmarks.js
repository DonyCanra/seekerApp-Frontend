import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";
import baseUrl from "../components/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DetailBookmarks({ navigation, route }) {
  const { url, data, bookmarkId } = route.params;
  console.log(bookmarkId, "ini data"); // udah dapet datanya

  async function handleGenerateTodos() {
    try {
      const res = await axios({
        method: "post",
        url: `${baseUrl}/todos/${bookmarkId}`,
        headers: { access_token: await AsyncStorage.getItem("access_token") },
      });
      console.log("todo added");
      // navigation.navigate("Todo");
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
          width: 150,
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
        onPress={() => handleGenerateTodos()}
      >
        <Text style={{ color: "black", fontSize: 16, fontWeight: "bold" }}>
          Generate Todos
        </Text>
      </TouchableOpacity>
    </View>
  );
}
