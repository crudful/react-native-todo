// Please get access key from `https://www.crudful.com/account`
// It should be similar to `f585826519f500fd2390363195c874d1f717fesa`
const cfAccessKey = 'access-key-from-crudful-com';

const createTask = async (data) => {
  try {
    let response = await fetch(`https://todo.crudful.com/tasks`, {
      method: 'POST',
      headers: {cfAccessKey: cfAccessKey, 'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    });
    let task = await response.json();
    return task;
  } catch (error) {
    console.error(error);
  }
};

const getTasks = async () => {
  try {
    let response = await fetch('https://todo.crudful.com/tasks', {
      method: 'GET',
      headers: {cfAccessKey: cfAccessKey},
    });
    let json = await response.json();
    return json.results;
  } catch (error) {
    console.error(error);
  }
};

const updateTask = async (id, data) => {
  try {
    let response = await fetch(`https://todo.crudful.com/tasks/${id}`, {
      method: 'PATCH',
      headers: {cfAccessKey: cfAccessKey, 'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    });
    let task = await response.json();
    return task;
  } catch (error) {
    console.error(error);
  }
};

const deleteTask = async (id) => {
  try {
    await fetch(`https://todo.crudful.com/tasks/${id}`, {
      method: 'DELETE',
      headers: {cfAccessKey: cfAccessKey, 'Content-Type': 'application/json'},
    });
  } catch (error) {
    console.error(error);
  }
};

export {createTask, getTasks, updateTask, deleteTask};
