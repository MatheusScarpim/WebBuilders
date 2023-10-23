function criarCalendario(ano, mes) {
    const calendario = document.getElementById('calendar');
    const hoje = new Date();
    const diasNoMes = new Date(ano, mes + 1, 0).getDate();
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
        if (dataEstaMarcada(ano, mes, dia)) {
            cell.classList.add('marcada');
        }
    }
}



function dataEstaMarcada(ano, mes, dia) {
    console.log(`Verificando data: ${ano} ${mes} ${dia}`);
    for (const dataMarcada of datasMarcadas) {
        console.log(ano, dataMarcada.init.ano, mes, dataMarcada.init.mes)
        if (ano === dataMarcada.init.ano && (mes+1
            ) === dataMarcada.init.mes) {
            if (
                (dia >= dataMarcada.init.dia && dia <= dataMarcada.end.dia) ||
                dia === dataMarcada.alert.dia ||
                dia === dataMarcada.late.dia
            ) {
                console.log("true")
                return true; 
            }
            console.log("false")
        }
    }

    return false; 
}

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
