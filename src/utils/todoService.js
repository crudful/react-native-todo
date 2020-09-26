const cfAccessKey = process.env.CFACCESSKEY;

const getTasks = async () => {
  let response = await fetch('https://todo.crudful.com/tasks', {
    method: 'GET',
    headers: {cfAccessKey: cfAccessKey},
  });
  let json = await response.json();
  return json.results;
};

const updateTask = async (id, data) => {
  let response = await fetch(`https://todo.crudful.com/tasks/${id}`, {
    method: 'PATCH',
    headers: {cfAccessKey: cfAccessKey, 'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });
  let task = await response.json();
  return task;
};

export {getTasks, updateTask};
