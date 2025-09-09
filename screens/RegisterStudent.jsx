import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
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
    if (!name || !registration) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }
    const newStudent = {
      id: Date.now(),
      name,
      registration,
      photo,
    };
    navigation.navigate("Home", { newStudent });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📝 Cadastrar Aluno</Text>

      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="#888"
      />

      <TextInput
        placeholder="Matrícula"
        value={registration}
        onChangeText={setRegistration}
        style={styles.input}
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
        <Text style={styles.photoButtonText}>
          {photo ? "📷 Alterar Foto" : "📷 Tirar Foto"}
        </Text>
      </TouchableOpacity>

      {photo && <Image source={{ uri: photo }} style={styles.avatar} />}

      <TouchableOpacity style={styles.saveButton} onPress={saveStudent}>
        <Text style={styles.saveButtonText}>💾 Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F6FA",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#FFF",
    fontSize: 16,
    color: "#333",
  },
  photoButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  photoButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginVertical: 15,
    borderWidth: 3,
    borderColor: "#007BFF",
  },
  saveButton: {
    backgroundColor: "#28A745",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
