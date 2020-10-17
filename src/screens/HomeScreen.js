import React, {useCallback, useState, useLayoutEffect} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {List, Button, Dialog, Portal, TextInput} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/AntDesign';
import {useFocusEffect} from '@react-navigation/native';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from '../utils/todoService';

const HomeScreen = ({navigation}) => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [addTaskDialogVisible, setAddTaskDialogVisible] = useState(false);

  const showAddTaskDialog = () => setAddTaskDialogVisible(true);
  const hideAddTaskDialog = () => {
    setAddTaskDialogVisible(false);
    setTaskTitle('');
  };

  const fetchTasks = async () => {
    setTasks(await getTasks());
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, []),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="pluscircleo"
          size={28}
          style={styles.addIconStyle}
          onPress={showAddTaskDialog}
        />
      ),
    });
  }, [navigation]);

  return (
    <>
      <Portal>
        <Dialog visible={addTaskDialogVisible} onDismiss={hideAddTaskDialog}>
          <Dialog.Title>Add Task</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Title"
              value={taskTitle}
              onChangeText={(title) => setTaskTitle(title)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideAddTaskDialog}>Cancel</Button>
            <Button
              onPress={async () => {
                await createTask({title: taskTitle});
                await fetchTasks();
                hideAddTaskDialog();
              }}>
              Add
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
    </>
  );
};

const styles = StyleSheet.create({
  addIconStyle: {
    marginRight: 9,
  },
});

export default HomeScreen;
