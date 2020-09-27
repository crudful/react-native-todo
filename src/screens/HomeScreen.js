import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, FlatList, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useFocusEffect} from '@react-navigation/native';
import {getTasks, updateTask} from '../utils/todoService';

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    setTasks(await getTasks());
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, []),
  );

  return (
    <FlatList
      data={tasks}
      keyExtractor={(task) => task.id}
      renderItem={({item}) => (
        <View style={styles.containerViewStyle}>
          <CheckBox
            value={item.isCompleted}
            onValueChange={async (newValue) => {
              await updateTask(item.id, {isCompleted: newValue});
              await fetchTasks();
            }}
          />
          <Text style={styles.textStyle}>{item.title}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  containerViewStyle: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 16,
  },
  textStyle: {
    fontSize: 24,
  },
});

export default HomeScreen;
