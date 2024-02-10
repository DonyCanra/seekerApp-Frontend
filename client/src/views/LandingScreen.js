import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Swiper from "react-native-swiper";

export default function LandingScreen({ navigation }) {
  return (
    <Swiper showsButtons={false} loop={false} showsPagination={false}>
      {/* ini slide 1 */}
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={{
            uri: "https://w0.peakpx.com/wallpaper/402/322/HD-wallpaper-office-desk-busy-career-computer-laptop-technology-urban-work-workplace.jpg",
          }}
          style={{ flex: 1 }}
        >
          <View
            style={{
              flex: 1,
              // justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              height: "100%",
            }}
          >
            <Image
              className="mt-40"
              source={require("../../assets/seeker_white.png")}
              style={{ height: 200, width: 200 }}
            />
            <Text
              style={{
                marginBottom: 5,
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
                marginTop: 70,
              }}
            >
              Hi There!
            </Text>
            <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
              Welcome To
            </Text>
            <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
              SEEKER
            </Text>
          </View>
        </ImageBackground>
        <StatusBar style="auto" />
      </View>

      {/* buat slide 2 nanti */}
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={{
            uri: "https://w0.peakpx.com/wallpaper/402/322/HD-wallpaper-office-desk-busy-career-computer-laptop-technology-urban-work-workplace.jpg",
          }}
          style={{ flex: 1 }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              height: "100%",
            }}
          >
            <Image
              source={require("../../assets/seeker_white.png")}
              style={{
                height: 170,
                width: 170,
                marginTop: 100,
                marginBottom: 40,
              }}
            />
            <Text
              style={{
                marginBottom: 5,
                fontSize: 30,
                fontWeight: "bold",
                color: "white",
              }}
            >
              About:
            </Text>
            <Text
              style={{
                fontSize: 17,
                color: "white",
                textAlign: "justify",
                padding: 20,
              }}
            >
              Meet Seeker, your personalized job hunting companion! Powered by
              cutting-edge AI technology, Seeker simplifies your job search by
              presenting tailored job listings based on your qualifications and
              aspirations. From crafting impressive resumes to providing
              multiple to-do lists to increase your chances, Seeker is your
              all-in-one assistant, guiding you towards your dream career. Get
              ready to discover exciting opportunities and take the next leap in
              your professional life with Seeker by your side.
            </Text>
          </View>
        </ImageBackground>
        <StatusBar style="auto" />
      </View>

      {/* buat slide 3 nanti */}
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={{
            uri: "https://w0.peakpx.com/wallpaper/402/322/HD-wallpaper-office-desk-busy-career-computer-laptop-technology-urban-work-workplace.jpg",
          }}
          style={{ flex: 1 }}
        >
          <View
            style={{
              flex: 1,
              // justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              height: "100%",
            }}
          >
            <Image
              source={require("../../assets/seeker_white.png")}
              style={{ height: 170, width: 170, marginTop: 130 }}
            />
            {/* <Text
              style={{
                marginBottom: 10,
                fontSize: 30,
                fontWeight: "bold",
                color: "white",
              }}
            >
              SEEKER:
            </Text> */}
            <Text
              style={{
                fontSize: 20,
                color: "white",
                textAlign: "justify",
                padding: 28,
              }}
            >
              Get the most out of the SEEKER app by creating or signing in to
              your account now
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              className="items-center rounded-xl p-4 bg-yellow-300 mt-40 px-24"
              onPress={() => navigation.navigate("Login")}
            >
              <Text className="text-black text-lg font-extrabold">
                Login/Register
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    </Swiper>
  );
}
