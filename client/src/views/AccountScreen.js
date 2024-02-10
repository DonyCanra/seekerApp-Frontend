import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  Linking,
} from "react-native";
import {
  Foundation,
  FontAwesome,
  FontAwesome5,
  Entypo,
  Feather,
  Ionicons,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../components/baseUrl";

export default function AccountScreen({ navigation }) {
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  // console.log(profile);

  function Logout() {
    try {
      AsyncStorage.clear();
      navigation.navigate("LandingScreen");
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteWork(id) {
    try {
      await axios.delete(`${baseUrl}/work-experience/${id}`, {
        headers: { access_token: await AsyncStorage.getItem("access_token") },
      });
      console.log("done delete work");
      getData();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteEdu(id) {
    try {
      await axios.delete(`${baseUrl}/educations/${id}`, {
        headers: { access_token: await AsyncStorage.getItem("access_token") },
      });
      console.log("done delete education");
      getData();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteAccount(id) {
    try {
      await axios.delete(`${baseUrl}/users/${id}`, {
        headers: { access_token: await AsyncStorage.getItem("access_token") },
      });
      console.log("done delete account");
      navigation.navigate("LandingScreen");
    } catch (error) {
      console.log(error);
    }
  }

  async function generateCV() {
    try {
      console.log("Masuk sini <<<");
      const { data } = await axios({
        method: "patch",
        url: `${baseUrl}/cv-generate`,
        headers: { access_token: await AsyncStorage.getItem("access_token") },
      });
      alert(`CV Generated`);
      console.log(data);
      getData();
    } catch (error) {
      console.log(error);
    }
  }

  async function getData() {
    try {
      const { data } = await axios.get(`${baseUrl}/users`, {
        headers: { access_token: await AsyncStorage.getItem("access_token") },
      });
      setProfile(data);
      setLoading(false);
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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getData();
    }, 1000);
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }
  return (
    <View className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="flex items-center">
          <Image
            className="mt-10"
            source={{
              uri: profile?.Profile?.photoUrl,
            }}
            style={{
              height: 200,
              width: 200,
              borderRadius: 300,
              borderColor: "green",
              borderWidth: 2,
            }}
          />
          <View className="mt-5">
            <Text className="text-center text-3xl font-medium">
              {profile?.Profile.fullName}
            </Text>
            <View
              className="justify-center mt-5"
              style={{ flexDirection: "row" }}
            >
              <Text style={styles.balance}>My Balance: {profile.token}</Text>
              <FontAwesome name="star" size={24} color="green" />
            </View>
            <View className="items-center">
              <TouchableOpacity
                onPress={() => navigation.navigate("Topup")}
                className="bg-green-600 w-32 p-3 items-center rounded-3xl"
              >
                <Text className="font-semibold">Topup Balance</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* ini card profile */}
        <View
          className="mt-10 bg-amber-300 rounded-3xl p-5 w-10/12"
          style={styles.elevation}
        >
          <Text style={styles.profile}>Profile</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Foundation name="mail" size={24} color="black" />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 14, color: "black" }}>
                {profile?.email}
              </Text>
            </View>
          </View>
          <View
            className="mt-3"
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <FontAwesome name="phone" size={24} color="black" />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 14, color: "black" }}>
                {profile?.Profile.phoneNumber}
              </Text>
            </View>
          </View>
          <View
            className="mt-3"
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Entypo name="location-pin" size={24} color="black" />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 14, color: "black" }}>
                {profile?.Profile.domisili}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            className="mt-10 items-end ml-10"
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("EditProfile", { id: profile.Profile.id })
            }
          >
            <Feather name="edit" size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* ini card work experience */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("WorkForm")}
          className="rounded-3xl p-5 w-10/12 mt-9 items-end"
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 17, color: "black", fontWeight: "bold" }}>
              Add Work Exprerience
            </Text>
            <View style={{ marginLeft: 10 }}>
              <Ionicons name="add-circle-outline" size={28} color="black" />
            </View>
          </View>
        </TouchableOpacity>
        <View
          className="bg-amber-300 rounded-3xl p-5 w-10/12"
          style={styles.elevation}
        >
          <Text style={styles.profile}>Work experience:</Text>
          {profile.Profile.WorkExperiences.map((work) => (
            <View key={work.id} className="mb-4">
              <Text className="font-bold">Position:</Text>
              <Text className="mb-2">{work.position}</Text>

              <Text className="font-bold">Company:</Text>
              <Text className="mb-2">{work.company}</Text>

              <Text className="font-bold">Type:</Text>
              <Text className="mb-2">{work.type}</Text>

              <Text className="font-bold">Work period:</Text>
              <Text>
                {work.startWork} - {work.stopWork}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <TouchableOpacity
                  className="mt-2 items-end ml-3"
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate("EditWork", {
                      id: work.id,
                    })
                  }
                >
                  <Feather name="edit" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  className="mt-2 items-end ml-3"
                  activeOpacity={0.8}
                  onPress={() => deleteWork(work.id)}
                >
                  <Ionicons name="trash-outline" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* ini card educational background */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("EducationForm")}
          className="rounded-3xl p-5 w-10/12 mt-9 items-end"
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 17, color: "black", fontWeight: "bold" }}>
              Add Education Background
            </Text>
            <View style={{ marginLeft: 10 }}>
              <Ionicons name="add-circle-outline" size={28} color="black" />
            </View>
          </View>
        </TouchableOpacity>
        <View
          className="bg-amber-300 rounded-3xl p-5 w-10/12"
          style={styles.elevation}
        >
          <Text style={styles.profile}>Education background</Text>
          {profile.Profile.Education.map((el) => (
            <View key={el.id} className="mb-4">
              <Text className="font-bold">University:</Text>
              <Text className="mb-2">{el.College}</Text>

              <Text className="font-bold">Degree:</Text>
              <Text className="mb-2">{el.educationalLevel}</Text>

              <Text className="font-bold">Field of Study:</Text>
              <Text className="mb-2">{el.Major}</Text>
              <Text className="font-bold">Study Period:</Text>
              <Text>
                {el.startEducation} - {el.graduatedEducation}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <TouchableOpacity
                  className="mt-2 items-end"
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("EducationForm")}
                >
                  <Ionicons name="add-circle-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  className="mt-2 items-end ml-3"
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate("EditEducation", {
                      id: el.id,
                    })
                  }
                >
                  <Feather name="edit" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  className="mt-2 items-end ml-3"
                  activeOpacity={0.8}
                  onPress={() => deleteEdu(el.id)}
                >
                  <Ionicons name="trash-outline" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View
          className="mt-10 bg-amber-300 rounded-3xl p-3 w-10/12"
          style={styles.elevation}
        >
          <Text className="font-bold ml-2 mt-1 text-lg">CV Link:</Text>
          <TouchableOpacity onPress={() => Linking.openURL(profile.Profile.CV)}>
            <Text className="ml-2 mt-2">
              <FontAwesome5 name="file-pdf" size={24} /> Download CV
            </Text>
          </TouchableOpacity>
          <View className="items-end">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => generateCV()}
              className="rounded-3xl w-10/12 mt-10 mb-2 items-end"
            >
              <View
                // className="mt-3"
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Text style={{ fontSize: 14, color: "red" }}>Generate CV</Text>
                <View style={{ marginLeft: 10, marginRight: 10 }}>
                  <Ionicons name="newspaper-outline" size={20} color="red" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={Logout}
          className="rounded-3xl p-5 w-10/12 items-end"
        >
          <View
            // className="mt-3"
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text style={{ fontSize: 20, color: "black" }}>Logout</Text>
            <View style={{ marginLeft: 10 }}>
              <AntDesign name="logout" size={32} color="black" />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => deleteAccount(id)}
          className="rounded-3xl p-5 w-10/12 mb-24 items-end"
        >
          <View
            // className="mt-3"
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text style={{ fontSize: 20, color: "red" }}>Delete Account</Text>
            <View style={{ marginLeft: 10 }}>
              <MaterialIcons name="delete" size={32} color="red" />
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  balance: {
    fontSize: 18,
    color: "green",
    marginBottom: 20,
    marginRight: 8,
  },
  elevation: {
    elevation: 10,
    shadowColor: "#000000",
  },
  profile: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 15,
    textAlign: "right",
    marginRight: 5,
  },
});
