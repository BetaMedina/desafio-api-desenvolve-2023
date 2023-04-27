// VARIAVEIS QUE VAO VER USADAS //
const inputAdicao = document.querySelector(".input__insert")
const minhaUL = document.querySelector(".list")
const btnDeletar = document.querySelector(".deletar")
const formulario = document.querySelector('.insert')
const container = document.querySelector('.container')
// const btnAdicao = document.querySelector(".btn__insert")
// const btnEditar = document.querySelector(".editar")


const api = async ({ method, body }) => {

  const response = await fetch('http://localhost:3000/tasks', {
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


// função que cria o layout
const criaLI = ({ id, description, status }) => {
  // verifica status de concluida
  const checked = status ? "checked" : ""

  return `<li id=${id} class="list__itens">
  <label class="container">
    <input type="checkbox" ${checked} class='container'>
    <span class="checkmark"></span>
    <p>${description}</p>
  </label>
  <!--<img class="editar" src="./SVG/editar.svg"> -->
  <button class="deletar" value="${id}"><img class="img__deletar" src="./SVG/delete.svg"></button>
</li>`
}

// ATUALIZA A UL COM AS LI CRIADAS QUE FORAM PRO BACK ---
const updateList = (data) => {
  minhaUL.innerHTML = data.map((item) => {

    return criaLI(item)

  }).join("")

}




// Identifica erro no value input ---
const validaInput = (value) => {
  if (!!value.trim()) {
    inputAdicao.classList.remove('error')
    return true
  }

  inputAdicao.classList.add('error')
  return false
  // console.log('fez cagada amigo!')
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
  // console.log('returnPost: ', returnPost);
})


//GUARDA TUDO QUANDO CARREGA PAGINA
window.onload = async () => {

  const data = await apiGET()

  console.log(data);

  updateList(data)
}

container.addEventListener()