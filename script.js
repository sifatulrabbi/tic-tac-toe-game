const gameBoard = document.getElementById('gameBoard')
const cellElements = document.querySelectorAll('[data-cell]')
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
]
const resultWindow = document.getElementById('result')
const resultWindowMessage = document.querySelector('[data-result-message]')
const resetButton = document.getElementById('resetButton')
let circleTurn, currentCLass, win

startGame()

resetButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = false
  win = false

  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS, CIRCLE_CLASS)
    cell.removeEventListener('click', setMark)
    cell.addEventListener('click', setMark, { once: true })
  })

  setHoverEffect()
  resultWindow.classList.remove('show')
}

function setHoverEffect() {
  currentCLass = circleTurn ? CIRCLE_CLASS : X_CLASS
  gameBoard.classList.remove(X_CLASS, CIRCLE_CLASS)
  gameBoard.classList.add(currentCLass)
}

function setMark(e) {
  const currentCell = e.target
  currentCell.classList.add(currentCLass)

  circleTurn = !circleTurn
  checkWin(currentCLass)
  setHoverEffect()
}

function checkWin(currentClass) {
  if (matchCombination(currentClass)) {
    win = true
    showResult()
  } else if (isDraw()) {
    win = false
    showResult()
  }
}

function matchCombination(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function showResult() {
  if (win) {
    resultWindowMessage.innerText = `${circleTurn ? 'X' : 'O'} Win!`
  } else {
    resultWindowMessage.innerText = 'Draw!'
  }
  resultWindow.classList.add('show')
}
