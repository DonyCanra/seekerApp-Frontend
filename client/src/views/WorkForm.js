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
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseUrl from "../components/baseUrl";

export default function WorkForm({ navigation }) {
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState("");
  const [startWork, setStartWork] = useState("");
  const [stopWork, setStopWork] = useState("");

  async function handleSubmit() {
    try {
      const res = await axios({
        method: "post",
        url: `${baseUrl}/work-experience`,
        headers: { access_token: await AsyncStorage.getItem("access_token") },
        data: {
          company: company,
          position: position,
          type: type,
          startWork: startWork,
          stopWork: stopWork,
        },
      });
      // console.log(res, "<<<");
      if (res.status == 201) {
        console.log("tesss");
        navigation.navigate("Profile");
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
        <ScrollView>
          <View style={styles.inner}>
            <View className="items-center">
              <Image
                source={require("../../assets/seeker_black.png")}
                style={{ height: 150, width: 150, marginTop: 40 }}
              />
              <Text style={styles.title}>Add Work Experience</Text>
            </View>
            <View className="mt-10">
              <Text style={styles.label}>Job Name</Text>
              <TextInput
                className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
                placeholder="Job Name (ex: Fullstack Developer)"
                value={position}
                onChangeText={setPosition}
              />
              <Text style={styles.label}>Company Name</Text>
              <TextInput
                className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
                placeholder="Company Name (ex: PT. ABC XYZ)"
                value={company}
                onChangeText={setCompany}
              />
              <Text style={styles.label}>Employment type</Text>

              <TextInput
                className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
                placeholder="Employment type (ex: Full-time)"
                value={type}
                onChangeText={setType}
              />
              <Text style={styles.label}>Start Work Year</Text>

              <TextInput
                className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
                placeholder="Start date (ex: 2018)"
                value={startWork}
                onChangeText={setStartWork}
                keyboardType="numeric"
              />
              <Text style={styles.label}>End Work Year</Text>

              <TextInput
                className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
                placeholder="End date (ex: 2020)"
                value={stopWork}
                onChangeText={setStopWork}
                keyboardType="numeric"
              />

              <TouchableOpacity
                activeOpacity={0.8}
                className="items-center bg-yellow-300 rounded-xl p-4 mt-7"
                onPress={handleSubmit}
              >
                <Text className="text-black text-md font-extrabold">
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 10,
  },
});
