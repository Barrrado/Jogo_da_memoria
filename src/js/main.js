const emoji = [
	'😂',
	'😂',
	'😘',
	'😘',
	'😁',
	'😁',
	'😎',
	'😎',
	'😉',
	'😉',
	'😜',
	'😜',
	'🫥',
	'🫥',
	'😶‍🌫️',
	'😶‍🌫️'
]
let OpenCard = []
let timerInterval
let timeLeft = 60
let timerRunning = false
let score = 0 // Inicializa a pontuação

const startButton = document.getElementById('startButton')
const timeDisplay = document.getElementById('time')
const winModal = document.getElementById('winModal')
const finalTimeDisplay = document.getElementById('finalTime')
const remainingTimeDisplay = document.getElementById('remainingTime')
const finalScoreDisplay = document.getElementById('finalScore') // Novo elemento para a pontuação
const closeButton = winModal.querySelector('.close-button')

startButton.addEventListener('click', startTimer)
closeButton.addEventListener('click', closeModal)
window.addEventListener('click', clickOutsideModal)

const RevelarCard = emoji.sort(() => (Math.random() > 0.5 ? 2 : -1))
for (let i = 0; i < emoji.length; i++) {
	let box = document.createElement('div')
	box.className = 'box'
	box.innerHTML = RevelarCard[i]
	box.onclick = handleClick
	document.querySelector('.game').appendChild(box)
}

function startTimer() {
	if (timerRunning) return
	timerRunning = true
	startButton.disabled = true
	timeLeft = 60
	timeDisplay.textContent = timeLeft
	score = 0 // Reseta a pontuação ao iniciar o timer

	timerInterval = setInterval(() => {
		timeLeft--
		timeDisplay.textContent = timeLeft

		if (timeLeft <= 0) {
			stopTimer()
			alert('Você perdeu! O tempo acabou.')
		}
	}, 1000)
}

function stopTimer() {
	clearInterval(timerInterval)
	timerRunning = false
	startButton.disabled = false
}

function showWinModal() {
	finalTimeDisplay.textContent = 60 - timeLeft
	remainingTimeDisplay.textContent = timeLeft
	finalScoreDisplay.textContent = score // Exibe a pontuação no modal
	winModal.style.display = 'flex'
}

function closeModal() {
	winModal.style.display = 'none'
}

function clickOutsideModal(event) {
	if (event.target === winModal) {
		closeModal()
	}
}

function handleClick() {
	if (!timerRunning) {
		startTimer()
	}
	if (OpenCard.length < 2) {
		this.classList.add('Openbox')
		OpenCard.push(this)
	}
	if (OpenCard.length === 2) {
		setTimeout(checkMatch, 500)
	}
}

function checkMatch() {
	if (OpenCard[0].innerHTML === OpenCard[1].innerHTML) {
		OpenCard[0].classList.add('Boxmatch')
		OpenCard[1].classList.add('Boxmatch')
		score += 10 // Adiciona 10 pontos por acerto
	} else {
		OpenCard[0].classList.remove('Openbox')
		OpenCard[1].classList.remove('Openbox')
		score -= 3 // Remove 3 pontos por erro
		if (score < 0) {
			score = 0 // Garante que a pontuação não seja negativa
		}
	}
	OpenCard = []

	if (document.querySelectorAll('.Boxmatch').length === emoji.length) {
		stopTimer()
		showWinModal()
	}
}
