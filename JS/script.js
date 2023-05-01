  // VARIAVEIS QUE VAO VER USADAS //
const inputAdicao = document.querySelector(".input__insert")
const minhaUL = document.querySelector(".list")
const btnDeletar = document.querySelector(".deletar")
const formulario = document.querySelector('.insert')

// const btnAdicao = document.querySelector(".btn__insert")


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


// função que cria o layout
const criaLI = ({ id, description, status }) => {
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
      <input type="text" value=${description} class='input'>
    </label>
    <button type="button" class="button button__edit editar" value="${id}"><img class="img__button editar__img" src="./SVG/editar.svg"></button>
    <button type="submit" class="button button__edit salvar disabled" value="${id}"><img class="img__button salvar__img" src="./SVG/save.svg"></button>
  </form>
  <button class="button deletar" value="${id}"><img class="img__button img__deletar" src="./SVG/delete.svg"></button>
  <button class="button fechar disabled" value="${id}"><img class="img__button img__fechar" src="./SVG/delete.svg"></button>
</li>`
}

// ATUALIZA A UL COM AS LI CRIADAS QUE FORAM PRO BACK ---
const updateList = (data) => {
  minhaUL.innerHTML = data.map((item) => {

    return criaLI(item)

  }).join("")
  setEventEdit()
  setEventChange()
  setEventDelete()
  setEventSubmit()

}


// Identifica erro no value input ---
const validaInput = (value) => {
  if (!!value.trim()) {
    inputAdicao.classList.remove('error')
    return true
  }

  inputAdicao.classList.add('error')
  return false
}

const setEventChange = () => {
  const checks = document.querySelectorAll('.check')
  checks.forEach(check => {
    check.addEventListener('change', async (event) => {
      const isChecked = event.target.checked
      const id = event.target.value
      const returnPut = await apiPUT(id, '', isChecked)
      console.log(returnPut)
      updateList(returnPut)
    })
  })
}

const setEventEdit = () => {
  const btnEditar = document.querySelectorAll(".editar")
  btnEditar.forEach(btn => {
    btn.addEventListener("click", (event) => {
      const id = event.target.value
      const list = document.querySelectorAll(`.list__${id} label`)
      const buttons = document.querySelectorAll(`.list__${id} .button__edit`)
      
      
      list.forEach(item => {
        item.classList.toggle('disabled')
      })
      buttons.forEach(button => {
        button.classList.toggle('disabled')
      })

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
      if (!validaInput(valueInput)) {
        return
      }
      
      const returnPut = await apiPUT(id, valueInput)
      updateList(returnPut)
    })
  })
}

const setEventDelete = () => {
  const btnDelete = document.querySelectorAll(".deletar")
  btnDelete.forEach(btn => {
    btn.addEventListener("click", async (event) => {
      const id = event.target.value
      const returnDELETE = await apiDELETE(id)
      updateList(returnDELETE)
    })
  }
  
  )
}

// ADICIONA ITEM NA LISTA DO BACK NO CLICK DO BOTÃO --- (POST NA API)
formulario.addEventListener("submit", async (event) => {
  event.preventDefault()

  const valueInput = event.target.children[0].value

  //ABORTA O SUBMIT SE VALUE FALSE ---
  if (!validaInput(valueInput)) {
    return
  }


  inputAdicao.value = ""

  const returnPost = await apiPOST(valueInput)
  updateList(returnPost)
})


//GUARDA TUDO QUANDO CARREGA PAGINA
window.onload = async () => {

  const data = await apiGET()

  console.log(data);

  updateList(data)
}
