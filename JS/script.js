// VARIAVEIS QUE VAO VER USADAS //
const inputAdicao = document.querySelector(".input__insert")
const formulario = document.querySelector('.insert')


const api = async ({ method, body, id = '' }) => {

  const response = await fetch(`http://localhost:3000/tasks/${id}`, {
    method,
    body,
  });
  return await response.json();
}

const apiGET = async () => {
  return await api({ method: "GET" })
}

const apiPOST = async (description) => {
  const object = {
    status: false,
    description
  }
  return await api({ method: "POST", body: JSON.stringify(object) })
}

const apiPUT = async (id, description, status) => {

  const object = {
    status,
    description,
  }
  return await api({ method: "PUT", body: JSON.stringify(object), id })
}

const apiDELETE = async (id) => {
  return await api({ method: "DELETE", id })
}

// IDENTIFICA ERRO NO INPUT DE ADIÇÃO ---
const validationInput = (value) => {
  console.log('value: ', value);
  if (!!value.trim()) {
    inputAdicao.classList.remove('error')
    return true
  }

  inputAdicao.classList.add('error')
  return false
}

// FUNÇÃO QUE CRIA O LAYOUT DA LI ---
const createLI = ({ id, description, status }) => {
  // verifica status de concluida
  const checked = status ? "checked" : ""

  return `<li id=${id} class="list__itens list__${id}">
  <label class="container">
    <input type="checkbox" value=${id} ${checked} class='check'>
    <span class="checkmark"></span>
    <p>${description}</p>
  </label>
  <form class="update">
    <label class="container disabled">
    <input type="text" value=${description} class='input input__edit'>
  </label>
  <button type="button" class="button button__edit editar " value="${id}"><img class="img__button editar__img" src="./SVG/editar.svg"></button>
  <button type="submit" class="button button__save salvar disabled" value="${id}"><img class="img__button salvar__img" src="./SVG/save.svg"></button>
</form>
<button class="button button__delet" value="${id}"><img class="img__button img__deletar" src="./SVG/delete.svg"></button>
<button class="button button__cancel disabled" value="${id}"><img class="img__button img__cancel" src="./SVG/cancel.svg"></button> 
</li>`
}

// ATUALIZA A UL COM AS LI CRIADAS QUE FORAM PRO BACK ---
const updateList = (data) => {
  const minhaUL = document.querySelector(".list")
  minhaUL.innerHTML = data.map((item) => {

    return createLI(item)

  }).join("")
  setEventEdit()
  setEventChange()
  setEventDelete()
  setEventSubmit()
  setEventCancel()
}

const setEventChange = () => {
  const checks = document.querySelectorAll('.check')

  checks.forEach(check => {
    check.addEventListener('change', async (event) => {

      const isChecked = event.target.checked
      const id = event.target.value
      const returnPut = await apiPUT(id, '', isChecked)

      // console.log(returnPut)
      updateList(returnPut)
    })
  })
}

const setEventEdit = () => {
  const buttonsEdit = document.querySelectorAll(".button__edit")

  buttonsEdit.forEach(btn => {
    btn.addEventListener("click", (event) => {
      const id = event.target.value
      const list = document.querySelectorAll(`.list__${id} label`)
      const buttonsSave = document.querySelectorAll(`.list__${id} .button__save`)
      const buttonsTrash = document.querySelectorAll(`.list__${id} .button__delet`)
      const buttonsCancel = document.querySelectorAll(`.list__${id} .button__cancel`)
      // const inputEdit = document.querySelectorAll(".input__edit")

      btn.classList.toggle('disabled')

      list.forEach(item => {
        item.classList.toggle('disabled');
      })

      // inputEdit.forEach(item => {
      //   item.setAttribute('autofocus', '');
      // })

      buttonsSave.forEach(button => {
        button.classList.toggle('disabled')
      })

      buttonsTrash.forEach(button => {
        button.classList.toggle('disabled')
      })

      buttonsCancel.forEach(button => {
        button.classList.toggle('disabled')
      })


      list.value = ""

    })
  })
}

const setEventSubmit = () => {
  const formularioUpdate = document.querySelectorAll('.update')

  formularioUpdate.forEach(form => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault()

      const valueInput = event.target.children[0].children[0].value
      const id = event.target.children[2].value

      //ABORTA O SUBMIT SE VALUE FALSE ---
      if (!validationInput(valueInput)) {
        return
      }

      const returnPut = await apiPUT(id, valueInput)
      const ul = document.querySelector('.list')
      const filho = ul.children[id - 1];

      ul.replaceChild(updateLi(returnPut), filho)

      setEventEdit()
      setEventChange()
      setEventDelete()
      setEventSubmit()
      setEventCancel()
    })
  })
}

const setEventDelete = () => {
  const btnDelete = document.querySelectorAll(".button__delet")
  btnDelete.forEach(btn => {
    btn.addEventListener("click", async (event) => {
      const id = event.target.value
      const returnDELETE = await apiDELETE(id)
      updateList(returnDELETE)
    })
  }

  )
}

const setEventCancel = () => {

  const buttonsCancel = document.querySelectorAll('.button__cancel')

  buttonsCancel.forEach(btn => {
    btn.addEventListener("click", (event) => {
      const id = event.target.value
      const list = document.querySelectorAll(`.list__${id} label`)
      const buttonsEdit = document.querySelectorAll(`.list__${id} .button__edit`)
      const buttonsSave = document.querySelectorAll(`.list__${id} .button__save`)
      const buttonsTrash = document.querySelectorAll(`.list__${id} .button__delet`)

      btn.classList.toggle('disabled')

      list.forEach(item => {
        item.classList.toggle('disabled')
      })

      buttonsEdit.forEach(button => {
        button.classList.toggle('disabled')
      })

      buttonsSave.forEach(button => {
        button.classList.toggle('disabled')
      })

      buttonsTrash.forEach(button => {
        button.classList.toggle('disabled')
      })
    })
  })
}

// ADICIONA ITEM NA LISTA DO BACK NO CLICK DO BOTÃO ---
formulario.addEventListener("submit", async (event) => {
  event.preventDefault()

  const valueInput = event.target.children[0].value

  // ABORTA O SUBMIT SE VALUE FALSE ---
  if (!validationInput(valueInput)) {
    return
  }

  inputAdicao.value = ""

  const returnPost = await apiPOST(valueInput)
  updateList(returnPost)
})

// CARREGA A PÁGINA COM O QUE JÁ TEM ---
window.onload = async () => {

  const data = await apiGET()

  console.log(data);

  updateList(data)
}

const updateLi = ({ id, description, status }) => {
  // verifica status de concluida
  const checked = status ? "checked" : ""
  const newLi = document.createElement("li")
  newLi.setAttribute('class', `list__itens list__${id}`)
  newLi.setAttribute('id', id)

  newLi.innerHTML = `<label class="container">
  <input type="checkbox" value=${id} ${checked} class='check'>
  <span class="checkmark"></span>
  <p>${description}</p>
</label>
<form class="update">
  <label class="container disabled">
    <input type="text" value=${description} class='input input__edit'>
  </label>
  <button type="button" class="button button__edit editar " value="${id}"><img class="img__button editar__img" src="./SVG/editar.svg"></button>
  <button type="submit" class="button button__save salvar disabled" value="${id}"><img class="img__button salvar__img" src="./SVG/save.svg"></button>
</form>
<button class="button button__delet" value="${id}"><img class="img__button img__deletar" src="./SVG/delete.svg"></button>
<button class="button button__cancel disabled" value="${id}"><img class="img__button img__cancel" src="./SVG/cancel.svg"></button>`

  return newLi
}