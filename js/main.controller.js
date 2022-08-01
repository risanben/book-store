'use strict'
console.log('doc is ready:')

var gCurrBookId;


function onInit() {
    renderBooks()
    updateCurPage()
    getTableContent()
}

function renderBooks() {
    var books = getBooksForDisplay()
    var strHTMLs = books.map(book =>
        `
        <tr>
            <td>${book.id}</td>
            <td>${book.name}</td>
            <td>${book.price}</td>
            <td><button class="actions read" onclick="onReadBook('${book.id}')">read</button></td>
            <td><button class="actions update" onclick="onUpdateBook('${book.id}')">update</button></td>
            <td><button class="actions delete" onclick="onDelete('${book.id}')">delete</button></td>
        </tr>
        `
    )
    document.querySelector('.books-container').innerHTML = strHTMLs.join('')
}

function onDelete(bookId) {
    removeBook(bookId)
    renderBooks()
}

function onAddBook() {
    var name = document.querySelector('.new-book-name').value
    var price = +document.querySelector('.new-book-price').value
    if (!name || !price) return alert('please try again with book name and price')
    addBook(name, price)
    renderBooks()

    const elNewBook = document.querySelector('.new-book-input')
    elNewBook.hidden = true
}

function onUpdateBook(bookId) {
    var newPrice = +prompt('what is the updated price?')
    updateBook(bookId, newPrice)
    renderBooks()
}

function onReadBook(bookId) {
    gCurrBookId = bookId
    const book = getBookById(bookId)
    const elModal = document.querySelector('.modal')

    //elRating
    const rating = elModal.querySelector('.rating')

    //make shorter
    const bookRating = getBookRating(bookId)
    rating.innerText = bookRating

    elModal.querySelector('h3').innerText = book.name
    elModal.querySelector('p').innerText = book.description
    elModal.classList.add('open')
}

function onCloseModal() {
    document.querySelector('.modal').classList.remove('open')
    gCurrBookId = null
}

function onPlus1() {
    if (!gCurrBookId) {
        console.log('something is wring:')
    }
    updateBookRatePos()
    document.querySelector('.rating').innerText = getBookRating(gCurrBookId)
}

function onMinus1() {
    if (!gCurrBookId) {
        console.log('something is wring:')
    }
    updateBookRateNeg()
    document.querySelector('.rating').innerText = getBookRating(gCurrBookId)
}


function onSetFilterBy(filterBy) {
    filterBy = setBookFilter(filterBy)
    renderBooks()
    // getTableContent() check
                                //term
    const queryStringParams = `?name=${filterBy.name}&minRate=${filterBy.minRate}&maxPrice=${filterBy.maxPrice}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function onNextPage(){
    nextPage()
    renderBooks()
    updateCurPage()
}

function onPreviousPage(){
    previousPage()
    renderBooks()
    updateCurPage()
}

///????
function getTableContent(){
    var filters = getFilterParameters(gFilterBy)
    const elShowing = document.querySelector('.showing')
    elShowing.innerText = filters.join()
}

function onSetNewBook(obg){
console.log('obg:', obg)
}


function onCreateBook(){
    const elNewBook = document.querySelector('.new-book-input')
elNewBook.hidden = false
}