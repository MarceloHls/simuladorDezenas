

async function Simular() {
    const aguarde = document.querySelector(".aguarde")
    aguarde.style.display = "flex"
    const intMin = parseInt(document.querySelector(".i1").value)
    const intMax = parseInt(document.querySelector(".i2").value)
    const dezenas = parseInt(document.querySelector(".dezenas input").value)
    const simulacoes = parseInt(document.querySelector(".quantidade input").value)

    if (intMax < 10 || !intMax) {
        alert("Intervlao maximo não pode ser menor que 10")
        aguarde.style.display = "none"
        return;
    }
    if (intMin < 0 || !intMin) {
        alert("Intervlao minimo não pode ser menor que 0")
        aguarde.style.display = "none"
        return;
    }
    if (dezenas < 1 || !dezenas) {
        alert("Dezenas não podem ser menores que 1")
        aguarde.style.display = "none"
        return;
    }
    if (simulacoes < 1 || !simulacoes) {
        alert("Simulacoes não podem ser menores que 1")
        aguarde.style.display = "none"
        return;
    }

    setTimeout(async () => {
        const { numeros } = await Simulacoes(intMin, intMax, dezenas, simulacoes);
        const { ranking } = await numRepetidos(numeros, dezenas);
        criarResultado(ranking)
        aguarde.style.display = "none"
    }, 101)
}

function Simulacoes(intMin, intMax, dezenas, simulacoes) {
    const sequencias = {};
    const numeros = {}

    for (let i = 1; i <= simulacoes; i++) {
        let numeroAdiciondos = 0
        while (true) {
            let ramdom = (Math.random() * (intMax - intMin) + intMin).toFixed(0);
            if (sequencias[`Seq${i}`] == undefined) {
                sequencias[`Seq${i}`] = { numeros: `[${ramdom}]`, vezes: 0 }

                if (numeros[ramdom] == undefined) {
                    numeros[ramdom] = 1;
                } else {
                    numeros[ramdom]++;
                }
                numeroAdiciondos++
            } else {
                if (!sequencias[`Seq${i}`].numeros.includes(`[ ${ramdom} ]`)) {
                    sequencias[`Seq${i}`].numeros += `[ ${ramdom} ]`;
                    numeroAdiciondos++
                    if (numeros[ramdom] == undefined) {
                        numeros[ramdom] = 1;
                    } else {
                        numeros[ramdom]++;
                    }
                }
            }

            if (numeroAdiciondos >= dezenas) {
                break;
            }
        }
    }
    return { numeros }
}



function numRepetidos(numeros, dezenas) {
    const ranking = []
    let maior = 0
    for (let i = 0; i < dezenas; i++) {
        for (const key in numeros) {
            //key = numero - valor = quantidade
            if (!ranking.includes(key)) {
                if (numeros[key] > maior) {
                    maior = numeros[key];
                    ranking[i] = key
                }
            }

        }
        maior = 0
    }
    return { ranking }
}

function criarResultado(ranking = []) {
    const app = document.querySelector(".app");

    let numeros;
    if (document.querySelector(".numeros") == null) {
        numeros = document.createElement("div");
        numeros.classList.add("numeros");
        numeros.classList.add("card");
    } else {
        numeros = document.querySelector(".numeros")

    }
   
    numeros.innerHTML = "<h1>Numeros mais sorteados</h1>"
   
    const sequenciaNumero = document.createElement("div")
    sequenciaNumero.classList.add("sequencia")
    ranking.forEach(numero => {
        const element = document.createElement("p")
        element.classList.add("numero");
        element.innerHTML = `${numero}`
        sequenciaNumero.appendChild(element)
    })
    numeros.appendChild(sequenciaNumero)
    app.appendChild(numeros)
}


