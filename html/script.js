function jogar(){
    let btn = document.getElementById("instrucoes")
    btn.classList.add('hidden')
    game.classList.remove('hidden')
    start()
  }


  function timer() {
    if ((millisecond += 10) == 1000) {
      millisecond = 0;
      second++;
    }
    if (second == 60) {
      second = 0;
      minute++;
    }
    if (minute == 60) {
      minute = 0;
      hour++;
    }
    document.getElementById('hour').innerText = returnData(hour);
    document.getElementById('minute').innerText = returnData(minute);
    document.getElementById('second').innerText = returnData(second);
  
  }
  
  function returnData(input) {
    return input >= 10 ? input : `0${input}`
  }
  let hour = 0;
  let minute = 0;
  let second = 0;
  let millisecond = 0;
  
  let cron;
  
  function start() {
    pause();
    
    cron = setInterval(() => { timer(); }, 10);
  
    Historico.push("Margem A:" + MargemA)
    Historico.push("Canoa:" + Canoa)
    Historico.push("Margem B:" + MargemB)
    ladoa.style.pointerEvents = 'auto'
    ladob.style.pointerEvents = 'none'
  }
  
  function pause() {
    clearInterval(cron);
    
  }
  
  function reset() {
    hour = 0;
    minute = 0;
    second = 0;
    millisecond = 0;
    document.getElementById('hour').innerText = '00';
    document.getElementById('minute').innerText = '00';
    document.getElementById('second').innerText = '00';
    MargemA = ["Pai", "Mãe", "Policial", "Prisioneiro", "Filha1", "Filha2", "Filho1", "Filho2"]
    Canoa = []
    MargemB = []
    Historico = []
    LadoAtual = null
    document.getElementById('a').innerHTML = `
    
            <h4>Margem A</h4>
         
              <div class="content">
                <div id="Pai"></div>
                <div id="Mãe"></div>
                <div id="Policial"></div>
                <div id="Prisioneiro"></div>
                <div id="Filha1"></div>
                <div id="Filha2"></div>
                <div id="Filho1"></div>
                <div id="Filho2"></div>
                
              </div>`
      creat()
      
    document.getElementById('b').innerHTML = `
    
    <h4 id="lado" value="1">Canoa (Lado A)</h4>   
          <div  id="canoa">                   
          </div>
    `
    document.getElementById('c').innerHTML =`
      <h4>Margem B</h4>
      <div class="content-1" id="margem-b"> 
      </div>` 
    document.getElementById("tem").innerHTML = "**"
    document.getElementById("embarcarA").disabled= false
    document.getElementById("embarcarB").disabled= true
    ladoa.style.pointerEvents = 'auto'
    ladob.style.pointerEvents = 'none'


      start()
  
  }
  
  
  resete = document.getElementById("resete")
  resete.addEventListener("click", reset)
  
  
  
  let MargemA = ["Pai", "Mãe", "Policial", "Prisioneiro", "Filha1", "Filha2", "Filho1", "Filho2"]
  let Canoa = []
  let MargemB = []
  let Historico = []
  let SalvarHistorico= []
  let SalvarTempo = []
 
  


  let imagem; // pega as informações da imagem
  let idImagem; // seleciona somente o id da imagem//libera o uso ou não do botão atravessar
  let LadoAtual;// mostra o lado pra onde esta sendo clicado e levado as imagens
  let travess;
  
  
  //A cada click na imagem, é acionado a function travessia. Que verifica o lado de cada imagem clicaca;
  
  
  function travessia() {
  
    imagem = this // pega as informações da imagem
    idImagem = this.getAttribute("class") // seleciona somente o classe da imagem//libera o uso ou não do botão atravessar
    LadoAtual = null // mostra o lado pra onde esta sendo clicado e levado as imagens
    elementos = document.getElementById(idImagem) // pegando o div com  o id da imagem
   
   
    // quando clicado em alguma iamgem da margem A, adiciona o lado atual que esta sendo executado a travessia
    for (let i = 0; i < MargemA.length; i++) {
      if (MargemA[i] == idImagem) {   
        LadoAtual = 1
        MargemA.splice(i, 1)
        break;
      }
    }
  
    // quando clicado em alguma iamgem da margem A, adiciona o lado atual que esta sendo executado a travessia
    for (let i = 0; i < MargemB.length; i++) {
      if (MargemB[i] == idImagem) {
        LadoAtual = 2
        MargemB.splice(i, 1)
        break;
      }
    }
  
    if (LadoAtual == 1) {
      //caso clique mais de 2 vezes nas imagens, é acionado o alerta de canoa cheia, não contabilizando o ultimo click para canoa
      if (Canoa.length >= 2) {
        alert("Canoa cheia!")
        
        return false;
      }
      
      
      Canoa.push(idImagem)
    }
    else if (LadoAtual == 2) {
  
      //caso clique mais de 2 vezes nas imagens, é acionado o alerta de canoa cheia, não contabilizando o ultimo click para canoa
      if (Canoa.length >= 2) {
        alert("Canoa cheia!")
       
        return false;
      }
      
      Canoa.push(idImagem)
      
      //caso clicado na margem B é adicionado dentro da canoa o classe da imagem clicada
    }
  
    
    if(Canoa.length > 0){
    document.getElementById("tem").innerHTML = Canoa
    }
   
    
  }
  let ladoa = document.getElementById("a")
  let ladob = document.getElementById("c")

  function embarcarA() {
    //caso a canoa não possua 2 paageiros é disparado o alerta
    if (Canoa.length != 2) {
      alert("Selecione os passageiros")
      return false;
  
    } else if (LadoAtual == 1) {
      // Se o lado atual estiver no 1 (margem-a), para cada seleção de imagem é retirado de dentro do arrar MargemA
      // e colocado dentro da div (canoa) as imagens que foram selecionadas
  
      Canoa.map(pass => {
        let image = document.querySelector("." + pass)
        image.parentNode.removeChild(image);
        document.getElementById("canoa").appendChild(image);
        
      
      })
      document.getElementById("atravessar").disabled= false
      document.getElementById("desembarcar").disabled= false
      document.getElementById("embarcarA").disabled= true
      


    }
  
    Historico.push("--------------------------------------Embarcou--------------------------------------") 
    Historico.push("Margem A:"+ MargemA)
    Historico.push("Canoa:" + Canoa)
    Historico.push("Margem B:" + MargemB)
    Historico.push("---------------------"+hour+" Hora(s) "+minute+" Minuto(s) "+second+" Segundo(s)-------------------------")

    document.getElementById("tem").innerHTML = "**"
    
    ladoa.style.pointerEvents = 'none'
   

  
  }
  
  function atravessar() {
    
    if (Canoa.length == 0 ) {
      return; 
    }
    if (regra1()) {
      alert("Canoa so pode ser conduzida pelo pai, mãe ou policial")
      desembarcar();   
          return;
    }
    else if (regra2()) {
      alert("Mãe não pode permanecer na margem na companhia de um ou mais filhos sem a presença do pai")
      desembarcar();
          return;
    }
    else if (regra3()) {
      alert("Pai não pode permanecer na margem na companhia de uma ou mais filhas sem a presença da mãe")
      desembarcar();
          return;
    }
    else if (regra4()) {
      alert("Prisioneiro não pode ficar em nenhuma das margem com outras pessoa sem a presença do policial")
      desembarcar();
          return;
    }
    else {
      if(LadoAtual == 1 ){
        Canoa.map(pass => {
          MargemB.push(pass)
          let image = document.querySelector("." + pass)
            
          document.querySelector("#margem-b").appendChild(image)
          ladoa.style.pointerEvents = 'none'
          ladob.style.pointerEvents = 'auto'
        })
        document.getElementById('lado').innerHTML = "Canoa (Lado B)"
        LadoAtual = 2
        Canoa = []
        ladoa.style.pointerEvents = 'pointer'
        document.getElementById("embarcarB").disabled= false
        
      } else if(LadoAtual == 2 ){
        Canoa.map(pass => {
          MargemA.push(pass)
          let image = document.querySelector("." + pass)
            
          document.querySelector("#" + pass).appendChild(image)
          ladoa.style.pointerEvents = 'auto'
          ladob.style.pointerEvents = 'none'
        })
        document.getElementById('lado').innerHTML = "Canoa (Lado A)"
        LadoAtual = 1
        Canoa = []
      document.getElementById("embarcarA").disabled= false
      document.getElementById("embarcarB").disabled= true

        
      }
      Historico.push("--------------------------Atravessou para outra Margem--------------------------") 
      Historico.push("Margem A:"+ MargemA)
      Historico.push("Canoa:" + Canoa)
      Historico.push("Margem B:" + MargemB)
      Historico.push("-------------------"+hour+" Hora(s) "+minute+" Minuto(s) "+second+" Segundo(s)!----------------------")

      document.getElementById("tem").innerHTML = "**"
      
    }
  
    function regra1() {
      return !Canoa.includes("Pai") && !Canoa.includes("Mãe") && !Canoa.includes("Policial") ? true : false
    }
    function regra2() {
      return MargemA.includes("Mãe") && (MargemA.includes("Filho1") || MargemA.includes("Filho2")) && !MargemA.includes("Pai") ? true :
        MargemB.includes("Mãe") && (MargemB.includes("Filho1") || MargemB.includes("Filho2")) && !MargemB.includes("Pai") ? true : false
    }
    function regra3() {
      return MargemA.includes("Pai") && (MargemA.includes("Filha1") || MargemA.includes("Filha2")) && !MargemA.includes("Mãe") ? true :
        MargemB.includes("Pai") && (MargemB.includes("Filha1") || MargemB.includes("Filha2")) && !MargemB.includes("Mãe") ? true : false
    }
    function regra4() {
      return MargemA.includes("Prisioneiro") && !MargemA.includes("Policial") && MargemA.length > 1 ? true :
        MargemB.includes("Prisioneiro") && !MargemB.includes("Policial") && MargemB.length > 1 ? true : false
  
    }
    document.getElementById("atravessar").disabled= true
    document.getElementById("desembarcar").disabled= true
  }
  
  function desembarcar() {
  
  if(LadoAtual == 1){
      Canoa.map(pass => {
        MargemA.push(pass)
        let image = document.querySelector("." + pass)
        
        document.querySelector("#" + pass).appendChild(image)
      })
      LadoAtual = 2
      Canoa = []
       
      Historico.push("------------------------------------Desembarcou------------------------------------")  
      Historico.push("Margem A:"+ MargemA)
    Historico.push("Canoa:" + Canoa)
    Historico.push("Margem B:" + MargemB)
    Historico.push("-------------------"+hour+" Hora(s) "+minute+" Minuto(s) "+second+" Segundo(s)!----------------------")
    ladoa.style.pointerEvents = 'auto'
    ladob.style.pointerEvents = 'none'
    document.getElementById("embarcarA").disabled= false
    } else if (LadoAtual == 2) {
      Canoa.map(pass => {
        MargemB.push(pass)
        let image = document.querySelector("." + pass)
          
        document.querySelector("#margem-b").appendChild(image)
      })
      LadoAtual = 1
      Canoa = []
      
      Historico.push("------------------------------------Desembarcou------------------------------------") 
      Historico.push("Margem A"+ MargemA)
      Historico.push("Canoa:" + Canoa)
      Historico.push("Margem B:" + MargemB)
    Historico.push("-------------------"+hour+" Hora(s) "+minute+" Minuto(s) "+second+" Segundo(s)!----------------------")
    ladoa.style.pointerEvents = 'none'
    ladob.style.pointerEvents = 'auto'
    document.getElementById("embarcarB").disabled= false

    }
    document.getElementById("tem").innerHTML = "**"
    document.getElementById("atravessar").disabled= true
    document.getElementById("desembarcar").disabled= true
  }
  
  function embarcarB() {
    if(Canoa.length == 0){
      alert("Selecione o(s) passageiros")
    return false
    }
    
    ladob.style.pointerEvents = 'none'
    // vai mostrar na tela as imagens adicionadas na canoa, retirar da margem b 
  
      Canoa.map(pass => {
        let image = document.querySelector("." + pass)
        image.parentNode.removeChild(image);
        document.getElementById("canoa").appendChild(image);
     
      })

      Historico.push("--------------------------------------Embarcou--------------------------------------") 
      Historico.push("Margem A:"+ MargemA)
      Historico.push("Canoa:" + Canoa)
      Historico.push("Margem B:" + MargemB)
      Historico.push("-------------------"+hour+" Hora(s) "+minute+" Minuto(s) "+second+" Segundo(s)!----------------------")

     document.getElementById("tem").innerHTML = "**"

      document.getElementById("atravessar").disabled= false
      document.getElementById("desembarcar").disabled= false
     

  }
  
    let winner = document.getElementById("win")
     let  game = document.getElementById("game")
  
    function win(){
         if(MargemB.length == 2 ) {
          ladoa.style.pointerEvents = 'auto'
          ladob.style.pointerEvents = 'none'
      winner.classList.remove('hidden')
      game.classList.add('hidden')
      pause()
      Historico.push("-------------------------------------Fim de jogo!------------------------------------")
      Historico.push("Tempo de conclusão: "+hour+" Hora(s) "+minute+" Minuto(s) "+second+" Segundo(s)!")
      SalvarTempo.push(hour+minute+second).value
      document.getElementById("main").innerHTML = `
      <audio autoplay loop>
      <source  src="/src/victory.mp3">
      
    Your browser does not support the audio element.
    </audio>`
        
            
        

    }
    SalvarHistorico.push(Historico)
  }

  function novoJogo(){
    historicoMostrarDetalhesFinal()
    table()
    winner.classList.add('hidden')
    game.classList.remove('hidden')
    jogadas.classList.add('hidden')
    MargemA = ["Pai", "Mãe", "Policial", "Prisioneiro", "Filha1", "Filha2", "Filho1", "Filho2"]
    Canoa = []
    MargemB = []
    Historico = []
    document.getElementById("main").innerHTML = `
    <audio autoplay  loop>
    <source  src="./src/Main_teme.mp3">
    
  Your browser does not support the audio element.
  </audio>`

    document.getElementById("jogadas").innerHTML =`<div class="blur" id="dentro" >
    <ul id="his">
      <li>------------------------------------Inicio de jogo------------------------------------</li>
    </ul>
    


</div>`


  reset()
  document.getElementById("historico-jogadas").classList.remove('hidden')


  }
  
  window.addEventListener("click", win)
  recomeco = document.getElementById("novo-game")
  recomeco.addEventListener("click", novoJogo)
  
  
  
  // adicionando eventos aos botões, quando são clicados
  embarqueA = document.getElementById('embarcarA')
  embarqueA.addEventListener('click', embarcarA)
  desembarqueA = document.getElementById('desembarcar')
  desembarqueA.addEventListener('click', desembarcar)
  desembarqueB = document.getElementById('atravessar')
  desembarqueB.addEventListener('click', atravessar)
  embarqueB = document.getElementById('embarcarB')
  embarqueB.addEventListener('click', embarcarB)
  
  
  //Declarando variáveis para a criação de elementos no html, setando atributos como o diretório e a sua id única.
  function creat(){
    let pai = document.createElement("img")
  pai.setAttribute("src", "/src/pai.png")
  pai.setAttribute("class", "Pai")
  pai.addEventListener("click", travessia)
  
  document.getElementById("Pai").appendChild(pai)
  
  let mae = document.createElement("img")
  mae.setAttribute("src", "/src/mae.png")
  mae.setAttribute("class", "Mãe")
  mae.addEventListener("click", travessia)
  
  document.getElementById("Mãe").appendChild(mae)
  
  let policial = document.createElement("img")
  policial.setAttribute("src", "/src/policial.png")
  policial.setAttribute("class", "Policial")
  policial.addEventListener("click", travessia)
  
  document.getElementById("Policial").appendChild(policial)
  
  let prisioneiro = document.createElement("img")
  prisioneiro.setAttribute("src", "/src/prisioneiro.png")
  prisioneiro.setAttribute("class", "Prisioneiro")
  prisioneiro.addEventListener("click", travessia)
  
  document.getElementById("Prisioneiro").appendChild(prisioneiro)
  
  let filha1 = document.createElement("img")
  filha1.setAttribute("src", "/src/filha1.png")
  filha1.setAttribute("class", "Filha1")
  filha1.addEventListener("click", travessia)
  
  document.getElementById("Filha1").appendChild(filha1)
  
  let filha2 = document.createElement("img")
  filha2.setAttribute("src", "/src/filha2.png")
  filha2.setAttribute("class", "Filha2")
  filha2.addEventListener("click", travessia)
  
  document.getElementById("Filha2").appendChild(filha2)
  
  let filho1 = document.createElement("img")
  filho1.setAttribute("src", "/src/filho1.png")
  filho1.setAttribute("class", "Filho1")
  filho1.addEventListener("click", travessia)
  document.getElementById("Filho1").appendChild(filho1)
  
  let filho2 = document.createElement("img")
  filho2.setAttribute("src", "/src/filho2.png")
  filho2.setAttribute("class", "Filho2")
  filho2.addEventListener("click", travessia)
  
  document.getElementById("Filho2").appendChild(filho2)
  }

