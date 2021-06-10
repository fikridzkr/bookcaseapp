const UNCOMPLETED_LIST_BOOK_ID = 'incompleteBookshelfList';
const COMPLETED_LIST_BOOK_ID = 'completeBookshelfList';
const BOOK_ITEMID = 'itemId';

function addBookshelf() {
  const uncompletedBookList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
  const completedBookList = document.getElementById(COMPLETED_LIST_BOOK_ID);

  const bookTitle = document.getElementById('inputBookTitle').value;
  const author = document.getElementById('inputBookAuthor').value;
  const year = document.getElementById('inputBookYear').value;
  const isComplete = document.getElementById('inputBookIsComplete');
  const bookshelf = makeBookshelf(bookTitle, author, year, isComplete.checked);

  const bookObject = composeBookObject(
    bookTitle,
    author,
    year,
    isComplete.checked,
  );

  bookshelf[BOOK_ITEMID] = bookObject.id;
  books.push(bookObject);

  if (isComplete.checked) {
    completedBookList.append(bookshelf);
  } else {
    uncompletedBookList.append(bookshelf);
  }
  updateDataToStorage();
}

function makeBookshelf(title, author, year, isCompleted) {
  const textTitle = document.createElement('h3');
  textTitle.innerText = title;

  const textAuthor = document.createElement('p');
  textAuthor.innerHTML = `Penulis: <span id="author">${author}</span>`;

  const textYear = document.createElement('p');
  textYear.innerHTML = `Tahun: <span id="year">${year}</span>`;

  const textContainer = document.createElement('div');
  textContainer.classList.add('book_item');

  const actionButton = document.createElement('div');
  actionButton.classList.add('action');

  if (isCompleted) {
    actionButton.append(createUndoButton(), createTrashButton());
  } else {
    actionButton.append(createCheckButton(), createTrashButton());
  }
  textContainer.append(textTitle, textAuthor, textYear, actionButton);
  return textContainer;
}

function createButton(buttonTypeClass, textButton, eventListener) {
  const button = document.createElement('button');
  button.classList.add(buttonTypeClass);
  button.innerText = textButton;
  button.addEventListener('click', function (event) {
    eventListener(event);
  });
  return button;
}

function addBookToCompleted(bookElement) {
  const bookTitle = bookElement.querySelector('h3').innerText;
  const bookAuthor = bookElement.querySelector('span#author').innerText;
  const bookYear = bookElement.querySelector('span#year').innerText;

  const newBook = makeBookshelf(bookTitle, bookAuthor, bookYear, true);
  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isCompleted = true;
  newBook[BOOK_ITEMID] = book.id;
  const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
  listCompleted.append(newBook);

  bookElement.remove();
  updateDataToStorage();
}

function createCheckButton() {
  return createButton('green', 'Selesai Dibaca', function (event) {
    addBookToCompleted(event.target.parentElement.parentElement);
  });
}

function removeBookFromCompleted(bookElement) {
  const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
  books.splice(bookPosition, 1);

  bookElement.remove();
  updateDataToStorage();
}

function createTrashButton() {
  return createButton('red', 'Hapus Buku', function (event) {
    removeBookFromCompleted(event.target.parentElement.parentElement);
  });
}

function undoBookFromCompleted(bookElement) {
  const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
  const bookTitle = bookElement.querySelector('h3').innerText;
  const bookAuthor = bookElement.querySelector('span#author').innerText;
  const bookYear = bookElement.querySelector('span#year').innerText;

  const newBook = makeBookshelf(bookTitle, bookAuthor, bookYear, false);
  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isCompleted = false;
  newBook[BOOK_ITEMID] = book.id;
  listUncompleted.append(newBook);
  bookElement.remove();
  updateDataToStorage();
}

function createUndoButton() {
  return createButton('green', 'Belum Selesai di Baca', function (event) {
    undoBookFromCompleted(event.target.parentElement.parentElement);
  });
}
