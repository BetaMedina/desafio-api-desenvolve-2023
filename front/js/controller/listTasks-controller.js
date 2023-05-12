import { toListTasks } from "../cliente-service"

const criaNovaLinha = (description, statusTask, id) =>  { 
    const linhaNovoCliente = document.createElement("ul")
    const conteudo = `
                        <li class="line-task" id="${id}">
                            <p class="description-class">${description}</p>
                            <button class="btn-check-task" data-status="${statusTask}">X</button>
                        </li>
                    `
    linhaNovoCliente.innerHTML = conteudo
    linhaNovoCliente.dataset.id = id
    return linhaNovoCliente
}

const tasksList = document.querySelector('[data-todolist]')

toListTasks()
.then(data => {
        data.forEach(elemento => {
        tasksList.appendChild(criaNovaLinha(elemento.description, elemento.statusTask))
    })
}) 