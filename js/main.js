//Software para dimensionamento de equipamentos e projeto de sistemas fotovoltaicos
//Dimensionamento da potência do sistema em até 10kW
//A diferença entre consumo e custo de disponibilidade pode ser somente maior que 52

var investimento = { "tma":0,               //taxa mínima de atratividade - Poupança: 6.1% ,LCI: 9.8% -Anual
                     "decaimentoPainel":0,  //Decaimento anual da produção do painéis - 0.07
                     "arrayDecaimento":[],
                     "arrayEnergia":[],
                     "arrayTarifa":[],
                     "arrayCaixa":[],
                     "arrayCaixaPresente":[],
                     "tarifa":0.8,            //Tarifa de energia - R$/kWh - 0.80
                     "ajusteTarifa":0,      //Taxa de correção anual da tarida de energia 0.026 - 2.6%
                     "payback":0,           //Payback simples
                     "paybackDescontado":0, //Payback Descontado
                     "vpl":0,               //Valor presente líquido
                     "tir":0,               //Taxa Interna de Retorno
                     "custoPaineis":0,               //Custo total dos paineis
                     "custoInversor":0,             //Custo total dos Inversores
                     "precoCabeamento":0.75,          //preço da cabeamento em R$/kW;
                     "custoCabeamento":0,          //Custo total com cabeamento
                     "precoEstrutura":1.25,          //preço da estrutura em R$/kW;
                     "custoEstrutura":0,          //Custo total com estrutura
                     "custoTotal":0,          //Custo Total do sistema
                   };

//modelo para um painel solar fotovolaico
var painel =  { "potencia":0,
                 "Vmax":0,
                 "Vmin":0,
                 "correnteSC":0,
                 "nome":"",
                 "preco":0,
                 "imagem":"<center><img src='imagens/canadian.png' class='img-responsive center-block' alt='tabela'><center>"
               };
//modelo para o painel inserido pelo usuário
var painel1 =  { "potencia":0,
                "Vmax":0,
                "Vmin":0,
                "correnteSC":0,
                "nome":"",
                "preco":0,
                "imagem":"<center><img src='imagens/yingli.png' class='img-responsive center-block' alt='painel'></center>"
                };


var painel255 =  { "potencia":255,
                    "Vmax":37.4,
                    "Vmin":32.5,
                    "correnteSC":9,
                    "nome":"Canadian CSI CS6P-255P",
                    "preco":875,
                    "imagem":"<center><img src='imagens/canadian.png' class='img-responsive center-block' alt='painel'></center>"
                  };

var painel150 =  { "potencia":150,
                    "Vmax":37.4,
                    "Vmin":32.5,
                    "correnteSC":8.61,
                    "nome":"Yingli Solar YL150P",
                    "preco":415,
                    "imagem":"<center><img src='imagens/yingli.png' class='img-responsive center-block' alt='painel'></center>"
                  };

//Modelo(classe) para o arranjo fotovolaico
var arranjo = { "numSerie":0,
                "numParalelo":1,
                "Vmax":0,
                "Vmin":0,
                "Imax":0,
                "Imin":0, };
//Modelo(classe) para o sistema fotovolaico
 var sistema = { "potencia":0,
                 "potenciaNecessaria":0,
                 "diponibilidade":0,                //define o custo de disponibilidade do padrão de entrada [kWh]
                 "numPaineis":0,
                 "numInversores":1,
                 "TD":0.75,                         //Taxa de desempenho a priori é 0,75
                 "HSP":0,                           //Horas de Sol Pleno médias em Juiz de Fora. Medida em kWh/m² para um dia.
                 "consumoMensal":0,                 //Consumo médio Mensal em kWh
                 "consumoDiario":0,                 //Consumo médio diário em Wh
                 "MPPTativo":false,                 //Verifica está na faixa MPPT
                 "condicaoVmin":false,              //Verifica Vmin do arranjo com o Inversor
                 "condicaoVmax":false,              //Verifica Vmax do arranjo com o Inversor
                 "condicaoImax":false,              //Verifica Imax do arranjo com o Inversor
                 "condicaopotMaxEntrada":false,     //Verifica potencia do arranjo com o Inversor
                 "condicao":false,                  //Verifica se todos os requisitos estão corretos
                 "tester":false,                    //Variável teste
                 "precoTotal":0,                    //Preço do sistema
                 "energiaMensal":0,                        //Energia produzida mensalmente
                 "energiaAnual":0                        //Energia produzida anualmente
                };

var tutorial = { "potenciaNecessaria":0,
                "energiaMediaDiaria":0,                //define o custo de disponibilidade do padrão de entrada [kWh]
                "difMensalDisponibilidade":0,
                "difDiariaDisponibilidade":0,
                "numPaineis":0,
                "numInversores":1,
                "TD":0.75,                         //Taxa de desempenho a priori é 0,75
                "HSP":0,                           //Horas de Sol Pleno médias em Juiz de Fora. Medida em kWh/m² para um dia.
                "consumoMensal":0,                 //Consumo médio Mensal em kWh
                "consumoDiario":0,                 //Consumo médio diário em Wh
                "MPPTativo":false,                 //Verifica está na faixa MPPT
                "condicaoVmin":false,              //Verifica Vmin do arranjo com o Inversor
                "condicaoVmax":false,              //Verifica Vmax do arranjo com o Inversor
                "condicaoImax":false,              //Verifica Imax do arranjo com o Inversor
                "condicaopotMaxEntrada":false,     //Verifica potencia do arranjo com o Inversor
                "tma":0,                           //Taxa minima de atratividade
                "decaimentoPainel":0,
                "tester":false,                    //Variável teste
                "precoTotal":0,                    //Preço do sistema
                "energiaMensal":0,                        //Energia produzida mensalmente
                "energiaAnual":0                        //Energia produzida anualmente
               };





//Modelo(classe) para o Inversor
var inversor     = {  "potMaxEntrada":0,
                      "VmpptMin":0,
                      "VmpptMax":0,
                      "correnteMax":0,
                      "VMaxEntrada":0,
                      "VMinStart":0,
                      "preco":0,
                      "imagem":"<center><img src='imagens/canadian.png' class='img-responsive center-block' alt='painel'></center>"
                   };

var inversor260 = { "nome":"Microinversor i-Energy GT260",
                    "potMaxEntrada":265,
                    "VmpptMin":30,
                    "VmpptMax":50,
                    "correnteMax":10,
                    "VMaxEntrada":59,
                    "VMinStart":25,
                    "preco":1700,
                    "imagem":"<center><img src='imagens/inversor260.png' class='img-responsive center-block' alt='painel'></center>"
                  };

var inversor1300 = { "nome":"Inversor SMA Sunny Boy SB 1300TL-10",
                     "potMaxEntrada":1400,
                     "VmpptMin":115,
                     "VmpptMax":480,
                     "correnteMax":12,
                     "VMaxEntrada":600,
                     "VMinStart":120,
                     "preco":6290,
                     "imagem":"<center><img src='imagens/inversor1300.png' class='img-responsive center-block' alt='painel'></center>"
                   };

var inversor1500 = { "nome":"Inversor Fronius Galvo 1.5-1",
                     "potMaxEntrada":1600,
                     "VmpptMin":120,
                     "VmpptMax":335,
                     "correnteMax":13.3,
                     "VMaxEntrada":420,
                     "VMinStart":140,
                     "preco":8200,
                     "imagem":"<center><img src='imagens/fronius.png' class='img-responsive center-block' alt='painel'></center>"
                     };

