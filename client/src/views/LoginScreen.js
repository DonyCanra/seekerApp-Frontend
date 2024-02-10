import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "../components/baseUrl";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function Login() {
    try {
      const { data } = await axios({
        method: "post",
        url: `${baseUrl}/login`,
        data: {
          username: username,
          password: password,
        },
      });
      console.log(data);
      if (data.access_token) {
        await AsyncStorage.setItem("access_token", data.access_token);
        console.log("Username:", username);
        console.log("Password:", password);
        navigation.navigate("Root", { screen: "Home" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View className="items-center">
            <Image
              source={require("../../assets/seeker_black.png")}
              style={{
                height: 150,
                width: 150,
                marginBottom: 100,
                marginTop: 50,
              }}
            />
          </View>
          <View className="">
            <TextInput
              className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              secureTextEntry={true}
              className="border border-gray-400 rounded-2xl px-4 py-2 mb-12"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              className="items-center bg-yellow-300 rounded-xl p-4"
              onPress={Login}
            >
              <Text className="text-black text-md font-extrabold">Login</Text>
            </TouchableOpacity>
            <Text className="ml-1 mt-3 items-center">
              Don't have an account?
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Register")}
            >
              <Text className="ml-1 text-black text-md underline">
                Sign Up Here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    justifyContent: "space-around",
  },
});
