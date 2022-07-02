let MargemA = ["Pai", "Mãe", "Policial", "Prisioneiro", "Filha1", "Filha2", "Filho1", "Filho2"]
let Canoa = []
let MargemB = []

//A cada click na imagem, é acionado a function travessia. Que verifica o lado de cada imagem clicaca;


function travessia() {

    let imagem = this // pega as informações da imagem
    let idImagem = this.getAttribute("id") // seleciona somente o id da imagem
    let travess = false; //libera o uso ou não do botão atravessar
    let LadoAtual = null // mostra o lado pra onde esta sendo clicado e levado as imagens
    

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

    console.log(LadoAtual)
    //caso clicado na margem A é adicionado dentro da canoa o id da imagem clicada
    if (LadoAtual == 1) {
        //caso clique mais de 2 vezes nas imagens, é acionado o alerta de canoa cheia, não contabilizando o ultimo click para canoa
        if (Canoa.length >= 2) {
            alert("Canoa cheia!")
            return false;
        }

        Canoa.push(idImagem)
    }

    //caso clicado na margem B é adicionado dentro da canoa o id da imagem clicada
    else if (LadoAtual == 2) {

        //caso clique mais de 2 vezes nas imagens, é acionado o alerta de canoa cheia, não contabilizando o ultimo click para canoa
        if (Canoa.length >= 2) {
            alert("Canoa cheia!")
            return false;
        }

        Canoa.push(idImagem)

        //caso clicado na margem B é adicionado dentro da canoa o id da imagem clicada
    }

    //Foi separado os botões de embarque em duas posições, lado da amrgem A e da margem B
    function embarcarA() {
        console.log(LadoAtual)

        //caso a canoa não possua 2 paageiros é disparado o alerta
        if (Canoa.length != 2) {
            alert("Selecione os passageiros")
            return false;

        } else if (LadoAtual == 1) {
            // Se o lado atual estiver no 1 (margem-a), para cada seleção de imagem é retirado de dentro do arrar MargemA
            // e colocado dentro da div (canoa) as imagens que foram selecionadas
            for (let i = 0; i < MargemA.length; i++) {

                imagem.parentNode.removeChild(imagem);
                document.getElementById("canoa").appendChild(imagem);
                // Troca o status do travess para "true", consequentemente poderá utilizar o botão de travessia quando for selecionado
                travess = true;
            }
        }
    }

    function embarcarB() {

        // Se o lado atual estiver no 2 (margem-b), para cada seleção de imagem é retirado de dentro do arrar MargemB
        // e colocado dentro da div (canoa) as imagens que foram selecionadas
        if (LadoAtual == 2) {

            for (let i = 0; i < Canoa.length; i++) {
                if (Canoa[i] == idImagem) {
                    imagem.parentNode.removeChild(imagem);
                    document.getElementById("canoa").appendChild(imagem)

                    break;
                }
            }
            travess = true;
        }
        console.log(MargemA + " - " + Canoa + " - " + MargemB)
    }

    function desembarcar() {

        if (LadoAtual == 1 && Canoa) {

            for (let i = 0; i < Canoa.length; i++) {

                if (Canoa[i] == idImagem) {
                    LadoAtual = 2
                    Canoa.splice(i, 1)
                    MargemA.push(idImagem)
                    imagem.parentNode.removeChild(imagem);
                    document.getElementById(idImagem).appendChild(imagem)
                    console.log(MargemA + " - " + Canoa + " - " + MargemB)
                }
            }
        }

        if (LadoAtual == 2 && Canoa) {

            for (let i = 0; i < Canoa.length; i++) {
                if (Canoa[i] == idImagem) {
                    LadoAtual = 1
                    Canoa.splice(i, 1)
                    MargemB.push(idImagem)
                    imagem.parentNode.removeChild(imagem);
                    document.getElementById("margem-b").appendChild(imagem)
                    console.log(MargemA + " - " + Canoa + " - " + MargemB)
                }
            }
        }
    }
    function atravessar() {


        //adicionando as regras do jogo
        if ((LadoAtual == 1 && travess == true)) {

            if (!Canoa.includes("Pai") && !Canoa.includes("Mãe") && !Canoa.includes("Policial")) {
                alert("Somente o Pai a Mãe e o Policial, podem conduzir o barco!")
                return false;
            }
            if (!MargemA.includes("Pai") && MargemA.includes("Filho1") && MargemA.includes("Filho2")) {
                alert("Mãe e filhos, não podem ficar juntos sem a companhi do Pai!")

                return false;
            }

            if (!MargemA.includes("Mãe") && MargemA.includes("Filha1") && MargemA.includes("Filha1")) {
                alert("Pai e Filhas Não podem ficar juntos, sem a companhia da Mãe!")
                return false;
            }
            if (!MargemA.includes("Policial") && MargemA.includes("Prisioneiro")) {
                alert("Prisioneiro, Não pode ficar sem a escolta do policial!")
                return false;
            }else {
                //quando forem satisfeitas, prosegue com a travessia para margem B
                for (let i = 0; i < Canoa.length; i++) {
                    if (Canoa[i] == idImagem) {
                        //altera o lado da canoa
                        LadoAtual = 2
                        //seleciona a tag com id lado para alterar o seu valor
                        document.getElementById('lado').innerHTML = "Canoa (Lado B)"
                        Canoa.splice(i, 1)
                        MargemB.push(idImagem)
                        imagem.parentNode.removeChild(imagem);
                        document.getElementById("margem-b").appendChild(imagem)
                        console.log(MargemA + " - " + Canoa + " - " + MargemB)
                    }
                }


        }
       


         
        }
        else if (LadoAtual == 2 && travess == true) {
            if ((LadoAtual == 1 && travess == true)) {

                if (!Canoa.includes("Pai") && !Canoa.includes("Mãe") && !Canoa.includes("Policial")) {
                    alert("Somente o Pai a Mãe e o Policial, podem conduzir o barco!")
                    return false;
                }
                if (!MargemB.includes("Pai") && MargemB.includes("Filho1") && MargemB.includes("Filho2")) {
                    alert("Mãe e filhos, não podem ficar juntos sem a companhi do Pai!")
    
                    return false;
                }
    
                if (!MargemB.includes("Mãe") && MargemB.includes("Filha1") && MargemB.includes("Filha1")) {
                    alert("Pai e Filhas Não podem ficar juntos, sem a companhia da Mãe!")
                    return false;
                }
                if (!MargemB.includes("Policial") && MargemB.includes("Prisioneiro")) {
                    alert("Prisioneiro, Não pode ficar sem a escolta do policial!")
                    return false;
                }else {
                    //quando forem satisfeitas, prosegue com a travessia para margem B
                    for (let i = 0; i < Canoa.length; i++) {
                        if (Canoa[i] == idImagem) {
                            //altera o lado da canoa
                            LadoAtual = 2
                            //seleciona a tag com id lado para alterar o seu valor
                            document.getElementById('lado').innerHTML = "Canoa (Lado B)"
                            Canoa.splice(i, 1)
                            MargemB.push(idImagem)
                            imagem.parentNode.removeChild(imagem);
                            document.getElementById("margem-b").appendChild(imagem)
                            console.log(MargemA + " - " + Canoa + " - " + MargemB)
                        }
                    }
    
    
            }
           
    
    
             
            }
            for (let i = 0; i < Canoa.length; i++) {
                if (Canoa[i] == idImagem) {
                    LadoAtual = 
                    document.getElementById('lado').innerHTML = "Canoa (Lado A)"
                    Canoa.splice(i, 1)
                    MargemA.push(idImagem)
                    imagem.parentNode.removeChild(imagem);
                    document.getElementById(idImagem).appendChild(imagem)
                    console.log(MargemA + " - " + Canoa + " - " + MargemB)

                }

            }

        }

        travess = false;
        console.log(LadoAtual)
        console.log(MargemA + " - " + Canoa + " - " + MargemB)

    }

    console.log(MargemA + " - " + Canoa + " - " + MargemB)


// adicionando eventos aos botões, quando são clicados

    embarqueA = document.getElementById('embarcarA')
    embarqueA.addEventListener('click', embarcarA)
    desembarqueA = document.getElementById('desembarcar')
    desembarqueA.addEventListener('click', desembarcar)
    desembarqueB = document.getElementById('atravessar')
    desembarqueB.addEventListener('click', atravessar)
    embarqueB = document.getElementById('embarcarB')
    embarqueB.addEventListener('click', embarcarB)


}


