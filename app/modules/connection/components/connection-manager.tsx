import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ConnectionManagerProps = {
  connectionState: "Disconnected" | "Connected";
  connect: () => void;
  disconnect: () => void;
};

export default function ConnectionManager({
  connectionState,
  connect,
  disconnect,
}: Readonly<ConnectionManagerProps>) {
  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  connectionStateContainer: { marginTop: 32 },
  buttonsContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "80%",
  },
  button: { padding: 8, backgroundColor: "#ECECEC", borderRadius: 4 },
  buttonLabel: { fontSize: 16, fontWeight: "bold" },
});
