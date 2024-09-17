const alarmStateCheck = document.getElementById("alarm")

const prevState = getCookie("alarm")
alarmStateCheck.checked = Boolean(prevState)

alarmStateCheck.addEventListener('change', () => {
  const alarmState = alarmStateCheck.checked
  setCookie("alarm", alarmState)
})

function setCookie(name, value) {
  document.cookie = `${name}=${value}; SameSite=None; Secure`
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
