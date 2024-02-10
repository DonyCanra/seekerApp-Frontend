import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LandingScreen from "./src/views/LandingScreen";
import RegisterScreen from "./src/views/RegisterScreen";
import LoginScreen from "./src/views/LoginScreen";
import HomeScreen from "./src/views/HomeScreen";
import ToDoScreen from "./src/views/ToDoScreen";
import { Ionicons } from "@expo/vector-icons";
import AccountScreen from "./src/views/AccountScreen";
import { SafeAreaView } from "react-native";
import AndroidSafeArea from "./src/components/AndroidSafeArea";
import SearchScreen from "./src/views/SearchScreen";
import PersonalForm from "./src/views/PersonalForm";
import EducationForm from "./src/views/EducationForm";
import WorkForm from "./src/views/WorkForm";
import BookmarkScreen from "./src/views/BookmarkScreen";
import AllJobScreen from "./src/views/AllJobScreen";
import AiJobScreen from "./src/views/AiJobScreen";
import AiRecScreen from "./src/views/AiRecScreen";
import DetailScreen from "./src/views/DetailScreen";
import DetailBookmarks from "./src/views/DetailBookmarks";
import SectionScreen from "./src/views/SectionScreen";
import TopupScreen from "./src/views/TopupScreen";
import EditEducation from "./src/views/EditEducation";
import EditWork from "./src/views/EditWork";
import EditProfile from "./src/views/EditProfile";
import PostScreen from "./src/views/PostScreen";
import SearchJob from "./src/views/SearchJob";
import PaymentScreen from "./src/views/PaymentScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Root() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
            // } else if (route.name === "Todo") {
            //   iconName = focused ? "list" : "list-outline";
          } else if (route.name === "Bookmark") {
            iconName = focused ? "bookmark" : "bookmark-outline";
          } else if (route.name === "Post") {
            iconName = focused ? "ios-paper-plane" : "ios-paper-plane-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: "#0B4F6C", // Color for the active tab icon and label
        tabBarInactiveTintColor: "#000", // Color for inactive tab icons and labels
        tabBarStyle: {
          backgroundColor: "#ffde59",
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60,
          borderBottomLeftRadius: 60,
          borderBottomRightRadius: 60,
          height: 70,
          marginBottom: 20,
          padding: 10,
          paddingBottom: 12,
          margin: 15,
          position: "absolute",
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Bookmark" component={BookmarkScreen} />
      <Tab.Screen name="Post" component={PostScreen} />
      <Tab.Screen name="Profile" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <SafeAreaView style={AndroidSafeArea.droidSafeArea}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LandingScreen" component={LandingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="ProfileForm" component={PersonalForm} />
            <Stack.Screen name="EducationForm" component={EducationForm} />
            <Stack.Screen name="WorkForm" component={WorkForm} />
            <Stack.Screen name="Job" component={AllJobScreen} />
            <Stack.Screen name="AiJob" component={AiJobScreen} />
            <Stack.Screen name="AiRec" component={AiRecScreen} />
            <Stack.Screen name="Todo" component={ToDoScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen name="DetailBookmarks" component={DetailBookmarks} />
            <Stack.Screen name="Section" component={SectionScreen} />
            <Stack.Screen name="Topup" component={TopupScreen} />
            <Stack.Screen name="EditWork" component={EditWork} />
            <Stack.Screen name="EditEducation" component={EditEducation} />
            <Stack.Screen name="SearchJob" component={SearchJob} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen name="Root" component={Root} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}
