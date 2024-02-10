import React, { useRef, useState, useEffect } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Foundation } from "@expo/vector-icons";
import baseUrl from "../components/baseUrl";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

export default function AiJobScreen({ navigation, route }) {
  const { keyword } = route.params;
  console.log(keyword);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;

  async function fetchJobs() {
    try {
      const access_token = await AsyncStorage.getItem("access_token");

      const responses = await Promise.all([
        axios.post(
          `${baseUrl}/fetchjobsglints`,
          {
            query: keyword,
          },
          {
            headers: { access_token },
          }
        ),
        axios.post(
          `${baseUrl}/fetchjobskalibrr`,
          {
            query: keyword,
          },
          {
            headers: { access_token },
          }
        ),
        axios.post(
          `${baseUrl}/fetchjobskarir`,
          {
            query: keyword,
          },
          {
            headers: { access_token },
          }
        ),
      ]);

      const jobsData = responses.map((response) => response.data);
      const combinedJobs = jobsData.reduce((accumulator, currentData) => {
        return [...accumulator, ...currentData];
      }, []);

      setJobs(combinedJobs);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  const onSwipeRight = (jobTitle) => {
    // alert(`You swiped right on ${jobTitle}`);
  };

  const forceSwipe = (direction) => {
    const x = direction === "right" ? -SCREEN_WIDTH : SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };

  const forceSwipe2 = async (direction) => {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
    const data = jobs[currentIndex];
    try {
      alert(`Add to bookmark sucessfull`);
      const res = await axios({
        method: "post",
        url: `${baseUrl}/bookmarks`,
        headers: { access_token: await AsyncStorage.getItem("access_token") },
        data: {
          url: data.url,
          logo: data.logo,
          jobTitle: data.jobTitle,
          companyName: data.companyName,
          companyLocation: data.companyLocation,
          salary: data.salary,
        },
      });
      console.log("Bookmark ditambahkan:", res.data);
    } catch (error) {
      console.error("Gagal menambahkan bookmark:", error);
      alert(`Add to bookmark failed`);
    }

    console.log("add ke bookmark");
    console.log(jobs[currentIndex]); // ini jobs percard
  };

  const onSwipeComplete = (direction) => {
    const job = jobs[currentIndex];
    direction === "right" ? onSwipeRight(job.jobTitle) : null;
    setCurrentIndex((prevIndex) => prevIndex + 1);
    position.setValue({ x: 0, y: 0 });
  };

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      outputRange: ["-30deg", "0deg", "30deg"], // Update this line
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  };

  const renderCard = (index) => {
    const job = jobs[index];

    if (index < currentIndex) return null;
    if (index === currentIndex) {
      return (
        <Animated.View
          key={index}
          style={[
            getCardStyle(),
            {
              flex: 1,
              //   justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 40,
              padding: 16,
              position: "relative",
              width: 360,
              marginLeft: 9,
            },
          ]}
        >
          <Image
            style={{
              width: 250,
              height: 250,
              borderRadius: 300,
              marginTop: 30,
            }}
            source={{ uri: job.logo }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            {job.jobTitle}
          </Text>
          <Text style={{ fontSize: 14, color: "black", marginBottom: 5 }}>
            Company: {job.companyName}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "black",
              textAlign: "center",
              marginBottom: 5,
            }}
          >
            Location: {job.companyLocation}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "black",
              textAlign: "center",
              marginBottom: 5,
            }}
          >
            Salary: {job.salary}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "black",
              textAlign: "center",
              marginBottom: 5,
            }}
          >
            Experience: {job.workExperience}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "black",
              textAlign: "center",
              marginBottom: 80,
            }}
          >
            Education: {job.minimumEducation}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              className="mr-40"
              style={{
                // backgroundColor: "#ffde59",
                padding: 20,
                borderRadius: 40,
                marginTop: 16,
              }}
              onPress={() => forceSwipe("right")}
            >
              <Foundation name="x" size={48} color="red" />
            </TouchableOpacity>
            <TouchableOpacity
              className=""
              style={{
                // backgroundColor: "#ffde59",
                padding: 20,
                borderRadius: 40,
                marginTop: 16,
              }}
              onPress={() => forceSwipe2("right")}
            >
              <Foundation name="heart" size={48} color="red" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      );
    }
    return (
      <Animated.View
        key={index}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 8,
          padding: 16,
          position: "absolute",
          width: SCREEN_WIDTH,
          opacity: currentIndex - index === 1 ? 0.7 : 0,
        }}
      >
        <Image
          style={{ width: 96, height: 96, borderRadius: 48 }}
          source={{ uri: job.logo }}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>
          {job.jobTitle}
        </Text>
        <Text style={{ fontSize: 14, color: "gray" }}>{job.companyName}</Text>
      </Animated.View>
    );
  };

  const renderJobCards = () => {
    if (currentIndex >= jobs.length) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 32, fontWeight: "bold", color: "black" }}>
            No Job Available
          </Text>
        </View>
      );
    }

    return jobs.map((_, index) => renderCard(index));
  };

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
    <View style={{ flex: 1, backgroundColor: "gray", padding: 16 }}>
      {renderJobCards()}
    </View>
  );
}
