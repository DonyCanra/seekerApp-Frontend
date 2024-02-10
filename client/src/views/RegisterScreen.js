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
import React, { useState } from "react";
import axios from "axios";
import baseUrl from "../components/baseUrl";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function Register() {
    try {
      await axios({
        method: "post",
        url: `${baseUrl}/register`,
        data: {
          email: email,
          username: username,
          password: password,
        },
      });
      navigation.navigate("Login");
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
                marginBottom: 80,
                marginTop: 50,
              }}
            />
          </View>
          <View className="">
            <TextInput
              className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
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
              onPress={Register}
            >
              <Text className="text-black text-md font-extrabold">
                Register
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
