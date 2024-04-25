import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import ConnectionManager from "../../app/modules/connection/components/connection-manager";
import { OrderBook } from "../../app/modules/order-book/components/order-book";
import {
  seedInitial,
  updateAsks,
  updateBids,
} from "../../app/modules/order-book/state/order-book-slice";
import { parseOrderBookEntry } from "../../app/modules/order-book/utils/parseOrderBookEntry";
import * as WebsocketClient from "../../app/shared/services/websocket";
import { BookEntry } from "../modules/order-book/types/book-entry";

export default function HomePage() {
  const dispatch = useDispatch();
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
        dispatch(
          seedInitial(
            message[1].map((entry: any[]) => parseOrderBookEntry(entry))
          )
        );
      }
      if (message && message[1].length === 3) {
        const newBookOrder = parseOrderBookEntry(message[1]);
        if (newBookOrder.amount > 0) {
          dispatch(updateBids(newBookOrder));
        }

        if (newBookOrder.amount < 0) {
          dispatch(updateAsks(newBookOrder));
        }
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
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Crypto Order Book</Text>
        <ConnectionManager
          connectionState={connectionState}
          connect={connect}
          disconnect={disconnect}
        />
        <StatusBar style="auto" />
      </View>
      <View style={styles.orderBookContainer}>
        <OrderBook />
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
    flex: 5,
    alignSelf: "stretch",
  },
});
