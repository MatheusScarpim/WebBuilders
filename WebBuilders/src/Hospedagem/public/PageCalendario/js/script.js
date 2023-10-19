function createCalendar(year, month) {
    const calendar = document.getElementById('calendar');
    const today = new Date();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    let html = '';
    html += '<table>';
    html += '<tr><th>D</th><th>S</th><th>T</th><th>Q</th><th>Q</th><th>S</th><th>S</th></tr>';
    let day = 1;

    for (let i = 0; i < 6; i++) {
        html += '<tr>';
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                html += '<td></td>';
            } else if (day <= daysInMonth) {
                let classString = '';
                if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                    classString = 'today';
                }
                html += `<td class="${classString}">${day}</td>`;
                day++;
            }
        }
        html += '</tr>';
    }

    html += '</table>';
    calendar.innerHTML = html;
}

function populateYearSelect() {
    const yearSelect = document.getElementById('year');
    const currentYear = new Date().getFullYear();

    for (let year = currentYear - 10; year <= currentYear + 10; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
}

const currentDate = new Date();
const monthSelect = document.getElementById('month');
const yearSelect = document.getElementById('year');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const currentMonthYear = document.getElementById('currentMonthYear');

monthSelect.value = currentDate.getMonth();
yearSelect.value = currentDate.getFullYear();
currentMonthYear.textContent = getMonthName(currentDate.getMonth()) + ' ' + currentDate.getFullYear();

createCalendar(currentDate.getFullYear(), currentDate.getMonth());
populateYearSelect();

monthSelect.addEventListener('change', function () {
    const selectedMonth = monthSelect.value;
    const selectedYear = yearSelect.value;
    currentMonthYear.textContent = getMonthName(selectedMonth) + ' ' + selectedYear;
    createCalendar(selectedYear, selectedMonth);
});

yearSelect.addEventListener('change', function () {
    const selectedMonth = monthSelect.value;
    const selectedYear = yearSelect.value;
    currentMonthYear.textContent = getMonthName(selectedMonth) + ' ' + selectedYear;
    createCalendar(selectedYear, selectedMonth);
});

prevMonthBtn.addEventListener('click', function () {
    const currentMonth = parseInt(monthSelect.value);
    const currentYear = parseInt(yearSelect.value);

    if (currentMonth === 0) {
        monthSelect.value = 11;
        yearSelect.value = currentYear - 1;
    } else {
        monthSelect.value = currentMonth - 1;
    }

    currentMonthYear.textContent = getMonthName(monthSelect.value) + ' ' + yearSelect.value;
    createCalendar(yearSelect.value, monthSelect.value);
});

nextMonthBtn.addEventListener('click', function () {
    const currentMonth = parseInt(monthSelect.value);
    const currentYear = parseInt(yearSelect.value);

    if (currentMonth === 11) {
        monthSelect.value = 0;
        yearSelect.value = currentYear + 1;
    } else {
        monthSelect.value = currentMonth + 1;
    }

    currentMonthYear.textContent = getMonthName(monthSelect.value) + ' ' + yearSelect.value;
    createCalendar(yearSelect.value, monthSelect.value);
});

function getMonthName(month) {
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return monthNames[month];
}