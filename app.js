const startBtn = document.querySelector('#start')            //с помощью класса добавляем стилистику, а id - добавляем элементы в JavaScript
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['red', 'pink', 'yellow', 'green', 'blue', 'orange']
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()                                    // чтобы хэштег не показывался, который есть здесь: <a href="#" ... itd. (потом нужно удалить # в браузере)
    screens[0].classList.add('up')                                             //screens это массив - при клике меняем экран
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {      //делегирование событий
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')                            //работаем на втором экране
        startGame()
    }           
})                                                          //если у элемента есть класс btn, то это и есть кнопка

    board.addEventListener('click', event => {          //обрабатываем клик только по кружочку
        if (event.target.classList.contains('circle')) {
            score++
            event.target.remove()                           //удалить кружочек
            createRandomCircle()
        }

    })


function startGame() {
    setInterval(decreaseTime, 1000)                         //каждую секунду, то есть 100 мс
    createRandomCircle() 
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {                                   //если время уже вышло
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
          current = `0${current}`                         //чтобы красиво смотрелось добавляем спереди 0
    }
    
    setTime(current)
    }
 }
function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.remove()                      //когда заканчивается игра, убираем текст "Осталось..."
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`                        //или: timeEl.parentNode.classList.add('hide')
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const color = setColor(circle)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)              //чтобы кружочек поместился на доске
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`                         //задаем ширину для круга
    circle.style.height = `${size}px`                        //высоту
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}

function setColor(element) {
    const color = getRandomColor()
    element.style.background = color
}
//чтобы сразу оказаться на 3 странице надо в HTML добавить класс screen up в дивы, в последнем оставить screen - ЭТО КОГДА ПИШЕМ, ЧТОБЫ БЫЛО УДОБНО. В КОНЦЕ СТАВИМ ВЕЗДЕ screen

function winTheGame() {
     function kill() {
        const circle = document.querySelector('.circle')

        if (circle) {
          circle.click()    
        }
    }

    setInterval(kill, 75)               // ставим количество мс, через которые хотим запускать переданную функцию
}    