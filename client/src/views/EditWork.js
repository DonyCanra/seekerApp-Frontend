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
import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "../components/baseUrl";

export default function EditWork({ navigation, route }) {
  const { id } = route.params;
  // console.log(id);

  const [current, setCurrent] = useState("");
  const [job, setJob] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState("");
  const [startWork, setStartWork] = useState("");
  const [stopWork, setStopWork] = useState("");

  async function getData() {
    try {
      const { data } = await axios.get(`${baseUrl}/work-experience/${id}`, {
        headers: { access_token: await AsyncStorage.getItem("access_token") },
      });
      // console.log(data);
      setCurrent(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  async function handleSubmit() {
    try {
      const res = await axios({
        method: "put",
        url: `${baseUrl}/work-experience/${id}`,
        headers: { access_token: await AsyncStorage.getItem("access_token") },
        data: {
          company: company || current.company,
          position: job || current.job,
          type: type || current.type,
          startWork: startWork || current.startWork,
          stopWork: stopWork || current.stopWork,
        },
      });
      navigation.navigate("Profile");
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
              <Text style={styles.title}>Edit Work Experience</Text>
            </View>
            <View className="mt-10">
              <Text style={styles.label}>Job Name</Text>

              <TextInput
                className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
                placeholder="Job Name (ex: Fullstack Developer)"
                defaultValue={current.position}
                onChangeText={(newText) => setJob(newText)}
              />
              <Text style={styles.label}>Company Name</Text>

              <TextInput
                className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
                placeholder="Company Name (ex: PT. ABC XYZ)"
                defaultValue={current.company}
                onChangeText={(newText) => setCompany(newText)}
              />
              <Text style={styles.label}>Employment Type</Text>

              <TextInput
                className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
                placeholder="Employment type (ex: Full-time)"
                defaultValue={current.type}
                onChangeText={(newText) => setType(newText)}
              />
              <Text style={styles.label}>Start Work Year</Text>

              <TextInput
                className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
                placeholder="Start date (ex: 2018)"
                defaultValue={current.startWork}
                onChangeText={(newText) => setStartWork(newText)}
              />
              <Text style={styles.label}>End Work Year</Text>

              <TextInput
                className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
                placeholder="End date (ex: 2020)"
                defaultValue={current.stopWork}
                onChangeText={(newText) => setStopWork(newText)}
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
