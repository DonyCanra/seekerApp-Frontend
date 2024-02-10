import {
  StatusBar,
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  return (
    <View className="flex-1 items-center bg-white">
      <ScrollView>
        <Image
          className="mt-24"
          source={require("../../assets/job.png")}
          style={{ height: 150, width: 300 }}
        />
        <Text className="text-2xl mb-20 mt-10 font-extrabold tex">
          Find your dream job with us!
        </Text>
        <TouchableOpacity
          className="items-center"
          activeOpacity={0.8}
          // className="items-center bg-white rounded-2xl p-4"
          onPress={() => navigation.navigate("Search")}
        >
          <Ionicons name="finger-print" size={100} color="black" />
        </TouchableOpacity>
        <Text className=" mt-5 text-center text-black text-xl">
          Getting started? tap here
        </Text>
        {/* <TouchableOpacity
          className="items-center"
          activeOpacity={0.8}
          // className="items-center bg-white rounded-2xl p-4"
          onPress={() => navigation.navigate("AiRec")}
        >
          <Text>new screen</Text>
        </TouchableOpacity> */}
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}
