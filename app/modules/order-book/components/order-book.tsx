import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/state/store";

export function OrderBook() {
  const bids = useSelector((state: RootState) => state.orderBook.bids);
  const asks = useSelector((state: RootState) => state.orderBook.asks);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Book</Text>
      <Text style={styles.pairLabel}>
        <Text style={{ fontWeight: "bold" }}>Pair:</Text> BTC/USDT
      </Text>
      <View style={{ flexDirection: "row", flex: 1, marginTop: 8 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#2A7948",
            paddingRight: 4,
            alignItems: "flex-end",
          }}
        >
          <FlatList
            data={bids}
            ListHeaderComponent={() => (
              <View style={{ flexDirection: "row", gap: 16, marginBottom: 8 }}>
                <Text style={styles.label}>Count</Text>
                <Text style={styles.label}>Amount</Text>
                <Text style={styles.label}>Price</Text>
              </View>
            )}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  gap: 16,
                  justifyContent: "flex-end",
                }}
              >
                <Text>{item.count}</Text>
                <Text>{item.amount}</Text>
                <Text>{item.price}</Text>
              </View>
            )}
          />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "#B91C1C",
            paddingLeft: 4,
            alignItems: "flex-start",
          }}
        >
          <FlatList
            data={asks}
            ListHeaderComponent={() => (
              <View style={{ flexDirection: "row", gap: 16, marginBottom: 8 }}>
                <Text style={styles.label}>Price</Text>
                <Text style={styles.label}>Amount</Text>
                <Text style={styles.label}>Count</Text>
              </View>
            )}
            renderItem={({ item }) => (
              <View style={{ flexDirection: "row", gap: 16 }}>
                <Text>{item.price}</Text>
                <Text>{item.amount}</Text>
                <Text>{item.count}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    paddingLeft: 16,
  },
  pairLabel: {
    color: "#fff",
    marginTop: 4,
    paddingLeft: 16,
    paddingBottom: 4,
  },
  label: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
