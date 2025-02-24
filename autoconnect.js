const currentLessonLabel = document.getElementById("current-lesson")
const button = document.getElementById("lesson-autoconnect")

const fetchRequests = [
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
    updateAutoconnect(data)
  })
  .catch(error => {
    alert(`Error: ${error}`)
  })

function updateAutoconnect(data) {
  const dataLinks = data[0]
  const dataTimetable = data[1]
  const dataTime = data[2]
  const corporates = data[3]

  const english = get_cookie_value('english');
  const informatics = get_cookie_value('informatics');
  const pe = get_cookie_value('pe');
  const technologies = get_cookie_value('technologies');
  const authuser = get_cookie_value('authuser');

  const dayName = getDayName()

  if (dayName == null) {
    button.classList.add("unavailable")
    return
  }

  const currentLessonNumber = parseInt(getLessonNumber(dataTime))
  const currentLesson = dataTimetable[getDayName()][currentLessonNumber - 1]
  
  if (currentLesson == undefined || getDayName() == null) {
    currentLessonLabel.innerText = "нічого"
    button.classList.add("unavailable")
  } else {
    currentLessonLabel.innerText = `${currentLesson} починається о ${dataTime[`${currentLessonNumber}`].start.hour}:${dataTime[`${currentLessonNumber}`].start.minute}`
  }
  // FIXME: optimize this code
  button.addEventListener('click', () => {
    if (currentLessonLabel.innerText == "нічого") {
      window.open("https://www.youtube.com/watch?v=A67ZkAd1wmI", "_blank").focus()
      return
    } else {
      if (Array.isArray(dataLinks[currentLesson])) {
        switch (currentLesson) {
          case "Англійська мова":
            window.open(`${dataLinks[currentLesson][english]}?authuser=${authuser}`, "_blank").focus()
            break;
          case "Інформатика":
            window.open(`${dataLinks[currentLesson][informatics]}?authuser=${authuser}`, "_blank").focus()
            break;
          case "Фізкультура":
            window.open(link.href = `${dataLinks[currentLesson][pe]}`, "_blank").focus()
            break;
          case "Технології":
            window.open(`${dataLinks[currentLesson][technologies]}?authuser=${authuser}`, "_blank").focus()
            break
          default:
            window.open(`${dataLinks[currentLesson][0]}?authuser=${authuser}`, "_blank").focus()
            break;
        }
      } else {
        if (corporates.includes(currentLesson) == false) {
          window.open(dataLinks[currentLesson] != undefined ? dataLinks[currentLesson] : "https://youtu.be/A67ZkAd1wmI?si=VvEStd66wTdj2UoS", "_blank").focus()
        } else {
          window.open(dataLinks[currentLesson] != undefined ? `${dataLinks[currentLesson]}?authuser=${authuser}` : "https://youtu.be/A67ZkAd1wmI?si=VvEStd66wTdj2UoS", "_blank").focus()
        }
      }
      // window.open(dataLinks[currentLesson], "_blank").focus()
    }
  })
}

function getDayName() {
  const now = new Date()
  const dayNumber = now.getDay()
  let day
  switch (dayNumber) {
    case 1:
      day = "monday"
      break;
    case 2:
      day = "tuesday"
      break;
    case 3:
      day = "wednesday"
      break;
    case 4:
      day = "thursday"
      break;
    case 5:
      day = "friday"
      break;
    default:
      day = null
      break;
  }
  return day
}

function getLessonNumber(timetable) {
  const now = new Date()
  const currentTimeInMins = (now.getHours() * 60) + now.getMinutes()

  for (const lessonNumber in timetable) {
    const lesson = timetable[lessonNumber];
    const lessonStartTimeInMins = (parseInt(lesson.start.hour) * 60) + parseInt(lesson.start.minute)
    const lessonEndTimeInMins = (parseInt(lesson.end.hour) * 60) + parseInt(lesson.end.minute)
    
    if (lessonStartTimeInMins - 5 <= currentTimeInMins && currentTimeInMins <= lessonEndTimeInMins) {
      return lessonNumber
    }
  }
  return null
}