let hist1 = document.getElementById("mostrarHistórico")
hist1.addEventListener("click", historicoMostrar)

function historicoMostrar(){
  
    game.classList.add('hidden')
    jogadas.classList.add('hidden')
    historico.classList.remove('hidden')
    
}


function historicoMostrarDetalhes(){
  
  let lista = document.getElementById('his')
  if(Historico.length == 0){
    alert("Não há nenhum histórico!")
    return 
   }else{
    pause();
    historico.classList.add('hidden')
    jogadas.classList.remove('hidden')
    for(var i = 0; i < Historico.length; i++){
      let item = document.createElement('li')
      item.appendChild(document.createTextNode(Historico[i]))
      lista.appendChild(item)
    }
    document.getElementById("historico-jogadas").classList.add('hidden')
  }


}

function voltando(){
  game.classList.remove('hidden')
  historico.classList.add('hidden')
  
  

}

  window.addEventListener("load", creat)
 

  
  function table(){
      let tr = document.createElement('tr')
      let tr2 = document.createElement('td')
      tr.innerHTML = "Jogador";

    
    for(var i = 0; i < SalvarHistorico.length; i++){
      tr.setAttribute("id", i)
      
      tr2.innerHTML = `<button  id="teste" onclick="view()">Veja o histórico de jogadas</button>
      `;
      document.getElementById("customers").appendChild(tr)
      document.getElementById(i).appendChild(tr2)
        

    }
    
  }

  var volt = document.getElementById("voltaHist")
  var jogos = document.getElementById("jogos")


  function historicoMostrarDetalhesFinal(){

    let jogo = document.getElementById("jogo")
    for(var i = 0; i < Historico.length; i++){
      let item = document.createElement('li')
      item.appendChild(document.createTextNode(Historico[i]))
      jogo.appendChild(item)

      
    }
   
 
  }

  function volta(){
    var volt = document.getElementById("voltaHist")
    var jogos = document.getElementById("jogos")
  historico.classList.remove('hidden')
  jogos.classList.add("hidden")
  volt.classList.add("hidden")
}
 

  function view(){
    var volt = document.getElementById("voltaHist")
    var jogos = document.getElementById("jogos")
    historico.classList.add('hidden')
    jogos.classList.remove("hidden")
    volt.classList.remove("hidden")
  }

  function tempoMedio(){
    if(SalvarTempo.length ==0){
    alert("Não possui média!")
    }
    let sum = 0
    let media = 0
    for (let i = 0; i < SalvarTempo.length; i++) {
      sum += SalvarTempo[i] 
      media =  sum / SalvarTempo.length
      
}
alert("A media de jogos é de :" + media)
}