var inversor2000 = { "nome":"Inversor Fronius Galvo 2.0-1",
                      "potMaxEntrada":2140,
                      "VmpptMin":120,
                      "VmpptMax":335,
                      "correnteMax":17.8,
                      "VMaxEntrada":420,
                      "VMinStart":140,
                      "preco":8400,
                      "imagem":"<center><img src='imagens/fronius.png' class='img-responsive center-block' alt='painel'></center>"
                      };

var inversor2500 = { "nome":"Inversor Fronius Galvo 2.5-1",
                   "potMaxEntrada":2650,
                   "VmpptMin":165,
                   "VmpptMax":440,
                   "correnteMax":16.6,
                   "VMaxEntrada":550,
                   "VMinStart":185,
                   "preco":8600,
                   "imagem":"<center><img src='imagens/fronius.png' class='img-responsive center-block' alt='painel'></center>"
                   };

var inversor3000 = { "nome":"Inversor Grid-tie Fronius Primo 3.0-1",
                      "potMaxEntrada":3000,
                      "VmpptMin":200,
                      "VmpptMax":800,
                      "correnteMax":20.7,
                      "VMaxEntrada":1000,
                      "VMinStart":80,
                      "preco":8400,
                      "imagem":"<center><img src='imagens/fronius.png' class='img-responsive center-block' alt='painel'></center>"
                      };

var inversor4000 = { "nome":"Inversor Fronius Primo 4.0-1",
                     "potMaxEntrada":4000,
                     "VmpptMin":210,
                     "VmpptMax":800,
                     "VMaxEntrada":1000,
                     "correnteMax":12,
                     "VMinStart":80,
                     "preco":9300,
                     "imagem":"<center><img src='imagens/fronius.png' class='img-responsive center-block' alt='painel'></center>"
                    };

var inversor5000 = {  "nome":"Inversor Fronius Primo 5.0-1",
                      "potMaxEntrada":5000,
                      "VmpptMin":240,
                      "VmpptMax":800,
                      "VMaxEntrada":1000,
                      "correnteMax":12,
                      "VMinStart":80,
                      "preco":10300,
                      "imagem":"<center><img src='imagens/fronius.png' class='img-responsive center-block' alt='painel'></center>"
                   };

var inversor6000 = { "nome":"Inversor Fronius Primo 6.0-1",
                     "potMaxEntrada":6000,
                     "VmpptMin":240,
                     "VmpptMax":800,
                     "VMaxEntrada":1000,
                     "correnteMax":18,
                     "VMinStart":80,
                     "preco":12000,
                     "imagem":"<center><img src='imagens/fronius.png' class='img-responsive center-block' alt='painel'></center>"
                    };

var inversor7000 = { "nome":"Inversor SMA Sunny MiniCentral SMC 7000HV-11",
                      "potMaxEntrada":7500,
                      "VmpptMin":335,
                      "VmpptMax":560,
                      "VMaxEntrada":800,
                      "correnteMax":23,
                      "VMinStart":400,
                      "preco":14400,
                      "imagem":"<center><img src='imagens/inversor7000.png' class='img-responsive center-block' alt='painel'></center>"
                    };

var inversor8000 = {  "nome":"Inversor Fronius IG Plus 100V-1",
                      "potMaxEntrada":8520,
                      "VmpptMin":230,
                      "VmpptMax":500,
                      "VMaxEntrada":600,
                      "correnteMax":37,
                      "VMinStart":260,
                      "preco":14400,
                      "imagem":"<center><img src='imagens/inversor8000.png' class='img-responsive center-block' alt='painel'></center>"
                      };

var inversor9000 = { "nome":"Inversor SMA SB 9000TLUS-10 Sunny Boy Grid Tie",
                     "potMaxEntrada":11250,
                     "VmpptMin":300,
                     "VmpptMax":480,
                     "VMaxEntrada":600,
                     "correnteMax":31,
                     "VMinStart":360,
                     "preco":16000,
                     "imagem":"<center><img src='imagens/inversor9000.png' class='img-responsive center-block' alt='painel'></center>"
                     };

//vetor com as potências disponíveis para inversores
var inversorLista = [inversor1300,inversor1500,inversor2000,inversor2500,inversor3000,inversor4000,inversor5000,inversor6000,inversor7000,inversor8000,inversor9000];

//escolhe o painel selecionado no dropdown menu
function choosePainel(painelName){
  painel = painelName;
  document.getElementById("dropdownMenu1").innerHTML = ""+ painel.nome;
}

function custoDisponibilidade(padrao){
  if(padrao =="mono"){
    sistema.disponibilidade = 30;
    document.getElementById("dropdownMenu2").innerHTML = "Monofásico";
    console.log(sistema.disponibilidade);
  }
  if(padrao == "bi"){
    sistema.disponibilidade = 50;
    document.getElementById("dropdownMenu2").innerHTML = "Bifásico";
    console.log(sistema.disponibilidade);
  }
  if(padrao == "tri"){
    sistema.disponibilidade = 100;
    document.getElementById("dropdownMenu2").innerHTML = "Trifásico";
    console.log(sistema.disponibilidade);
  }
}

//Pega os dados do painel inserido pelo usuário
function dadosPainel() {
     alert("Dados do painel prontos para dimensionamento!");
     painel1.potencia = document.getElementById("painelpotencia").value;
     painel1.Vmax = document.getElementById("painelvmax").value;
     painel1.Vmin = document.getElementById("painelvmin").value;
     painel1.correnteSC = document.getElementById("correntesc").value;
     painel1.preco = document.getElementById("preco").value;
     painel1.nome = document.getElementById("painelnome").value;
     painel = painel1;
     document.getElementById("dropdownMenu1").innerHTML = ""+ painel1.nome;
     console.log(painel1.nome);
}


//Recebe valores inseridos pelo usuário
function getInputs(){
  clean();
  sistema.HSP = document.getElementById("hsp").value;
  sistema.consumoMensal = document.getElementById("consumo").value;
  investimento.tarifa = document.getElementById("tarifa").value;
  run();
  document.getElementById("resultado").innerHTML =
  // "<br>--------------------------------------------------------</br>"+
  // "<br>Consumo Mensal: "+sistema.consumoMensal+ "kWh </br>"+
  // "<br>Horas de Sol Pleno: "+sistema.HSP+" kWh/m².dia</br>"+
  // "<br>Consumo médio diário: "+sistema.consumoDiario+ "Wh </br>"+
  // "<br>Potência necessária: "+potInteira+"W</br>"+
  // "<br>--------------------PAINEL----------------------------</br>"+
  // "<br>"+painel.nome+"</br>"+
  // "<br>Potência do painel: "+painel.potencia+" W</br>"+
  // "<br>--------------------ARRANJO----------------------------</br>"+
  // "<br>Número de painéis decimal:"+numPaineisDecimal+"</br>"+
  // "<br>Número de painéis: "+ sistema.numPaineis+"</br>"+
  // "<br>Painéis em série: "+ arranjo.numSerie+"</br>"+
  // "<br>Strings em paralelo: "+arranjo.numParalelo+"</br>"+
  // "<br>Potência do arranjo: "+ sistema.potencia+"W</br>"+
  // "<br>Vmax do arranjo FV: "+arranjo.Vmax+"V</br>"+
  // "<br>Vmin do arranjo FV: "+arranjo.Vmin+"V</br>"+
  // "<br>Corrente do arranjo FV: "+painel.correnteSC*arranjo.numParalelo+"A </br>"+
  // "<br>--------------------INVERSOR----------------------------</br>"+
  // "<br>"+inversor.nome+"</br>"+
  // "<br>Máxima potência de entrada do inversor: "+inversor.potMaxEntrada+"W</br>"+
  // "<br>Faixa MPPT: "+inversor.VmpptMin+"V ~ "+inversor.VmpptMax+" V </br>"+
  // "<br>Corrente máxima de entrada: "+inversor.correnteMax+" A </br>"+
  "<br>--------------------SISTEMA----------------------------</br>"+
  //"<br>Potência: "+sistema.potencia+" W</br>"+
  "<br>Na faixa MPPT("+inversor.VmpptMin+"V - "+inversor.VmpptMax+" V): "+sistema.MPPTativo+"</br>"+
  "<br>Sistema ok: "+sistema.condicao+"</br>" ;

}

