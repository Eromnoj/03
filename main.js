const pupil1 = document.querySelector('#pupil1')
const pupil2 = document.querySelector('#pupil2')
const eyes = document.querySelector('#eyes')
const eyebrow1 = document.querySelector('#eyebrow1')
const eyebrow2 = document.querySelector('#eyebrow2')
const glasses = document.querySelector('#glasses')

const mouvPupil = (element, listener, scope) => {

  let XOrigin = Math.round(element.getBoundingClientRect().x) + (Math.round(element.getBoundingClientRect().width / 2))
  let YOrigin = Math.round(element.getBoundingClientRect().y) + (Math.round(element.getBoundingClientRect().height / 2))
  let XRelPos
  let YRelPos

  if (listener.clientX <= XOrigin) {
    XRelPos = (XOrigin - listener.clientX) * - 1
  }
  else {
    XRelPos = listener.clientX - XOrigin
  }

  if (listener.clientY <= YOrigin) {
    YRelPos = (YOrigin - listener.clientY) * - 1
  }
  else {
    YRelPos = listener.clientY - YOrigin
  }

  element.style.transform = `translateX(${XRelPos * scope}px) translateY(${YRelPos * scope}px)`
}

const mouvEye = (element, listener, scope) => {
  let YOrigin = Math.round(element.getBoundingClientRect().y) + (Math.round(element.getBoundingClientRect().height / 2))
  let YRelPos

  if (listener.clientY <= YOrigin) {
    YRelPos = (YOrigin - listener.clientY) * - 1
  }
  else {
    YRelPos = listener.clientY - YOrigin
  }

  element.style.transform = `translateY(${YRelPos * scope}px)`

}

window.addEventListener('mousemove', (e) => {

  mouvPupil(pupil1, e, 0.05)
  mouvPupil(pupil2, e, 0.05)
  mouvEye(eyes, e, 0.05)
  mouvEye(eyebrow1,e, 0.01)
  mouvEye(eyebrow2,e, 0.01)
})

glasses.addEventListener('mouseenter', () => {
  glasses.classList.add('tickle')
  setTimeout(() => glasses.classList.remove('tickle'), 1000)
})
