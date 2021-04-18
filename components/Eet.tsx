import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";

interface EetProps {
  text: string;
  like: boolean;
  onLike: any;
  userId?: number;
  userName: string;
  createAt: any;
  onDelte: any;
  onEdit: any;
  index: number;
}

type EditData  = {
  text: string;
  index: number;
}

export function Eet(props: EetProps) {
  const {
    text,
    like,
    onLike,
    userId,
    userName,
    createAt,
    onDelte,
    onEdit,
    index
  } = props;

  const [eet, setEet] = useState(text);

  const onPress = () => {
    let data: EditData = {
      text: eet,
      index: index
    } 
    onEdit(data);
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.text} value={eet} onChangeText={(_value) => setEet(_value)}/>
      <Text style={styles.dayText}>{createAt}</Text>
      <View style={styles.actionContainer}>
        <Text style={styles.userName}>UserName: {userName}</Text>
        <View>
          <TouchableOpacity onPress={onLike}>
            {like ?
              <Ionicons name="heart-circle-sharp" size={22} color="rgb(252, 108, 133)" />
              :
              <Ionicons name="ios-heart-circle-outline" size={22} color="#aaa" />
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelte}>
            <Text style={styles.text}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.text}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
  dayText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'right'
  },
  userName: {
    color: 'white',
    fontSize: 16,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  actionContainer: {
    borderTopWidth: 1,
    borderTopColor: '#aaa',
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    marginTop: 20,
  },
})