//{ fecha na ultima linha
sistema.disponibilidade = 0;
function run(){
  //-------------Cálculo da potência do Sistema-------//
  //Consumo médio diário em Wh
  sistema.consumoDiario = 1000*(sistema.consumoMensal-sistema.disponibilidade)/30;
  //calcula a potência para produzir a energia necessária
  potInteira = (sistema.consumoDiario/sistema.TD)/sistema.HSP;
  sistema.potNecessaria = potInteira;

  if(potInteira>100000){
    alert("Ultrapassou o limite de potência para microgeração! Utilizar outros dados!");
  }
  if( (potInteira/3) > inversorLista[inversorLista.length-1].potMaxEntrada){
    alert("Não há no banco de dados inversor que atenda as características!");
  }


  sistema.numInversores = 1;
  //MUDAR POTINTEIRA -> TRANSFORMAR EM POTENCIA NECESSARIA
  //E TRANSFORMAR EM POTENCIA PARA CALCULO
  if(potInteira >= 10000){
    potInteira = potInteira/3;
    sistema.numInversores = 3;
    console.log("Potencia necessaria: "+potInteira);
  }

  //calculo do numero de paineis
  numPaineisDecimal = potInteira / painel.potencia;
  sistema.numPaineis =Math.round(numPaineisDecimal);
  sistema.potencia = sistema.numPaineis*painel.potencia;
  //-----------FIM------///

  //-------------Determinação do inversor-------//
  for(i = inversorLista.length-1; i>=0;i--){
    if(sistema.potencia<inversorLista[i].potMaxEntrada){
      console.log(""+inversorLista[i].nome +":  "+  inversorLista[i].potMaxEntrada);
      inversor = inversorLista[i];
    }
  }


  console.log("------------------------------------------");
  console.log("Verificando arranjo...");

  //-------------------CASAMENTO-------------------//
  //implementar numero de paineis serie e paralelo
  //implementar correntes do arranjo
  //combinando o arranjo em série
  arranjo.numSerie = sistema.numPaineis;
  arranjo.Vmax = arranjo.numSerie*painel.Vmax;
  arranjo.Vmin = arranjo.numSerie*painel.Vmin;
  arranjo.Imax = arranjo.numParalelo*painel.correnteSC;

  if(arranjo.Vmax<inversor.VmpptMax && arranjo.Vmin>inversor.VmpptMin){
    console.log("teste1:MPPT ativo! ");
    sistema.MPPTativo = true;
  }

  if(inversor.potMaxEntrada>=sistema.potencia){
      console.log("teste1:Potencia de entrada do Inversor ok!");
      sistema.condicaopotMaxEntrada = true;
  }

  if(arranjo.Vmin>inversor.VMinStart){
    console.log("teste1:Tensão de inicialização ok!");
    sistema.condicaoVmin = true;
  }
  if(arranjo.Vmax<inversor.VMaxEntrada){
    console.log("teste1:Vmax do arranjo ok!");
    sistema.condicaoVmax = true;
  }
  if(arranjo.Imax<inversor.correnteMax){
    console.log("teste1:Corrente de entrada do inversor ok!");
    sistema.condicaoImax = true;
  }

  if(sistema.MPPTativo && sistema.condicaopotMaxEntrada && sistema.condicaoVmin && sistema.condicaoVmax && sistema.condicaoImax ){
    sistema.condicao = true;
    console.log("teste1:casamento ok!");
  }

  arranjo.numParalelo = 1;

  //combinando o arranjo em série e paralelo
  if(!sistema.condicao){
    sistema.condicaoImax = false;
    sistema.condicaoVmax = false;
    sistema.condicaoVmin = false;
    sistema.MPPTativo = false;
    sistema.condicaopotMaxEntrada = false;

    console.log("Verificando arranjo...");
    // aproximando para baixo
    if(inversor.VMinStart>inversor.VmpptMin){
      inversor.VmpptMin = inversor.VMinStart;
    }
    arranjo.numSerie = Math.round( (inversor.VmpptMin/painel.Vmin) - 0.5) + 1;
    arranjo.numParalelo = Math.round(sistema.numPaineis/arranjo.numSerie);
    if( Math.round(sistema.numPaineis/arranjo.numSerie)<1 ){
        arranjo.numParalelo = 1;
    }

    var potenciaTemporaria = (arranjo.numSerie*arranjo.numParalelo*painel.potencia);
    var diferenca = potenciaTemporaria - potInteira;
    diferenca = Math.abs(diferenca);

    // verifica se a diferenca é maior que dois paineis e aproxima para mais paineis
    if( diferenca > 2*painel.potencia ){
      arranjo.numSerie = Math.round( (inversor.VmpptMax/painel.Vmax) - 0.5); //para cima
      arranjo.numParalelo = Math.round(sistema.numPaineis/arranjo.numSerie);
      if( Math.round(sistema.numPaineis/arranjo.numSerie)<1 ){
          arranjo.numParalelo = 1;
      }
      potenciaTemporaria = (arranjo.numSerie*arranjo.numParalelo*painel.potencia);
      diferenca = potenciaTemporaria - potInteira;
      diferenca = Math.abs(diferenca);
    }

    // verifica se a diferenca é maior que dois paineis novamente e aproxima para baixo
    if( diferenca > 2*painel.potencia ){
      // aproximando para baixo
      arranjo.numSerie = Math.round( (inversor.VmpptMin/painel.Vmin) - 0.5) + 1;
      arranjo.numParalelo = Math.round(sistema.numPaineis/arranjo.numSerie);
      if( Math.round(sistema.numPaineis/arranjo.numSerie)<1 ){
          arranjo.numParalelo = 1;
      }
    }


    arranjo.Imax = arranjo.numParalelo*painel.correnteSC;
    arranjo.Vmax = arranjo.numSerie*painel.Vmax;
    arranjo.Vmin = arranjo.numSerie*painel.Vmin;

    if(arranjo.Vmax<inversor.VmpptMax && arranjo.Vmin>inversor.VmpptMin){
      console.log("teste2:MPPT ativo!");
      sistema.MPPTativo = true;
    }

    if(inversor.potMaxEntrada>=sistema.potencia){
      console.log("teste2:Potencia de entrada do Inversor ok!");
      sistema.condicaopotMaxEntrada = true;
    }

    if(arranjo.Vmin>=inversor.VMinStart){
      console.log("teste2:Tensão de inicialização ok!");
      sistema.condicaoVmin = true;
    }
    if(arranjo.Vmax<inversor.VMaxEntrada){
      console.log("teste2:Vmax do arranjo ok!");
      sistema.condicaoVmax = true;
    }

    if(arranjo.Imax<inversor.correnteMax){
      console.log("teste2:Corrente de entrada do inversor ok!");
      sistema.condicaoImax = true;

    }
    if(sistema.MPPTativo && sistema.condicaopotMaxEntrada && sistema.condicaoVmin && sistema.condicaoVmax && sistema.condicaoImax ){
      sistema.condicao = true;
      console.log("teste2:casamento ok!");
    }
    if(!(sistema.MPPTativo && sistema.condicaopotMaxEntrada && sistema.condicaoVmin && sistema.condicaoVmax && sistema.condicaoImax )){
      alert("Não foi possível fazer o dimensionamento com o painel selecionado!");
      if(!sistema.MPPTativo){
        alert("Fora da faixa do MPPT");
      }
      if(!sistema.condicaopotMaxEntrada){
        alert("Potência do arranjo maior que a de entrada do Inversor");
      }
      if(!sistema.condicaoVmin){
        alert("Tensão do arranjo menor que a tensão de entrada do Inversor");
      }
      if(!sistema.condicaoVmax){
        alert("Tensão do arranjo maior que a tensão de entrada do Inversor");
      }
      if(!sistema.condicaoImax){
        alert("Corrente do arranjo maior que a corrente de entrada do Inversor");
      }
    }

  }

var numeroDeInversores = 0;
var numeroDePaineis = 0;
  //Para o caso de pequenas potências -->>> Potencia Necessária < 533 W && (consumo - custo de disponibilidade) < 53
  if( ((sistema.consumoMensal-sistema.disponibilidade) <= 57) || (sistema.numeroDePaineis<1) || potInteira<1000 ) {

      painel = painel255;
      inversor = inversor260;
      numeroDePaineis = Math.round(numPaineisDecimal);
      if(sistema.numeroDePaineis<1){
        numeroDePaineis = 1;
      }
      numeroDeInversores = Math.round(potInteira / inversor.potMaxEntrada) ;
      if(numeroDeInversores<1){
        numeroDeInversores = 1;
      }
      if (numeroDePaineis>3 || numeroDeInversores>3 ) {
        numeroDePaineis = 3;
        numeroDeInversores = 3;
      }
      arranjo.numSerie = 1;
      arranjo.numParalelo = 1;
      sistema.numPaineis = numeroDePaineis;
      sistema.numInversores = numeroDeInversores;
      arranjo.Vmax = painel.Vmax;
      arranjo.Vmin = painel.Vmin;
      console.log("NUMERO DE PAINEIS: "+numeroDePaineis+" Num INVERSORES: "+numeroDeInversores+"max POT ENTRADA"+inversor.potMaxEntrada+"pOT INTEIRA"+potInteira);
  }


  //-----------Adequação Final-------------------------------//
  sistema.numPaineis = arranjo.numSerie * arranjo.numParalelo*sistema.numInversores;
  sistema.potencia   = sistema.numPaineis * painel.potencia;
  sistema.precoTotal = sistema.numPaineis*painel.preco + inversor.preco;
  investimento.custoPaineis = sistema.numPaineis*painel.preco;
  investimento.custoInversor = sistema.numInversores*inversor.preco;
  investimento.custoCabeamento = sistema.potencia*investimento.precoCabeamento;
  investimento.custoEstrutura = sistema.potencia*investimento.precoEstrutura;
  investimento.custoTotal = investimento.custoPaineis + investimento.custoInversor +investimento.custoEstrutura + investimento.custoCabeamento;
  sistema.energiaMensal    = sistema.potencia*sistema.HSP*sistema.TD*(30/1000);
  sistema.energiaAnual    = sistema.potencia*sistema.HSP*sistema.TD*(365/1000);

  investimento.decaimentoPainel = 0.007;
  investimento.ajusteTarifa = 0.026;
  investimento.tma = 0.065;

  decaimentoModulos(investimento.decaimentoPainel,25);
  energiaGerada(sistema.energiaAnual,25);
  ajusteTarifa(investimento.ajusteTarifa,25);
  investimento.arrayCaixa[0] = investimento.arrayCaixa[0]-investimento.custoTotal;
  investimento.tir = tir(investimento.arrayCaixa);
  investimento.vpl = vpl(0.065,investimento.arrayCaixa);
  investimento.payback = payback(investimento.arrayCaixa-1,investimento.arrayCaixa);
  investimento.paybackDescontado = payback(investimento.arrayCaixaPresente-1,investimento.arrayCaixaPresente);
}

