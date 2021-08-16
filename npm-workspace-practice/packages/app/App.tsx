import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { hello as helloCommon } from "@nwp/common";
import { hello as helloContoller } from "@nwp/controller";

export default function App() {
  helloCommon();
  helloContoller();
  return (
    <View style={styles.container}>
      <Text>Hello from app</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
