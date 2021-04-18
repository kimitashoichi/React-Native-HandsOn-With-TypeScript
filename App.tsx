import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
} from 'react-native';

import { Input } from "./components/Input";
import { Eet } from "./components/Eet"; 


interface AppState {
  text: string;
  id: number;
  like: boolean;
  userId: number;
  userName: string;
  createAt: any;
  isDelete: boolean;
}

type EetData = {
  text: string;
  userName: string;
}

type EditData  = {
  text: string;
  index: number;
}


export default function App() {
  const [eet, setEet] = useState<AppState[]>([]);

  const addEet = (data: EetData) => {
    const initialState: AppState[] = []
    const newEet: AppState[] = initialState.concat(eet);
    newEet.push({
      text: data.text,
      id: Date.now(),
      like: false,
      userId: 1,
      userName: data.userName,
      createAt: new Date().toLocaleString('ja-JP'),
      isDelete: false
    });
    setEet(newEet);
  }

  const onLike = (index: number) => {
    const initialState: AppState[] = [];
    const newState = initialState.concat(eet);
    newState[index].like = !newState[index].like;
    setEet(newState);
  }

  const Delete = (index: number) => {
    const initialState: AppState[] = [];
    const newState = initialState.concat(eet);
    newState[index].isDelete = !newState[index].isDelete;
    setEet(newState);
  }

  const Edit = (data: EditData) => {
    const initialState: AppState[] = []
    const newState = initialState.concat(eet);
    newState[data.index].text = data.text;
    setEet(newState);
    console.log(eet);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Input addEet={addEet}/>
        <View style={styles.content}>
          <FlatList
            data={eet}
            renderItem={({item, index}) => (
              item.isDelete ? null :
              <Eet
              text={item.text}
              like={item.like}
              index={index}
              userName={item.userName}
              createAt={item.createAt}
              onLike={() => onLike(index)}
              onDelte={() => Delete(index)}
              onEdit={Edit} />
            )}
            keyExtractor={(item) => `${item.id}`}
          />
        </View>
        <StatusBar style="light" />
      </View>
    </SafeAreaView>
  );
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

