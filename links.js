const linksBox = document.getElementById("links-box")

fetch("data/links.json")
    .then((response) => response.json())
    .then(links => {
        for (const [lesson, link] of Object.entries(links)) {
            const linkTag = document.createElement("a")
            linkTag.href = link
            link.target = "_blank"
            linkTag.innerHTML = `<b>${lesson}</b>`
            linksBox.appendChild(linkTag)
            linksBox.appendChild(document.createElement("br"))
        }
    })