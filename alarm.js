const alarmEnable = Boolean(getCookie("alarm"))
let alarm = new Audio('sounds/alarm.mp3')

if (alarmEnable) {
  const fetchRequests = [
    fetch("./data/time.json")
  ]

  Promise.all(fetchRequests)
  .then(response => {
    return Promise.all(response.map(response => response.json()))
  })
  .then(data => {
    alarmManager(data)
  })
  .catch(error => {
    alert(`Error: ${error}`)
  })
}

function alarmManager(data) {
  const time = data[0]
  const now = new Date()
  const currentTimeInMins = (now.getHours() * 60) + now.getMinutes()
  
  for (const lessonNumber in time) {
    const lesson = time[lessonNumber]
    const lessonStartInMins = parseInt(lesson.start.hour) * 60 + parseInt(lesson.start.minute)
    const timerDelayInMins = lessonStartInMins - currentTimeInMins
    
    if (timerDelayInMins >= 0) {
      setTimeout(() => {
        alarm.play()
        .catch(error => {
          alert(error)
        })
      }, timerDelayInMins * 60 * 1000)
      console.log(`Set timeout for ${timerDelayInMins} mins`);
    }
  }
}

function getCookie(name) {
  const cDecoded = decodeURIComponent(document.cookie)
  const cArray = cDecoded.split("; ")
  let result = null

  cArray.forEach(element => {
    if (element.indexOf(name) == 0) {
      result = element.substring(name.length + 1)
    }
  })

  return result
}