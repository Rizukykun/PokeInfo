var vetorTipos = [];
var vetorNumeros = [];
var contador = 0;
var thisChart;
var chart;
var tipoAtual = parent.document.URL.substring(parent.document.URL.indexOf('?'), parent.document.URL.length);

function callAPI(tipo) {

    var theURL = "https://pokeapi.co/api/v2/type/" + tipo + "/"; //A URL

    fetch(theURL)
        .then(req => req.json())
        .then(show => populaTabela(show));

}



function callFor() { //função para chamar a API 18 vezes com url diferentes

    for (var int = 1; int < 19; int++) {
        callAPI(int);
    }

}

function populaTabela(jsonObj) {
    const tbodyTag = document.getElementById("tableData"); //encontra o table body com o id tabledata


    let trTag = document.createElement('tr'); //cria um table row
    let tdTagChave = document.createElement('td'); //cria um tabledata
    let tdTagValor = document.createElement('td'); //cria um tabledata

    tdTagChave.innerHTML = jsonObj['name']; //acha o parametro name no json
    vetorTipos.push(tdTagChave.textContent);
    trTag.appendChild(tdTagChave); // liga o tabledata ao tablerow

    tdTagValor.innerHTML = jsonObj['pokemon'].length; //acha o tamanho do parametro pokemon no Json
    vetorNumeros.push(tdTagValor.textContent);
    trTag.appendChild(tdTagValor);

    tbodyTag.appendChild(trTag);
    contador++;
    if (contador == 18) {
        criaGrafico();
    }

}

function ligaTudo() {
    var habiliTabela = document.querySelectorAll('.ligaki');
    for (var i = 0; i < habiliTabela.length; i++)
        habiliTabela[i].style.display = 'contents';
    var desabilibotao = document.getElementById("btn");
    desabilibotao.style.display = 'none';
}

function criaGrafico() {
    const labels = vetorTipos;
    const data = {
        labels: labels,
        datasets: [{
            label: 'My First dataset',
            backgroundColor: ['#ada594',
                '#a55239',
                '#9cadf7',
                '#b55aa5',
                '#d6b55a',
                '#bda55a',
                '#adbd21',
                '#6363b5',
                '#adadc6',
                '#f75231',
                '#399cff',
                '#7bce52',
                '#ffc631',
                '#ff73a5',
                '#5acee7',
                '#7b63e7',
                '#735a4a',
                '#f7b5f7',
            ],
            data: vetorNumeros,
        }]
    };

    var myChart = new Chart(
        document.getElementById('myChart'),

        config = {
            type: 'pie',
            data: data,
            options: {
                //responsive: false,
                onClick: evt => {
                    var elements = myChart.getElementsAtEvent(evt);
                    var index = elements[0]._index;
                    tipoAtual = vetorTipos[index];
                    open("pokemon.html?" + tipoAtual);

                }
            }
        }

    );

}

function showPokemon() {

    tipoAtual = tipoAtual.replace("?", "");
    var theURL = "https://pokeapi.co/api/v2/type/" + tipoAtual + "/"; //A URL
    fetch(theURL)
        .then(req => req.json())
        .then(show => getPokemon(show));

}

function getPokemon(jsonObj) {

    var allPokes = jsonObj['pokemon'];
    for (var pokemon in allPokes) {
        newURL = "https://pokeapi.co/api/v2/pokemon/" + allPokes[pokemon].pokemon.name;
        fetch(newURL).then(req => req.json()).then(show => setPokemon(show));
    }

}

function setPokemon(jsonObj) {

    const tgBody = document.getElementById('buddy')

    let tgFig = document.createElement('figure');
    let tgImg = document.createElement('img');
    let tgFigC = document.createElement('figcaption');

    tgImg.src = jsonObj['sprites'].front_default;
    tgFig.appendChild(tgImg);

    tgFigC.textContent = jsonObj['name'];
    tgFig.appendChild(tgFigC);

    tgBody.appendChild(tgFig);

}

//transformar esse método em getType, em seguida usar ele para pegar um json em um método que vai se chamar getPokemon e por fim criar
//mais um método que fará um loop com o json de pokemon e exibirá todos os sprites com legendinha de nome.