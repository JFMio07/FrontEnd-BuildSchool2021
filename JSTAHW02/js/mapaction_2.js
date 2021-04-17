
const cityDistrictUrl = "https://raw.githubusercontent.com/taihochan/JsonData/main/%E5%8F%B0%E7%81%A3%E8%A1%8C%E6%94%BF%E5%9C%B0%E5%8D%80.json";
const waterDataUrl = "https://raw.githubusercontent.com/taihochan/JsonData/main/%E5%8F%B0%E7%81%A3%E8%87%AA%E4%BE%86%E6%B0%B4%E7%94%A8%E9%87%8F.json";

let map;
let dataMap = new Map();
let body;
let container;

window.onload = () => {
    let tplInitDataLoading = document.getElementById("tpl-initDataLoading").content.cloneNode(true);
    container = document.querySelector(".container");
    body = document.getElementsByTagName("body")[0];
    body.insertBefore(tplInitDataLoading, container);
    WaitasyncTasks([LoadCityDistrict, LoadWaterData], UIInitialzie);


    let btn1 = document.getElementById("btn1");
    btn1.addEventListener("click", function () {
        let opt = document.querySelector(".yearSelect");
        console.log(opt.value);
        console.log(opt.options);
    });
}


function UIInitialzie() {

    // tpl-yearSelect-option
    // let col = container.querySelector(".row:nth-child(1)>div[class^='col']");

    // let tplyearSelect = document.getElementById("tpl-yearSelect").content.cloneNode(true);
    // let ys = tplyearSelect.querySelector(".yearSelect");
    // let tplselectopt = tplyearSelect.getElementById("tpl-yearSelect-option").content.cloneNode(true);
    // let opt = tplselectopt.querySelector("option");
    // opt.value=2;
    // opt.textContent="123";

    // ys.appendChild(tplselectopt);
    // ys.appendChild(tplselectopt);

    // let yearList = dataMap.get("waterData");
    // console.log(yearList);

    let yearList = dataMap.get("waterData").TaiwanWaterExchangingData
        .StatisticofWaterResourcesClass.StatisticofWaterUsageClass.TheConsumptionOfWater
        .map((item) => {
            console.log(item.Year);
            // item.Year;
        });
    console.log(yearList);


    // let tplselectopt = yearSelect.getElementById("tpl-yearSelect-option");
    // let yearSelect = tplyearSelect.content.cloneNode(true);
    // col.appendChild(tplyearSelect);
    // tplselectopt.
    // yearSelect.appendChild(tplselectopt);

    // let 

    console.log(dataMap);

    initDataLoading = document.querySelector(".initDataLoading");
    for (let i = 0; i <= 10; i++) {
        setTimeout(() => {
            // debugger;
            // console.log(i);
            initDataLoading.style.opacity = (10 - i) / 10;
            if (i === 10) {
                body.removeChild(initDataLoading);
            }
        }, 50 * i);
    }

}


// WaitasyncTasks
function WaitasyncTasks(asyncTasks, callback) {
    let taskCount = asyncTasks.length;
    let finished = [];

    function Checkfinished(name) {
        finished.push(name);
        if (finished.length === taskCount) {
            callback();
        }
    }
    asyncTasks.forEach((task) => {
        task(Checkfinished);
    });
}


// LoadCityDistrict
function LoadCityDistrict(checkfinished) {
    LoadDataByXHR("CityDistrict", cityDistrictUrl, dataMap, checkfinished);
}

// LoadWaterData
function LoadWaterData(checkfinished) {
    LoadDataByXHR("waterData", waterDataUrl, dataMap, checkfinished);
}


// LoadDataByXHR
function LoadDataByXHR(name, url, dataMap, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == 4 && this.status == 200) {

            dataMap.set(name, JSON.parse(this.responseText));

            if (typeof callback === "function") {
                callback();
            }
        }
        else {
            console.log(`Http error code : ${this.status}`);
        }
    }
    xhr.open("GET", url);
    xhr.send();
}

// console.log(adminArea);
// console.log(waterData);
// let yearList = [];
// let monthList = [];



const CHU = { lat: 24.760049283988955, lng: 120.9529990274559 };
const test = [
    { lat: 24.770049283988955, lng: 120.9529990274559 },
    { lat: 24.780049283988955, lng: 120.9529990274559 },
    { lat: 24.790049283988955, lng: 120.9529990274559 }
];
const iconBase =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/";

const msgString = "123456789";
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        //   center: { lat: -34.397, lng: 150.644 },
        // 24.756944196132864, 120.95241868853984
        center: CHU,
        zoom: 15,
    });

    new google.maps.Marker({
        position: CHU,
        map,
        title: "中華大學",
        icon: iconBase + "info-i_maps.png",

    });

    let infos = new Set();
    test.forEach((item, index) => {
        const marker = new google.maps.Marker({
            position: item,
            map,
            draggable: true,
            title: index.toString(),

        });

        const info = new google.maps.InfoWindow(
            { content: msgString }
        );

        infos.add(info);
        // console.log(info);

        marker.addListener("click", () => {
            infos.forEach((x) => {
                x.close();
            });
            info.open(map, marker);
        });



    });


}