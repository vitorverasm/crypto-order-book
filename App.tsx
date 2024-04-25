import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import ConnectionManager from "./app/modules/connection/components/connection-manager";
import * as WebsocketClient from "./app/shared/services/websocket";
import { OrderBook } from "./app/modules/order-book/components/order-book";

export default function App() {
  const [connectionState, setConnectionState] = useState<
    "Disconnected" | "Connected"
  >("Disconnected");

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
        <ConnectionManager
          connectionState={connectionState}
          connect={connect}
          disconnect={disconnect}
        />
        <View style={styles.orderBookContainer}>
          <OrderBook />
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
    backgroundColor: "#28445b",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 16,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  orderBookContainer: {
    marginTop: 32,
  },
});
