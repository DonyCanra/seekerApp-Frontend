import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "../components/baseUrl";

export default function ToDoScreen({ navigation, route }) {
  const { job, bookmarkId } = route.params;
  console.log(job, "ini job");

  const [loading, setLoading] = useState(true);
  const [postedTodos, setPostedTodos] = useState(false);
  const [todoItem, setTodoItem] = useState("");
  const [todos, setTodos] = useState("");
  // console.log("masuk todos >>>>>>>>>", todos);

  // const handleToggleTodo = () => {
  //   console.log("handle");
  // };

  async function handlePost() {
    
    try {
      const todosss = await axios({
        method: "post",
        url: `${baseUrl}/posts`,
        headers: { access_token: await AsyncStorage.getItem("access_token") },
        data: {
          title: `To do List For ${job.jobTitle}`,
          description: "It works for me, check this out",
          bookmarkId: bookmarkId
        }
      });
      // await axios.post(`${baseUrl}/posts`, {
      //   headers: { access_token: await AsyncStorage.getItem("access_token") },
      //   data: {
      //     title: `To do List For ${job.jobTitle}`,
      //     description: "It works for me, check this out",
      //     bookmarkId: bookmarkId
      //   }
      // });
      setPostedTodos(true)
      console.log("posted");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleToggleTodo(id) {
    try {
      const res = await axios({
        method: "patch",
        url: `${baseUrl}/todos/${id}`,
        headers: { access_token: await AsyncStorage.getItem("access_token") },
        // data: { status: true },
      });
      getTodos();
      console.log("done change");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveTodo(id) {
    try {
      await axios.delete(`${baseUrl}/todos/${id}`, {
        headers: { access_token: await AsyncStorage.getItem("access_token") },
      });
      console.log("done delete work");
      getTodos();
    } catch (error) {
      console.log(error);
    }
  }

  const handlePostTodos = () => {
    setPostedTodos(!postedTodos);
  };

  async function getTodos() {
    try {
      const { data } = await axios.get(`${baseUrl}/todos/${bookmarkId}`, {
        headers: { access_token: await AsyncStorage.getItem("access_token") },
      });
      setTodos(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      getTodos();
    });
    return unsubscribe;
  }, [navigation]);

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
    <TouchableOpacity onPress={() => handleToggleTodo(item._id)}>
      <View style={[styles.todoItem, item.status && styles.completedTodo]}>
        {item.status ? (
          <FontAwesome name="check-square-o" size={24} color="green" />
        ) : (
          <FontAwesome name="square-o" size={24} color="black" />
        )}
        <Text style={styles.todoText}>{item.task}</Text>
        <TouchableOpacity
          className="mr-3"
          onPress={() => handleRemoveTodo(item._id)}
        >
          <FontAwesome name="trash-o" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.header}>TODO List</Text>
      </View>
      <View className="mt-2" style={styles.card}>
        <Text style={styles.jobTitle}>{job.jobTitle}</Text>
        <Text style={styles.companyName}>{job.companyName}</Text>
        <Text style={styles.jobDescription}>{job.companyLocation}</Text>
      </View>
      {/* <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a task..."
          value={todoItem}
          onChangeText={(text) => setTodoItem(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Text style={styles.addButtonText}>ADD</Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles.listContainer}>
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          style={styles.list}
        />
      </View>
      <TouchableOpacity
        style={styles.postButton}
        onPress={() => {
          handlePost()
        }}
        disabled={postedTodos}
      >
        <Text style={styles.postButtonText}>
          {postedTodos ? "Posted" : "Post Todos"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  postButton: {
    backgroundColor: "#ffde59",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    marginTop: 20,
  },
  postButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
    // marginBottom: 80,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  balance: {
    fontSize: 18,
    color: "green",
    marginBottom: 20,
    marginRight: 8,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    borderRadius: 35,
  },
  addButton: {
    backgroundColor: "#ffde59",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
  },
  addButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  list: {
    flex: 1,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 18,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 35,
  },
  completedTodo: {
    backgroundColor: "#e1ffe1",
  },
  todoText: {
    flex: 1,
    marginLeft: 10,
    padding: 8,
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  companyName: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  jobDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  card: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
