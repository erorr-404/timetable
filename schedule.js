const scheduleTable = document.getElementById("schedule")
const days = ["ПН", "ВТ", "СР", "ЧТ", "ПТ"]
const dataDays = ["monday", "tuesday", "wednesday", "thursday", "friday"]
const warning = "<span title='Потрібен корпоративний акаунт Classroom!' class='material-symbols-outlined'>warning</span>"
const bookIcon = "<span title='Натисніть щоб відкрити книгу' class='material-symbols-outlined book-link'>book_2</span>"
const meetingIcon = "<span class='material-symbols-outlined'>videocam</span>"
const classroomIcon = "<span class='material-symbols-outlined'>groups</span>"
const leftIcon = "<span class='material-symbols-outlined'>arrow_back_ios</span>"
const rightIcon = "<span class='material-symbols-outlined'>arrow_forward_ios</span>"

let currentDay = getDayNumber()
let currentDays = [currentDay-1, currentDay, currentDay+1]

const fetchRequests = [
  fetch("./data/importance.json"),
  fetch("./data/links.json"),
  fetch("./data/timetable.json"),
  fetch("./data/time.json"),
  fetch("./data/corporate-links.json"),
  fetch("./data/subject-books.json"),
  fetch("./data/classroom.json")
]

Promise.all(fetchRequests)
  .then(response => {
    return Promise.all(response.map(response => response.json()))
  })
  .then(data => {
    updateTable(data)
  })
  // .catch(error => {
  //   // alert(`Error: ${error}`)
  // })

function updateTable(data) {
  const dataImportance = data[0]
  const dataLinks = data[1]
  const dataTimetable = data[2]
  const dataTime = data[3]
  const corporates = data[4]
  const dataBooks = data[5]
  const dataClassroom = data[6]
  

  // TODO: add support for mobile screens
  // TODO: add classroom links for each subject

  const cookies = {
    english: get_cookie_value('english'),
    informatics: get_cookie_value('informatics'),
    pe: get_cookie_value('pe'),
    technologies: get_cookie_value('technologies'),
    authuser: get_cookie_value('authuser')
  }

  const swipeLeft = document.createElement("div")
  swipeLeft.innerHTML = leftIcon
  swipeLeft.id = "swipe-left"
  swipeLeft.addEventListener("click", function() {
    if (currentDay > 0) {
      currentDay--
      currentDays = [currentDay-1, currentDay, currentDay+1]
      const lessonsListDiv = document.getElementById("lessons-list")
      lessonsListDiv.innerHTML = ""
      renderDay(currentDay, lessonsListDiv, dataTimetable, dataDays, dataImportance, dataLinks, dataBooks, dataClassroom, dataTime, cookies, corporates)
      const dayDivs = document.querySelectorAll("#days-panel div")
      dayDivs.forEach(dayDiv => {
        dayDiv.classList.remove("current-day")
      })
      dayDivs[currentDay].classList.add("current-day")
    }
  })

  const swipeRight = document.createElement("div")
  swipeRight.innerHTML = rightIcon
  swipeRight.id = "swipe-right"
  swipeRight.addEventListener("click", function() {
    if (currentDay < 4) {
      currentDay++
      currentDays = [currentDay-1, currentDay, currentDay+1]
      const lessonsListDiv = document.getElementById("lessons-list")
      lessonsListDiv.innerHTML = ""
      renderDay(currentDay, lessonsListDiv, dataTimetable, dataDays, dataImportance, dataLinks, dataBooks, dataClassroom, dataTime, cookies, corporates)
      const dayDivs = document.querySelectorAll("#days-panel div")
      dayDivs.forEach(dayDiv => {
        dayDiv.classList.remove("current-day")
      })
      dayDivs[currentDay].classList.add("current-day")
    }
  })

  const daysPanel = document.createElement("div")
  let counter = 0
  for (const day of days) {
    const dayDiv = document.createElement("div")
    dayDiv.innerHTML = day
    dayDiv.dataset.day = counter
    
    if (currentDay == counter) {
      dayDiv.classList.add("current-day")
    }

    dayDiv.addEventListener("click", function() {
      currentDay = parseInt(this.dataset.day)
      currentDays = [currentDay-1, currentDay, currentDay+1]
      const lessonsListDiv = document.getElementById("lessons-list")
      lessonsListDiv.innerHTML = ""
      renderDay(currentDay, lessonsListDiv, dataTimetable, dataDays, dataImportance, dataLinks, dataBooks, dataClassroom, dataTime, cookies, corporates)
      const dayDivs = document.querySelectorAll("#days-panel div")
      dayDivs.forEach(dayDiv => {
        dayDiv.classList.remove("current-day")
      })
      this.classList.add("current-day")
    })

    daysPanel.appendChild(dayDiv)
    counter++
  }
  daysPanel.id = "days-panel"

  const scheduleBar = document.createElement("div")
  scheduleBar.id = "schedule-bar"

  const lessonsListDiv = document.createElement("div")
  lessonsListDiv.id = "lessons-list"

  // isMobileDevice()
  if (true) {
    // scheduleTable.classList.add("mobile")
    scheduleBar.appendChild(swipeLeft)
    scheduleBar.appendChild(daysPanel)
    scheduleBar.appendChild(swipeRight)
    scheduleTable.appendChild(scheduleBar)
    scheduleTable.appendChild(lessonsListDiv)
    renderDay(currentDay, lessonsListDiv, dataTimetable, dataDays, dataImportance, dataLinks, dataBooks, dataClassroom, dataTime, cookies, corporates)
    
    document.querySelectorAll("#days-panel div")[currentDay].classList.add("current-day")

  } else {
    scheduleTable.classList.add("desktop")
  }
}

