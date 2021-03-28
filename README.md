# React Native Todo

<img src="https://www.crudful.com/screenshots/react-native-todo-2.png" width="240" /> <img src="https://www.crudful.com/screenshots/react-native-todo-3.png" width="240" /> <img src="https://www.crudful.com/screenshots/react-native-todo-4.png" width="240" />

## Design decisions

- Use React Native CLI instead of Expo CLI
- Use npm instead of Yarn
- Use Prettier as code formatter
- Keep dependencies at minimum

## How to run?

Before running the following commands please sign in and load sample data from [here](https://www.crudful.com/services/todo/explorer).

```bash
git clone https://github.com/crudful/react-native-todo.git
cd react-native-todo/

npm install

# Set `cfAccessKey` in `src/utils/todoService.js`
npx react-native start --reset-cache

# open another terminal in `react-native-todo` directory
npx react-native run-android
```
