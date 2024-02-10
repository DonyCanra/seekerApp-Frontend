import {
  Image,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Feather, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../components/baseUrl";

export default function BookmarkScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState("");
  const [bookmarks, setBookmarks] = useState("");
  console.log(bookmarks[0], "<<<<<<<<<<<<<<<<<<<<<< ini dari bookmarks");

  async function getData() {
    try {
      const { data } = await axios.get(`${baseUrl}/users`, {
        headers: { access_token: await AsyncStorage.getItem("access_token") },
      });
      setProfile(data);
      setLoading(false);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getBookmarks() {
    try {
      const { data } = await axios.get(`${baseUrl}/bookmarks`, {
        headers: { access_token: await AsyncStorage.getItem("access_token") },
      });
      setBookmarks(data);
      setLoading(false);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      getData();
      getBookmarks();
    });
    return unsubscribe;
  }, [navigation]);

  if (!bookmarks.length) {
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

  const renderItem = ({ item, index }) => (
    // <View className="bg-amber-300 rounded-3xl p-4 mb-4 shadow-md">
    <View style={styles.card}>
      <Image
        style={{
          width: 50,
          height: 50,
          borderRadius: 40,
          marginBottom: 15,
        }}
        source={{ uri: item.Job[0].logo }}
      />
      <Text className="text-lg font-semibold mb-2">{item.customTitle}</Text>
      <Text className="text-black">Company: {item.Job[0].companyName}</Text>
      <Text className="text-sm text-black mt-2">
        Location: {item.Job[0].companyLocation}
      </Text>
      <View
        className="mt-2"
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          className="mt-2 items-end ml-3"
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("Todo", {
              job: item.Job[0],
              bookmarkId: item._id,
            })
          }
        >
          <FontAwesome5 name="clipboard-list" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          className="mt-2 items-end ml-5"
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("DetailBookmarks", {
              url: item.Job[0].url,
              data: item.Job[0],
              bookmarkId: item._id,
            })
          }
        >
          <Feather name="more-horizontal" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 p-4 bg-white">
      <View
        className="mt-2"
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <Text style={styles.header}>My Bookmark</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.balance}>Balance: {profile.token}</Text>
          <FontAwesome name="star" size={24} color="green" />
        </View>
      </View>
      <View className="mt-4">
        <FlatList
          className="mb-32"
          data={bookmarks}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#ffde59",
    borderRadius: 25,
    padding: 16,
    marginBottom: 12,
    elevation: 4,
  },
});
