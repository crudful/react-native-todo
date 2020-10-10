# React Native Todo

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

# `access key` should be similar to `f585826519f500fd2390363195c874d1f717fesa`
# please copy yours from `account page`
CFACCESSKEY="ACCESS_KEY_FROM_ACCOUNT_PAGE" npx react-native start

# open another terminal in `react-native-todo` directory
npx react-native run-android
```
