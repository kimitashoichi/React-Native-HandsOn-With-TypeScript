import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";


interface AppState {
  text: string;
  id: number;
  like: boolean;
}

export default function App() {
  const [eet, setEet] = useState<AppState[]>([]);
  const addEet = (text: string) => {
    const initialState: AppState[] = []
    const newEet: AppState[] = initialState.concat(eet);
    newEet.push({
      text: text,
      id: Date.now(),
      like: false,
    });
    setEet(newEet);
  }
  const onLike = (index: number) => {
    const initialState: AppState[] = [];
    const newState = initialState.concat(eet);
    newState[index].like = !newState[index].like;
    setEet(newState);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Input addEet={addEet}/>
        <View style={styles.content}>
          <FlatList
            data={eet}
            renderItem={({item, index}) => 
            <Eet
              text={item.text}
              like={item.like}
              onLike={() => onLike(index)} />}
            keyExtractor={(item) => `${item.id}`}
          />
        </View>
        <StatusBar style="light" />
      </View>
    </SafeAreaView>
  );
}

interface InputProps {
  setText?: React.Dispatch<React.SetStateAction<string>>;
  addEet: (text: string) => void;
}

export function Input(props: InputProps) {
  const [text, setText] = useState("");
  const onPress = () => {
    props.addEet(text);
    setText("");
  }

  return (
    <View style={styles.inputContainer}>
    <TextInput style={styles.input} onChangeText={(_text)=> setText(_text)} value={text} />
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>イートする</Text>
    </TouchableOpacity>
  </View>
  )
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#222',
  },
  container: {
    flex: 1,
    paddingTop: 20,
  },
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
  content: {
    padding: 20,
  },
  contentText: {
    color: "white",
    fontSize: 22,
  },
});



interface EetProps {
  text: string;
  like: boolean;
  onLike: any;
}

export function Eet(props: EetProps) {
  const {
    text,
    like,
    onLike
  } = props;

  return (
    <View style={eetStyle.container}>
      <Text style={eetStyle.text}>{text}</Text>
      <View style={eetStyle.actionContainer}>
        <TouchableOpacity onPress={onLike}>
          {like ?
            <Ionicons name="heart-circle-sharp" size={22} color="rgb(252, 108, 133)" />
            :
            <Ionicons name="ios-heart-circle-outline" size={22} color="#aaa" />
          }
        </TouchableOpacity>
      </View>
    </View>
  )
}

const eetStyle = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: 'rgb(29, 161, 242)',
    marginBottom: 10,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  actionContainer: {
    borderTopWidth: 1,
    borderTopColor: '#aaa',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingTop: 5,
    marginTop: 20,
  },
})