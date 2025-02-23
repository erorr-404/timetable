const main = document.getElementById("classroom-main")
const classroomImages = [
	"https://gstatic.com/classroom/themes/img_reachout.jpg",
	"https://gstatic.com/classroom/themes/img_breakfast.jpg",
	"https://gstatic.com/classroom/themes/img_code.jpg",
	"https://gstatic.com/classroom/themes/English.jpg",
	"https://gstatic.com/classroom/themes/img_bookclub.jpg",
	"https://gstatic.com/classroom/themes/img_backtoschool.jpg",
	"https://gstatic.com/classroom/themes/img_carmaintenance.jpg",
	"https://gstatic.com/classroom/themes/img_read.jpg",
	"https://gstatic.com/classroom/themes/img_graduation.jpg"
]

const fetchRequests = [
  	fetch("./data/classroom.json")
]
  
Promise.all(fetchRequests)
	.then(response => {
    	return Promise.all(response.map(response => response.json()))})
  	.then(data => {
		drawMainContent(data)})
  	.catch(error => {
    	alert(`Error: ${error}`)
})

function drawMainContent(data) {
	const classroomData = data[0]

	// get all needed cookies
	const english = get_cookie_value('english');
	const informatics = get_cookie_value('informatics');
  	const pe = get_cookie_value('pe');
  	const technologies = get_cookie_value('technologies');
  	const authuser = get_cookie_value('authuser');

	let drawTasks = []
	// create array of odjects with subjects name, classroom link, register link and code
	for (const [subject, subjectData] of Object.entries(classroomData)) {
		if (Array.isArray(subjectData)) {
			const task = {
				subjectName: subject,
				subjectClassroomLink: `https://classroom.google.com/c/${subjectData[1]}?authuser=${authuser}`,
				subjectClassroomRegisterLink: `https://classroom.google.com/c/${subjectData[1]}?cjc=${subjectData[0]}?authuser=${authuser}`,
				subjectCode: subjectData[0]
			}
			drawTasks.push(task)
		} else {
			let classroomLink = null
			let registerLink = null
			let code = null
			switch (subject) {
				case "Англійська мова":
					classroomLink  = `https://classroom.google.com/c/${subjectData[english][1]}`
					registerLink = `https://classroom.google.com/c/${subjectData[english][1]}?cjc=${subjectData[english][0]}`
					code = subjectData[english][0]
					break;
				case "Інформатика":
					classroomLink  = `https://classroom.google.com/c/${subjectData[informatics][1]}`
					registerLink = `https://classroom.google.com/c/${subjectData[informatics][1]}?cjc=${subjectData[informatics][0]}`
					code = subjectData[informatics][0]
					break;
				case "Фізкультура":
					classroomLink  = `https://classroom.google.com/c/${subjectData[pe][1]}`
					registerLink = `https://classroom.google.com/c/${subjectData[pe][1]}?cjc=${subjectData[pe][0]}`
					code = subjectData[pe][0]
					break;
				case "Технології":
					classroomLink = `https://classroom.google.com/c/${subjectData[technologies][1]}`
					registerLink = `https://classroom.google.com/c/${subjectData[technologies][1]}?cjc=${subjectData[technologies][0]}`
					code = subjectData[technologies][0]
					break
				default:
					classroomLink = `https://classroom.google.com/`
					registerLink = `https://classroom.google.com/`
					code = null
					break;
			}

			const task = {
				subjectName: subject,
				subjectClassroomLink: `${classroomLink}?authuser=${authuser}`,
				subjectClassroomRegisterLink: `${registerLink}?authuser=${authuser}`,
				subjectCode: code
			}
			drawTasks.push(task)
		}
	}

	console.log(drawTasks);

	// const task = {subjectName, subjectClassroomLink, subjectClassroomRegisterLink, subjectCode}
	let counter = 0
	for (task of drawTasks) {
		const box = document.createElement("div");
		box.classList.add("classroom-box")
		box.dataset.subject = task.subjectName
		box.dataset.subjectClassroomLink = task.subjectClassroomLink
		box.addEventListener("click", function(event) {
			window.open(this.dataset.subjectClassroomLink, "_blank").focus()
		})
		
		const background = document.createElement("div")
		background.classList.add("classroom-background")
		background.style.backgroundImage = `url(${classroomImages[counter < classroomImages.length ? counter : counter - classroomImages.length]})`
		box.appendChild(background)

		const boxName = document.createElement("h2")
		boxName.innerHTML = task.subjectName
		boxName.classList.add("classroom-name")
		box.appendChild(boxName)

		const joinButton = document.createElement("div")
		joinButton.classList.add("classroom-join-button")
		joinButton.innerHTML = "Приєднатись"
		joinButton.dataset.subjectClassroomRegisterLink = task.subjectClassroomRegisterLink
		joinButton.addEventListener("click", function(event) {
			event.stopPropagation()
			window.open(this.dataset.subjectClassroomRegisterLink, "_blank").focus()
		})

		box.appendChild(joinButton)

		main.appendChild(box);
		counter += 1
	}
}