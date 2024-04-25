import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as WebsocketClient from "./app/shared/services/websocket";

export default function App() {
  const [connectionState, setConnectionState] = useState("Disconnected");

  const onConnect = useCallback(() => {
    setConnectionState("Connected");
  }, []);

  const onDisconnect = useCallback(() => {
    setConnectionState("Disconnected");
  }, []);

  const connect = useCallback(() => {
    WebsocketClient.connect(onConnect);
  }, [onConnect]);

  const disconnect = useCallback(() => {
    WebsocketClient.disconnect(onDisconnect);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Crypto Order Book</Text>
        <View style={styles.connectionStateContainer}>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Connection state:</Text>{" "}
            {connectionState}
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          {connectionState === "Disconnected" ? (
            <TouchableOpacity
              onPress={connect}
              style={[styles.button, { backgroundColor: "#3b82f6" }]}
            >
              <Text style={styles.buttonLabel}>Connect</Text>
            </TouchableOpacity>
          ) : null}

          {connectionState === "Connected" ? (
            <TouchableOpacity
              onPress={disconnect}
              style={[styles.button, { backgroundColor: "#ef4444" }]}
            >
              <Text style={styles.buttonLabel}>Disconnect</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 16,
  },
  button: { padding: 8, backgroundColor: "#ECECEC", borderRadius: 4 },
  buttonLabel: { fontSize: 16, fontWeight: "bold" },
  buttonsContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "80%",
  },
  title: { fontSize: 24 },
  connectionStateContainer: { marginTop: 32 },
});
