import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function HomeScreen({ navigation, route }) {
  const [students, setStudents] = useState([]);

  // Se voltou do cadastro com aluno novo
  useEffect(() => {
    if (route.params?.newStudent) {
      setStudents((prev) => [...prev, route.params.newStudent]);
    }
  }, [route.params?.newStudent]);

  const removeStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🍽 Sistema de Cantina</Text>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("CameraScreen")}
        >
          <Text style={styles.buttonText}>📸 Bater Facial</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#4CAF50" }]}
          onPress={() => navigation.navigate("RegisterStudent")}
        >
          <Text style={styles.buttonText}>➕ Cadastrar Aluno</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subHeader}>Alunos Registrados:</Text>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {students.map((item) => (
          <View key={item.id} style={styles.card}>
            {item.photo && (
              <Image source={{ uri: item.photo }} style={styles.avatar} />
            )}
            <View style={{ flex: 1 }}>
              <Text style={styles.studentName}>{item.name}</Text>
              <Text style={styles.studentInfo}>
                Matrícula: {item.registration}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeStudent(item.id)}
            >
              <Text style={styles.removeText}>Remover</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  subHeader: {
    fontSize: 18,
    marginVertical: 15,
    fontWeight: "600",
    color: "#444",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
    elevation: 3, // sombra no Android
    shadowColor: "#000", // sombra no iOS
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginRight: 12,
    backgroundColor: "#EEE",
  },
  studentName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  studentInfo: {
    fontSize: 14,
    color: "#666",
  },
  removeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: "#FF4444",
  },
  removeText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
