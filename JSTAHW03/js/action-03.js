let todayDate, currentDate, currentCalendarData, schedules;
const daytoDoBoxResizeObs = new ResizeObserver(daytoDoBoxResizeAction);
const monuthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Septemper",
    "October",
    "November",
    "December",
];
const dayOfWeek = 7;


function dateInfo(year, month, date, day, toDoList) {
    this.year = year,
        this.month = month,
        this.date = date,
        this.day = day,
        this.toDoList = toDoList
}

dateInfo.prototype.toDateObj = function () {
    return new Date(this.year, this.month, this.date);
};

// function ScheduleItem(id, year, month, date, hour, minute, title, description) {
//         this.id = id,
//         this.year = year,
//         this.month = month,
//         this.date = date,
//         this.hour = hour,
//         this.minute = minute,
//         this.title = title,
//         this.description = description
// }

// ScheduleItem.prototype.


function WriteSchedulesFile(schedules) {
    localStorage.setItem("schedules", JSON.stringify(schedules));
}

function ReadSchedulesFile() {
    let raw = localStorage.getItem("schedules");

    if (raw !== undefined) {
        return JSON.parse(raw);
    }
    else {
        return [];
    }
}
schedules = [
    {
        id: 001,
        year: 2021,
        month: 04,
        date: 20,
        hour: 01,
        minute: 02,
        title: "04200102",
        description: "----"
    },
    {
        id: 002,
        year: 2021,
        month: 04,
        date: 21,
        hour: 01,
        minute: 02,
        title: "789333333312312313213212389413613219812319813",
        description: "----"

    },
    {
        id: 003,
        year: 2021,
        month: 04,
        date: 21,
        hour: 01,
        minute: 02,
        title: "789333333312312313213212389413613219812319813",
        description: "----"

    },
    {
        id: 003,
        year: 2021,
        month: 04,
        date: 21,
        hour: 01,
        minute: 02,
        title: "1",
        description: "----"

    },
    {
        id: 003,
        year: 2021,
        month: 04,
        date: 21,
        hour: 01,
        minute: 02,
        title: "2",
        description: "----"

    },
    {
        id: 003,
        year: 2021,
        month: 04,
        date: 21,
        hour: 01,
        minute: 02,
        title: "3",
        description: "----"

    },
    {
        id: 003,
        year: 2021,
        month: 04,
        date: 21,
        hour: 01,
        minute: 02,
        title: "4",
        description: "----"

    },
    {
        id: 003,
        year: 2021,
        month: 04,
        date: 21,
        hour: 01,
        minute: 02,
        title: "5",
        description: "----"

    },
    {
        id: 003,
        year: 2021,
        month: 04,
        date: 21,
        hour: 01,
        minute: 02,
        title: "6",
        description: "----"

    },
    {
        id: 003,
        year: 2021,
        month: 04,
        date: 21,
        hour: 01,
        minute: 02,
        title: "7",
        description: "----"

    },
    {
        id: 004,
        year: 2021,
        month: 05,
        date: 20,
        hour: 01,
        minute: 02,
        title: "101112555555555",
        description: "----"

    },
    {
        id: 005,
        year: 2021,
        month: 04,
        date: 24,
        hour: 01,
        minute: 02,
        title: "101112555555555",
        description: "----"

    },
    {
        id: 006,
        year: 2021,
        month: 05,
        date: 1,
        hour: 01,
        minute: 02,
        title: "101112555555555",
        description: "----"

    }
];

window.onload = function () {

    todayDate = new Date();
    // todayDate = new Date(2021,4,1);
    let temp = new Date();
    currentDate = new Date(todayDate.getFullYear(), todayDate.getMonth());
    // currentDate = new Date(temp.getFullYear(), temp.getMonth());
    WriteSchedulesFile(schedules);
    schedules = ReadSchedulesFile();
    console.log(schedules);
    // currentCalendarData = CreateCalendarData(temp, schedules);
    currentCalendarData = CreateCalendarData(todayDate, schedules);
    ApplyCalendarDays(currentCalendarData, true);
    InitAddToDoModal();
    // console.log(currentDate);
    // console.log(todayDate);
    // console.log(currentCalendarData);

    // create resizeObserve for calendar-daysWrap
    let daysWrap = document.querySelector(".calendar-daysWrap");
    // daysWrapResizeObserver.observe(daysWrap);


    // register btnPrev click event
    document.querySelector(".calendar-btnPrev").addEventListener("click", function () { IncreaseCalendar(false) });

    // register btnNext click event
    document.querySelector(".calendar-btnNext").addEventListener("click", function () { IncreaseCalendar(true) });
   
   
   
    // document.querySelector(".addEvent").addEventListener("click", function () { console.dir(document.querySelector("#eventTimeInput").value) });

    // document.querySelector(".calendar-date").addEventListener("click",function(){

    //     let daysInfo = document.querySelectorAll(".dayInfo-toDoBox");

    //     daysInfo.forEach((item)=>{
    //         daytoDoBoxResizeObs.observe(item);
    //     });
    // });



};




