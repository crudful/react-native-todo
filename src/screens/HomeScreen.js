import React, {useCallback, useState, useLayoutEffect} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {List, Checkbox} from 'react-native-paper';
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

  // create
  const [createTaskTitle, setCreateTaskTitle] = useState('');
  const [createTaskDialogVisible, setCreateTaskDialogVisible] = useState(false);
  const hideCreateTaskDialog = () => {
    setCreateTaskTitle('');
    setCreateTaskDialogVisible(false);
  };

  // update
  const [updateTaskId, setUpdateTaskId] = useState('');
  const [updateTaskTitle, setUpdateTaskTitle] = useState('');
  const [updateTaskDialogVisible, setUpdateTaskDialogVisible] = useState(false);
  const hideUpdateTaskDialog = () => {
    setUpdateTaskDialogVisible(false);
    setUpdateTaskTitle('');
  };

  // delete
  const [deleteTaskId, setDeleteTaskId] = useState('');
  const [deleteTaskTitle, setDeleteTaskTitle] = useState('');
  const [deleteTaskDialogVisible, setDeleteTaskDialogVisible] = useState(false);
  const hideDeleteTaskDialog = () => {
    setDeleteTaskDialogVisible(false);
    setDeleteTaskTitle('');
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
          onPress={() => setCreateTaskDialogVisible(true)}
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
        disabled={false}
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
        disabled={false}
        onSubmit={async () => {
          await updateTask(updateTaskId, {title: updateTaskTitle});
          await fetchTasks();
          hideUpdateTaskDialog();
        }}
        submitText={'Update'}
      />
      <TaskDialog
        visible={deleteTaskDialogVisible}
        onDismiss={hideDeleteTaskDialog}
        titleValue={deleteTaskTitle}
        disabled={true}
        onSubmit={async () => {
          await deleteTask(deleteTaskId);
          await fetchTasks();
          hideDeleteTaskDialog();
        }}
        submitText={'Delete'}
      />
      <FlatList
        data={tasks}
        keyExtractor={(task) => task.id}
        renderItem={({item}) => (
          <List.Item
            title={item.title}
            left={() => (
              <Checkbox.Android
                status={item.isCompleted ? 'checked' : 'unchecked'}
                onPress={async () => {
                  await updateTask(item.id, {isCompleted: !item.isCompleted});
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
                    setDeleteTaskId(item.id);
                    setDeleteTaskTitle(item.title);
                    setDeleteTaskDialogVisible(true);
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
