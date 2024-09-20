const postsList = document.querySelector("#posts-short-list")

const fetchRequestsPosts = [
  fetch("./data/posts.json"),
]

Promise.all(fetchRequestsPosts)
  .then(response => {
    return Promise.all(response.map(response => response.json()))
  })
  .then(data => {
    const posts = data[0]
    for (let index = 0; index < 3; index++) {
      const post = posts[index]
      const postContainer = document.createElement("div")
      postContainer.classList.add("short-post")

      const link = document.createElement("a")
      link.href = "posts.html"

      const postHeader = document.createElement("h4")
      postHeader.innerHTML = post.title
      link.appendChild(postHeader)

      const questionIcon = document.createElement("span")
      questionIcon.classList.add("material-symbols-outlined")
      questionIcon.innerText = "help"

      postContainer.appendChild(questionIcon)
      postContainer.appendChild(link)
      postsList.appendChild(postContainer)
    }
  })
  .catch(error => {
    alert(`Error: ${error}`)
  })