//Declarando variáveis para a criação de elementos no html, setando atributos como o diretório e a sua id única.

let pai = document.createElement("img")
pai.setAttribute("src", "/src/pai.png")
pai.setAttribute("id", "Pai")
pai.addEventListener("click", travessia)

document.getElementById("Pai").appendChild(pai)

let mae = document.createElement("img")
mae.setAttribute("src", "/src/mae.png")
mae.setAttribute("id", "Mãe")
mae.addEventListener("click", travessia)

document.getElementById("Mãe").appendChild(mae)

let policial = document.createElement("img")
policial.setAttribute("src", "/src/policial.png")
policial.setAttribute("id", "Policial")
policial.addEventListener("click", travessia)

document.getElementById("Policial").appendChild(policial)

let prisioneiro = document.createElement("img")
prisioneiro.setAttribute("src", "/src/prisioneiro.png")
prisioneiro.setAttribute("id", "Prisioneiro")
prisioneiro.addEventListener("click", travessia)

document.getElementById("Prisioneiro").appendChild(prisioneiro)

let filha1 = document.createElement("img")
filha1.setAttribute("src", "/src/filha1.png")
filha1.setAttribute("id", "Filha1")
filha1.addEventListener("click", travessia)

document.getElementById("Filha1").appendChild(filha1)

let filha2 = document.createElement("img")
filha2.setAttribute("src", "/src/filha2.png")
filha2.setAttribute("id", "Filha2")
filha2.addEventListener("click", travessia)

document.getElementById("Filha2").appendChild(filha2)

let filho1 = document.createElement("img")
filho1.setAttribute("src", "/src/filho1.png")
filho1.setAttribute("id", "Filho1")
filho1.addEventListener("click", travessia)

document.getElementById("Filho1").appendChild(filho1)

let filho2 = document.createElement("img")
filho2.setAttribute("src", "/src/filho2.png")
filho2.setAttribute("id", "Filho2")
filho2.addEventListener("click", travessia)

document.getElementById("Filho2").appendChild(filho2)





