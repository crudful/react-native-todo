import React, {useCallback, useState, useLayoutEffect} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {List} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/AntDesign';
import {useFocusEffect} from '@react-navigation/native';
import TaskDialog from '../components/TaskDialog';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from '../utils/todoService';

const HomeScreen = ({navigation}) => {
  const [tasks, setTasks] = useState([]);
  const [createTaskTitle, setCreateTaskTitle] = useState('');
  const [updateTaskId, setUpdateTaskId] = useState('');
  const [updateTaskTitle, setUpdateTaskTitle] = useState('');
  const [createTaskDialogVisible, setCreateTaskDialogVisible] = useState(false);
  const [updateTaskDialogVisible, setUpdateTaskDialogVisible] = useState(false);

  const showCreateTaskDialog = () => setCreateTaskDialogVisible(true);
  const hideCreateTaskDialog = () => {
    setCreateTaskDialogVisible(false);
    setCreateTaskTitle('');
  };

  const hideUpdateTaskDialog = () => {
    setUpdateTaskDialogVisible(false);
    setUpdateTaskTitle('');
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
          style={styles.createIconStyle}
          onPress={showCreateTaskDialog}
        />
      ),
    });
  }, [navigation]);

  return (
    <>
      <TaskDialog
        visible={createTaskDialogVisible}
        onDismiss={hideCreateTaskDialog}
        titleValue={createTaskTitle}
        onTitleChange={(title) => setCreateTaskTitle(title)}
        onSubmit={async () => {
          await createTask({title: createTaskTitle});
          await fetchTasks();
          hideCreateTaskDialog();
        }}
        submitText={'Create'}
      />
      <TaskDialog
        visible={updateTaskDialogVisible}
        onDismiss={hideUpdateTaskDialog}
        titleValue={updateTaskTitle}
        onTitleChange={(title) => setUpdateTaskTitle(title)}
        onSubmit={async () => {
          await updateTask(updateTaskId, {title: updateTaskTitle});
          await fetchTasks();
          hideUpdateTaskDialog();
        }}
        submitText={'Update'}
      />
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
              <>
                <Icon
                  name="edit"
                  size={28}
                  color="#17A2B8"
                  style={styles.updateIconStyle}
                  onPress={async () => {
                    setUpdateTaskId(item.id);
                    setUpdateTaskTitle(item.title);
                    setUpdateTaskDialogVisible(true);
                  }}
                />
                <Icon
                  name="closecircleo"
                  size={28}
                  color="#DC3545"
                  onPress={async () => {
                    await deleteTask(item.id);
                    await fetchTasks();
                  }}
                />
              </>
            )}
          />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  createIconStyle: {
    marginRight: 9,
  },
  updateIconStyle: {
    marginRight: 9,
  },
});

export default HomeScreen;
