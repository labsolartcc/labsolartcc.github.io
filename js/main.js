//Software para dimensionamento de equipamentos e projeto de sistemas fotovoltaicos
//Dimensionamento da potência do sistema em até 10kW
var painel =  { "potencia":255,
                 "Vmax":37.4,
                 "Vmin":32.5,
                 "correnteSC":9,
                 "nome":"Canadian CSI CS6P-255P",
                 "preco":875
               };

var arranjo = { "numSerie":0,
                "numParalelo":0,
                "Vmax":0,
                "Vmin":0,
                "Imax":0,
                "Imin":0, };

 var sistema = { "potencia":0,
                 "numPaineis":0,
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
                 "energia":0                        //Energia produzida mensalmente
                };

var inversor     = {  "potMaxEntrada":0,
                      "VmpptMin":0,
                      "VmpptMax":0,
                      "correnteMax":0,
                      "VMaxEntrada":0,
                      "VMinStart":0,
                      "preco":0,
                   };


var inversor1300 = { "nome":"Inversor SMA Sunny Boy SB 1300TL-10",
                     "potMaxEntrada":1400,
                     "VmpptMin":115,
                     "VmpptMax":480,
                     "correnteMax":12,
                     "VMaxEntrada":600,
                     "VMinStart":120,
                     "preco":0,
                   };

var inversor1500 = { "nome":"Inversor Fronius Galvo 1.5-1",
                   "potMaxEntrada":1600,
                   "VmpptMin":120,
                   "VmpptMax":335,
                   "correnteMax":13.3,
                   "VMaxEntrada":420,
                   "VMinStart":140,
                   "preco":8200,
                   };

var inversor2000 = { "nome":"Inversor Fronius Galvo 2.0-1",
                  "potMaxEntrada":2140,
                  "VmpptMin":120,
                  "VmpptMax":335,
                  "correnteMax":17.8,
                  "VMaxEntrada":420,
                  "VMinStart":140,
                  "preco":8400,
                  };

var inversor2500 = { "nome":"Inversor Fronius Galvo 2.5-1",
                   "potMaxEntrada":2650,
                   "VmpptMin":165,
                   "VmpptMax":440,
                   "correnteMax":16.6,
                   "VMaxEntrada":550,
                   "VMinStart":185,
                   "preco":8600,
                   };

var inversor3000 = { "nome":"Inversor Grid-tie Fronius Primo 3.0-1",
                  "potMaxEntrada":3000,
                  "VmpptMin":200,
                  "VmpptMax":800,
                  "correnteMax":20.7,
                  "VMaxEntrada":1000,
                  "VMinStart":80,
                  "preco":8400,
                  };

var inversor4000 = { "nome":"Inversor Fronius Primo 4.0-1",
                     "potMaxEntrada":4000,
                     "VmpptMin":210,
                     "VmpptMax":800,
                     "VMaxEntrada":1000,
                     "correnteMax":12,
                     "VMinStart":80,
                     "preco":9300,
                    };

var inversor5000 = {  "nome":"Inversor Fronius Primo 5.0-1",
                      "potMaxEntrada":5000,
                      "VmpptMin":240,
                      "VmpptMax":800,
                      "VMaxEntrada":1000,
                      "correnteMax":12,
                      "VMinStart":80,
                      "preco":10300,
                   };

var inversor6000 = { "nome":"Inversor Fronius Primo 6.0-1",
                     "potMaxEntrada":6000,
                     "VmpptMin":240,
                     "VmpptMax":800,
                     "VMaxEntrada":1000,
                     "correnteMax":18,
                     "VMinStart":80,
                     "preco":12000,
                    };

var inversor7000 = { "nome":"Inversor SMA Sunny MiniCentral SMC 7000HV-11",
                      "potMaxEntrada":7500,
                      "VmpptMin":335,
                      "VmpptMax":560,
                      "VMaxEntrada":800,
                      "correnteMax":23,
                      "VMinStart":400,
                      "preco":14400,
                    };

var inversor8000 = {  "nome":"Inversor Fronius IG Plus 100V-1",
                      "potMaxEntrada":8520,
                      "VmpptMin":230,
                      "VmpptMax":500,
                      "VMaxEntrada":600,
                      "correnteMax":37,
                      "VMinStart":260,
                      "preco":14400,
                      };

var inversor9000 = { "nome":"SMA SB 9000TLUS-10 Sunny Boy Grid Tie Inverter",
                     "potMaxEntrada":11250,
                     "VmpptMin":300,
                     "VmpptMax":480,
                     "VMaxEntrada":600,
                     "correnteMax":31,
                     "VMinStart":360,
                     "preco":0,
                     };

//vetor com as potências disponíveis para inversores
var inversorLista = [inversor1300,inversor1500,inversor2000,inversor2500,inversor3000,inversor4000,inversor5000,inversor6000,inversor7000,inversor8000,inversor9000];

