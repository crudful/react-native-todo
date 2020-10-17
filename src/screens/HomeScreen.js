import React, {useCallback, useState} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {List} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/AntDesign';
import {useFocusEffect} from '@react-navigation/native';
import {getTasks, updateTask, deleteTask} from '../utils/todoService';

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
        <List.Item
          title={item.title}
          left={() => (
            <CheckBox
              value={item.isCompleted}
              onValueChange={async (newValue) => {
                await updateTask(item.id, {isCompleted: newValue});
                await fetchTasks();
              }}
            />
          )}
          right={() => (
            <Icon
              name="closecircleo"
              size={28}
              color="#DC3545"
              onPress={async () => {
                await deleteTask(item.id);
                await fetchTasks();
              }}
            />
          )}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
