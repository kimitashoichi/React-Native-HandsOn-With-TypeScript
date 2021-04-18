import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type EetData = {
  text: string;
  userName: string;
}

interface InputProps {
  setText?: React.Dispatch<React.SetStateAction<string>>;
  addEet: (text: EetData) => void;
}

let initialState: EetData = {
  text: "",
  userName: ""
} 

export function Input(props: InputProps) {
  const [data, setData] = useState<EetData>(initialState);

  const onPress = () => {
    props.addEet(data);
    setData(initialState);
  }

  const handleText = (text: string) => {
    setData({
      text: text,
      userName: "kimita"
    })
  }

  return (
    <View style={styles.inputContainer}>
    <TextInput style={styles.input} onChangeText={(_text)=> handleText(_text)} value={data.text} />
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>イートする</Text>
    </TouchableOpacity>
  </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    borderColor: "rgb(29, 161, 242)",
    borderWidth: 2,
    borderRadius: 10,
    color: "white",
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "rgb(29, 161, 242)",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "900",
    fontSize: 16,
  },
});
