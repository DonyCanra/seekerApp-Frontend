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

export default function EditProfile({ navigation, route }) {
  const { id } = route.params;
  // console.log(id);
  const [current, setCurrent] = useState("");
  // console.log(current, "ini data");
  const [fullName, setFullName] = useState("");
  const [sayName, setSayName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [domisili, setDomisili] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  async function getData() {
    try {
      const { data } = await axios.get(`${baseUrl}/people/${id}`, {
        headers: { access_token: await AsyncStorage.getItem("access_token") },
      });
      // console.log(data, "ini data");
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
        url: `${baseUrl}/people/${id}`,
        headers: { access_token: await AsyncStorage.getItem("access_token") },
        data: {
          fullName: fullName || current.fullName,
          aboutMe: aboutMe || current.aboutMe,
          sayName: sayName || current.sayName,
          birthDate: birthDate || current.birthDate,
          gender: gender || current.gender,
          phoneNumber: phoneNumber || current.phoneNumber,
          domisili: domisili || current.domisili,
          photoUrl: photoUrl || current.photoUrl,
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
                className="mb-5"
                source={require("../../assets/seeker_black.png")}
                style={{ height: 120, width: 120 }}
              />
              <Text style={styles.title}>Profile</Text>
            </View>
            <View className="">
              <Text style={styles.label}>Fullname</Text>
              <TextInput
                className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
                placeholder="Fullname (ex: John Doe)"
                defaultValue={current.fullName}
                onChangeText={setFullName}
              />
              <Text style={styles.label}>Nickname</Text>
              <TextInput
                className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
                placeholder="Nickname (ex: Doe)"
                defaultValue={current.sayName}
                onChangeText={setSayName}
              />
              <Text style={styles.label}>Birth Date</Text>
              <TextInput
                className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
                placeholder="Birthdate (ex: Solo, 31 February 1995)"
                defaultValue={current.birthDate}
                onChangeText={setBirthDate}
              />
              <Text style={styles.label}>Gender</Text>

              <TextInput
                className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
                placeholder="Gender (ex: Male)"
                defaultValue={current.gender}
                onChangeText={setGender}
              />
              <Text style={styles.label}>About me</Text>
              <TextInput
                className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
                placeholder="About Me (ex: My name is Doe, ...)"
                defaultValue={current.aboutMe}
                onChangeText={setAboutMe}
              />
              <Text style={styles.label}>Phone Number</Text>

              <TextInput
                className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
                placeholder="Phone Number (ex: 08121212394)"
                defaultValue={current.phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="numeric"
              />
              <Text style={styles.label}>Domicile</Text>

              <TextInput
                className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
                placeholder="Domicile (ex: Sorong)"
                defaultValue={current.domisili}
                onChangeText={setDomisili}
                // keyboardType="numeric"
              />
              <Text style={styles.label}>Profile Picture URL</Text>

              <TextInput
                className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
                placeholder="Profile Picture Url (ex: https://profile-picture.jpg)"
                defaultValue={current.photoUrl}
                onChangeText={setPhotoUrl}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                className="items-center bg-yellow-300 rounded-xl p-4"
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
  label:{
    fontWeight: "bold",
    marginBottom: 5
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 10
  }
});