function clean(){
  sistema.condicaopotMaxEntrada = false;
  sistema.potNecessaria = 0;
  sistema.condicaoVmin = false;
  sistema.condicaoVmax = false;
  sistema.condicaoImax = false;
  sistema.condicao = false;
  sistema.MPPTativo = false;
  arranjo.numSerie=0;
  arranjo.numParalelo=1;
  arranjo.Vmax=0;
  arranjo.Vmin=0;
  arranjo.Imax=0;
  arranjo.Imin=0;
  sistema.potencia=0;
  sistema.numPaineis=0;
  sistema.TD=0.75;                         //Taxa de desempenho a priori é 0;75
  sistema.HSP=0;                        //Horas de Sol Pleno médias em Juiz de Fora. Medida em kWh/m² para um dia.
  sistema.consumoMensal=0;               //Consumo médio Mensal em kWh
  sistema.consumoDiario=0;                 //Consumo médio diário em Wh
  sistema.MPPTativo=false;                 //Verifica está na faixa MPPT
  sistema.condicaoVmin=false;              //Verifica Vmin do arranjo com o Inversor
  sistema.condicaoVmax=false;              //Verifica Vmax do arranjo com o Inversor
  sistema.condicaoImax=false;              //Verifica Imax do arranjo com o Inversor
  sistema.condicaopotMaxEntrada=false;     //Verifica potencia do arranjo com o Inversor
  sistema.condicao=false;                  //Verifica se todos os requisitos estão corretos
  sistema.tester=false;
  investimento.arrayDecaimento = [];
  investimento.arrayEnergia = [];
  investimento.arrayTarifa = [];
  investimento.arrayCaixa = [];
  investimento.tarifa = 0.8;            //Tarifa de energia - R$/kWh - 0.80
  investimento.ajusteTarifa = 0;      //Taxa de correção anual da tarida de energia 0.026 - 2.6%
  investimento.payback=0;           //Payback simples
  investimento.paybackDescontado=0; //Payback Descontado
  investimento.vpl=0;               //Valor presente líquido
  investimento.tir=0;               //Taxa Interna de Retorno
  investimento.custoPaineis=0;               //Custo total dos paineis
  investimento.custoInversor=0;             //Custo total dos Inversores
  investimento.precoCabeamento=0.75;          //preço da cabeamento em R$/kW;
  investimento.custoCabeamento=0;          //Custo total com cabeamento
  investimento.precoEstrutura=1.25;          //preço da estrutura em R$/kW;
  investimento.custoEstrutura=0;          //Custo total com estrutura
  investimento.custoTotal=0;          //Custo Total do sistema
}


//---------------------Análise de Investimentos------------------------------//
//Cria array que carrega a porcentagem de energia produzida pelo painel no ano ZERO
function decaimentoModulos(taxa, numPeriodos){
  for(i=0; i<=numPeriodos;i++){
      investimento.arrayDecaimento.push(Math.pow( (1.0 - taxa), i));
  }
}

