import { Input } from '@rneui/base';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function CreateForm() {
  const [question, setQuestion] = useState('');

  const handleChange = (text: string) => {
    setQuestion(text)
  }

  const handleSave = () => {
    setQuestion(question)
  }

  return (
    <>
      <View style={s.container}>
        <View style={s.inputContainer}>
          <Input placeholder='Pergunta 1'
            value={question}
            onChangeText={handleChange}
            containerStyle={{ width: "80%", padding: 0, height: "auto", paddingTop: 10 }}
            placeholderTextColor="#ccc"
            style={s.input}
          />
          <FontAwesome style={s.icon} name='check' size={32} onPress={handleSave}/>
        </View>
      </View>
    </>
  );
}

const s = StyleSheet.create({
  input: {
    fontWeight: "500"
  },
  icon: {
    paddingTop: 16,
    paddingRight: 16,
    justifyContent: "flex-end"
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  container: {
    backgroundColor: "#FFFFFF",
    height: "auto",
    width: "100%",
    flexDirection: "column",
    padding: 16
  }
});