let currentDate, targetDate;
const monuthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "Septemper", "October", "November", "December"];
window.onload = function () {
    currentDate = new Date(2021,03);
    console.log(currentDate);
    let dates = CreateDays(currentDate.getFullYear(), currentDate.getMonth());
    console.log(dates);

    RenderCalendar(currentDate, dates);
}


function CreateDays(year, month) {

    // get the first day of the month
    let startdate = new Date(year, month);
    // get the day of week at the first day
    let startday = startdate.getDay();
    let dates = [];
    startdate.setDate(startdate.getDate() - startday);

    // generate dates
    for (let i = 0; i < 42; i++) {
        if (i !== 0) { startdate.setDate(startdate.getDate() + 1); }
        dates.push({
            year: startdate.getFullYear(),
            month: startdate.getMonth(),
            date: startdate.getDate(),
            days: startdate.getDay(),
            isTarget: YM_Equal(startdate, currentDate),
            isCurrentDay: YMD_Equal(startdate, currentDate)
        });
    }
    return dates;
}

function YMD_Equal(dateA, dateB) {
    // debugger;    
    if (!YM_Equal(dateA, dateB)) { return false; }
    if (dateA.getDate() !== dateB.getDate()) { return false; }
    if (dateA.getDay() !== dateB.getDay()) { return false; }
    return true;

}

function YM_Equal(dateA, dateB) {
    if (dateA.getFullYear() !== dateB.getFullYear()) { return false; }
    if (dateA.getMonth() !== dateB.getMonth()) { return false; }

    return true;
}

function RenderCalendar(targetDate, dates) {
    let calendar = document.querySelector(".calendar");
    calendar.querySelector(".calendar-date :first-child").innerText = targetDate.getFullYear();
    calendar.querySelector(".calendar-date :last-child").innerText = monuthNames[targetDate.getMonth()];

    let dayInfo = document.querySelector("#tpl-dayInfo");
    console.log(dayInfo);
    let calendarDays = calendar.querySelector(".calendar-days");

    dates.forEach((item, index) => {

        let clonedayInfo = dayInfo.content.cloneNode(true);
        let daytitle = clonedayInfo.querySelector(".dayTitle");

        if (item.isCurrentDay) {
            daytitle.classList.add("currentDay");
        }

        daytitle.querySelector("span").innerText = item.date;

        calendarDays.appendChild(clonedayInfo);


    });
}




