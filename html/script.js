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
  
    Historico.push("Inicio do jogo: [Margem A:" + MargemA)
    Historico.push("Canoa:" + Canoa)
    Historico.push("Margem B:" + MargemB+"]")
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
  
      start()
  
  }
  
  
  resete = document.getElementById("resete")
  resete.addEventListener("click", reset)
  
  
  
  let MargemA = ["Pai", "Mãe", "Policial", "Prisioneiro", "Filha1", "Filha2", "Filho1", "Filho2"]
  let Canoa = []
  let MargemB = []
  let Historico = []
  let SalvarHistorico= []
  
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
        LadoAtual = null
        return false;
      }
      /*Quando é clicado em algum passageiro na margem A, é adicionado uma classe "opacity", 
       que foi atribuida no css propriedades para não ficar totalmente vissivel*/
      
      Canoa.push(idImagem)
    }
    else if (LadoAtual == 2) {
  
      //caso clique mais de 2 vezes nas imagens, é acionado o alerta de canoa cheia, não contabilizando o ultimo click para canoa
      if (Canoa.length >= 2) {
        alert("Canoa cheia!")
        LadoAtual = null
        return false;
      }
      
      Canoa.push(idImagem)
      
      //caso clicado na margem B é adicionado dentro da canoa o classe da imagem clicada
    }
  
    Historico.push("Jogada: " +" Margem A:"+ MargemA +"/"+" Canoa: "+"/"+Canoa+" Margem B:"+MargemB)
    if(Canoa.length > 0){
    document.getElementById("tem").innerHTML = Canoa
    }
   
    
  }
  
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
        document.getElementById('atravessar').disabled
      
      })
      
    }
  
    Historico.push("Embarcou: [Margem A:" + MargemA )
    Historico.push("Canoa:" + Canoa)
    Historico.push("Margem B:" + MargemB+"]")
    document.getElementById("tem").innerHTML = "**"
    
  
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
        })
        document.getElementById('lado').innerHTML = "Canoa (Lado B)"
        LadoAtual = 2
        Canoa = []
        
      } else if(LadoAtual == 2 ){
        Canoa.map(pass => {
          MargemA.push(pass)
          let image = document.querySelector("." + pass)
            
          document.querySelector("#" + pass).appendChild(image)
        })
        document.getElementById('lado').innerHTML = "Canoa (Lado A)"
        LadoAtual = 1
        Canoa = []
        
      }
      Historico.push("Atravessou: " +" Margem A:"+ MargemA +"/"+" Canoa: "+"/"+Canoa+" Margem B:"+MargemB)
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
  
  }
  
  function desembarcar() {
  
  if(LadoAtual == 1){
      Canoa.map(pass => {
        MargemA.push(pass)
        let image = document.querySelector("." + pass)
        image.classList.remove('opacity')
        document.querySelector("#" + pass).appendChild(image)
      })
      LadoAtual = 2
      Canoa = []
       
      Historico.push("Desembarcou: " +" Margem A:"+ MargemA +"/"+" Canoa: "+"/"+Canoa+" Margem B:"+MargemB)
    } else if (LadoAtual == 2) {
      Canoa.map(pass => {
        MargemB.push(pass)
        let image = document.querySelector("." + pass)
          
        document.querySelector("#margem-b").appendChild(image)
      })
      LadoAtual = 1
      Canoa = []
      
      Historico.push("Desembarcou: " +" Margem A:"+ MargemA +"/"+" Canoa: "+"/"+Canoa+" Margem B:"+MargemB)
    }
    
  }
  
  function embarcarB() {
  
    // vai mostrar na tela as imagens adicionadas na canoa, retirar da margem b 
  
      Canoa.map(pass => {
        let image = document.querySelector("." + pass)
        image.parentNode.removeChild(image);
        document.getElementById("canoa").appendChild(image);
      })
   
  }
  
    let jogo = document.getElementById("win")
     let  menssagem = document.getElementById("game")
  
    function win(){
         if(MargemB.length == 8) {
      
      jogo.classList.remove('hidden')
      menssagem.classList.add('hidden')
      pause()
      Historico.push("Tempo:"+hour+":"+minute+":"+second)
      document.getElementById("main").innerHTML = `
      <audio autoplay loop>
      <source  src="/src/victory.mp3">
      
    Your browser does not support the audio element.
    </audio>`
     
    }
   
  }
  
  function novoJogo(){
  
    jogo.classList.add('hidden')
    menssagem.classList.remove('hidden')
    MargemA = ["Pai", "Mãe", "Policial", "Prisioneiro", "Filha1", "Filha2", "Filho1", "Filho2"]
    Canoa = []
    MargemB = []
    SalvarHistorico.push(Historico)
    document.getElementById("main").innerHTML = `
    <audio autoplay  loop>
    <source  src="./src/Main_teme.mp3">
    
  Your browser does not support the audio element.
  </audio>`
  
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
  
  window.addEventListener("load", creat)
  
  