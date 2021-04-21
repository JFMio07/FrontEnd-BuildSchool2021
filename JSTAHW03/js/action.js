let currentDate, targetDate;
const monuthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "Septemper", "October", "November", "December"];
const dayOfWeek = 7;

window.onload = function () {
    currentDate = new Date();
    console.log(currentDate);

    let dates = CreateDays(currentDate.getFullYear(), currentDate.getMonth());
    console.log(dates);

    RenderCalendar(currentDate, dates);
}


function CreateDays(year, month) {

    // get the first day of the month
    let startdate = new Date(year, month);
    // get the last day of the month
    let enddate = new Date(year, month + 1, 0);
    // get the day of week at the first day
    let startday = startdate.getDay();
    let totalDays = enddate.getDate() - startdate.getDate() + 1;
    let days = startday + enddate.getDate() - startdate.getDate() + 1;

    let count = Math.floor(days / dayOfWeek);
    count = (days % dayOfWeek) === 0 ? count : count + 1;
    let loopCount = count * dayOfWeek;

    let dates = [];
    startdate.setDate(startdate.getDate() - startday);

    // generate dates
    for (let i = 0; i < loopCount; i++) {
        if (i !== 0) { startdate.setDate(startdate.getDate() + 1); }
        dates.push(new Date(startdate));
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

// function RenderCalendar(targetDate, dates) {
//     let calendar = document.querySelector(".calendar");
//     calendar.querySelector(".calendar-date :first-child").innerText = targetDate.getFullYear();
//     calendar.querySelector(".calendar-date :last-child").innerText = monuthNames[targetDate.getMonth()];

//     let dayInfo = document.querySelector("#tpl-dayInfo");
//     let calendarDays = calendar.querySelector(".calendar-days");

//     dates.forEach((item, index) => {

//         let clonedayInfo = dayInfo.content.cloneNode(true);
//         let dayinfo = clonedayInfo.querySelector(".dayInfo");
//         // let daytitle = clonedayInfo.querySelector(".dayTitle");

//         let isCurrentDate = YMD_Equal(item, currentDate);
//         if (isCurrentDate) {
//             dayinfo.classList.add("currentDay");
//         }

//         if (YM_Equal(item, targetDate)) {
//             dayinfo.querySelector("span").innerText = item.getDate();
//             if(isCurrentDate){dayinfo.classList.add("intarget")};
//         } else {
//             dayinfo.querySelector("span").innerText = `${monuthNames[item.getMonth()]} ${item.getDate()}`;
//             if(isCurrentDate){dayinfo.classList.add("outtarget")};
//         }
//         calendarDays.appendChild(clonedayInfo);
//     });
// }

function RenderCalendar(targetDate, dates) {
    let calendar = document.querySelector(".calendar");
    calendar.querySelector(".calendar-date :first-child").innerText = targetDate.getFullYear();
    calendar.querySelector(".calendar-date :last-child").innerText = monuthNames[targetDate.getMonth()];
    let calendardaysWrap = document.querySelector(".calendar-daysWrap");

    let existcalendarDays = document.querySelector(".calendar-days");
    let calendarDays = CreateCalendardays(targetDate, dates);
    if (existcalendarDays === null) {
        calendardaysWrap.appendChild(calendarDays);
    }
    else {
        alert("hi");
    }


    // calendardaysWrap.appendChild(CreateCalendardays(targetDate, dates));
    // calendardaysWrap.appendChild(CreateCalendardays(targetDate, dates));


}

function CreateCalendardays(targetDate, dates) {
    let calendarDays = document.createElement("div");
    calendarDays.classList.add("calendar-days");

    let dayInfo = document.querySelector("#tpl-dayInfo");

    dates.forEach((item, index) => {

        let clonedayInfo = dayInfo.content.cloneNode(true);
        let dayinfo = clonedayInfo.querySelector(".dayInfo");
        // let daytitle = clonedayInfo.querySelector(".dayTitle");

        let isCurrentDate = YMD_Equal(item, currentDate);
        if (isCurrentDate) {
            dayinfo.classList.add("currentDay");
        }

        if (YM_Equal(item, targetDate)) {
            dayinfo.querySelector("span").innerText = item.getDate();
            if (isCurrentDate) { dayinfo.classList.add("intarget") };
        } else {
            dayinfo.querySelector("span").innerText = `${monuthNames[item.getMonth()]} ${item.getDate()}`;
            if (isCurrentDate) { dayinfo.classList.add("outtarget") };
        }
        calendarDays.appendChild(clonedayInfo);
    });

    return calendarDays;
}




