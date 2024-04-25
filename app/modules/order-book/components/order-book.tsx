import { StyleSheet, Text, View } from "react-native";

export function OrderBook() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Book</Text>
      <Text style={styles.pairLabel}>
        <Text style={{ fontWeight: "bold" }}>Pair:</Text> BTC/USDT
      </Text>
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
  },
  pairLabel: {
    color: "#fff",
    marginTop: 4,
  },
});