//o vetor terá tamanho numPeriodos+1
function energiaGerada(energia, numPeriodos){
  for(i=0; i<=numPeriodos;i++){
      investimento.arrayEnergia.push(investimento.arrayDecaimento[i]*energia);
  }
}

//cria o array para a tarifa no decorrer do tempo
function ajusteTarifa(taxa, numPeriodos){
  for(i=0; i<=numPeriodos;i++){
      investimento.arrayTarifa.push(investimento.tarifa*Math.pow((1.0 + taxa), i));
      investimento.arrayCaixa.push(investimento.arrayTarifa[i]*investimento.arrayEnergia[i]);
  }
}


// investimento.decaimentoPainel = 0.007;
// investimento.ajusteTarifa = 0.026;
// investimento.tma = 0.065;
//
// decaimentoModulos(0.007,25);
// energiaGerada(1514,25);
// ajusteTarifa(0.026,25);
// investimento.arrayCaixa[0] = investimento.arrayCaixa[0]-14185;
// investimento.tir = tir(investimento.arrayCaixa);
// investimento.vpl = vpl(0.065,investimento.arrayCaixa);
console.log(investimento.arrayDecaimento);
console.log(investimento.arrayDecaimento.length);
console.log(investimento.arrayEnergia);
console.log(investimento.arrayEnergia.length);
console.log(investimento.arrayTarifa);
console.log(investimento.arrayTarifa.length);
console.log("Entrada:");
console.log(investimento.arrayCaixa);
console.log(investimento.arrayCaixa.length);
console.log("Valor Presente Líquido: "+ (investimento.vpl) );
console.log("TIR: "+investimento.tir);


/*
 * Calcula o Valor Presente Líquido para
 * uma variação de período constante
 *https://pt.stackoverflow.com/questions/96825/como-calcular-o-vpl-npv-e-o-tir-irr-usando-javascript
 * @taxa => taxa de desconto
 * @montantes => vetor com os valores com os recebimentos ou pagamentos
 *
 */
function vpl(taxa, montantes)
{
    var ret = montantes[0];
    investimento.arrayCaixaPresente[0] = montantes[0];
    for (var i=1; i<montantes.length; i++){
        ret += montantes[i] / Math.pow( (1.0 + taxa), i);
        investimento.arrayCaixaPresente[i] = montantes[i] / Math.pow( (1.0 + taxa), i);
      }
    return ret;
}



/*
 * Calcula a Taxa Interna de Retorno (Método da Bisseção)
 *https://pt.stackoverflow.com/questions/96825/como-calcular-o-vpl-npv-e-o-tir-irr-usando-javascript
 * @montantes => vetor com os valores
 */
 function tir(montantes)
 {
     var ret = -1000000000.0;
     var juros_inicial = -1.0;
     var juros_medio = 0.0;
     var juros_final = 1.0;
     var vpl_inicial = 0.0;
     var vpl_final = 0.0;
     var vf = 0.0;
     var erro = 1e-3;

 		for (var i=0; i<100; i++) {
     	vpl_inicial = vpl(juros_inicial, montantes);
       vpl_final = vpl(juros_final, montantes);
       if (sinal(vpl_inicial) != sinal(vpl_final))
       	break;
       juros_inicial -= 1.0;
       juros_final += 1.0;
     };
     var count = 0;
     for (;;) {
       // Busca por Bisseção
       var juros_medio = (juros_inicial + juros_final) / 2.0;
       var vpl_medio = vpl(juros_medio, montantes)

       if (Math.abs(vpl_medio) <= erro) {
           // Resultado foi encontrado
           return juros_medio*100.0;
       };
       if (sinal(vpl_inicial) == sinal(vpl_medio)) {
       		juros_inicial = juros_medio;
           vpl_inicial = vpl(juros_medio, montantes);
       } else {
       		juros_final = juros_medio;
           vpl_final = vpl(juros_medio, montantes);
       };
       if (++count > 1000000)
       	throw "looping inválido";
     };
     return ret;
 };


//define o sinal
function sinal(x) {
	return x < 0.0 ? -1 : 1;
}




// Payback Period (PP)
function payback(numOfPeriods, cfs) {
  // for even cash flows
  if (numOfPeriods === 0) {
    return Math.abs(csf[0]) / cfs[1];
  }
  // for uneven cash flows
  var cumulativeCashFlow = cfs[0];
  var yearsCounter = 1;
  for (i = 1; i < cfs.length; i++) {

    cumulativeCashFlow += cfs[i];
    if (cumulativeCashFlow >= 0) {
      yearsCounter += (cumulativeCashFlow - cfs[i]) / cfs[i];
      return yearsCounter;
    } else {
      yearsCounter++;
    }
  }
};

var $doc = $('html, body');
$('.scrollSuave').click(function() {
    $doc.animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
    return false;
});



$("#go").click(function(){
    $("#div1").fadeIn();
    $("#div2").fadeIn("slow");
});

$("#button-tutorial").click(function(){
  $("#sistema-intro").html("<br>Para projetar o sistema é necessário saber o consumo de energia e a quantidade de energia solar no local da instalação. Dessa maneira, utilizaremos os valores do consumo mensal médio e da irradiação.</br>");
  $("#sistema-intro2").html("<br>Potência necessária = [(Energia média diária) / (Taxa de desempenho do sistema)] / (horas de sol pleno)</br> <br>Potência necessária = ("+(((sistema.consumoMensal-sistema.disponibilidade)/30)*1000).toFixed(2)+"/"+sistema.TD+") / ("+sistema.HSP+") = "+sistema.potNecessaria.toFixed(2)+"W </br>");


});

$("#button-sistema").click(function(){
  $("#sistema-intro").html("<br>Para projetar o sistema é necessário saber o consumo de energia e a quantidade de energia solar no local da instalação. Dessa maneira, utilizaremos os valores do consumo mensal médio e da irradiação.</br>");
  $("#sistema-intro2").html("<br>Potência necessária = [(Energia média diária) / (Taxa de desempenho do sistema)] / (horas de sol pleno) = ("+(((sistema.consumoMensal-sistema.disponibilidade)/30)*1000).toFixed(2)+"/"+sistema.TD+") / ("+sistema.HSP+") = "+sistema.potNecessaria.toFixed(2)+"W </br>");
  $("#consumo-mensal").html("<br>Consumo Mensal: "+sistema.consumoMensal+" kWh </br>");
  $("#consumo-diario").html("<br>Consumo médio diário: "+sistema.consumoDiario.toFixed(2)+ "Wh </br>");
  $("#horas-de-sol").html("<br>Horas de Sol Pleno: "+sistema.HSP+" kWh/m².dia </br>");
  if(sistema.numInversores==1){
    $("#pot-necessaria").html("<br>Potência necessária: "+potInteira.toFixed(2)+"W</br>");
  }
  if(sistema.numInversores==2){
    $("#pot-necessaria").html("<br>Potência necessária: "+potInteira.toFixed(2)+"W</br>");
  }
  if(sistema.numInversores==3){
    potInteira = potInteira*3;
    if(inversor.nome=="Microinversor i-Energy GT260"){
      potInteira = potInteira/3;
    }
    $("#pot-necessaria").html("<br>Potência necessária: "+potInteira.toFixed(2)+"W</br>");
  }
  $("#pot-sistema").html("<br>Potência do sistema: "+sistema.potencia.toFixed(2)+"W</br>");
});

