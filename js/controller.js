'use strict'

var gBookOnRead

function onInit() {
    renderBooks()
}

function renderBooks() {
    const books = getBooks()
    const strHTML = books.map(book =>
        `<tr>
        <td>${book.id}</td><td>${book.title}</td><th>${book.price}$</th>
        <td class = "option read" onclick="onRead(${book.id})">Read</td><td class = "option update" onclick="onUpdate(${book.id})">Update</td>
        <td class = "option delete" onclick="onDelete(${book.id})">Delete</td>
        </tr>`
    )
    document.querySelector('tbody').innerHTML = strHTML.join('')
}
function onRead(bookId) {
    console.log(bookId)
    var book = getBookById(bookId)
    gBookOnRead = book
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h3').innerText = book.title
    elModal.querySelector('h4 span').innerText = book.price + '$'
    elModal.querySelector('p').innerText = book.text
    elModal.querySelector('.rate span').innerText = book.rate
    elModal.classList.add('open')
}
function onUpdate(bookId) {
    const newPrice = +prompt('Update price')
    updatePrice(bookId, newPrice)
    renderBooks()
}

function onDelete(bookId) {
    if(confirm('Are you sure?')){
        deleteBook(bookId)
        renderBooks()
    }
}

function onCloseModal() {
    document.querySelector('.modal').classList.remove('open')
}

function onAddBook() {
    const bookName = prompt('Book name')
    const price = +prompt('Price')
    addBook(bookName, price)
    renderBooks()
}

function onRateUp() {
    var book = gBookOnRead
    if (book.rate !== 10) {
        rateUp(book)
        document.querySelector('.rate span').innerText = book.rate
    }

}
function onRateDown() {
    var book = gBookOnRead
    if (book.rate !== 0) {
        rateDown(book)
        document.querySelector('.rate span').innerText = book.rate
    }
}


function onSetFilterBy(filterBy) {
    setFilterBy(filterBy)
    renderBooks()
}