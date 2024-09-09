const currentLessonLabel = document.getElementById("current-lesson")
const button = document.getElementById("lesson-autoconnect")

const fetchRequests = [
  fetch("./data/links.json"),
  fetch("./data/timetable.json"),
  fetch("./data/time.json"),
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

  const currentLessonNumber = parseInt(getLessonNumber(dataTime))
  const currentLesson = dataTimetable[getDayName()][currentLessonNumber - 1]

  if (currentLesson == undefined) {
    currentLessonLabel.innerText = "нічого"
  } else {
    currentLessonLabel.innerText = currentLesson
  }
    
  button.addEventListener('click', () => {
    if (currentLessonLabel.innerText == "нічого") {
      window.open("https://www.youtube.com/watch?v=A67ZkAd1wmI", "_blank").focus()
      return
    } else {
      window.open(dataLinks[currentLessonLabel.innerText], "_blank").focus()
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
    
    if (lessonStartTimeInMins <= currentTimeInMins && currentTimeInMins <= lessonEndTimeInMins) {
      return lessonNumber
    }
  }
  return null
}