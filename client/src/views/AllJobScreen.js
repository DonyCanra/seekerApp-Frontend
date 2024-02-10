import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "../components/baseUrl";

export default function SearchScreen({ navigation, route }) {
  const { keyword } = route.params;
  const { endpoint } = route.params;
  console.log(keyword, "ini keyword");

  const [job, setJob] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchJob() {
    try {
      const { data } = await axios({
        method: "post",
        url: `${baseUrl}/${endpoint}`,
        headers: { access_token: await AsyncStorage.getItem("access_token") },
        data: {
          query: keyword,
        },
      });
      setJob(data);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchJob();
  }, []);

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <Image
        style={{
          width: 50,
          height: 50,
          borderRadius: 40,
          marginBottom: 15,
        }}
        source={{ uri: item.logo }}
      />
      <Text style={styles.cardTitle}>{item.jobTitle}</Text>
      <Text style={styles.cardDescription}>{item.companyLocation}</Text>
      <Text style={styles.cardDescription}>{item.salary}</Text>
      <TouchableOpacity
        className="items-end mt-3"
        onPress={() =>
          navigation.navigate("Detail", { url: item.url, data: job[index] })
        }
      >
        <Feather name="more-horizontal" size={24} color="black" />
      </TouchableOpacity>
    </View>
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
    <View style={styles.container}>
      {/* <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View> */}
      <FlatList
        data={job}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    color: "#555",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
