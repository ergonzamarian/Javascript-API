//Sincrona = Resposta imediata => Uma tarefa é concluida após a outra
//Assincrona = demora em resposta => Há tarefas executadas em "segundo plano"
//Resolver problemas com this utilizando uma declaração de that, paa isso basta declarar o that atribuindo this
// const that = this;
// that.variavel = 0;  ...

async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = ""
    try{
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        var consultaCEPConvertida = await consultaCEP.json();

        if(consultaCEPConvertida.erro){
            throw Error('CEP inexistente!');
        }
        var cidade = document.getElementById('cidade');
        var logradouro = document.getElementById('endereco');
        var bairro = document.getElementById('bairro');
        var estado = document.getElementById('estado');

        // mudando os valores dos elementos do html com os valores de retorno do json
        cidade.value = consultaCEPConvertida.localidade;
        logradouro.value = consultaCEPConvertida.logradouro;
        bairro.value = consultaCEPConvertida.bairro;
        estado.value = consultaCEPConvertida.uf;

        console.log(consultaCEPConvertida)
        return consultaCEPConvertida;

    }catch(erro){
        mensagemErro.innerHTML = `<p>O CEP informado não existe!</p>`
        console.log(erro)
    }

}

var cep = document.getElementById('cep');
// focusout = se o usuário clicar no campo e depois em qualquer lugar da tela
cep.addEventListener("focusout", () => buscaEndereco(cep.value));



// let ceps = ['01001000', '01001001']
// criando um novo array com o que retornar 
// da função buscaEndereco para cada um dos valores dentro do cep
// e esses valores são promessas que precisamos resolver com Promise.all
// let conjuntoCeps = ceps.map(valores => buscaEndereco(valores));
// console.log(conjuntoCeps)
// Promise.all(conjuntoCeps).then(respostas => console.log(respostas));