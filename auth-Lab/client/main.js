window.onload = function () {
  fetchBooks();
  document.getElementById('submit').onclick = saveBook;
}



async function fetchBooks() {
  const response = await fetch('http://localhost:3000/books');
  const books = await response.json();

  let html = `
  <table id="book-table">
  <tr>
    <th>Id</th>
    <th>Title</th>
    <th>ISBN</th>
    <th>Author</th>
    <th>Published_Date</th>
    <th>Actions</th>
  </tr>
  `;

  books.forEach(book => {

      html += `
          <tr id="${book._id}">
              <td>${book._id}</td>
              <td id="title-${book._id}">${book.title}</td>
              <td id="isbn-${book._id}">${book.isbn}</td>
              <td id="author-${book._id}">${book.author}</td>
              <td id="publishedDate-${book._id}">${book.publishedDate}</td>
              <td>
                  <button onclick="editById('${book._id}');">Edit</button>
                  <button onclick="deleteById('${book._id}');">Delete</button>
              </td>
      </tr>
      `
  });
  html += '</table>';
  document.getElementById('books').innerHTML = html;
}

async function saveBook(evt) {
  evt.preventDefault();

  const response = await fetch('http://localhost:3000/books', {
      method: 'POST',
      body: JSON.stringify({
          title: document.getElementById('title').value,
          isbn: document.getElementById('isbn').value,
          author: document.getElementById('author').value,
          publishedDate: document.getElementById('publishedDate').value
      }),
      headers: {
          'Content-Type': 'application/json'
      }
  });
  const book = await response.json();
  console.log(book);
  const html = `
      <tr id="${book._id}">
      <td>${book._id}</td>
      <td id="title-${book._id}">${book.title}</td>
      <td id="isbn-${book._id}">${book.isbn}</td>
      <td id="author-${book._id}">${book.author}</td>
      <td id="publisheddDate-${book._id}">${book.publisheddDate}</td>
      <td>
          <button onclick="editById('${book._id}');">Edit</button>
          <button onclick="deleteById('${book._id}');">Delete</button>
      </td>
  </tr>
  `;

  document.getElementById('book-table').innerHTML += html;
  document.getElementById('book-add-form').reset();



}


async function deleteById(id) {
  const response = await fetch(`http://localhost:3000/books/${id}`, {
      method: 'DELETE'
  });
  // await response.json();
  document.getElementById(id).remove();
}

async function editById(id) {
  document.getElementById('book-add-form').style.display = 'none';
  const response = await fetch(`http://localhost:3000/books/${id}`);
  const book = await response.json();
  console.log(book);

  let html = `
      <div id="book-edit-form">
          <h1>Edit Product</h1>
          <p>Title: <input id="title2" name="title" value="${book.title}" /></p>
          <p>ISBN: <input id="isbn2" name="isbn" value="${book.isbn}" /></p>
          <p>Author: <input id="author2" name="author" value="${book.author}" /></p>
          <p>Puhlished Date: <input id="publishedDate2" name="publishedDate2"  value="${book.pushlisedDate}" /></p>
          <button id="submit" onclick="updateBook('${book._id}')">Submit</button>
      </div> 
  `;
  document.getElementById('edit').innerHTML = html;
}

async function updateBook(id) {
  
  const title = document.getElementById('title2').value;
  const isbn = document.getElementById('isbn2').value;
  const author = document.getElementById('author2').value;
  const publishedDate = document.getElementById('publishedDate2').value;
  const response = await fetch(`http://localhost:3000/books/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
          title,
          isbn,
          author,
          publishedDate
      }),
      headers: {
          'Content-Type': 'application/json'
      }
  });
  // await response.json();
  document.getElementById(`title-${id}`).innerHTML = title;
  document.getElementById(`isbn-${id}`).innerHTML = isbn;
  document.getElementById(`author-${id}`).innerHTML = author;
  document.getElementById(`publishedDate-${id}`).innerHTML = publishedDate;


  document.getElementById('book-add-form').style.display = 'block';
  document.getElementById('book-edit-form').style.display = 'none';
}