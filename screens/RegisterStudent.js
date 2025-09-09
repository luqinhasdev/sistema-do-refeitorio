import React, { useState } from "react";
import { View, Text, Button, TextInput, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function RegisterStudent({ navigation }) {
  const [name, setName] = useState("");
  const [registration, setRegistration] = useState("");
  const [photo, setPhoto] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const saveStudent = () => {
    if (!name || !registration) return;
    const newStudent = {
      id: Date.now(),
      name,
      registration,
      photo,
    };
    navigation.navigate("Home", { newStudent });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Cadastrar Aluno</Text>

      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          marginBottom: 10,
          padding: 8,
          borderRadius: 5,
        }}
      />

      <TextInput
        placeholder="Matrícula"
        value={registration}
        onChangeText={setRegistration}
        style={{
          borderWidth: 1,
          marginBottom: 10,
          padding: 8,
          borderRadius: 5,
        }}
      />

      <Button title="Tirar Foto" onPress={pickImage} />
      {photo && (
        <Image
          source={{ uri: photo }}
          style={{ width: 100, height: 100, borderRadius: 50, marginTop: 10 }}
        />
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="Salvar" onPress={saveStudent} />
      </View>
    </View>
  );
}
