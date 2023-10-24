function criarCalendario(ano, mes) {
    console.log(datasMarcadas)
    const calendario = document.getElementById('calendar');
    const hoje = new Date();
    const diasNoMes = new Date(ano, parseInt(mes) + 1, 0).getDate();
    const primeiroDia = new Date(ano, mes, 1).getDay();
    let html = '';
    html += '<table>';
    html += '<tr><th>D</th><th>S</th><th>T</th><th>Q</th><th>Q</th><th>S</th><th>S</th></tr>';
    let dia = 1;

    for (let i = 0; i < 6; i++) {
        html += '<tr>';
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < primeiroDia) {
                html += '<td></td>';
            } else if (dia <= diasNoMes) {
                let classeCss = '';
                if (dia === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear()) {
                    classeCss = 'hoje';
                }
                html += `<td class="dia ${classeCss}" data-dia="${dia}">${dia}</td>`;
                dia++;
            }
        }
        html += '</tr>';
    }

    html += '</table>';
    calendario.innerHTML = html;
        const cells = calendario.querySelectorAll('td.dia');
    for (const cell of cells) {
        const dia = parseInt(cell.getAttribute('data-dia'));
        if (dataDeveSerMarcada(parseInt(ano), parseInt(mes), parseInt(dia))) {
            cell.classList.add('marcada');
        }
    }

    const mesAtual = parseInt(mes) + 1; // Lembre-se de que os meses em JavaScript são baseados em zero.
    const anoAtual = parseInt(ano);

    // Encontre as datas correspondentes em datasMarcadas.
    const datasDoMesAtual = datasMarcadas.filter(dataMarcada => {
        return (
            dataMarcada.init.ano === anoAtual &&
            dataMarcada.init.mes === mesAtual
        );
    });

    // Se houver datas correspondentes, atualize a notificação com as datas do mês atual.
    if (datasDoMesAtual.length > 0) {
        const dataInitElement = document.getElementById("dataInit");
        const dataEndElement = document.getElementById("dataEnd");

        // Use a primeira data encontrada (você pode ajustar isso se houver várias datas).
        const primeiraDataDoMes = datasDoMesAtual[0];
        dataInitElement.textContent = `${primeiraDataDoMes.init.ano}-${primeiraDataDoMes.init.mes}-${primeiraDataDoMes.init.dia}`;
        dataEndElement.textContent = `${primeiraDataDoMes.end.ano}-${primeiraDataDoMes.end.mes}-${primeiraDataDoMes.end.dia}`;
    } else {
        // Se não houver datas correspondentes, você pode definir um texto padrão.
        const dataInitElement = document.getElementById("dataInit");
        const dataEndElement = document.getElementById("dataEnd");
        dataInitElement.textContent = "Nenhuma data marcada";
        dataEndElement.textContent = "Nenhuma data marcada";
    }


}

function dataDeveSerMarcada(ano, mes, dia) {
    for (const dataMarcada of datasMarcadas) {  
        console.log(`mes ${parseInt(mes)+1} dia ${dia} calendario`)
        console.log(`mes ${dataMarcada.end.mes} dia ${dataMarcada.end.dia} node`)
        
        if ((ano === dataMarcada.init.ano && ( parseInt(mes)+1 ) === dataMarcada.init.mes) || (ano === dataMarcada.end.ano && ( parseInt(mes)+1 ) === dataMarcada.end.mes) || (ano === dataMarcada.late.ano && ( parseInt(mes)+1 ) === dataMarcada.late.mes) || (ano === dataMarcada.alert.ano && ( parseInt(mes)+1 ) === dataMarcada.alert.mes)) {
            if (
                dia === dataMarcada.init.dia || dia === dataMarcada.end.dia ||
                dia === dataMarcada.alert.dia ||
                dia === dataMarcada.late.dia
            ) {
                return true; 
            }
        }
    }

    return false; 
}
/*
function comparaDateInit(init, ano, mes, dia) {
    if (ano === init.ano && mes === init.mes) {
        if (
            (dia >= init.dia && dia <= init.end.dia) ||
            dia === init.alert.dia ||
            dia === init.late.dia
        ) {
            console.log("true (init)");
            return true;
        }
        console.log("false (init)");
    }
    return false;
}

function comparaDateAlert(alert, ano, mes, dia) {
    if (ano === alert.ano && mes === alert.mes) {
        if (dia === alert.dia) {
            console.log("true (alert)");
            return true;
        }
        console.log("false (alert)");
    }
    return false;
}

function comparaDateEnd(end, ano, mes, dia) {
    if (ano === end.ano && mes === end.mes) {
        if (dia === end.dia) {
            console.log("true (end)");
            return true;
        }
        console.log("false (end)");
    }
    return false;
}

function comparaDateLate(late, ano, mes, dia) {
    if (ano === late.ano && mes === late.mes) {
        if (dia === late.dia) {
            console.log("true (late)");
            return true;
        }
        console.log("false (late)");
    }
    return false;
}

function dataDeveSerMarcada(ano, mes, dia) {
    for (const dataMarcada of datasMarcadas) {
        if (
            comparaDateInit(dataMarcada.init, ano, mes, dia) ||
            comparaDateAlert(dataMarcada.alert, ano, mes, dia) ||
            comparaDateEnd(dataMarcada.end, ano, mes, dia) ||
            comparaDateLate(dataMarcada.late, ano, mes, dia)
        ) {
            return true;
        }
    }

    return false;
}
*/