//Recebe valores inseridos pelo usuário
function getInputs(){
  sistema.HSP = document.getElementById("hsp").value;
  sistema.consumoMensal = document.getElementById("consumo").value;
  run();
  document.getElementById("resultado").innerHTML =
  "<br>--------------------------------------------------------</br>"+
  "<br>Consumo Mensal: "+sistema.consumoMensal+ "kWh </br>"+
  "<br>Horas de Sol Pleno: "+sistema.HSP+" kWh/m².dia</br>"+
  "<br>Consumo médio diário: "+sistema.consumoDiario+ "Wh </br>"+
  "<br>Potência necessária: "+potInteira+"W</br>"+
  "<br>--------------------PAINEL----------------------------</br>"+
  "<br>Painel: "+painel.nome+"</br>"+
  "<br>Potência do painel: "+painel.potencia+" W</br>"+
  "<br>--------------------ARRANJO----------------------------</br>"+
  "<br>Número de painéis decimal:"+numPaineisDecimal+"</br>"+
  "<br>Número de painéis: "+ sistema.numPaineis+"</br>"+
  "<br>Painéis em série: "+ arranjo.numSerie+"</br>"+
  "<br>Strings em paralelo: "+arranjo.numParalelo+"</br>"+
  "<br>Potência do arranjo: "+ sistema.potencia+"W</br>"+
  "<br>Vmax do arranjo FV: "+arranjo.Vmax+"V</br>"+
  "<br>Vmin do arranjo FV: "+arranjo.Vmin+"V</br>"+
  "<br>Corrente do arranjo FV: "+painel.correnteSC*arranjo.numParalelo+"A </br>"+
  "<br>--------------------INVERSOR----------------------------</br>"+
  "<br>Inversor:"+inversor.nome+"</br>"+
  "<br>Máxima potência de entrada do inversor: "+inversor.potMaxEntrada+"W</br>"+
  "<br>Faixa MPPT: "+inversor.VmpptMin+"V ~ "+inversor.VmpptMax+" V </br>"+
  "<br>Corrente máxima de entrada: "+inversor.correnteMax+" A </br>"+
  "<br>--------------------SISTEMA----------------------------</br>"+
  "<br>Potência: "+sistema.potencia+" W</br>"+
  "<br>Na faixa MPPT("+inversor.VmpptMin+"V - "+inversor.VmpptMax+" V): "+sistema.MPPTativo+"</br>"+
  "<br>Sistema ok: "+sistema.condicao+"</br>";
  clean();
}

//{ fecha na ultima linha
function run(){
  //-------------Cálculo da potência do Sistema-------//
  //Consumo médio diário em Wh
  sistema.consumoDiario = 1000*sistema.consumoMensal/30;
  //calcula a potência para produzir a energia necessária
  potInteira = (sistema.consumoDiario/sistema.TD)/sistema.HSP;
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
    console.log("Verificando arranjo...");
    arranjo.numSerie = Math.round( (inversor.VmpptMax/painel.Vmax) - 0.5);
    arranjo.Vmax = arranjo.numSerie*painel.Vmax;
    arranjo.Vmin = arranjo.numSerie*painel.Vmin;
    arranjo.numParalelo = Math.round(sistema.numPaineis/arranjo.numSerie);
    arranjo.Imax = arranjo.numParalelo*painel.correnteSC;

    if(arranjo.Vmax<inversor.VmpptMax && arranjo.Vmin>inversor.VmpptMin){
      console.log("teste2:MPPT ativo!");
      sistema.MPPTativo = true;
    }

    if(inversor.potMaxEntrada>=sistema.potencia){
      console.log("teste2:Potencia de entrada do Inversor ok!");
      sistema.condicaopotMaxEntrada = true;
    }

    if(arranjo.Vmin>inversor.VMinStart){
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

  }

  //-----------Adequação Final-------------------------------//
  sistema.numPaineis = arranjo.numSerie * arranjo.numParalelo;
  sistema.potencia   = sistema.numPaineis * painel.potencia;
  sistema.precoTotal = sistema.numPaineis*painel.preco + inversor.preco;
  sistema.energia    = sistema.potencia*sistema.HSP*sistema.TD*(30/1000);

  //------------Console------------------------------//

  console.log("------------------------------------------");
  console.log("Consumo Mensal: "+sistema.consumoMensal+" kWh");
  console.log("Consumo medio diario: "+sistema.consumoDiario+" Wh");
  console.log("Pot necessaria: "+potInteira+" W");
  console.log("Painel: "+painel.nome);
  console.log("Pot do painel: "+painel.potencia+" W");
  console.log("Num de paineis decimal: "+numPaineisDecimal);
  console.log("Num de paineis: "+ sistema.numPaineis);
  console.log("Paineis em serie: "+ arranjo.numSerie);
  console.log("Strings em paralelo: "+arranjo.numParalelo);
  console.log("Potencia do arranjo: "+ sistema.potencia+" W");
  console.log("Vmax do arranjo FV: "+arranjo.Vmax+" V");
  console.log("Vmin do arranjo FV: "+arranjo.Vmin+" V");
  console.log("Na faixa MPPT("+inversor.VmpptMin+"V - "+inversor.VmpptMax+" V): "+sistema.MPPTativo);
  console.log("Sistema ok:"+sistema.condicao);
  console.log("Inversor: "+inversor.nome);
  console.log("Max pot entrada inversor: "+inversor.potMaxEntrada+"W");
  console.log("Custo paineis: R$"+sistema.numPaineis*painel.preco);
  console.log("Custo Inversor: R$"+inversor.preco);
  console.log("Custo total: R$"+sistema.precoTotal);
  console.log("Energia produzida mensal média: "+sistema.energia+"kWh");
}

function clean(){
  sistema.condicaopotMaxEntrada = false;
  sistema.condicaoVmin = false;
  sistema.condicaoVmax = false;
  sistema.condicaoImax = false;
  sistema.condicao = false;
  sistema.MPPTativo = false;
  arranjo.numSerie=0;
  arranjo.numParalelo=0;
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
  // inversor.potMaxEntrada = 0;
  // inversor.VmpptMin = 0;
  // inversor.VmpptMax = 0;
  // inversor.correnteMax = 0;
  // inversor.VMaxEntrada = 0;
  // inversor.VMinStart = 0;
  // inversor.preco = 0;
}
