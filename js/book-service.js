'use script'

const STORAGE_KEY = 'booksDB'
var gBooks
var gId = 1
var gFilterBy = {
    minRate: 0,
    maxPrice: Infinity
}


_createBooks()

function setFilterBy(filterBy){
    if(filterBy.minRate !== undefined) gFilterBy.minRate = filterBy.minRate
    if(filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
}

function _createBook(title, price) {
    return {
        id: gId++,
        title,
        price,
        text: makeLorem(),
        rate: getRandomIntInclusive(0, 10)
    }
}


function _createBooks() {
    const bookList = ['Harry Potter','Best Book','The Hobbit','How to read','DA VINCI CODE']
    var books = loadFromStorage(STORAGE_KEY)
    // Nothing in storage - generate demo data
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 5; i++) {
            var txt = bookList.pop()
            var price = getRandomIntInclusive(5, 20)
            books.push(_createBook(txt, price))
        }
    }
    gBooks = books
    _saveBooksToStorage()
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function getBooks() {
    const books = gBooks.filter(book => book.price <= gFilterBy.maxPrice && +book.rate >= gFilterBy.minRate)
    return books
}

function getBookById(id) {
    return gBooks.find(book => book.id === id)
}

function getBookByName(name){
    return gBooks.find(book => book.title === name)
}

function deleteBook(id) {
    const bookIdx = gBooks.findIndex(book => id === book.id)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function updatePrice(id,newPrice) {
    const book = gBooks.find(book => book.id === id)
    book.price = newPrice
    _saveBooksToStorage()
}

function addBook(name,price) {
    const book = _createBook(name,price)
    gBooks.unshift(book)
    _saveBooksToStorage()
    
}

function rateUp(book){
    book.rate ++ 
    _saveBooksToStorage()
}

function rateDown(book){
    book.rate -- 
    _saveBooksToStorage()
}