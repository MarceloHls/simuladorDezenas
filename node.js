async function Simular(intMin, intMax, dezenas, simulacoes, vezes) {


    const simulacoesConcluidas = []
    for (let i = 1; i <= vezes; i++) {
      
        const { sequencias, numeros } = await Simulacoes(intMin, intMax, dezenas, simulacoes,i,vezes);
        const { ranking } = await numRepetidos(numeros, dezenas);

        simulacoesConcluidas.push(ranking)

    }
    console.clear();
    for (let i = 1; i <= vezes; i++) {
        console.log("Simulcao " + i + ": " + simulacoesConcluidas[i - 1])

    }

    console.log("Todas simulações concluidas")

}

function Simulacoes(intMin, intMax, dezenas, simulacoes,simulacaoAtual,simulacoesTotais) {
    const sequencias = {};
    const numeros = {}

    for (let i = 1; i <= simulacoes; i++) {
        let numeroAdiciondos = 0
        console.clear()
        console.log('Simulacao ' + simulacaoAtual + "/" + simulacoesTotais)
        console.log("Andamento: " + (i / simulacoes * 100).toFixed(2) + "%")

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

    return { sequencias, numeros }
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
Simular(1, 60, 6, 100000, 5)