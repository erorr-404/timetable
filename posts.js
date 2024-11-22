const postsBox = document.getElementById("posts-box")
const body = document.querySelector("body")
const overlay = document.getElementById("overlay")
const fetchRequests = [
    fetch("./data/posts.json"),
]

Promise.all(fetchRequests)
  .then(response => {
    return Promise.all(response.map(response => response.json()))
  })
  .then(data => {
    loadPosts(data)
  })
  .catch(error => {
    alert(`Error: ${error}`)
  })

function loadPosts(data, postTexts) {
	const posts = data[0]
  
	for (const post of posts) {
		const postContainer = document.createElement("div")
		postContainer.classList.add("post")
		postContainer.setAttribute("data-open-target", "#"+post.id)
		
		const header = document.createElement("h3")
		header.innerHTML = post.title

		const image = document.createElement("img")
		image.src = post.image

		postContainer.appendChild(image)
		postContainer.appendChild(header)
		postsBox.appendChild(postContainer)

		// modal

		const postModal = document.createElement("div")
		postModal.classList.add("post-modal")
		postModal.classList.add("hidden")
		postModal.id = post.id
		postModal.setAttribute("data-close-target", post.id)

    const postImg = document.createElement("img")
    postImg.src = post.image
    postModal.appendChild(postImg)

    const modalTitle = document.createElement("h2")
    modalTitle.innerHTML = post.title
    postModal.appendChild(modalTitle)

    const modalText = document.createElement("div")
    modalText.innerHTML = post.text
    postModal.appendChild(modalText)
      

		body.appendChild(postModal)
	}
	const openModalButtons = document.querySelectorAll("[data-open-target]")
	// const closeModalButtons = document.querySelectorAll("[data-close-target]")
	
	openModalButtons.forEach(button => {
		button.addEventListener("click", () => {
			const modal = document.querySelector(button.dataset.openTarget)
			openModal(modal)
		})
	})

	// closeModalButtons.forEach(button => {
	// 	button.addEventListener("click", () => {
	// 		const modals = document.querySelectorAll('.post-modal')
  //     modals.forEach(modal => {
  //       closeModal(modal)
  //     })
	// 	})
	// })

	overlay.addEventListener("click", () => {
		const modals = document.querySelectorAll('.post-modal')
    modals.forEach(modal => {
      closeModal(modal)
    })
	})
}

function openModal(modal) {
	if (modal == null) return
	modal.classList.remove('hidden')
	overlay.classList.remove('hidden')
  	body.classList.add("modal-active")
	console.log(`Modal ${modal.id} active`)
}

function closeModal(modal) {
	if (modal == null) return
	modal.classList.add('hidden')
	overlay.classList.add('hidden')
  	body.classList.remove("modal-active")
	console.log(`Modal ${modal.id} hidden`)
}