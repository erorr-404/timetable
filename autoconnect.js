let timetable = []
let links = []
const currentLessonLabel = document.getElementById("current-lesson")

fetch("./data/links.json")
  .then((response) => response.json())
  .then((json) => {links = json})

fetch("./data/timetable.json")
  .then((response) => response.json())
  .then((json) => {timetable = json})

fetch("./data/time.json")
  .then((response) => response.json())
  .then((json) => {
    const button = document.getElementById("lesson-autoconnect")
    
    const currentLessonNumber = getLessonNumber(json)
    if (currentLessonNumber ==  null || currentLessonNumber == undefined) {
      currentLessonLabel.innerText = "нічого"
    } else {
      const currentLesson = timetable[getDayName()][currentLessonNumber]
      currentLessonLabel.innerText = currentLesson
    }

    button.addEventListener('click', () => {
      if (currentLessonLabel.innerText == "нічого") {
        window.open("https://www.youtube.com/watch?v=A67ZkAd1wmI", "_blank").focus()
        return
      } else {
        window.open(links[currentLessonLabel.innerText], "_blank").focus()
      }
    })
  })

function getDayName() {
  const now = new Date()
  const dayNumber = now.getDay()
  let day = null
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
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()

  for (const lessonNumber in timetable) {
    const lesson = timetable[lessonNumber];
    const startTime = lesson.start;
    const endTime = lesson.end;
    
    if (
      currentHour >= startTime.hour &&
      currentMinute >= startTime.minute &&
      (currentHour < endTime.hour ||
      (currentHour === endTime.hour && currentMinute <= endTime.minute))
    ) {
      return lessonNumber;
    }

    return null
  }
}