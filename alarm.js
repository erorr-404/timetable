// const alarmEnable = Boolean(getCookie("alarm"))
const acceptBtn = document.getElementById("alarm-yes")
const declineBtn = document.getElementById("alarm-no")
const alarmModal = document.getElementById("alarm-modal")
const alarm = new Audio('sounds/alarm.mp3')

const fetchRequests2 = [
  fetch("./data/time.json")
]

Promise.all(fetchRequests2)
  .then(response => {
    return Promise.all(response.map(response => response.json()))
  })
  .then(data => {
    acceptBtn.addEventListener("click", () => {
      const now = new Date()
      const timeTable = data[0]
      const nextLessonNum = getNextLessonNumber(timeTable)
      console.log(nextLessonNum);
      const timerTargetInMins = timeTable[nextLessonNum].start.hour * 60 + parseInt(timeTable[nextLessonNum].start.minute)
      const currentTimeInMins = (now.getHours() * 60) + now.getMinutes()
      const timeoutDelay = (timerTargetInMins - currentTimeInMins)

      setTimeout(() => {
        alarm.play()
        .catch(error => {
          alert(error)
        })
      }, timeoutDelay * 60 * 1000)

      console.log(`Set timeout for ${timeoutDelay} mins (${timeTable[nextLessonNum].start.hour}:${parseInt(timeTable[nextLessonNum].start.minute)})`)
      alarmModal.style.display = "none"
    })

    declineBtn.addEventListener("click", () => {
      alarmModal.style.display = "none"
    })
  })
  .catch(error => {
    alert(`Error: ${error}`)
  })

function getNextLessonNumber(timetable) {
  const now = new Date()
  const currentTimeInMins = (now.getHours() * 60) + now.getMinutes()

  for (const lessonNumber in timetable) {
    const lesson = timetable[lessonNumber];
    const lessonStartTimeInMins = (parseInt(lesson.start.hour) * 60) + parseInt(lesson.start.minute)
    
    if (lessonStartTimeInMins >= currentTimeInMins) {
      return String(parseInt(lessonNumber))
    }
  }
  return null
}