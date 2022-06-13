const pupil1 = document.querySelector('#pupil1')
const pupil2 = document.querySelector('#pupil2')
const eyes = document.querySelector('#eyes')
const eyebrow1 = document.querySelector('#eyebrow1')
const eyebrow2 = document.querySelector('#eyebrow2')
const glasses = document.querySelector('#glasses')

const item3 = document.querySelector('.item-3')
const contact = document.querySelector('.contact')
const contactDown = document.querySelector('.contactdown')

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
  mouvEye(eyebrow1, e, 0.01)
  mouvEye(eyebrow2, e, 0.01)
})

glasses.addEventListener('mouseenter', () => {
  glasses.classList.add('tickle')
  setTimeout(() => glasses.classList.remove('tickle'), 1000)
})

item3.addEventListener('mouseover', () => {
  if (item3.textContent !== 'Close') {

    item3.classList.add('falldown')
    contact.classList.add('contact-anim')
    setTimeout(() => {
      item3.classList.add('contactdown')
      item3.textContent = 'Close'
    }, 2000)
  }
})
item3.addEventListener('click', () => {
  if (item3.textContent !== 'Contact') {

    contact.classList.remove('contact-anim')
    item3.textContent = 'Contact'
    setTimeout(() => {
      item3.classList.remove('contactdown')
      item3.classList.remove('falldown')
      item3.classList.add('contactup')
    }, 1000)
    setTimeout(() => {
      item3.classList.remove('contactup')
    }, 2000)
  }
})

