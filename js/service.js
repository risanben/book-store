'use strict '
var gBooks
const PAGE_SIZE = 5
var gPageIdx = 0
_createBooks()

var gFilterBy = {
    maxPrice: 200,
    minRate: 0,
    name: ''
}

function getBooksForDisplay() {
    // if (gFilterBy.name === '' && gFilterBy.maxPrice === 200 && gFilterBy.minRate === 0) return gBooks

    if (!gFilterBy.name) {
        var books = gBooks.filter(book => book.rate >= gFilterBy.minRate &&
            book.price <= gFilterBy.maxPrice)
    } else {
        books = gBooks.filter(book => book.rate >= gFilterBy.minRate &&
            book.price <= gFilterBy.maxPrice && book.name === gFilterBy.name)
    }

    const startIdx = gPageIdx * PAGE_SIZE
    books = books.slice(startIdx, startIdx + PAGE_SIZE)

    return books
}

function _createBooks() {

    var books = loadFromStorage('bookDB')
    if (!books || !books.length) {
        books = [
            _createBook('travel guide', getRandomIntInclusive(1, 200)),
            _createBook('CSS study guide', getRandomIntInclusive(1, 200)),
            _createBook('cooking book', getRandomIntInclusive(1, 200)),
            _createBook('design book', getRandomIntInclusive(1, 200)),
            _createBook('nyc book', getRandomIntInclusive(1, 200)),
            _createBook('winnie the pooh', getRandomIntInclusive(1, 200)),
            _createBook('harry potter', getRandomIntInclusive(1, 200)),
            _createBook('lions king', getRandomIntInclusive(1, 200)),
            _createBook('lady and the trup', getRandomIntInclusive(1, 200)),
            _createBook('the jungle book', getRandomIntInclusive(1, 200)),
            _createBook('pocahontas', getRandomIntInclusive(1, 200)),
            _createBook('beauty and the beast', getRandomIntInclusive(1, 200)),
            _createBook('dumbo', getRandomIntInclusive(1, 200)),
            _createBook('pinoccio', getRandomIntInclusive(1, 200))
        ]
    }

    gBooks = books
    _saveBooksToStorage()
}

function _createBook(name, price) {
    const book = {
        id: makeId(),
        name: name,
        price: price,
        rate: 0,
        description: makeLorem()
    }
    return book
}

function _saveBooksToStorage() {
    saveToStorage('bookDB', gBooks)
}


function removeBook(bookId) {
    const idx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idx, 1)
    _saveBooksToStorage()
}

function addBook(name, price) {
    var newBook = _createBook(name, price)
    gBooks.unshift(newBook)
    _saveBooksToStorage()

}

function updateBook(bookId, price) {
    const idx = gBooks.findIndex(book => book.id === bookId)
    gBooks[idx].price = price
    _saveBooksToStorage()

}

function getBookById(bookId) {
    const book = gBooks.find(book => bookId === book.id)
    return book
}

function getBookRating(bookId) {
    const idx = gBooks.findIndex(book => book.id === bookId)
    const rating = gBooks[idx].rate
    return rating
}

function updateBookRatePos() {
    const book = getBookById(gCurrBookId)
    if (book.rate >= 10) return
    book.rate++
    _saveBooksToStorage

}

function updateBookRateNeg() {
    const book = getBookById(gCurrBookId)
    if (book.rate <= 0) return
    book.rate--
    _saveBooksToStorage
}

function setBookFilter(filterBy = {}) {
    if (filterBy.minRate !== undefined) gFilterBy.minRate = parseInt(filterBy.minRate)
    if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = parseInt(filterBy.maxPrice)
    if (filterBy.name !== undefined) gFilterBy.name = filterBy.name
    return gFilterBy
}

function nextPage() {
    if (gPageIdx * PAGE_SIZE + PAGE_SIZE >= gBooks.length) {
        return
    }
    gPageIdx++
}

function previousPage() {
    if (gPageIdx * PAGE_SIZE <= 0) {
        return
    }
    gPageIdx--
}

function updateCurPage() {
    const elCurPage = document.querySelector('.current-page')
    elCurPage.innerText = gPageIdx + 1
}

function getFilterParameters(gFilterBy) {
    var res = []

    if (gFilterBy.name) {
        res.push('by name : ' + gFilterBy.name + ' ')
    }
    if (gFilterBy.minRate !== 0) {
        res.push('by minimum rate of ' + gFilterBy.minRate+ ' ')
    }
    if (gFilterBy.maxPrice !== 200) {
        res.push('by maximum price of ' + gFilterBy.maxPrice+ ' ')
    }


    if (!res.length) return ['All']
    return res
}