$("#button-arranjo").click(function(){
  $("#numero-paineis").html("<br>Número total de painéis: "+sistema.numPaineis+"</br>");
  if(sistema.numInversores==1){
    $("#numero-inversores1").html("<br>Será necessário "+sistema.numInversores+" inversor, no qual deverá ser conectado em sua entrada o seguinte arranjo de painéis:</br>");
    $("#numero-inversores3").html("");
  }
  if(sistema.numInversores>1){
    $("#numero-inversores3").html("<br>Serão necessários "+sistema.numInversores+" inversores. Para cada inversor deverá ser conectado na entrada o seguinte arranjo de painéis:</br>");
    $("#numero-inversores1").html("");
  }
  $("#paineis-serie").html("<br>Painéis em série: "+ arranjo.numSerie+"</br>");
  $("#paineis-paralelo").html("<br>Strings em paralelo: "+arranjo.numParalelo+"</br>");
  $("#pot-arranjo").html("<br>Potência do arranjo: "+sistema.potenciaW+"</br>");
  $("#v-max").html("<br>Vmax do arranjo FV: "+arranjo.Vmax.toFixed(2)+"V</br>");
  $("#v-min").html("<br>Vmin do arranjo FV: "+arranjo.Vmin.toFixed(2)+"V</br>");
  $("#corrente-arranjo").html("<br>Corrente do arranjo FV: "+painel.correnteSC*arranjo.numParalelo+"A</br>");
  $("#painel-nome").html("<br>Painel: "+painel.nome+" W </br>");
  $("#painel-imagem").html(painel.imagem);
  $("#potencia-painel").html("<br>Potência do painel: "+painel.potencia+" W </br>");
  $("#vmax-painel").html("<br>Tensão máxima: "+painel.Vmax+ "V </br>");
  $("#vmin-painel").html("<br>Tensão mínima: "+painel.Vmin+ "V </br>");
  $("#corrente-painel").html("<br>Corrente de curto circuito: "+painel.correnteSC+ "V </br>");
  $("#inversor-nome").html("<br>"+inversor.nome+"</br>");
  $("#inversor-imagem").html(inversor.imagem);
  $("#inversor-max-pot-entrada").html("<br>Potência máxima de entrada: "+inversor.potMaxEntrada+" W</br>");
  $("#inversor-tensao-max-entrada").html("<br>Tensão máxima de entrada: "+inversor.VMaxEntrada+" V</br>");
  $("#inversor-mppt").html("<br>Faixa MPPT: "+inversor.VmpptMin+"V ~ "+ inversor.VmpptMax+" V </br>");
  $("#tensao-min-inicializacao").html("<br>Tensão mínima para inicialização: "+inversor.VMinStart+" V </br>");
  $("#inversor-corrente-entrada").html("<br>Corrente máxima de entrada: "+inversor.correnteMax+" A </br>");
});

