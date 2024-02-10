import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState } from "react";

export default function SearchJob({ navigation }) {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    navigation.navigate("Section", { keyword: searchText });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <View className="items-center flex-1 justify-center">
        <Image
          className="mb-5"
          source={require("../../assets/search.png")}
          style={{ height: 480, width: 480 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#E1F2FE",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 8,
    backgroundColor: "#F8F8F8",
    borderRadius: 15,
    marginTop: 8,
  },
  searchButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 15,
    marginTop: 5,
    // height: 45,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
