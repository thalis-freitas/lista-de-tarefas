let input = document.getElementById('input')
let list = document.getElementById('list')
let tasks = []
let btnAdd = document.getElementById('add')
let btnClean = document.getElementById('clean')

function clearInput(){
    input.value = ''
}

btnAdd.addEventListener('click', function add(){
    if (input.value.trim() != 0){
        tasks.push(input.value)
        str = JSON.stringify(tasks)
        list.innerHTML += `<li data-name= ${input.value}>${input.value}<button class='deletar-tarefa' onclick='deleteTask(this)' style='background-image: url(./imagens/icone-lixo.png)'></button></li>`
        localStorage.setItem('tasks', str)
        clearInput()
    }else{
        alert('Não é possível adicionar uma tarefa sem conteúdo')
    }
})

btnClean.addEventListener('click', function clean(){
    if (tasks.length == 0){
        alert('A lista de tarefas já está vazia')
    }else if(confirm('Deseja mesmo excluir todas as tarefas?') == true){
        localStorage.clear('tasks')
        list.innerHTML = null
        tasks = []
        clearInput()
    }
})

onload = function(){
    tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks === null ? tasks = [] : tasks
    tasks.forEach(function(i) {
        list.innerHTML += `<li data-name=${i}>${i}<button class='deletar-tarefa' onclick='deleteTask(this)' style='background-image: url(./imagens/icone-lixo.png)'></button></li>`
    })
}

function deleteTask(trashIcon) {
    let li = trashIcon.parentElement
    let i = li.dataset.name
    for (let index in tasks) {
        i == tasks[index] ? tasks.splice(index, 1) : tasks
    }
    trashIcon.parentElement.remove()
    localStorage.setItem('tasks', JSON.stringify(tasks))
}