$("#button-tutorial").click(function(){
  $("#tutorial-intro").html("<br>Para projetar o sistema é necessário saber o consumo de energia elétrica e a quantidade de energia solar no local da instalação. Dessa maneira, utilizaremos os valores do consumo mensal médio e da irradiação.</br>");
  $("#tutorial-hsp").html("<br>Energia solar = Horas de sol pleno = "+sistema.HSP+"kWh/m².dia</br>");
  $("#tutorial-consumo-mensal").html("<br>Consumo de energia médio mensal = "+sistema.consumoMensal+"kWh</br>");
  if(sistema.disponibilidade == 30){
    tutorial.difMensalDisponibilidade = sistema.consumoMensal - sistema.disponibilidade;
    $("#tutorial-custo-disponibilidade").html("<br>Deve-se pagar o custo de disponibilidade da rede elétrica, condição necessária para participar do sistema de compensação. Como o padrão dessa instalação é monofásico, o custo de disponibilidade é "+sistema.disponibilidade+"kWh.</br><br>Sendo assim, para não gerar energia em excesso, o ideal é retirar do consumo mensal esse valor, uma vez que o custo de disponibilidade é o valor mínimo de energia que é pago à concessionária. Portanto:</br><br>Diferença = Consumo Mensal - Custo de disponibilidade = "+sistema.consumoMensal+"kWh -"+sistema.disponibilidade+" kWh</br><br>Diferença da média mensal = "+tutorial.difMensalDisponibilidade+" kWh</br>");
  }
  if(sistema.disponibilidade == 50){
    tutorial.difMensalDisponibilidade = sistema.consumoMensal - sistema.disponibilidade;
    $("#tutorial-custo-disponibilidade").html("<br>Deve-se pagar o custo de disponibilidade da rede elétrica, condição necessária para participar do sistema de compensação. Como o padrão dessa instalação é bifásico, o custo de disponibilidade é "+sistema.disponibilidade+"kWh.</br><br>Sendo assim, para não gerar energia em excesso, o ideal é retirar do consumo mensal esse valor, uma vez que o custo de disponibilidade é o valor mínimo de energia que é pago à concessionária. Portanto:</br><br>Diferença = Consumo Mensal - Custo de disponibilidade = "+sistema.consumoMensal+"kWh -"+sistema.disponibilidade+" kWh</br><br>Diferença da média mensal = "+tutorial.difMensalDisponibilidade+" kWh</br>");
  }
  if(sistema.disponibilidade == 100){
    tutorial.difMensalDisponibilidade = sistema.consumoMensal - sistema.disponibilidade;
    $("#tutorial-custo-disponibilidade").html("<br>Deve-se pagar o custo de disponibilidade da rede elétrica, condição necessária para participar do sistema de compensação. Como o padrão dessa instalação é trifásico, o custo de disponibilidade é "+sistema.disponibilidade+"kWh.</br><br>Sendo assim, para não gerar energia em excesso, o ideal é retirar do consumo mensal esse valor, uma vez que o custo de disponibilidade é o valor mínimo de energia que é pago à concessionária. Portanto:</br><br>Diferença = Consumo Mensal - Custo de disponibilidade = "+sistema.consumoMensal+"kWh -"+sistema.disponibilidade+" kWh</br><br>Diferença da média mensal = "+tutorial.difMensalDisponibilidade+" kWh</br>");
  }
  $("#tutorial-intro-diaria").html("<br>Como as horas de sol pleno são dadas para um dia, devemos passar a diferença da média mensal para a média diária. Desse modo, obtemos: </br>");
  tutorial.difDiariaDisponibilidade = tutorial.difMensalDisponibilidade/30;
  tutorial.difDiariaDisponibilidade = tutorial.difDiariaDisponibilidade.toFixed(2);
  $("#tutorial-consumo-diario").html("<br>Consumo médio diário = Diferença da média mensal / (30 dias)</br><br>Consumo médio diário = "+tutorial.difMensalDisponibilidade+"kWh/(30)</br><br>Consumo médio diário = "+tutorial.difMensalDisponibilidade+"*(1000)Wh/(30)</br><br>Consumo médio diário = "+sistema.consumoDiario.toFixed(2)+"Wh</br>" );
  $("#tutorial-TD").html("<br>Além disso, devemos considerar a taxa de desempenho do sistema. Essa é equivalente ao rendimento de todo o sistema e leva em consideração as eventuais perdas dos equipamentos e os efeitos ambientais externos que influenciam na produção de energia. (Valor padrão entre 0.7 e 0.8)</br><br>Taxa de Desempenho = "+sistema.TD+"</br>");
  $("#tutorial-pot-necessaria").html("<br>Com esse valores podemos estimar a potência necessária para abater o consumo de energia elétrica. Basta utilizar a seguinte relação:</br><br>Potência necessária = [(Energia média diária) / (Taxa de desempenho do sistema)] / (horas de sol pleno)</br> <br>Potência necessária = ("+(((sistema.consumoMensal-sistema.disponibilidade)/30)*1000).toFixed(2)+"/"+sistema.TD+") / ("+sistema.HSP+") = "+sistema.potNecessaria.toFixed(2)+"W </br>");
  $("#tutorial-dimensionamento-intro").html("<br>A partir desse valor poderemos dimensionar os esquipamentos que compõe o sistema conectado à rede, sendo os principais os painéis e o inversor.</br>");
  if(sistema.potNecessaria>=10000){
    $("#tutorial-dimensionamento-10000").html("<br>Como a potência necessária é maior que 10000 kW, serão necessários mais que um inversor para a conexão com a rede elétrica. Uma vez que os painéis geram energia CC, enquanto a rede trabalha em regime CA. Sendo assim, trabalharemos com 3 inversores.</br><img src='imagens/forma.png' class='img-responsive center-block' alt='tabela'>");
    $("#tutorial-dimensionamento-10000-potencia").html("<br>Logo, a potência necessária será dividida por 3 e será distribuida para cada inversor. Desse jeito, a potência para cada inversor é:</br><br>Potência para cada inversor = Potência necessária / 3</br><br>Potência para cada inversor = "+(sistema.potNecessaria.toFixed(2))+"W/3</br><br>Potência para cada inversor = "+potInteira.toFixed(2)+"W</br>");
    $("#tutorial-dimensionamento-10000-inversor").html("<br>Com base nesse valor, deve-se procurar um inversor com a potência nominal próxima. Portanto, escolheu-se o "+inversor.nome+", que possui como potência máxima de entrada: "+inversor.potMaxEntrada+"W</br>");
    $("#tutorial-dimensionamento").html("");
    $("#tutorial-dimensionamento-potencia").html("");
    $("#tutorial-dimensionamento-inversor").html("");
    $("#tutorial-dimensionamento-gt260").html("");
    $("#tutorial-dimensionamento-gt260-potencia").html("");
  }
  if(sistema.potNecessaria<10000 && sistema.numInversores==1){
    $("#tutorial-dimensionamento-10000").html("");
    $("#tutorial-dimensionamento-10000-potencia").html("");
    $("#tutorial-dimensionamento-10000-inversor").html("");
    $("#tutorial-dimensionamento-gt260").html("");
    $("#tutorial-dimensionamento-gt260-potencia").html("");
    $("#tutorial-dimensionamento").html("<br>Como a potência necessária é menor que 10000 kW, será preciso somente um inversor para a conexão com a rede elétrica[norma ANEEL]. Lembrando que os painéis geram energia CC, enquanto a rede trabalha em regime CA.</br><img src='imagens/forma.png' class='img-responsive center-block' alt='tabela'>");
    $("#tutorial-dimensionamento-potencia").html("");
    $("#tutorial-dimensionamento-inversor").html("<br>Com base no valor da potência necessária, deve-se procurar um inversor com a potência nominal próxima. Portanto, escolheu-se o "+inversor.nome+", que possui como potência máxima de entrada: "+inversor.potMaxEntrada+"W</br>");
  }
  if(inversor.nome == "Microinversor i-Energy GT260"){
    if(sistema.numInversores>1){
      $("#tutorial-dimensionamento-10000").html("");
      $("#tutorial-dimensionamento-10000-potencia").html("");
      $("#tutorial-dimensionamento-10000-inversor").html("");
      $("#tutorial-dimensionamento").html("");
      $("#tutorial-dimensionamento-potencia").html("");
      $("#tutorial-dimensionamento-inversor").html("");
      $("#tutorial-dimensionamento-gt260").html("<br>Neste caso, serão necessários mais que um inversor para a conexão com a rede elétrica. Considerando que os painéis geram energia CC, enquanto a rede trabalha em regime CA. Esse caso, em especial requer um inversor de baixa potência, pois o consumo é muito baixo.</br><img src='imagens/forma.png' class='img-responsive center-block' alt='tabela'>");
      $("#tutorial-dimensionamento-gt260-potencia").html("<br>A potência necessária será dividida pela potência do inversor de 265W. Desse jeito, serão utilizados "+sistema.numInversores+" inversores, modelo "+inversor.nome+", o que dará uma potência de "+sistema.numInversores*inversor.potMaxEntrada+" W</br>");
    }
    if(sistema.numInversores==1){
      $("#tutorial-dimensionamento-10000").html("");
      $("#tutorial-dimensionamento-10000-potencia").html("");
      $("#tutorial-dimensionamento-10000-inversor").html("");
      $("#tutorial-dimensionamento").html("");
      $("#tutorial-dimensionamento-potencia").html("");
      $("#tutorial-dimensionamento-inversor").html("");
      $("#tutorial-dimensionamento-gt260-potencia").html("");
      $("#tutorial-dimensionamento-gt260").html("<br>Utilizaremos um inversor de baixa potência, pois o consumo é muito baixo. A potência necessária será próxima da potência do inversor que é de 260W. Desse jeito, será utilizado "+sistema.numInversores+" inversor, modelo: "+inversor.nome+"</br>");
    }
  }
  $("#tutorial-dimensionamento-numero-paineis-1").html("<br>O número de painéis desse sistema é determinado a partir da potência que o consumo demanda. Como a potência exigida pelo consumo é "+sistema.potNecessaria.toFixed(2)+"W, e a potência do painel é "+painel.potencia+" W pode-se fazer uma estimativa do número de painéis necessários.</br><br>Número de paineis = Potência necessária no consumo / Potência nominal do Painel</br><br>Número de paineis  = "+sistema.potNecessaria.toFixed(2)+"W / "+painel.potencia+"W </br><br>Número de paineis  = "+(sistema.potNecessaria/painel.potencia).toFixed(2)+"</br>");
  $("#tutorial-dimensionamento-numero-paineis-2").html("<br>Neste caso foi escolhido utilizar "+sistema.numPaineis+" painéis, gerando uma potência nominal de ("+sistema.numPaineis+"*"+painel.potencia+"W) = "+sistema.potencia+"W </br>");
  $("#tutorial-dimensionamento-arranjo").html("<br>Agora basta determinar a ligação(série ou paralelo) entre os painéis, a arquitetura será determinada a partir dos parâmetros de entrada do inversor.</br>");
  $("#tutorial-dimensionamento-arranjo-inversor").html("<br>Ao buscar no datasheet encontram-se os dados de entrada do inversor:</br><br>"+inversor.nome+"</br><br>"+inversor.imagem+"</br><br>Potência máxima de entrada: "+inversor.potMaxEntrada+" W</br><br>Tensão máxima de entrada: "+inversor.VMaxEntrada+" V</br><br>Faixa MPPT: "+inversor.VmpptMin+"V ~ "+ inversor.VmpptMax+" V </br><br>Tensão mínima para inicialização: "+inversor.VMinStart+" V </br><br>Corrente máxima de entrada: "+inversor.correnteMax+" A </br>");
  $("#tutorial-dimensionamento-arranjo-painel").html("<br>Deve-se também buscar os valores de tensão e corrente produzidos pelo painel escolhido. No datasheet encontram-se os dados: </br><br>Modelo: "+painel.nome+"</br><br>"+painel.imagem+"</br><br>Potência: "+painel.potencia+" W</br><br>Tensão máxima: "+painel.Vmax+" V</br><br>Tensão mínima: "+painel.Vmin+" V</br><br>Corrente de curto circuito: "+painel.correnteSC+" A</br>");
  if(sistema.numInversores<=1){
    $("#tutorial-dimensionamento-arranjo-2").html("<br>Visando estar dentro da faixa de operação MPPT do inversor e respeitando os limites de potência, tensão e corrente. Optou-se por conectar na entrada do inversor:</br><br>Painéis em série: "+arranjo.numSerie+"</br><br>Strings em paralelo: "+arranjo.numParalelo+"</br><img src='imagens/paineis.png' class='img-responsive center-block' alt='tabela'>");
  }
  if(sistema.numInversores>1){
    $("#tutorial-dimensionamento-arranjo-2").html("<br>Visando estar dentro da faixa de operação MPPT do inversor e respeitando os limites de potência, tensão e corrente. Optou-se por conectar na entrada de cada um dos "+sistema.numInversores+" inversores:</br><br>Painéis em série: "+arranjo.numSerie+"</br><br>Strings em paralelo: "+arranjo.numParalelo+"</br><img src='imagens/paineis.png' class='img-responsive center-block' alt='tabela'><br>Totalizando "+sistema.numPaineis+" painéis.</br><br>(Número painéis série * número de cadeias paralelo * número de inversores)</br><br>("+arranjo.numSerie+" * "+arranjo.numParalelo+" * "+sistema.numInversores+") = "+sistema.numPaineis+"</br>");
  }
  $("#tutorial-dimensionamento-arranjo-3").html("<br> Desse modo, no arranjo:</br><br>Tensão máxima  = Tensão máxima do painel * Número de paineis em série </br><br>Tensão máxima  = "+arranjo.Vmax.toFixed(2)+" V </br><br>Tensão mínima = Tensão mínima do painel * Número de paineis em série </br><br>Tensão mínima = "+arranjo.Vmin.toFixed(2)+" V</br><br>Corrente máxima = Corrente de curto circuito do painel * Número de Strings em paralelo</br><br>Corrente máxima = "+arranjo.Imax+" A</br><br>Potência de entrada = Potência do painel * número de painéis em série * número de Strings em paralelo </br><br>Potência de entrada = "+arranjo.numSerie*arranjo.numParalelo*painel.potencia+" W</br>");
  var energiaDiaria = sistema.potencia*sistema.HSP*sistema.TD;
  $("#tutorial-energia-diaria").html("<br>A energia diária média produzida por esse sistema é calculada utilizando:</br><br>Energia diária = Potência do sistema * Horas de Sol Pleno * Taxa de Desempenho do sistema</br><br>Energia diária = "+sistema.potencia+" * "+sistema.HSP+" * "+sistema.TD+"</br><br>Energia diária = "+energiaDiaria.toFixed(2)+" Wh</br>");
  $("#tutorial-energia-mensal").html("<br>Logo:</br><br>Energia mensal média = 30 * Energia diária </br><br>Energia mensal média = 30*"+energiaDiaria.toFixed(2)+" Wh</br><br>Energia mensal média = "+sistema.energiaMensal.toFixed(2)+" kWh</br>");
  $("#tutorial-energia-anual").html("<br>Energia anual média = 365 * Energia diária </br><br>Energia anual média = 365*"+energiaDiaria.toFixed(2)+" Wh</br><br>Energia anual média = "+sistema.energiaAnual.toFixed(2)+" kWh</br>");
  $("#tutorial-financeiro").html("<br>A receita economizada com o sistema fotovolaico em um ano é dada pela tarifa de energia e pela produção média anual de energia. Desse modo: </br><br>Receita = Energia anual média * Tarifa de energia</br><br>Receita = "+sistema.energiaAnual.toFixed(2)+" * R$"+investimento.tarifa+" = R$"+investimento.tarifa*sistema.energiaAnual+"</br>");
  tutorial.tma = investimento.tma*100;
  tutorial.decaimentoPainel = investimento.decaimentoPainel*100
  $("#tutorial-financeiro-2").html("<br>Para a realização da análise de investimentos foi considerado: </br><br>Período de vida útil do sistema de 25 anos.</br><br>Taxa mínima de atratividade escolhida foi de "+tutorial.tma.toFixed(2)+"% ao ano.[O valor de 6.50% equivale a um rendimento de poupança] </br><br>Decaimento de produção de energia dos painéis de "+tutorial.decaimentoPainel.toFixed(2)+"% ao ano.</br><br>Taxa de correção da tarifa de energia elétrica de "+investimento.ajusteTarifa*100+"% ao ano.</br><br>O custo da estrutura de suporte dos painéis foi estimado em R$"+investimento.precoEstrutura.toFixed(2)+" por Watt de potência instalada.</br><br>O custo de cabeamento e proteção do sistema foi estimado em R$"+investimento.precoCabeamento.toFixed(2)+" por Watt de potência instalada.</br><br>Em caso de problemas ou desejo de adicionar algum equipamento no banco de dados envie email para: <strong>solano.aguirre@engenharia.ufjf.br</strong></br>");
});

