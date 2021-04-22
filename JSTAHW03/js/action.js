let todayDate, currentDate;
const monuthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "Septemper", "October", "November", "December"];
const dayOfWeek = 7;

window.onload = function () {
    todayDate = new Date();
    currentDate = new Date(todayDate.getFullYear(), todayDate.getMonth());
    console.log(currentDate);
    console.log(todayDate);

    let dates = CreateDays(todayDate.getFullYear(), todayDate.getMonth());
    console.log(dates);

    RenderCalendar(todayDate, dates);

    // register btnPrev click event
    document.querySelector(".calendar-btnPrev").addEventListener(
        "click",
        function () {
            currentDate.setMonth(currentDate.getMonth() - 1);
            let dates = CreateDays(currentDate.getFullYear(), currentDate.getMonth());
            RenderCalendar(
                new Date(currentDate.getFullYear(), currentDate.getMonth()),
                dates,
            );
        }
    );

    // register btnNext click event
    document.querySelector(".calendar-btnNext").addEventListener(
        "click",
        function () {
            currentDate.setMonth(currentDate.getMonth() + 1);
            let dates = CreateDays(currentDate.getFullYear(), currentDate.getMonth());
            RenderCalendar(
                new Date(currentDate.getFullYear(), currentDate.getMonth()),
                dates
            );
        }
    );
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

function RenderCalendar(targetDate, dates) {
    let calendar = document.querySelector(".calendar");
    calendar.querySelector(".calendar-date :first-child").innerText = targetDate.getFullYear();
    calendar.querySelector(".calendar-date :last-child").innerText = monuthNames[targetDate.getMonth()];
    let calendardaysWrap = document.querySelector(".calendar-daysWrap");

    let existcalendarDays = document.querySelector(".calendar-days");
    let calendarDays = CreateCalendardays(targetDate, dates);
    if (existcalendarDays === null) {
        // console.log(calendarDays);
        calendardaysWrap.appendChild(calendarDays);
        // console.log(calendarDays);

    }
    else {
        // existcalendarDays.parentNode.removeChild(existcalendarDays);
        // console.log(calendarDays);
        calendardaysWrap.appendChild(calendarDays);
        // console.log(calendarDays);


    }

    console.log(calendarDays);
    setTimeout(() => {
        // console.log(calendarDays);

        existcalendarDays.style.cssText = "opacity:0; transition: all 200ms";
        calendarDays.style.cssText = "opacity:1; transform:translate(50px,0);";
        setTimeout(() => {
            calendarDays.style.cssText = "opacity:1; transform:translate(0,0);transition: all 200ms;";

            setTimeout(() => {
                existcalendarDays.parentNode.removeChild(existcalendarDays);
            }, 200);
        });
    }, 200);



    // setTimeout(function (existcalendarDays,calendarDays) {
    //     console.log(calendarDays);
    //     console.log(existcalendarDays);
    //     existcalendarDays.style.cssText = "opacity:0; transition: all 1000ms";
    //     calendarDays.style.cssText = "opacity:1; transition: all 1000ms";
    // }, 5000);
    // console.log(calendarDays);

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

        let istodayDate = YMD_Equal(item, todayDate);
        if (istodayDate) {
            dayinfo.classList.add("currentDay");
        }

        if (YM_Equal(item, targetDate)) {
            dayinfo.querySelector("span").innerText = item.getDate();
            if (istodayDate) { dayinfo.classList.add("intarget"); }
        } else {
            dayinfo.querySelector("span").innerText = `${monuthNames[item.getMonth()]} ${item.getDate()}`;
            dayinfo.classList.add("outtarget");
        }
        calendarDays.appendChild(clonedayInfo);
    });


    return calendarDays;
}




