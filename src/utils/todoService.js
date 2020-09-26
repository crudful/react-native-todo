const cfAccessKey = process.env.CFACCESSKEY;

const getTasks = async () => {
  let response = await fetch('https://todo.crudful.com/tasks', {
    method: 'GET',
    headers: {cfAccessKey: cfAccessKey},
  });
  let json = await response.json();
  return json.results;
};

export {getTasks};