$("#button-analise").click(function(){
  $("#custo-total-paineis").html("<br>Custo total dos painéis: R$"+investimento.custoPaineis+"</br>");
  $("#custo-total-inversor").html("<br>Custo total dos Inversores: R$"+investimento.custoInversor+ "</br>");
  $("#custo-total-estrutura").html("<br>Custo estimado com a Estrutura: R$"+investimento.custoEstrutura.toFixed(2)+ "</br>");
  $("#custo-total-cabeamento").html("<br>Custo estimado com Cabeamento e Proteção: R$"+investimento.custoCabeamento.toFixed(2)+ "</br>");
  $("#custo-total-sistema").html("<br>Custo total do sistema: R$"+investimento.custoTotal+"</br>");
  $("#valor-presente-liquido").html("<br>Valor Presente Líquido: R$"+investimento.vpl.toFixed(2)+"</br>");
  $("#taxa-interna-retorno").html("<br>Taxa Interna de Retorno: "+investimento.tir.toFixed(2)+"% ao ano</br>");
  $("#payback").html("<br>Payback: "+investimento.payback.toFixed(2)+" anos</br>");
  $("#payback-descontado").html("<br>Payback Descontado: "+investimento.paybackDescontado.toFixed(2)+" anos</br>");
});

// $("#pot-sistema").html("<br>Na faixa MPPT("+inversor.VmpptMin+"V - "+inversor.VmpptMax+" V):"+ +"</br>");

//código para a rolagem rápida no tutorial
var $doc = $('html, body');

// $('.scrollSuave').click(function() {
//     $("#myModalEquipamentos").animate({
//       //scrollTop: $( $.attr(this, 'href') ).offset().top
//       scrollTop: 400
//     }, 500);
//     //return false;
// });


//$("#myModalEquipamentos").animate({"scrollTop": 00}, 400)
// function teste222() {
//     $doc.animate({
//         scrollTop: $("#determinacao-demanda").offset().top
//     }, 500);
//     return false;
// };
//$("#myModalEquipamentos").animate({"scrollTop": 00}, 400)
