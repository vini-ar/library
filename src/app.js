const tableBody = document.querySelector("tbody")
const addBookButton = document.querySelector(".addBook-btn")
const addBookForm = document.querySelector(".addBook-form")
const bookTitleInput = document.querySelector("#book-title")
const bookAuthorInput = document.querySelector("#book-author")
const bookPagesInput = document.querySelector("#book-pages")
const bookStatusSelect = document.querySelector("#book-status") 


let myLibrary = [];


addBookButton.addEventListener("click", () => {
        addBookForm.classList.remove("hide")
})

function Book(title, author, pages, status) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.status = status;
}






const Library = {

    update: function displayLibrary(book) {
        let tableRow = ElementFactory.tr("", {class: "table-book-row"})

        for(const[key, value] of Object.entries(book)) {
            let td;
            if (key === "status") {
                td = ElementFactory.td(value + " ", {class: `table-data-${key}`});
                let changeStatusButton = ElementFactory.button("Update");

                changeStatusButton.addEventListener("click", function(e) {
                    e.preventDefault();
                    changeStatusButton.onclick = updateStatusBook(book, this)   
                })

                td.appendChild(changeStatusButton)
            } else {
                td = ElementFactory.td(value, "");
            }
            tableRow.appendChild(td)
        }

        let tdForButton = ElementFactory.td("Remove")
        let removeBookButton = ElementFactory.button("Remove");
        
        removeBookButton.addEventListener("click", function(e) {
            e.preventDefault();
            removeBookButton.onclick = removeBook(book, this)
        })

        tdForButton.appendChild(removeBookButton)
        tableRow.appendChild(tdForButton)
    
        tableBody.appendChild(tableRow)
    }
}



function removeBook(book, button) {
    myLibrary = myLibrary.filter(function(item) {
        return item !== book
    })
    
    let parentTableRow = button.parentElement.parentElement;
    parentTableRow.remove()
}


function updateStatusBook(book, button) {
    if (book.status === "Already Read") {
        book.status = "Not Read"
    } 
    else {
        book.status = "Already Read"
    }

    let tableRow = button.parentElement.parentElement
    let targetTableData = tableRow.querySelector(".table-data-status")
    
    targetTableData.textContent = book.status + " ";
    targetTableData.appendChild(button)

    console.log(button)
}

const ElementFactory = {
    td: function(content = "", attributes = {}) {
        const td = document.createElement("td");
        td.textContent = content;
        
        for (const [key, value] of Object.entries(attributes)) {
            td.setAttribute(key, value);
        }
        return td
    },
    button: function(content = "") {
        const button = document.createElement("button")

        button.textContent = content;

        return button;
    },
    tr: function(content="", attributes = {}) {
        const tr = document.createElement("tr")
        tr.textContent = content

        for(const[key, value] of Object.entries(attributes)) {
            tr.setAttribute(key,value);
        }
        
        return tr
        }
    }




function addBookToLibrary() {
    let title = bookTitleInput.value;
    let author = bookAuthorInput.value
    let pages = bookPagesInput.value;
    let status = bookStatusSelect.value;

    const newBook = new Book(title, author, pages, status)

    myLibrary.push(newBook)


    Library.update(newBook);
}

