const Library = (() => {
    const myLibrary = [];

    return {
        getLibrary: myLibrary,
        length: () => myLibrary.length,
        insert: (Book) => { myLibrary.push(Book) }
    }
})();

const Book = (title, author, pages, readingStatus) => {return {title, author, pages, readingStatus}}


const DisplayController = (() => {
    const getUserBook = () => {
        const title = document.querySelector("#book-title").value;
        const author = document.querySelector("#book-author").value;
        const pages = document.querySelector("#book-pages").value;
        const readingStatus = document.querySelector("#book-status").value;

        return Book(title, author, pages, readingStatus)
    }
    const renderLibrary = (Book) => {
        const tbody = document.querySelector("tbody")

        const tr = document.createElement("tr");
        const tdTitle = document.createElement('td');
        const tdAuthor = document.createElement("td");
        const tdPages = document.createElement("td");
        const tdReadingStatus = document.createElement("td")
        const spanReadingStatus = document.createElement("span")
        const toggleReadingStatusButton = document.createElement("button")


        tdTitle.textContent = Book.title;
        tdAuthor.textContent = Book.author;
        tdPages.textContent = Book.pages;
        spanReadingStatus.textContent = Book.readingStatus;

        spanReadingStatus.classList.add("text-book-readingStatus");

        toggleReadingStatusButton.textContent = "Change"
        toggleReadingStatusButton.classList.add("toggle-reading-status-btn");

        const changeReadingStatus = (button) => {
            if (Book.readingStatus === "Read") {
                Book.readingStatus = "Not Read"
            } else {
                Book.readingStatus = "Read";
            }
            spanReadingStatus.textContent = Book.readingStatus;
        }
        toggleReadingStatusButton.addEventListener("click", changeReadingStatus)

        tdReadingStatus.append(spanReadingStatus, toggleReadingStatusButton)

        tr.append(tdTitle, tdAuthor, tdPages, tdReadingStatus)
        
        tbody.appendChild(tr)
    }


    const setupEventListeners = () => {
        const toggleFormBtn = document.querySelector("#showForm-btn");
        const addBookBtn = document.querySelector("#addBook-btn");
        const form = document.querySelector("#insertBookForm");

        toggleFormBtn.addEventListener("click", () => {
            if (form.classList.contains("hide")) {
                toggleFormBtn.textContent = "Hide Form"
                form.classList.remove("hide")
            } else {
                toggleFormBtn.textContent = "Show Form"
                form.classList.add("hide")
            }
        })

        addBookBtn.addEventListener("click", () => {
            const userBook = getUserBook()
            Library.insert(userBook)
            renderLibrary(userBook);
        })

    }
    
    return {
        getUserBook,
        setupEventListeners,
        renderLibrary,
    }
})();

const x = (() => {

})()


DisplayController.setupEventListeners();
