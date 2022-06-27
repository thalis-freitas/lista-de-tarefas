
let texto = document.getElementById("inputTextoTarefa")
let lista = document.getElementById("lista")
let tarefas = [];


// Função que irá exibir as tarefas armazenadas com o localStorage quando a página for carregada/atualizada

onload = function(){

    tarefas = JSON.parse(localStorage.getItem("tarefas"))
   
    if (tarefas === null){
        tarefas = []
    }
    
    tarefas.forEach(function(index) {

        let conteudoLista = "<li name='" + index + "'>" + index + "<button class='deletar-tarefa' onclick='deletarTarefa(this)' style='width: 32px; height:32px; background-color: transparent; border: none; background-image: url(./imagens/icone-lixo.png); cursor: pointer '>" + " " + "</button>" + "</li>"

        lista.innerHTML += conteudoLista
    });

    }

// Função para adicionar uma nova tarefa no array tarefas quando o botão + for clicado
function adicionar(){

    if (texto.value.trim() != 0){
    tarefas.push(texto.value)

    valor = JSON.stringify(tarefas)

    let conteudoLista = "<li name='" + texto.value + "'>" + texto.value + "<button class='deletar-tarefa' onclick='deletarTarefa(this)' style='width: 32px; height:32px; background-color: transparent; border: none; background-image: url(./imagens/icone-lixo.png); cursor: pointer; '>" + " " + "</button>" + "</li>"

    lista.innerHTML += conteudoLista

    localStorage.setItem("tarefas", valor)

    limparInput()
    }
    else{
        alert("Não é possível adicionar uma tarefa sem conteúdo")
    }

}

function limparInput(){
    texto.value = ''
}

// Função para excluir todas as tarefas armazenadas quando o botão Limpar for clicado
function limparTudo(){

    if (tarefas.length == 0){
        alert("A lista de tarefas já está vazia")
    }  
    else{
    let confirmar = confirm("Deseja mesmo excluir todas as tarefas?")
    
        if(confirmar == true){
            localStorage.clear("tarefas")
            lista.innerHTML = null
            texto.value = ''
            tarefas = []
        }
    }
}

// Função que irá deletar uma tarefa específica correspondente com o ícone de lixeira que foi clicado
function deletarTarefa(iconeLixeira) {

    let li = iconeLixeira.parentElement

    let nome = String(li.getAttribute('name'))

    for (let value in tarefas) {
        if (nome === tarefas[value]) {
            tarefas.splice(value, 1)
        }
    }

    index = document.getElementsByTagName("li")

    iconeLixeira.parentElement.remove()

    valor = JSON.stringify(tarefas)

    localStorage.setItem("tarefas", valor)

}


