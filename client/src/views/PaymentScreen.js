import { View } from "react-native";
import { WebView } from "react-native-webview";

export default function PaymentScreen({ route }) {
  const { url } = route.params;
  console.log(url, "ini url");

  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: url }} style={{ flex: 1 }} />
    </View>
  );
}
