//Sincrona = Resposta imediata => Uma tarefa é concluida após a outra
//Assincrona = demora em resposta => Há tarefas executadas em "segundo plano"
//Resolver problemas com this utilizando uma declaração de that, paa isso basta declarar o that atribuindo this
// const that = this;
// that.variavel = 0;  ...

async function buscaEndereco(cep) {
    try{
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        var consultaCEPConvertida = await consultaCEP.json();

        if(consultaCEPConvertida.erro){
            throw Error('CEP inexistente!');
        }

        return consultaCEPConvertida;

    }catch(erro){
        console.log(erro)
    }

}

let ceps = ['79117013', '79116570', '01001000', '01001001']

// criando um novo array com o que retornar 
// da função buscaEndereco para cada um dos valores dentro do cep
// e esses valores são promessas que precisamos resolver com Promise.all
let conjuntoCeps = ceps.map(valores => buscaEndereco(valores));
console.log(conjuntoCeps)
Promise.all(conjuntoCeps).then(respostas => console.log(respostas));