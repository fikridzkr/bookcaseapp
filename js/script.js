const searchBook = document.getElementById('searchBook');
const isComplete = document.getElementById('inputBookIsComplete');
const bookCondition = document.getElementById('bookCondition');

document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('inputBook');

  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addBookshelf();
  });
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener('ondatasaved', () => {
  console.log('Data berhasil disimpan.');
});

document.addEventListener('ondataloaded', () => {
  refreshDataFromBooks();
});

searchBook.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchBookTitle = document
    .getElementById('searchBookTitle')
    .value.toUpperCase();
  const bookList = document.querySelectorAll('.book_list');

  for (let i = 0; i < bookList.length; i++) {
    const bookItem = bookList[i].getElementsByClassName('book_item');
    for (let j = 0; j < bookItem.length; j++) {
      const title = bookItem[j].getElementsByTagName('h3')[0].innerText;
      if (title.toUpperCase().indexOf(searchBookTitle) > -1) {
        bookItem[j].style.display = '';
      } else {
        bookItem[j].style.display = 'none';
      }
    }
  }
});

isComplete.addEventListener('change', () => {
  if (isComplete.checked) {
    bookCondition.innerText = 'Selesai diBaca';
  } else {
    bookCondition.innerText = 'Belum selesai dibaca';
  }
});
