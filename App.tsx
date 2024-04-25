import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import ConnectionManager from "./app/modules/connection/components/connection-manager";
import { OrderBook } from "./app/modules/order-book/components/order-book";
import * as WebsocketClient from "./app/shared/services/websocket";
import { ReduxStoreProvider } from "./app/shared/state/redux-store-provider";
import { parseOrderBookEntry } from "./app/modules/order-book/utils/parseOrderBookEntry";

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

  const newMessageHandler = useCallback((event: MessageEvent<any>) => {
    const message = JSON.parse(event.data);
    if (!message?.event) {
      if (Array.isArray(message) && message[1].length > 3) {
        console.log("Initial seed");
      }
      if (message && message[1].length === 3) {
        console.log("Formatted: ", parseOrderBookEntry(message));
      }
    }
  }, []);

  const connect = useCallback(() => {
    WebsocketClient.connect({
      onSuccessfulConnection: onConnect,
      onClose: onDisconnect,
      onNewMessage: newMessageHandler,
    });
  }, [onConnect]);

  const disconnect = useCallback(() => {
    WebsocketClient.disconnect(onDisconnect);
  }, []);

  return (
    <ReduxStoreProvider>
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
    </ReduxStoreProvider>
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
