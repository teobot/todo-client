const randomTodoItems = [
  "buy milk",
  "buy eggs",
  "buy bread",
  "buy cheese",
  "buy milk",
  "buy eggs",
  "buy bread",
  "buy cheese",
  "buy peas",
  "remember to do that thing",
];

function generateRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateItems() {
  let items = [];
  for (let i = 0; i < generateRandomNumberBetween(55, 100); i++) {
    items[i] = createDateItem();
  }
  return items;
}

function createDateItem() {
  let todo = [];
  for (
    let i = 0;
    i < generateRandomNumberBetween(1, randomTodoItems.length - 1);
    i++
  ) {
    todo[i] = createTodo();
  }
  return {
    id: randomString(),
    date: randomDate(),
    todos: todo,
  };
}

function createTodo() {
  return {
    _id: randomString(),
    text: randomTodoText(),
    completed: false,
  };
}

function randomTodoText() {
  // min and max included
  return randomTodoItems[
    generateRandomNumberBetween(0, randomTodoItems.length - 1)
  ];
}

// function that returns a random string that is 6 characters long
function randomString() {
  return Math.random().toString(12).substring(2, 20);
}

// function that returns a random date in the format of YYYY-MM-DD
function randomDate() {
  const year = generateRandomNumberBetween(2020, 2021);
  const month = generateRandomNumberBetween(1, 12);
  const day = generateRandomNumberBetween(1, 28);
  return new Date(year, month, day);
}

export const data = {
  _id: randomString(),
  items: generateItems(),
};