function InitAddToDoModal() {
    let date = new Date();
    document.querySelector("#addToDoModal #eventTitleInput").value = "";
    document.querySelector("#addToDoModal #eventDateInput").value = `${todayDate.getFullYear()}-${(todayDate.getMonth() + 1).toString().padStart(2, 0)}-${todayDate.getDate().toString().padStart(2, 0)}`;
    document.querySelector("#addToDoModal #eventTimeInput").value = `${date.getHours().toString().padStart(2, 0)}:${date.getMinutes().toString().padStart(2, 0)}`;
    document.querySelector("#addToDoModal #eventDescriptInput").value = "";
}

// true : increase Calendar
// false : decrease Calendar
function IncreaseCalendar(increase) {
    currentDate.setMonth(currentDate.getMonth() + (increase ? 1 : -1));
    currentCalendarData = CreateCalendarData(currentDate, schedules);
    ApplyCalendarDays(currentCalendarData, increase);
}


// Create dates of month ,according to year and month
function CreateDates(year, month) {
    // get the first day of the month
    let startDate = new Date(year, month);
    // get the last day of the month
    let endDate = new Date(year, month + 1, 0);
    // get the day of week at the first day
    let startDayOfWeek = startDate.getDay();

    let dayCount = startDayOfWeek + endDate.getDate() - startDate.getDate() + 1;

    let count = Math.floor(dayCount / dayOfWeek);
    count = dayCount % dayOfWeek === 0 ? count : count + 1;
    let loopCount = count * dayOfWeek;

    let dates = [];
    startDate.setDate(startDate.getDate() - startDayOfWeek);

    // generate dates
    for (let i = 0; i < loopCount; i++) {
        if (i !== 0) {
            startDate.setDate(startDate.getDate() + 1);
        }
        dates.push(new Date(startDate));
    }
    return dates;
}

// Create CalendarData: 
// title : { year , month },
// dates : [datesInfo] 
function CreateCalendarData(srcdate, schedules) {

    let srcYear = srcdate.getFullYear();
    let srcMonuth = srcdate.getMonth();

    let dates = CreateDates(srcYear, srcMonuth);
    let datesInfo = [];

    dates.forEach((item) => {
        let year = item.getFullYear();
        let month = item.getMonth();
        let date = item.getDate();
        let day = item.getDay();
        let todo = schedules.filter(schedule => {
            return schedule.year === year && schedule.month - 1 === month && schedule.date === date;
        });
        datesInfo.push(new dateInfo(year, month, date, day, todo));
    });

    return {
        title: { year: srcYear, month: srcMonuth },
        dates: datesInfo,
    }
}


function YMD_Equal(dateA, dateB) {
    // debugger;
    if (!YM_Equal(dateA, dateB)) {
        return false;
    }
    if (dateA.getDate() !== dateB.getDate()) {
        return false;
    }
    if (dateA.getDay() !== dateB.getDay()) {
        return false;
    }
    return true;
}

function YM_Equal(dateA, dateB) {
    if (dateA.getFullYear() !== dateB.getFullYear()) {
        return false;
    }
    if (dateA.getMonth() !== dateB.getMonth()) {
        return false;
    }

    return true;
}

// Apply calendarData to DOM tree
function ApplyCalendarDays(calendarData, isIncrease) {
    let calendar = document.querySelector(".calendar");

    calendar.querySelector(".calendar-date :first-child").innerText = calendarData.title.year;
    calendar.querySelector(".calendar-date :last-child").innerText =
        monuthNames[calendarData.title.month];

    let calendardaysWrap = document.querySelector(".calendar-daysWrap");

    let existCalendarDays = calendardaysWrap.querySelector(".calendar-days");

    let calendarDays = CreateCalendardays(calendarData);
    calendarDays.style.opacity = 0;
    calendardaysWrap.appendChild(calendarDays);
    AddDaysToDoItem(calendarDays, calendarData);

    // calendarDays is not exist, add new calendardays
    // calendarDays is exist,=> add new calendardays ,then remove previous calendarDays
    if (existCalendarDays === null) {
        calendarDays.style.opacity = 1;
        // calendardaysWrap.appendChild(calendarDays);
        // console.log(calendarDays.clientHeight);
        // console.log(calendarDays.clientWidth);
    } else {
        if (isIncrease) {
            existCalendarDays.style.cssText =
                "opacity:0; transform:translate(-100%,0); transition: .2s;";
            calendarDays.style.cssText = "opacity:1; transform:translate(100%,0);";
        } else {
            existCalendarDays.style.cssText =
                "opacity:0; transform:translate(100%,0); transition: .2s;";
            calendarDays.style.cssText = "opacity:1; transform:translate(-100%,0);";
        }

        setTimeout(() => {
            calendarDays.style.cssText = "opacity:1; transform:translate(0,0);";
            let calendardaysWrap = document.querySelector(".calendar-daysWrap");
            let calendarArray = calendardaysWrap.querySelectorAll(".calendar-days");
            if (calendarArray.length > 1) {
                calendardaysWrap.removeChild(calendarArray[0]);
            }
        }, 50);
    }
}



