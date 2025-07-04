const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


let today = new Date();
let selectedMonth = today.getMonth();
let selectedYear = today.getFullYear();



function daysInMonth(month: number, year: number): number {
    return new Date(year, month + 1, 0).getDate();
}

function renderCalendar(month: number, year: number) {
    const monthElem = document.getElementById('month')!;
    const yearElem = document.getElementById('year')!;
    const tbody = document.getElementById('calendar-body')!;
    monthElem.textContent = monthNames[month];
    yearElem.textContent = year.toString();
    tbody.innerHTML = '';

    const firstDay = new Date(year, month, 1).getDay();
    const numDays = daysInMonth(month, year);

    // Previous and next month info
    const prevMonth = (month === 0) ? 11 : month - 1;
    const prevYear = (month === 0) ? year - 1 : year;
    const nextMonth = (month === 11) ? 0 : month + 1;
    const nextYear = (month === 11) ? year + 1 : year;
    const prevMonthDays = daysInMonth(prevMonth, prevYear);

    let day = 1;
    let nextDay = 1;
    let started = false;

    for (let i = 0; i < 6; i++) { // 6 weeks
        let row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            let cell = document.createElement('td');
            let btn = document.createElement('button');
            btn.className = 'day-btn';
            let icon = document.createElement('span');
            icon.className = 'emotion-icon';

            // Days from previous month (invisible)
            if (i === 0 && j < firstDay) {
                btn.classList.add('inactive');
                btn.id = `prev-${prevYear}-${prevMonth+1}-${prevMonthDays - firstDay + j + 1}`;
                btn.tabIndex = -1;
                cell.appendChild(btn);
                cell.appendChild(icon);
            }
            // Days of current month
            else if (day <= numDays) {
                btn.textContent = day.toString();
                btn.id = `day-${year}-${month+1}-${day}`;
                if (
                    day === today.getDate() &&
                    month === today.getMonth() &&
                    year === today.getFullYear()
                ) {
                    btn.classList.add('today');
                }
                btn.onclick = () => {
                    // handle day click
                };
                cell.appendChild(btn);
                cell.appendChild(icon);
                day++;
            }
            // Days from next month (visible, clicking changes month)
            else {
                btn.textContent = nextDay.toString();
                btn.id = `next-${nextYear}-${nextMonth+1}-${nextDay}`;
                btn.classList.add('other-month');
                btn.onclick = () => {
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
        if (day > numDays && nextDay > 7) break;
    }
}

function setTheme(theme: number) {
    const root = document.documentElement;
    if (theme === 1) {
        root.style.setProperty('--theme-bg', '#FFF7D1');
        root.style.setProperty('--theme-accent', '#8B5DFF');
        root.style.setProperty('--theme-text', '#6A42C2');
        root.style.setProperty('--theme-text-important', '#563A9C');
    } else if (theme === 2) {
        root.style.setProperty('--theme-bg', '#213448');
        root.style.setProperty('--theme-accent', '#547792');
        root.style.setProperty('--theme-text', '#94B4C1');
        root.style.setProperty('--theme-text-important', '#ECEFCA');
    } else if (theme === 3) {
        root.style.setProperty('--theme-bg', '#155E95');
        root.style.setProperty('--theme-accent', '#6A80B9');
        root.style.setProperty('--theme-text', '#F6C794');
        root.style.setProperty('--theme-text-important', '#FFF6B3');
    }
}

(document.getElementById('prevMonthBtn') as HTMLButtonElement).onclick = () => {
    if (selectedMonth === 0) {
        selectedMonth = 11;
        selectedYear--;
    } else {
        selectedMonth--;
    }
    renderCalendar(selectedMonth, selectedYear);
};
(document.getElementById('nextMonthBtn') as HTMLButtonElement).onclick = () => {
    if (selectedMonth === 11) {
        selectedMonth = 0;
        selectedYear++;
    } else {
        selectedMonth++;
    }
    renderCalendar(selectedMonth, selectedYear);
};

window.onload = () => {
    renderCalendar(selectedMonth, selectedYear);
    const themeSwitcher = document.getElementById('theme-switcher') as HTMLSelectElement;
    if (themeSwitcher) {
        themeSwitcher.addEventListener('change', (e) => {
            setTheme(Number(themeSwitcher.value));
        });
    }
    setTheme(1); // Default theme
};