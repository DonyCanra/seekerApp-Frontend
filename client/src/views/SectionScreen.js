import { Image, Text, View, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SectionScreen({ navigation, route }) {
  const { keyword } = route.params;
  console.log(keyword);

  return (
    <View className="flex-1 p-4 bg-white">
      <View className="flex-row items-center mb-4">
        <Text className="text-red-500 text-xl mr-2">🔖</Text>
        <Text className="text-xl font-semibold">
          Choose your preferred site
        </Text>
      </View>
      <View className="mt-48">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Job", {
              keyword: keyword,
              endpoint: "fetchjobskalibrr",
            })
          }
          className="bg-amber-300 rounded-3xl p-4 mb-7 shadow-md"
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              className="ml-16"
              source={{
                uri: "https://theme.zdassets.com/theme_assets/2132548/bd2bcc4a79cbb4c85589d923476f39a8bf5fc6ce.png",
              }}
              style={{ height: 50, width: 50 }}
            />
            <Text className="text-lg font-semibold mb-2 ml-12">Kalibrr</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Job", {
              keyword: keyword,
              endpoint: "fetchjobskarir",
            })
          }
          className="bg-amber-300 rounded-3xl p-4 mb-7 shadow-md"
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              className="ml-16"
              source={{
                uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAwFBMVEX9/f0dYq4AWaoPXawQfLMAWKoAVKmtv9sUX62xwt1UgLy3yOBuksZylMWjuNnw8/cAeLEAUqjL1uiSutWLp9B7rM4awfGTq9Dn7fSCoMwAcq7l5eXC0OX2+/1pZmbAv7/b4+89c7bP7vtwpcmQj48naLIATaZVgr1ji8HR3OtczvUxx/Pu7u5lYmJ9e3tIerrA1+YAbKvS4u1VzfU/dbeu5fl61vaDgYHS0dGcmpq2tbWnpaXf3t5ycHCKiYnMy8vglTHUAAAEzUlEQVR4nO3Z63qiOAAGYCSTGKtCcewIVRR3wOqO1t3ZQw9We/93NZAECFardWhp+3zvjyoYQz6BJKSGAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb2TW7SUapddolVfjPktKdqNnWqm6I3ZNyzuuqnFZXo17uE5tH8fW2mMme0irvAM3RI387HDJ3+SyvQkZEv6Wz59Q3ofmG9yHVSXseEKvvBr3qCzhm0FC5diEtht7zfa+3MkJB3XJygM1W4QJkdcpHESV9eN6rggdi3svkPuaqshMbsaVDVo1GrWrT9iYmMLEy4oQStQ3OWFRUztIi4miflCjPK5FzIzqooJsTmM5okjHX7K4Fk7LS2hPqIYcm7CppkI0C3hV/Kk402Z4bVGvOWNcvIq56NZ4aIlNcxCJovyqvIRG0MnNPD3iMwkHTwKOCz+OaG0+1MmEtYjLLw32JkyLkG6JCQvUcQ4l7KQBs9tlqgISk1KTbMdvF68Nd3/C9Ncp8SHmlIQzdUGa2UU7kHsI8RrNZt0z5Zlw0k4oT8iJSeQ9tjdhUsQJKk04oypgfqeNRSSS3j3+Urvh9IR02bW86bMJzcizekvt0G+fMEgD5r2Bfcbi08ajbIfsobPmpwnlHWg8l5C+8jTuiIQuVZ1BobtzrYg5+SDoy6s27fNVQqqPILsTkhIHQuPnV419bEKXqIBPHgpmXv6+KyM5xYSRXnx3QlbmhOjL5Xnm8uK4hG2fy4D8macetz5W1TBfT0g8vdTOhHxcYkDji+b8uIT8SnYpxc8K6RpexFRXup3QLKw67U5Y5kh/SsIaT9u+aw7uN9s1ZhKu1VBMWD+YsNyHl1MSah9uj8lBi+WTPnJqwjI7GkPdgsWEjracONmdUA0WxT7Bbzl5PMrqckCsOOFfF0knenGuJ7S7Gr1BWUJe68iRoNAp+JHKx01GWs10ClBxQpXpUk+4V5qQE9ewZERT6xrVtJTQqRWIHe8oofuihNwMjCxPPsKrZWXqZdf1x00YJBt+TY36fqG1evM+asK0ATN5zrKJm5zCUG3pgr+HvlRy/xZzmu8Him09Afdkh0rVGC4Tmvm0s2dWm/CPRHqFff2e+HngK9urGEt1kgKteTxSA4jtpSNKRQn//Ca86DvbCW2ZQT0wqUdiTqc9q+eJtaT3kNA/XDL3ZK1tUBgy0ulq8nyuTds+dELDk7eaIx5qg+3/Qlbb05STMD1vphgDBw7X8zmdqMqE/5yS0EmWU/U10HiYF0us7F+xFYxZenkSGgUGSz6bqGO0xJZTSFgXC7UsXxF+coDT/fcj8f+LvhM0hcJi/Uzua6getOON4yYyVmsno4b8SJXsyJLBjhoHxc3ifwPeIdt1X22VDABeSb8vX+bJ37lh99P3n0R/vVjcGMZt/BLGW4twOLwLF8NR1e0qz/qmf3tvzBfh/HG4MvrD8GGzXt2ub6puV2keho/Jy2gYX5d36zjhSLwPr6tuWGn68np8HD4Yxub60yW8X8+Nzfp+FV+S6+vRajGK78M44aL/aRKONvG1uQrD+7gPvQvD+Gz2N7fGY7x3dVd12wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPqxfV4FhS8iBQWQAAAAASUVORK5CYII=",
              }}
              style={{ height: 50, width: 50 }}
            />
            <Text className="text-lg font-semibold mb-2 ml-12">Karir.com</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Job", {
              keyword: keyword,
              endpoint: "fetchjobsglints",
            })
          }
          className="bg-amber-300 rounded-3xl p-4 mb-7 shadow-md"
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              className="ml-16"
              source={{
                uri: "https://kontenesia.com/wp-content/uploads/2022/08/logo-glints-kontenesia-review-416x416.png",
              }}
              style={{ height: 50, width: 50 }}
            />
            <Text className="text-lg font-semibold mb-2 ml-12">Glints</Text>
          </View>
        </TouchableOpacity>
        {/* <FlatList
          className=""
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        /> */}
      </View>
    </View>
  );
}
