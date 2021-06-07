const UNCOMPLETED_LIST_BOOK_ID = 'incompleteBookshelfList';
const COMPLETED_LIST_BOOK_ID = 'completeBookshelfList';
const BOOKSHELF_ITEMID = 'itemId';

function addBookshelf() {
  const uncompletedBOOKList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);

  const bookTitle = document.getElementById('inputBookTitle').value;
  const timestamp = +new Date();
  const author = document.getElementById('inputBookAuthor').value;
  const year = document.getElementById('inputBookYear').value;
  const isComplete = document.getElementById('inputBookIsComplete').checked;
  const bookshelf = makeBookshelf(bookTitle, author, year);

  console.log(timestamp, bookTitle, author, year, isComplete);
  uncompletedBOOKList.append(bookshelf);
}

function makeBookshelf(title, author, year, isCompleted) {
  const textTitle = document.createElement('h2');
  textTitle.innerText = title;

  const textAuthor = document.createElement('p');
  textAuthor.innerText = `Penulis : ${author}`;

  const textYear = document.createElement('p');
  textYear.innerText = `Tahun : ${year}`;

  const textContainer = document.createElement('div');
  textContainer.classList.add('book_item');

  const actionButton = document.createElement('div');
  actionButton.classList.add('action');

  textContainer.append(textTitle, textAuthor, textYear, actionButton);
  actionButton.append(createCheckButton());

  // if (isCompleted) {
  //   container.append(createTrashButton());
  // } else {
  //   container.append(createCheckButton());
  // }
  return textContainer;
}

function createButton(buttonTypeClass, textButton, eventListener) {
  const button = document.createElement('button');
  button.innerText = textButton;
  button.classList.add(buttonTypeClass);
  button.addEventListener('click', function (event) {
    eventListener(event);
  });
  return button;
}

function addTaskToCompleted(taskElement) {
  const taskTitle = taskElement.querySelector(' h3').innerText;
  const taskAuthor = taskElement.querySelector('.book_item > p').innerText;
  const taskYear = taskElement.querySelector('.book_item > p').innerText;

  const newBook = makeBookshelf(taskTitle, taskAuthor, taskYear, true);
  const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
  listCompleted.append(newBook);

  taskElement.remove();
}

function createCheckButton() {
  return createButton('green', 'Selesai Dibaca', function (event) {
    addTaskToCompleted(event.target.parentElement.parentElement);
  });
}

function removeTaskFromCompleted(taskElement) {
  taskElement.remove();
}

function createTrashButton() {
  return createButton('red', 'HapusBuku', function (event) {
    removeTaskFromCompleted(event.target.parentElement.parentElement);
  });
}

function undoTaskFromCompleted(taskElement) {
  const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
  const taskTitle = taskElement.querySelector('.book_item > h3').innerText;
  const taskAuthor = taskElement.querySelector('.book_item > p').innerText;
  const taskYear = taskElement.querySelector('.book_item > p').innerText;

  const newTodo = makeTodo(taskTitle, taskTimestamp, false);

  listUncompleted.append(newTodo);
  taskElement.remove();
}
