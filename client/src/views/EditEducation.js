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

export default function EditEducation({ navigation, route }) {
  const { id } = route.params;
  // console.log(id);
  const [current, setCurrent] = useState("");
  // console.log(current);
  const [College, setCollege] = useState("");
  const [educationalLevel, setEducationalLevel] = useState("");
  const [Major, setMajor] = useState("");
  const [startEducation, setStartEducation] = useState("");
  const [graduateEducation, setGraduateEducation] = useState("");

  async function getData() {
    try {
      const { data } = await axios.get(`${baseUrl}/educations/${id}`, {
        headers: { access_token: await AsyncStorage.getItem("access_token") },
      });
      console.log(data);
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
        url: `${baseUrl}/educations/${id}`,
        headers: { access_token: await AsyncStorage.getItem("access_token") },
        data: {
          educationalLevel: educationalLevel || current.educationalLevel,
          College: College || current.College,
          Major: Major || current.Major,
          startEducation: startEducation || current.startEducation,
          graduatedEducation: graduateEducation || current.graduatedEducation,
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
              <Text style={styles.title}>Edit Education Background</Text>
            </View>
            <View className="mt-10">
              <Text style={styles.label}>College Name</Text>
              <TextInput
                className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
                placeholder="College (ex: Universitas Brawijaya)"
                defaultValue={current.College}
                onChangeText={setCollege}
              />
              <Text style={styles.label}>Education Level</Text>

              <TextInput
                className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
                placeholder="Degrees (ex: Bachelor's Degree)"
                defaultValue={current.educationalLevel}
                onChangeText={setEducationalLevel}
                // keyboardType="numeric"
              />
              <Text style={styles.label}>Major</Text>

              <TextInput
                className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
                placeholder="Major (ex: International Relation)"
                defaultValue={current.Major}
                onChangeText={setMajor}
              />
              <Text style={styles.label}>Start Education</Text>

              <TextInput
                className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
                placeholder="Start (ex: 2018)"
                defaultValue={current.startEducation}
                onChangeText={setStartEducation}
              />
              <Text style={styles.label}>End Education</Text>

              <TextInput
                className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
                placeholder="Graduate (ex: 2022) "
                defaultValue={current.graduatedEducation}
                onChangeText={setGraduateEducation}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                className="items-center bg-yellow-300 rounded-xl p-4 mt-5"
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
