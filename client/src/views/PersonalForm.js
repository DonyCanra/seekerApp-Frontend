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
import DatePicker from "react-native-datepicker";
import React, { useState } from "react";

export default function PersonalForm({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [sayName, setSayName] = useState("");
  const [bithDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [domisili, setDomisili] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  const handleSubmit = () => {
    console.log(fullName);
    console.log(sayName);
    console.log(bithDate);
    console.log(gender);
    console.log(aboutMe);
    console.log(phoneNumber);
    console.log(domisili);
    console.log(profilePictureUrl);
    navigation.navigate("Root", { screen: "Profile" });
  };

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
            </View>
            <View className="">
              <TextInput
                className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
                placeholder="Fullname (ex: John Doe)"
                value={fullName}
                onChangeText={setFullName}
              />
              <TextInput
                className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
                placeholder="Nickname (ex: Doe)"
                value={sayName}
                onChangeText={setSayName}
              />
              <TextInput
                className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
                placeholder="Birthdate (ex: Solo, 31 February 1995)"
                value={bithDate}
                onChangeText={setBirthDate}
              />
              <TextInput
                className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
                placeholder="Gender (ex: Male)"
                value={gender}
                onChangeText={setGender}
              />
              <TextInput
                className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
                placeholder="About Me (ex: My name is Doe, ...)"
                value={aboutMe}
                onChangeText={setAboutMe}
              />
              <TextInput
                className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
                placeholder="Phone Number (ex: 08121212394)"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="numeric"
              />
              <TextInput
                className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
                placeholder="Domicile (ex: Sorong)"
                value={domisili}
                onChangeText={setDomisili}
                keyboardType="numeric"
              />
              <TextInput
                className="border border-gray-400 rounded-2xl px-4 py-2 mb-4"
                placeholder="Profile Picture Url (ex: https://profile-picture.jpg)"
                value={profilePictureUrl}
                onChangeText={setProfilePictureUrl}
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
});
