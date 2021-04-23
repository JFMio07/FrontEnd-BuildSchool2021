let todayDate, currentDate,currentCalendarData,schedules;
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


function dateInfo(year,month,date,day,toDoList){
  this.year=year,
  this.month=month,
  this.date = date,
  this.day=day,
  this.toDoList = toDoList
}

dateInfo.prototype.toDateObj=function(){
  return new Date(this.year,this.month,this.date);
};


window.onload = function () {
  todayDate = new Date();
  currentDate = new Date(todayDate.getFullYear(), todayDate.getMonth());
  currentCalendarData = CreateCalendarData(todayDate,schedules);
  ApplyCalendarDays(currentCalendarData, true);
  console.log(currentDate);
  console.log(todayDate);
  

  // register btnPrev click event
  document.querySelector(".calendar-btnPrev").addEventListener("click", function(){IncreaseCalendar(false)});

  // register btnNext click event
  document.querySelector(".calendar-btnNext").addEventListener("click", function(){IncreaseCalendar(true)});
};

// true : increase Calendar
// false : decrease Calendar
function IncreaseCalendar (increase){
  currentDate.setMonth(currentDate.getMonth() + (increase?1:-1));
  currentCalendarData = CreateCalendarData(currentDate,schedules);
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
function CreateCalendarData(srcdate,schedules){
  
  let srcYear = srcdate.getFullYear();
  let srcMonuth = srcdate.getMonth();

  let dates = CreateDates(srcYear, srcMonuth);
  let datesInfo=[];
  
  dates.forEach((date)=>{
    datesInfo.push(
      new dateInfo(
        date.getFullYear(),
        date.getMonth(), 
        date.getDate(),
        date.getDay(),
        [],
      ));
  });

  return {
    title:{year: srcYear,month:srcMonuth},
    dates : datesInfo,
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
function ApplyCalendarDays(calendarData , isIncrease) {
  let calendar = document.querySelector(".calendar");

  calendar.querySelector(
    ".calendar-date :first-child"
  ).innerText = calendarData.title.year;
  calendar.querySelector(".calendar-date :last-child").innerText =
    monuthNames[calendarData.title.month];

  let calendardaysWrap = document.querySelector(".calendar-daysWrap");

  let existCalendarDays = calendardaysWrap.querySelector(".calendar-days");

  let calendarDays = CreateCalendardays(calendarData);

  // calendarDays is not exist, add new calendardays
  // calendarDays is exist,=> add new calendardays ,then remove previous calendarDays
  if (existCalendarDays === null) {
    calendardaysWrap.appendChild(calendarDays);
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
    calendardaysWrap.appendChild(calendarDays);
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

  let dayInfo = document.querySelector("#tpl-dayInfo");

  calendarData.dates.forEach((item, index) => {
    let clonedayInfo = dayInfo.content.cloneNode(true);
    let dayinfo = clonedayInfo.querySelector(".dayInfo");
    // let daytitle = clonedayInfo.querySelector(".dayTitle");
   
    let istodayDate = YMD_Equal(item.toDateObj(), todayDate);
    if (istodayDate) {
      dayinfo.classList.add("currentDay");
    }

    if (YM_Equal(item.toDateObj(), new Date(calendarData.title.year,calendarData.title.month))) {
      dayinfo.querySelector("span").innerText = item.date;
      if (istodayDate) {
        dayinfo.classList.add("intarget");
      }
    } else {
      dayinfo.querySelector("span").innerText = `${
        monuthNames[item.month]
      } ${item.date}`;
      dayinfo.classList.add("outtarget");
    }
    calendarDays.appendChild(clonedayInfo);
  });

  return calendarDays;
}
