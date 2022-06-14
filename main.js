const pupil1 = document.querySelector('#pupil1')
const pupil2 = document.querySelector('#pupil2')
const eyes = document.querySelector('#eyes')
const eyebrow1 = document.querySelector('#eyebrow1')
const eyebrow2 = document.querySelector('#eyebrow2')
const glasses = document.querySelector('#glasses')

const item3 = document.querySelector('.item-3')
const contact = document.querySelector('.contact')
const contactDown = document.querySelector('.contactdown')

const mouvPupil = (element, listener, scope) => {//mouvement of pupils
  // Getting the coordinates of the center of the element and making it the origin of reference
  let XOrigin = Math.round(element.getBoundingClientRect().x) + (Math.round(element.getBoundingClientRect().width / 2))
  let YOrigin = Math.round(element.getBoundingClientRect().y) + (Math.round(element.getBoundingClientRect().height / 2))

  //Gettin thecoordinates of the cursor based on the center of the pupil
  let XRelPos = listener.clientX <= XOrigin ? (XOrigin - listener.clientX) * - 1 : listener.clientX - XOrigin
  let YRelPos = listener.clientY <= YOrigin ? (YOrigin - listener.clientY) * - 1 : listener.clientY - YOrigin
  // Apply the change taking account of the scope : value 0 to 10, 1 being on the cursor
  scope = (scope <= 0 || scope > 10 ? 5 : scope) / 100
  element.style.transform = `translateX(${XRelPos * scope}px) translateY(${YRelPos * scope}px)`
}

const mouvEye = (element, listener, scope) => { //same as above, but just on the Y axis
  let YOrigin = Math.round(element.getBoundingClientRect().y) + (Math.round(element.getBoundingClientRect().height / 2))
  let YRelPos = listener.clientY <= YOrigin ? (YOrigin - listener.clientY) * - 1 : listener.clientY - YOrigin
  scope = (scope <= 0 || scope > 10 ? 5 : scope) / 100
  element.style.transform = `translateY(${YRelPos * scope}px)`
}

//Listeners for the svg of the landing page :
// -follow the cursor with the eyes
window.addEventListener('mousemove', (e) => {
  mouvPupil(pupil1, e, 5)
  mouvPupil(pupil2, e, 5)
  mouvEye(eyes, e, 5)
  mouvEye(eyebrow1, e, 1)
  mouvEye(eyebrow2, e, 1)
})
// -slight mouvement of the glasses when cursor touches them
glasses.addEventListener('mouseenter', () => {
  glasses.classList.add('tickle')
  setTimeout(() => glasses.classList.remove('tickle'), 1000)
})
// animations of the contact button
item3.addEventListener('mouseover', () => { //mouse over
  if (item3.textContent !== 'Close') {//prevent over on button if form is open
    item3.classList.add('falldown') //animation of the button
    contact.classList.add('contact-anim-open') //animation of the form
    contact.classList.remove('contact-anim-close') //remove class for toggle
    setTimeout(() => { // timeout waiting the end of the animation (see Sass file) to set state 
      contact.classList.remove('contact-closed')
      item3.classList.add('contactdown')
      item3.textContent = 'Close'
      item3.style.padding = '10px 31.5px'
    }, 1000)
    setTimeout(() => contact.classList.add('contact-fullScale'), 1100) //making sure this happens at the end
  }
})

item3.addEventListener('click', () => { //same logic as above (see Sass file for animations' keyframes)
  if (item3.textContent !== 'Contact') { //prevent click
    contact.classList.remove('contact-anim-open') //closing the form
    contact.classList.add('contact-anim-close')
    contact.classList.remove('contact-fullScale')
    item3.textContent = 'Contact'
    item3.style.padding = '10px 18px'
    setTimeout(() => contact.classList.add('contact-closed'), 490)
    setTimeout(() => {
      item3.classList.remove('contactdown') //moving the button up
      item3.classList.remove('falldown')
      item3.classList.add('contactup')
    }, 500)

    setTimeout(() => {
      item3.classList.remove('contactup')
    }, 1500)
  }
})

