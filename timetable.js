const table = document.getElementById("main-table")
const tableRows = table.querySelectorAll("tr")

const warning = "<span title='Потрібен корпоративний акаунт Classroom!' class='material-symbols-outlined'>warning</span>"

const fetchRequests = [
  fetch("./data/importance.json"),
  fetch("./data/links.json"),
  fetch("./data/timetable.json"),
  fetch("./data/time.json"),
  fetch("./data/corporate-links.json")
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
  console.log(corporates);
  

  for (const [day, subjects] of Object.entries(dataTimetable)) {
    let counter = 1
    subjects.forEach(subject => {
      const cell = document.createElement("td")
      cell.classList.add(`imp-lvl-${dataImportance[subject]}`)

      const link = document.createElement("a")
      link.href = dataLinks[subject] != undefined ? dataLinks[subject] : "https://youtu.be/A67ZkAd1wmI?si=VvEStd66wTdj2UoS"
      link.target = "_blank"
      link.innerHTML = corporates.includes(subject) == true ? `${warning} ${subject}` : subject

      cell.appendChild(link)

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