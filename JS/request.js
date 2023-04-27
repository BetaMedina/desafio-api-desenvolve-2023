const container = document.querySelector('.container')


// container.addEventListener('click', () => {
//   if (container.checked === true) {
//     container.add
//     console.log('ta marcado princesa')
//   } else (console.log('ainda nao marcou vacilão'))

// })
// // console.log(naoSei())



// const editaLI = ({ id }) => {
//   const elemento = document.getElementById(id)

//   if (container.checked) {
//     elemento.parentElement.
//       console.log('ta marcado princesa')
//   } else (console.log('ainda nao marcou vacilão'))


// }

container.addEventListener('click', () => {
  let item = document.forms[0];

  for (i = 0; i < item.length; i++) {
    if (item[i].checked) {
      item[i].setAttribute("checked", "")
      console.log('adicionado');
    } else {
      item[i].removeAttribute("checked", "")
      console.log('removido');
    }
  }
})