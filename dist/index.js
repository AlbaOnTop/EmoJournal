"use strict";
// Lista dei mesi. Non toccare
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
// Oggi, serve per sapere che giorno è 
let today = new Date();
let selectedMonth = today.getMonth();
let selectedYear = today.getFullYear();
// Funzione per sapere quanti giorni ha un mese
function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}
// Renderizza il calendario. bruttino ma va
function renderCalendar(month, year) {
    // Prendo gli elementi dal DOM
    const monthElem = document.getElementById('month');
    const yearElem = document.getElementById('year');
    const tbody = document.getElementById('calendar-body');
    monthElem.textContent = monthNames[month];
    yearElem.textContent = year.toString();
    tbody.innerHTML = '';
    //bruttino
    const firstDay = new Date(year, month, 1).getDay();
    const numDays = daysInMonth(month, year);
    // Info sui mesi prima e dopo
    const prevMonth = (month === 0) ? 11 : month - 1;
    const prevYear = (month === 0) ? year - 1 : year;
    const nextMonth = (month === 11) ? 0 : month + 1;
    const nextYear = (month === 11) ? year + 1 : year;
    const prevMonthDays = daysInMonth(prevMonth, prevYear);
    let day = 1;
    let nextDay = 1;
    let started = false; // Non serve a niente per ora
    for (let i = 0; i < 6; i++) { // 6 settimane
        let row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            let cell = document.createElement('td');
            let btn = document.createElement('button');
            btn.className = 'day-btn';
            let icon = document.createElement('span');
            icon.className = 'emotion-icon';
            // Giorni del mese precedente
            if (i === 0 && j < firstDay) {
                btn.classList.add('inactive');
                btn.id = `prev-${prevYear}-${prevMonth + 1}-${prevMonthDays - firstDay + j + 1}`;
                btn.tabIndex = -1;
                cell.appendChild(btn);
                cell.appendChild(icon);
            }
            // Giorni del mese corrente
            else if (day <= numDays) {
                btn.textContent = day.toString();
                btn.id = `day-${year}-${month + 1}-${day}`;
                // mhanz
                if (day === today.getDate() &&
                    month === today.getMonth() &&
                    year === today.getFullYear()) {
                    btn.classList.add('today');
                }
                btn.onclick = () => {
                    //sta parte fatta dal ai non so bene che cazzo faccia
                };
                cell.appendChild(btn);
                cell.appendChild(icon);
                day++;
            }
            // spoiler mese successiovo
            else {
                btn.textContent = nextDay.toString();
                btn.id = `next-${nextYear}-${nextMonth + 1}-${nextDay}`;
                btn.classList.add('other-month');
                btn.onclick = () => {
                    // mese changer
                    selectedMonth = nextMonth;
                    selectedYear = nextYear;
                    renderCalendar(selectedMonth, selectedYear);
                };
                cell.appendChild(btn);
                cell.appendChild(icon);
                nextDay++;
            }
            row.appendChild(cell);
        }
        tbody.appendChild(row);
        // se giorni finiti esce
        if (day > numDays && nextDay > 7)
            break;
    }
}
// Cambia il tema. belli questi vado orgoglioso
function setTheme(theme) {
    const root = document.documentElement;
    if (theme === 1) {
        root.style.setProperty('--theme-bg', '#FFF7D1');
        root.style.setProperty('--theme-accent', '#8B5DFF');
        root.style.setProperty('--theme-text', '#6A42C2');
        root.style.setProperty('--theme-text-important', '#563A9C');
    }
    else if (theme === 2) {
        root.style.setProperty('--theme-bg', '#213448');
        root.style.setProperty('--theme-accent', '#547792');
        root.style.setProperty('--theme-text', '#94B4C1');
        root.style.setProperty('--theme-text-important', '#ECEFCA');
    }
    else if (theme === 3) {
        root.style.setProperty('--theme-bg', '#155E95');
        root.style.setProperty('--theme-accent', '#6A80B9');
        root.style.setProperty('--theme-text', '#F6C794');
        root.style.setProperty('--theme-text-important', '#FFF6B3');
    }
    else if (theme === 4) //richiesto da un mio amico
     {
        root.style.setProperty('--theme-bg', 'red');
        root.style.setProperty('--theme-accent', 'red');
        root.style.setProperty('--theme-text', 'red');
        root.style.setProperty('--theme-text-important', 'red');
    }
}
// rifugiati nel passato dato che da ora in avanti puo solo peggiorare
document.getElementById('prevMonthBtn').onclick = () => {
    if (selectedMonth === 0) {
        selectedMonth = 11;
        selectedYear--;
    }
    else {
        selectedMonth--;
    }
    renderCalendar(selectedMonth, selectedYear);
};
// rifugiati nel futuro perche il presente lo stai rovinando
document.getElementById('nextMonthBtn').onclick = () => {
    if (selectedMonth === 11) {
        selectedMonth = 0;
        selectedYear++;
    }
    else {
        selectedMonth++;
    }
    renderCalendar(selectedMonth, selectedYear);
};
window.onload = () => {
    renderCalendar(selectedMonth, selectedYear);
    const themeSwitcher = document.getElementById('theme-switcher'); //non so cosa sia
    if (themeSwitcher) {
        themeSwitcher.addEventListener('change', (e) => {
            setTheme(Number(themeSwitcher.value));
        });
    }
    setTheme(1); // Tema di default, quello piu carino e messo meglio
};
