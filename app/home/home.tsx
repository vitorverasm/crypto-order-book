import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ConnectionManager from "../../app/modules/connection/components/connection-manager";
import { OrderBook } from "../../app/modules/order-book/components/order-book";
import { seedInitial } from "../../app/modules/order-book/state/order-book-slice";
import { parseOrderBookEntry } from "../../app/modules/order-book/utils/parseOrderBookEntry";
import * as WebsocketClient from "../../app/shared/services/websocket";
import { RootState } from "../../app/shared/state/store";

export default function HomePage() {
  const dispatch = useDispatch();
  const bids = useSelector((state: RootState) => state.orderBook.bids);
  const asks = useSelector((state: RootState) => state.orderBook.asks);
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
        // console.log("Formatted: ", parseOrderBookEntry(message[1]));
      }
    }
  }, []);

  useEffect(() => {
    console.log("bids:", bids);
  }, [bids]);

  useEffect(() => {
    console.log("asks:", asks);
  }, [asks]);

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
