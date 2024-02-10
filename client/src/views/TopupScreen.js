import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "../components/baseUrl";

export default function TopupScreen({ navigation }) {
  const [selectedToken, setSelectedToken] = useState(null);
  const [customToken, setCustomToken] = useState("");

  const handleTokenSelection = (token) => {
    // setSelectedToken(token);
    setSelectedToken((prevToken) => (prevToken === token ? null : token));
  };

  function handleCustomTokenChange(text) {
    setCustomToken(text);
  }

  async function addToken() {
    let inputToken;
    if (selectedToken) {
      inputToken = selectedToken;
    } else if (customToken) {
      inputToken = customToken;
    }
    if (inputToken) {
      try {
        const res = await axios({
          method: "patch",
          url: `${baseUrl}/users`,
          headers: { access_token: await AsyncStorage.getItem("access_token") },
          data: {
            token: inputToken,
          },
        });
        navigation.navigate("Profile");
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function handlePurchase() {
    let inputToken;
    if (selectedToken) {
      inputToken = selectedToken;
    } else if (customToken) {
      inputToken = customToken;
    }
    if (inputToken) {
      console.log(`Purchasing ${inputToken} token`);

      try {
        const res = await axios({
          method: "post",
          url: `${baseUrl}/users/payment-midtrans`,
          headers: { access_token: await AsyncStorage.getItem("access_token") },
          data: {
            token: inputToken,
          },
        });

        console.log(res.data.redirect_url, "<<<");
        let url = res.data.redirect_url;

        try {
          const tokenRes = await axios({
            method: "patch",
            url: `${baseUrl}/users`,
            headers: {
              access_token: await AsyncStorage.getItem("access_token"),
            },
            data: {
              token: inputToken,
            },
          });

          navigation.navigate("Profile");
          navigation.navigate("Payment", { url: url });
        } catch (tokenError) {
          console.log(tokenError);
        }
      } catch (error) {
        console.log(error);
      }
    }
    // navigation.navigate("Root", { screen: "Account" });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Token Amount:</Text>

      <View style={styles.tokenOptions}>
        <TouchableOpacity
          className="mr-4"
          style={selectedToken === 10 ? styles.selectedButton : styles.button}
          onPress={() => handleTokenSelection(10)}
        >
          <Text style={styles.buttonText}>10 Token</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mr-4"
          style={selectedToken === 20 ? styles.selectedButton : styles.button}
          onPress={() => handleTokenSelection(20)}
        >
          <Text style={styles.buttonText}>20 Token</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={selectedToken === 30 ? styles.selectedButton : styles.button}
          onPress={() => handleTokenSelection(30)}
        >
          <Text style={styles.buttonText}>30 Token</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Or enter a custom amount:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Token Amount"
        value={customToken}
        onChangeText={handleCustomTokenChange}
        keyboardType="numeric"
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity
        style={[
          styles.purchaseButton,
          (selectedToken || customToken) && { backgroundColor: "#ffde59" },
        ]}
        onPress={handlePurchase}
        disabled={!selectedToken && !customToken}
      >
        <Text style={styles.purchaseButtonText}>Purchase</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: "#333",
  },
  tokenOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ffde59",
  },
  selectedButton: {
    backgroundColor: "#ffde59",
    padding: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "#333",
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ffde59",
    borderRadius: 8,
    padding: 10,
    width: 200,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  purchaseButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    minWidth: 150,
    alignItems: "center",
    opacity: 1,
  },
  purchaseButtonText: {
    color: "#333",
    fontSize: 18,
  },
});
