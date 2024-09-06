const table = document.getElementById("main-table")
const tableRows = table.querySelectorAll("tr")

fetch("./data/timetable.json")
  .then((response) => response.json())
  .then((json) => {
    for (const [day, subjects] of Object.entries(json)) {
      let counter = 1
      subjects.forEach(subject => {
        const cell = document.createElement("td")
        cell.innerText = subject
        tableRows[counter].appendChild(cell)
        counter++
      })
    }

    for (let i = 1; i < 8; i++) {
      const cell = document.createElement("td")
      cell.innerText = i
      tableRows[i].appendChild(cell)
    }
  })

fetch("./data/time.json")
  .then((response) => response.json())
  .then((json) => {
    for (const [number, time] of Object.entries(json)) {
      const startCell = document.createElement("td")
      startCell.innerText = `${time.start.hour}:${time.start.minute}`
      tableRows[number].appendChild(startCell)

      const endCell = document.createElement("td")
      endCell.innerText = `${time.end.hour}:${time.end.minute}`
      tableRows[number].appendChild(endCell)
    }
  })