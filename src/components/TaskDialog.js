import React from 'react';
import {Button, Dialog, Portal, TextInput} from 'react-native-paper';

const TaskDialog = ({
  visible,
  onDismiss,
  titleValue,
  onTitleChange,
  disabled,
  onSubmit,
  submitText,
}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{submitText} Task</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Title"
            value={titleValue}
            onChangeText={onTitleChange}
            disabled={disabled}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={onSubmit}>{submitText}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default TaskDialog;
