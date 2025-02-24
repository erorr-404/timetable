const table = document.getElementById("main-table")
const tableRows = table.querySelectorAll("tr")

const warning = "<span title='Потрібен корпоративний акаунт Classroom!' class='material-symbols-outlined'>warning</span>"
const bookIcon = "<span title='Натисніть щоб відкрити книгу' class='material-symbols-outlined book-link'>book_2</span>"

const fetchRequests = [
  fetch("./data/importance.json"),
  fetch("./data/links.json"),
  fetch("./data/timetable.json"),
  fetch("./data/time.json"),
  fetch("./data/corporate-links.json"),
  fetch("./data/subject-books.json")
]

Promise.all(fetchRequests)
  .then(response => {
    return Promise.all(response.map(response => response.json()))
  })
  .then(data => {
    updateTable(data)
  })
  .catch(error => {
    alert(`Error: ${error}`)
  })

function updateTable(data) {
  const dataImportance = data[0]
  const dataLinks = data[1]
  const dataTimetable = data[2]
  const dataTime = data[3]
  const corporates = data[4]
  const dataBooks = data[5]

  // TODO: add support for mobile screens
  // TODO: add classroom links for each subject

  const english = get_cookie_value('english');
  const informatics = get_cookie_value('informatics');
  const pe = get_cookie_value('pe');
  const technologies = get_cookie_value('technologies');
  const authuser = get_cookie_value('authuser');
  
  for (const [day, subjects] of Object.entries(dataTimetable)) {
    let counter = 1
    subjects.forEach(subject => {
      const cell = document.createElement("td")
      cell.classList.add(`imp-lvl-${dataImportance[subject]}`)

      const cellDiv = document.createElement("div")
      cellDiv.classList.add("subject-cell")
      cell.appendChild(cellDiv)

      const link = document.createElement("a")
      
      if (Array.isArray(dataLinks[subject])) {
        switch (subject) {
          case "Англійська мова":
            link.href = `${dataLinks[subject][english]}?authuser=${authuser}`
            break;
          case "Інформатика":
            link.href = `${dataLinks[subject][informatics]}?authuser=${authuser}`
            break;
          case "Фізкультура":
            link.href = `${dataLinks[subject][pe]}`
            break;
          case "Технології":
            link.href = `${dataLinks[subject][technologies]}?authuser=${authuser}`
            break
          default:
            link.href = `${dataLinks[subject][0]}?authuser=${authuser}`
            break;
        }
      } else {
        if (corporates.includes(subject) == false) {
          link.href = dataLinks[subject] != undefined ? dataLinks[subject] : "https://youtu.be/A67ZkAd1wmI?si=VvEStd66wTdj2UoS"
        } else {
          link.href = dataLinks[subject] != undefined ? `${dataLinks[subject]}?authuser=${authuser}` : "https://youtu.be/A67ZkAd1wmI?si=VvEStd66wTdj2UoS"
        }
      }

      link.target = "_blank"
      link.innerHTML = corporates.includes(subject) == true ? `${warning} ${subject}` : subject

      cellDiv.appendChild(link)

      if (dataBooks[subject] != undefined) {
        const book = document.createElement("a")
        book.href = dataBooks[subject]
        book.target = "_blank"
        book.innerHTML = bookIcon
        cellDiv.appendChild(book)
      }
      
      tableRows[counter].appendChild(cell)
      counter++
    })
  }

  for (let i = 1; i < 8; i++) {
    const cell = document.createElement("td")
    cell.innerText = i
    cell.classList.add("text-center")
    tableRows[i].appendChild(cell)
  }

  for (const [number, time] of Object.entries(dataTime)) {
    const startCell = document.createElement("td")
    startCell.innerText = `${time.start.hour}:${time.start.minute}`
    startCell.classList.add("text-center")
    tableRows[number].appendChild(startCell)

    const endCell = document.createElement("td")
    endCell.innerText = `${time.end.hour}:${time.end.minute}`
    endCell.classList.add("text-center")
    tableRows[number].appendChild(endCell)
  }
}