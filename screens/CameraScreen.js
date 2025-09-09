import React from "react";
import { View, Text } from "react-native";

export default function CameraScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        📷 Aqui abriria a câmera
      </Text>
    </View>
  );
}
