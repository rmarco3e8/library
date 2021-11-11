let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    if (read) {
        this.read = "✓"
    } else {
        this.read = "x"
    }
    this.id = myLibrary.length
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
            if (!book.hasOwnProperty(prop) || prop === "id") continue

            cell = document.createElement("td")

            if (prop === "read") {
                readButton = document.createElement("button")
                readButton.textContent = book[prop]
                readButton.addEventListener("click", toggleRead)
                readButton.setAttribute('book-id', book["id"])
                readButton.classList.add("read-button")


                if (book[prop] === "x") {
                    readButton.style.background = "#C85C5C"
                } else {
                    readButton.style.background = "#B2EA70"
                }

                cell.appendChild(readButton)
            }
            else {
                cell.textContent = book[prop]
            }

            newRow.append(cell)
        }

        cell = document.createElement("td")
        delButton = document.createElement("button")
        delButton.textContent = "DELETE"
        delButton.addEventListener("click", deleteBook)
        delButton.setAttribute('book-id', book["id"])
        delButton.classList.add("del-button")
        cell.appendChild(delButton)
        newRow.append(cell)

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
    let read = document.forms[0][4].checked
    let newBook = new Book(title, author, pages, read)
    addToLibrary(newBook)
    closeForm();
}

function toggleRead() {
    let id = parseInt(this.getAttribute("book-id"))

    if (this.textContent == "x") {
        this.textContent = "✓"
        myLibrary[id].read = "✓"
        this.style.background = "#B2EA70"
    }
    
    else {
        this.textContent = "x"
        myLibrary[id].read = "x"
        this.style.background = "#C85C5C"
    }
}

function deleteBook() {
    let id = parseInt(this.getAttribute("book-id"))
    let index = myLibrary.find(book => book.id === id)
    myLibrary.splice(index, 1)
    displayBooks()
}

// Example : EighthGrader.prototype = Object.create(Student.prototype)

let myBook = new Book("The Old Man and the Sea", "Ernest Hemingway", 150, false)

myLibrary.push(myBook)

displayBooks()