function renderDay(dayNumber, lessonsListDiv, dataTimetable, dataDays, dataImportance, dataLinks, dataBooks, dataClassroom, dataTime, cookies, corporates) {
  const lessonsNames = getDayLessons(dayNumber, dataTimetable, dataDays)
  const lessons = lessonsNames.map(function (value, index, _) {
    let link;
  
    if (Array.isArray(dataLinks[value])) {
      switch (value) {
        case "Англійська мова":
          link = `${dataLinks[value][cookies.english]}?authuser=${cookies.authuser}`
          break;
        case "Інформатика":
          link = `${dataLinks[value][cookies.informatics]}?authuser=${cookies.authuser}`
          break;
        case "Фізкультура":
          link = `${dataLinks[value][cookies.pe]}`
          break;
        case "Технології":
          link = `${dataLinks[value][cookies.technologies]}?authuser=${cookies.authuser}`
          break
        default:
          link = `${dataLinks[value][0]}?authuser=${cookies.authuser}`
          break;
      }
    } else {
      if (corporates.includes(value) == false) {
        link = dataLinks[value] != undefined ? dataLinks[value] : undefined
      } else {
        link = dataLinks[value] != undefined ? `${dataLinks[value]}?authuser=${cookies.authuser}` : undefined
      }
    }

    const classroomData = dataClassroom[value]
    let classroomId;

    if (Array.isArray(classroomData)) {
      classroomId = classroomData[1]
      console.log(classroomData[1]);
    } else {
      switch (value) {
        case "Англійська мова":
          classroomId = classroomData[cookies.english][1]
          break;
        case "Інформатика":
          classroomId = classroomData[cookies.informatics][1]
          break;
        case "Технології":
          classroomId = classroomData[cookies.technologies][1]
          break
        default:
          classroomId = undefined
          break;
      }
    }
    
    return {
      name: value,
      importance: dataImportance[value],
      link: link,
      book: dataBooks[value],
      classroom: classroomId != undefined ? `https://classroom.google.com/c/${classroomId}?authuser=${cookies.authuser}` : undefined,
      start: `${dataTime[`${index+1}`].start.hour}:${dataTime[`${index+1}`].start.minute}`,
      end: `${dataTime[`${index+1}`].end.hour}:${dataTime[`${index+1}`].end.minute}`
    }
  });
  lessons.forEach(lesson => {
    const lessonDiv = document.createElement("div")
    lessonDiv.classList.add(lesson.importance != undefined ? `imp-lvl-${lesson.importance}` : "lesson")
    lessonDiv.classList.add("lesson")
    
    const lessonName = document.createElement("b")
    lessonName.classList.add("lesson-name")
    lessonName.innerHTML = lesson.name
    
    const lessonTime = document.createElement("b")
    lessonTime.classList.add("lesson-time")
    lessonTime.innerHTML = `${lesson.start} - ${lesson.end}`

    const lessonLinksDiv = document.createElement("div")
    lessonLinksDiv.classList.add("lesson-links-container")

    let lessonLink;
    if (lesson.link != undefined) {
      lessonLink  = document.createElement("a")
      lessonLink.href = lesson.link
      lessonLink.target = "_blank"
      lessonLink.innerHTML = meetingIcon
      lessonLink.classList.add("lesson-link")
    }

    let lessonClassroom
    if (lesson.classroom != undefined) {
      lessonClassroom = document.createElement("a")
      lessonClassroom.href = lesson.classroom
      lessonClassroom.target = "_blank"
      lessonClassroom.innerHTML = classroomIcon
      lessonLink.classList.add("lesson-link")
    }

    let lessonBook = document.createElement("a")
    if (lesson.book != undefined) {
      lessonBook.href = lesson.book
      lessonBook.target = "_blank"
      lessonBook.innerHTML = bookIcon
      lessonLink.classList.add("lesson-link") 
    }
    
    lessonDiv.appendChild(lessonName)
    lessonDiv.appendChild(lessonTime)
    lessonDiv.appendChild(lessonLinksDiv)
    
    if (lesson.link != undefined) {
      lessonLinksDiv.appendChild(lessonLink)
    }
    
    if (lesson.classroom != undefined) {
      lessonLinksDiv.appendChild(lessonClassroom)
    }
    lessonLinksDiv.appendChild(lessonBook)
    lessonsListDiv.appendChild(lessonDiv)
  });
}

function getDayLessons(dayNumber, dataTimetable, dataDays) {
  return dataTimetable[dataDays[dayNumber]] ||  dataTimetable[dataDays[0]]
}

function isMobileDevice() {
  return window.innerWidth <= 768;
}

function getDayNumber() {
  const now = new Date()
  const dayNumber = now.getDay()
  return dayNumber -1
}
