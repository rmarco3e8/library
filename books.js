let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.info = function () {
    response = `${this.title} by ${this.author}, ${this.pages} pages, `
    
    if (this.read) {
        response += "already read"
    } else {
        response += "not read yet"
    }

    return response
}

function addToLibrary(newBook) {
    myLibrary.push(newBook)
    displayBooks()
}

function displayBooks() {
    let bookTableBody = document.querySelector("tbody")
    bookTableBody.innerHTML = ""

    myLibrary.forEach(book => {
        let newRow = document.createElement("tr")

        for (prop in book) {
            if (!book.hasOwnProperty(prop)) continue
            cell = document.createElement("td")
            cell.textContent = book[prop]
            newRow.appendChild(cell)
        }

        bookTableBody.appendChild(newRow)
    })
}

function openForm() {
    let newBookForm = document.querySelector(".newBookForm")
    newBookForm.classList.remove("closed");
}

function closeForm() {
    let newBookForm = document.querySelector(".newBookForm")
    newBookForm.reset()
    newBookForm.classList.add("closed");
}

function submitBook(e) {
    console.log(e)
    let title = document.forms[0][1].value
    let author = document.forms[0][2].value
    let pages = document.forms[0][3].value
    let read = document.forms[0][4].value
    let newBook = new Book(title, author, pages, read)
    addToLibrary(newBook)
    closeForm();
}


// Example : EighthGrader.prototype = Object.create(Student.prototype)

let myBook = new Book("The Old Man and the Sea", "Ernest Hemingway", 150, false)

myLibrary.push(myBook)

displayBooks()