// Create DOM of Calendardays
function CreateCalendardays(calendarData) {
    let calendarDays = document.createElement("div");
    calendarDays.classList.add("calendar-days");

    let tpldayInfo = document.querySelector("#tpl-dayInfo");

    calendarData.dates.forEach((item, index) => {
        let clonedayInfo = tpldayInfo.content.cloneNode(true);
        let dayinfo = clonedayInfo.querySelector(".dayInfo");
        // let daytitle = clonedayInfo.querySelector(".dayTitle");

        let istodayDate = YMD_Equal(item.toDateObj(), todayDate);
        dayinfo.addEventListener("click", function () { console.log("dayInfo is clicked") });
        dayinfo.querySelector(".dayInfo-title").innerText = `${monuthNames[item.month]} ${item.date}`;
        if (istodayDate) {
            dayinfo.classList.add("currentDay");
        }

        if (YM_Equal(item.toDateObj(), new Date(calendarData.title.year, calendarData.title.month))) {
            dayinfo.querySelector(".dayInfo-label>span").innerText = item.date;

            switch (item.day) {
                case 6:
                    // item.day = 6 : saturday
                    dayinfo.classList.add("saturday");
                    break;

                case 0:
                    // item.day = 0 : sunday
                    dayinfo.classList.add("sunday");
                    break;
            }

            if (istodayDate) {
                dayinfo.classList.add("intarget");
            }
        } else {
            dayinfo.querySelector("span").innerText = `${monuthNames[item.month]
                } ${item.date}`;
            dayinfo.classList.add("outtarget");
        }

        calendarDays.appendChild(clonedayInfo);
    });

    return calendarDays;
}


// 
function AddDaysToDoItem(target, calendarData) {

    // clear previous resizeobserve
    daytoDoBoxResizeObs.disconnect();

    let toDoBoxes = target.querySelectorAll(".dayInfo-toDoBox");

    toDoBoxes.forEach((tDoBox) => {
        daytoDoBoxResizeObs.observe(tDoBox);
    });

    // calendarData.dates.forEach((date, index) => {
    //     date.toDoList.forEach((item) => {
    //         daysInfo[index].appendChild(CreateDayInfotoDoItem(item));
    //     });
    //     // daytoDoBoxResizeObs.observe(daysInfo[index]);
    // });
}

function daytoDoBoxResizeAction(entries) {
    entries.forEach((entry, index) => {
        let toDoList = currentCalendarData.dates[index].toDoList;
        CreateDayInfotoDoItem(entry, toDoList);
    });
}

function CreateDayInfotoDoItem(resizeEntry, toDoList) {
    let contentHeight, totaltoDoListHeight, toDoItem;
    const toDoItemHeight = 22;
    const moreInfoHeight = 22;
    if (toDoList.length !== 0) {

        contentHeight = resizeEntry.contentBoxSize[0].blockSize;
        // assume the height of each toDoItem is 22px
        totaltoDoListHeight = toDoList.length * toDoItemHeight;
        // clear exist toDoItem
        resizeEntry.target.innerHTML = "";

        // 
        if (totaltoDoListHeight <= contentHeight) {

            toDoList.forEach((scheduleItem) => {
                toDoItem = CreateToDoItem(scheduleItem.hour, scheduleItem.minute, scheduleItem.title);
                resizeEntry.target.appendChild(toDoItem);
            });
        }
        else {

            contentHeight -= moreInfoHeight;
            let index = 0;

            // create todoItem until the space is used up
            while ((contentHeight -= toDoItemHeight) > 0) {
                toDoItem = CreateToDoItem(toDoList[index].hour, toDoList[index].minute, toDoList[index].title);                
                resizeEntry.target.appendChild(toDoItem);
                index++
            }

            // if space is not enough space, use the text of button to indicate
            let remain = document.createElement("button");
            remain.classList.add("dayInfo-toDoItemMore")
            remain.innerText = `${toDoList.length - index} more `;
            resizeEntry.target.appendChild(remain);
        }
    }
}

function CreateToDoItem(hour, minute, toDoTitle) {
    let clonetent = document.querySelector("#tpl-dayInfo-toToItem").content.cloneNode(true);
    clonetent.querySelector("span").innerText = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${toDoTitle}`;
    return clonetent;
}


// function CreateDayInfotoDoItem(scheduleItem) {
//     let clonetent = document.querySelector("#tpl-dayInfo-toToItem").content.cloneNode(true);
//     clonetent.querySelector("span").innerText = `${scheduleItem.hour.toString().padStart(2, "0")}:${scheduleItem.minute.toString().padStart(2, "0")} ${scheduleItem.title}`;
//     clonetent.querySelector("button").addEventListener("click", function (event) {
//         event.stopPropagation();
//         // console.log(`this is ${scheduleItem.hour.toString().padStart(2,"0")}:${scheduleItem.minute.toString().padStart(2,"0")} ${scheduleItem.title}`)
//         this.parentNode.removeChild(this);
//     });


//     return clonetent;
// }





// Create UUID
// reference : pdf file of calendar  from TA
function _uuid() {
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


function StringCutOff(input, maxLength) {
    if (input.length < maxLength) {
        return input
    }
    else {
        return input.substring(0, maxLength - 3) + "...";
    }
}