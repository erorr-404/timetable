const booksBox = document.getElementById("books-box")
const fetchRequests = [
  fetch("./data/book-covers.json"),
  fetch("./data/books.json"),
]

Promise.all(fetchRequests)
  .then(response => {
    return Promise.all(response.map(response => response.json()))
  })
  .then(data => {
    const bookCovers = data[0]
    const books = data[1]

    for (const [book, link] of Object.entries(books)) {
      
      const bookLink = document.createElement("a")
      bookLink.href = link
      bookLink.target = "_blank"
      bookLink.classList.add("book")

      const bookCover = document.createElement("img")
      bookCover.src = bookCovers[book]

      const bookLabel = document.createElement("h3")
      bookLabel.innerText = book

      bookLink.appendChild(bookCover)
      bookLink.appendChild(bookLabel)
      booksBox.appendChild(bookLink)
    }
  })
  .catch(error => {
    alert(`Error: ${error}`)
  })