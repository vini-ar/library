
(function() {
    let Library = {
        bookList: [],
        init: function() {
            this.cacheDom();
            this.setButtonToToggleForm();
            this.setButtonToUpdateLibrary();
        },
        updateLibrary: function() {
            const book = this.getUserInput();
            this.updateBookList(book);
            this.displayNewData(book);
            console.log(this.bookList)
        },
        cacheDom: function() {
            this.showFormButton = document.querySelector("#showForm-btn")
            this.form = document.querySelector(".addBook-form")
            this.tbody = document.querySelector("tbody")
            this.inputBookTitle = document.querySelector("#book-title")
            this.inputBookAuthor = document.querySelector("#book-author");
            this.inputBookPages = document.querySelector("#book-pages")
            this.selectBookStatus = document.querySelector("#book-status")
            this.addBookButton = document.querySelector("#addBook-btn")
        },
        setButtonToToggleForm: function() {
            const showFormButton = this.showFormButton
            const form = this.form

            showFormButton.addEventListener("click", () => {
                if (form.classList.contains("hide")) {
                    showFormButton.textContent = "Hide Form"
                    form.classList.remove("hide")
                }
                else {
                    showFormButton.textContent = "Show Form"
                    form.classList.add("hide")
                }
            })
        },
        setButtonToUpdateLibrary: function() {
            const addBookButton = this.addBookButton

            addBookButton.addEventListener('click', () => {
                this.updateLibrary();
            })

        },
        getUserInput: function() {
            const title = this.inputBookTitle.value;
            const author = this.inputBookAuthor.value;
            const pages = this.inputBookPages.value;
            const status = this.selectBookStatus.value;

            return {
                title: title,
                author: author,
                pages: pages,
                status: status
            }
        },
        updateBookList: function(book) {
            this.bookList.push(book)
        },

        createTableCell: function(content="", attributes={}) {
            let td = document.createElement("td")
            td.textContent = content;

            for(const[key,value] of Object.entries(attributes)) {
                td.setAttribute(key, value)
            }

            return td;
        },
        createTableRow: function(content="", attributes={}) {
            let tr = document.createElement("tr");
            tr.textContent = content;

            for(const[key,value] of Object.entries(attributes)) {
                tr.setAttribute(key, value)
            }

            return tr
        },
        createButton: function(content="", attributes={}) {
            let button = document.createElement("button")
            button.textContent = content;

            for(const [key, value] of Object.entries(attributes)) {
                button.setAttribute(key, value);
            }

            return button
        },        
        updateBookStatus: function(book, changeStatusButton, removeBookButton) {
            if (book.status === "Read") {
                book.status = "Not Read"
            } 
            else {
                book.status = "Read"
            }
        
            let tableRow = changeStatusButton.parentElement.parentElement
            let targetTableData = tableRow.querySelector(".table-data-status")
            
            targetTableData.textContent = book.status;
            targetTableData.appendChild(changeStatusButton)
            targetTableData.appendChild(removeBookButton)
        
        },
        displayNewData: function(book) {
            let tr = this.createTableRow("", { class: "book-table-row" });
        
            tr.appendChild(this.createTableCell(book.title, { class: "table-data-title" }));
            tr.appendChild(this.createTableCell(book.author, { class: "table-data-author" }));
            tr.appendChild(this.createTableCell(book.pages, { class: "table-data-pages" }));
        
            const statusCell = this.createTableCell(book.status, { class: "table-data-status" });
            const changeStatusButton = this.createButton("Change Status", { class: "change-status-btn" });
            

            const removeBookButton = this.createButton("Remove Book", { class: "remove-book-btn" })
            removeBookButton.addEventListener('click', (e) => {
                e.preventDefault(removeBookButton);
                const targetTableRow = removeBookButton.closest("tr")
                targetTableRow.remove();
                this.bookList = this.bookList.filter(function(item){
                    return item != book
                })

            })

            changeStatusButton.addEventListener("click", (e) => {
                e.preventDefault();
                this.updateBookStatus(book, changeStatusButton, removeBookButton);
            });
            
            statusCell.appendChild(changeStatusButton);
            statusCell.appendChild(removeBookButton);

            tr.appendChild(statusCell);
            this.tbody.appendChild(tr);
        },
    }
    Library.init()
})()
