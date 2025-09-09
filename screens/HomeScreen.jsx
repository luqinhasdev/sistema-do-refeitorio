import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, TouchableOpacity } from "react-native";

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
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
        Sistema de Cantina
      </Text>

      <Button
        title="Bater Facial"
        onPress={() => navigation.navigate("CameraScreen")}
      />

      <View style={{ marginTop: 20 }}>
        <Button
          title="Cadastrar Aluno"
          onPress={() => navigation.navigate("RegisterStudent")}
        />
      </View>

      <View style={{ marginTop: 20, flex: 1 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          Alunos Registrados:
        </Text>
        {students.map((item) => (
          <View
            key={item.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
              padding: 10,
              borderWidth: 1,
              borderRadius: 8,
            }}
          >
            {item.photo && (
              <Image
                source={{ uri: item.photo }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  marginRight: 10,
                }}
              />
            )}
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16 }}>{item.name}</Text>
              <Text style={{ color: "gray" }}>
                Matrícula: {item.registration}
              </Text>
            </View>
            <TouchableOpacity onPress={() => removeStudent(item.id)}>
              <Text style={{ color: "red" }}>Remover</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}
