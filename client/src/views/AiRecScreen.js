import {
  Image,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../components/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AiRecScreen({ navigation }) {
  // const data = [
  //   {
  //     id: 1,
  //     Role: "Frontend Developer",
  //   },
  //   {
  //     id: 2,
  //     Role: "Mobile Developer",
  //   },
  //   {
  //     id: 3,
  //     Role: "Fullstack Developer",
  //   },
  // ];

  const [data, setData] = useState([]);
  console.log(data, "iniiiii");
  const [loading, setLoading] = useState(true);

  async function getData() {
    try {
      const { data } = await axios.get(`${baseUrl}/generatejobroles`, {
        headers: { access_token: await AsyncStorage.getItem("access_token") },
      });
      // console.log("tesss <<<");
      setData(data.roles);
      setLoading(false);
      // console.log(data);
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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("AiJob", { keyword: item.jobRoles })}
      className="bg-amber-300 rounded-3xl p-4 mb-7 shadow-md items-center"
    >
      <Text className="text-lg font-semibold mb-2">{item.jobRoles}</Text>
    </TouchableOpacity>
  );

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
    <View className="flex-1 p-4 bg-white">
      <View className="flex-row items-center mb-4">
        <Text className="text-red-500 text-xl mr-2">🔖</Text>
        <Text className="text-xl font-semibold">Choose your role</Text>
      </View>
      <View className="mt-48">
        <FlatList
          className=""
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    </View>
  );
}