const calendario = document.getElementById('calendar');

calendario.addEventListener('click', function (event) {
    if (event.target.classList.contains('marcada')) {
        alert('Esta data foi marcada: ' + event.target.getAttribute('data-dia'));
    } else if (event.target.classList.contains('dia')) {
        // Data não marcada.
    }
});

function popularSelecaoDeAno() {
    const selecaoDeAno = document.getElementById('year');
    const anoAtual = new Date().getFullYear();
    const anoInicial = 2023;
    const anosNoFuturo = anoInicial + 10;

    for (let ano = anoAtual; ano >= anoInicial && ano <= anoAtual + anosNoFuturo; ano++) {
        const opcao = document.createElement('option');
        opcao.value = ano;
        opcao.textContent = ano;
        selecaoDeAno.appendChild(opcao);
    }
}

const dataAtual = new Date();
const selecaoDeMes = document.getElementById('month');
const selecaoDeAno = document.getElementById('year');
const botaoMesAnterior = document.getElementById('prevMonth');
const botaoProximoMes = document.getElementById('nextMonth');
const mesAnoAtual = document.getElementById('currentMonthYear');

selecaoDeMes.value = dataAtual.getMonth();
selecaoDeAno.value = dataAtual.getFullYear();
mesAnoAtual.textContent = obterNomeDoMes(dataAtual.getMonth()) + ' ' + dataAtual.getFullYear();

criarCalendario(dataAtual.getFullYear(), dataAtual.getMonth());
popularSelecaoDeAno();

selecaoDeMes.addEventListener('change', function () {
    const mesSelecionado = selecaoDeMes.value;
    const anoSelecionado = selecaoDeAno.value;
    mesAnoAtual.textContent = obterNomeDoMes(mesSelecionado) + ' ' + anoSelecionado;
    criarCalendario(anoSelecionado, mesSelecionado);
});

selecaoDeAno.addEventListener('change', function () {
    const mesSelecionado = selecaoDeMes.value;
    const anoSelecionado = selecaoDeAno.value;
    mesAnoAtual.textContent = obterNomeDoMes(mesSelecionado) + ' ' + anoSelecionado;
    criarCalendario(anoSelecionado, mesSelecionado);
});

botaoMesAnterior.addEventListener('click', function () {
    const mesAtual = parseInt(selecaoDeMes.value);
    const anoAtual = parseInt(selecaoDeAno.value);

    if (mesAtual === 0) {
        selecaoDeMes.value = 11;
        selecaoDeAno.value = anoAtual - 1;
    } else {
        selecaoDeMes.value = mesAtual - 1;
    }

    mesAnoAtual.textContent = obterNomeDoMes(selecaoDeMes.value) + ' ' + selecaoDeAno.value;
    criarCalendario(selecaoDeAno.value, selecaoDeMes.value);
});

botaoProximoMes.addEventListener('click', function () {
    const mesAtual = parseInt(selecaoDeMes.value);
    const anoAtual = parseInt(selecaoDeAno.value);

    if (mesAtual === 11) {
        selecaoDeMes.value = 0;
        selecaoDeAno.value = anoAtual + 1;
    } else {
        selecaoDeMes.value = mesAtual + 1;
    }

    mesAnoAtual.textContent = obterNomeDoMes(selecaoDeMes.value) + ' ' + selecaoDeAno.value;
    criarCalendario(selecaoDeAno.value, selecaoDeMes.value);
});

function obterNomeDoMes(mes) {
    const nomesDosMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return nomesDosMeses[mes];
}
