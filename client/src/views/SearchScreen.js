import React from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { Foundation, FontAwesome, Entypo, Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function SearchScreen({ navigation }) {
  const data = [
    {
      question: "What is the Job Finder Assistant mobile app?",
      answer:
        "Job Finder Assistant is a mobile application designed to help job seekers streamline their job search process.",
    },
    {
      question: "How does the Job Finder Assistant app work?",
      answer:
        "The app utilizes advanced algorithms and machine learning to analyze user profiles and suggest relevant job listings based on their skills and preferences.",
    },
    {
      question: "Is the Job Finder Assistant app free to use?",
      answer:
        "Yes, the basic version of the app is available for free, but premium features may require a subscription.",
    },
    {
      question: "What features does the Job Finder Assistant app offer?",
      answer:
        "The app offers customized job recommendations, job search filters, todo list generator, and resume builder.",
    },
    {
      question:
        "How secure is the user's data on the Job Finder Assistant app?",
      answer:
        "The app takes data privacy seriously and store user information securely.",
    },
    {
      question: "Can the Job Finder Assistant app help with career advice?",
      answer:
        "While its primary focus is job searches, the app may provide some career advice resources.",
    },
    {
      question: "Can I apply for jobs directly through the app?",
      answer:
        "Unfortunately no, but SEEKER will offers you some customized job recommendation.",
    },
    {
      question: "What platforms are supported by the Job Finder Assistant app?",
      answer: "The app is available for mobile devices.",
    },
    {
      question: "How accurate are the job recommendations provided by the app?",
      answer:
        "The app's recommendations improve over time through machine learning and user feedback.",
    },
    {
      question: "Can I save and revisit job listings for later consideration?",
      answer:
        "Yes, users can save job listings for future evaluation or application using our bookmarks section.",
    },
  ];

  const renderItem = ({ item }) => (
    <View
      // onPress={() => navigation.navigate("Todo")}
      className="bg-amber-300 rounded-3xl p-4 mb-4 shadow-md"
    >
      <Text className="text-lg font-semibold mb-2">{item.question}</Text>
      <Text className="text-sm text-black mt-2">{item.answer}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://w0.peakpx.com/wallpaper/402/322/HD-wallpaper-office-desk-busy-career-computer-laptop-technology-urban-work-workplace.jpg",
        }}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View className="items-center">
            <Image
              source={require("../../assets/seeker_black.png")}
              style={{
                height: 100,
                width: 100,
                marginTop: 60,
                marginBottom: 40,
              }}
            />
          </View>
          <Carousel
            // containerCustomStyle={{ overflow: "visible" }}
            data={data}
            renderItem={renderItem}
            inactiveSlideScale={0.75}
            inactiveSlideOpacity={0.75}
            sliderWidth={width}
            itemWidth={width * 0.68}
            slideStyle={{ alignItems: "center" }}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("AiRec")}
            className=" bg-amber-300 rounded-3xl p-5 w-10/12"
            style={{
              marginBottom: 10,
            }}
          >
            <View
              className="mt-3"
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Text
                style={{ fontSize: 14, color: "black" }}
                className="font-bold"
              >
                SEEKER's Job Recommendations
              </Text>
              <View style={{ marginLeft: 10 }}>
                <Image
                  source={require("../../assets/seeker_black.png")}
                  style={{ height: 60, width: 60 }}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("SearchJob")}
            className="mt-10 bg-amber-300 rounded-3xl p-5 w-10/12 items-end"
            style={{
              marginBottom: 50,
            }}
          >
            <View
              className="mt-3"
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Text
                style={{ fontSize: 14, color: "black" }}
                className="font-bold"
              >
                All Available Jobs List
              </Text>
              <View style={{ marginLeft: 10 }}>
                <Image
                  source={require("../../assets/animated.png")}
                  style={{ height: 60, width: 60 }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    alignItems: "center",
    // justifyContent: "center",
    flex: 1,
  },
  recommendationText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
