fetch("./data/timetable.json")
  .then((response) => response.json())
  .then((json) => {
    const table = document.getElementById("main-table")
    const tableRows = table.querySelectorAll("tr")

    for (const [day, subjects] of Object.entries(json)) {
      let counter = 1
      subjects.forEach(subject => {
        const cell = document.createElement("td")
        cell.innerText = subject
        tableRows[counter].appendChild(cell)
        counter++
      })
    }
})