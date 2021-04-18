
const cityDistrictUrl = "https://raw.githubusercontent.com/taihochan/JsonData/main/%E5%8F%B0%E7%81%A3%E8%A1%8C%E6%94%BF%E5%9C%B0%E5%8D%80.json";
// const waterDataUrl = "https://raw.githubusercontent.com/taihochan/JsonData/main/%E5%8F%B0%E7%81%A3%E8%87%AA%E4%BE%86%E6%B0%B4%E7%94%A8%E9%87%8F.json";
const waterDataUrl = "https://raw.githubusercontent.com/JFMio07/FileStorage/main/%E5%8F%B0%E7%81%A3%E6%AF%8F%E6%97%A5%E8%87%AA%E4%BE%86%E6%B0%B4%E7%94%A8%E9%87%8F.json";

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

    let waterData = dataMap.get("WaterData").TaiwanWaterExchangingData
        .StatisticofWaterResourcesClass.StatisticofWaterUsageClass.TheConsumptionOfWater;

    let cityDistrict = dataMap.get("CityDistrict").map((x) => {
        return {
            City: x.City === "臺北市" ? "台北市" : x.City,
            District: x.District,
            Lat: x.Lat,
            Lng: x.Lng
        }
    });
    
        
    // tpl-yearSelect-option
    let row = container.querySelector(".row:nth-child(1)");
    let tplyearSelect = document.getElementById("tpl-yearSelect").content.cloneNode(true);
    let yearSelect = tplyearSelect.querySelector("#yearSelect");

    let yearList = new Set(waterData.map((item) => item.Year));

    yearList.forEach((value)=>{
        let tplselectopt = tplyearSelect.getElementById("tpl-yearSelect-option").content.cloneNode(true);
        let opt = tplselectopt.querySelector("option");
        opt.value=value;
        opt.textContent=value.toString();
        yearSelect.appendChild(tplselectopt);
    });

    row.appendChild(tplyearSelect);


// yearSelect



    // ys.appendChild(tplselectopt);
    // ys.appendChild(tplselectopt);

    // let yearList = dataMap.get("waterData");
    // console.log(yearList);


    // {City: "台北市", District: "中正區", Lat: 25.0324039, Lng: 121.519882}

    // console.log(cdata1);

    // console.log(dataMap);
    // console.log(yearList);


    // let wdataM = wdata.filter(x => x.Year === "104");

    // let listdata = cdata.filter((x) => {
    //     return x === 

    // });


    // wdata.filter(x => x.Year === "104").map(x => {
    //     let data1 = cdata.filter(y => y.District === x.Town);


    //     let dataset = new Map([
    //         [],
    //     ]);

    // });


    // let listdata = wdata.filter(x=>x.Year ==="104").map((x)=>{
    //     let data1 = cdata.filter(y=>y.District === x.Town);

    //     return data1.map((x)=>{
    //         []
    //     });

    //     let dataset = new Map([
    //         [],
    //     ]);

    // });




    // let listdata0 = new Set(cdata.map(x => x.City));
    // let listdata01 = new Set(cdata.map(x => x.City === "臺北市" ? "台北市" : x.City));
    // let listdata = new Set(wdata.filter(x => x.Year === "104").map(x => x.County));
    // let listdata1 = new Set(wdata.filter(x => x.Year === "105").map(x => x.County));
    // let listdata2 = new Set(wdata.filter(x => x.Year === "106").map(x => x.County));
    // let listdata3 = new Set(wdata.filter(x => x.Year === "107").map(x => x.County));
    // let listdata4 = new Set(wdata.filter(x => x.Year === "108").map(x => x.County));
    // let listdata5 = new Set(wdata.filter(x => x.Year === "109").map(x => x.County));

    // console.log(listdata0);
    // console.log(listdata01);
    // console.log(listdata);
    // console.log(listdata1);
    // console.log(listdata2);
    // console.log(listdata3);
    // console.log(listdata4);
    // console.log(listdata5);


    // let step1 = wdata.filter(x => x.Year === "105");
    // let step2 = cdata1.filter((x) => step1.find(y => x.City == y.County && x.District == y.Town) !== undefined);
    // let step3 = step2.map((citydistrict) => {
    //     return {
    //         City: citydistrict.City,
    //         District: citydistrict.District,
    //         Lat: citydistrict.Lat,
    //         Lat: citydistrict.Lat,
    //         Lng: citydistrict.Lng,
    //         ConsumptionOfwater: step1.filter((waterData) => waterData.County == citydistrict.City && waterData.Town == citydistrict.District)
    //             .sort((a,b)=>a.Month-b.Month).map((item) => {
    //             return {
    //                 Year:item.Year,
    //                 Month: item.Month,
    //                 TheDailyDomesticConsumptionOfWaterPerPerson: item.TheDailyDomesticConsumptionOfWaterPerPerson,
    //             };
    //         })
    //     };

    // });



    // console.log(step3);



    // let test02 = wdata.filter(x=>x.Year=="104");
    // console.log(test02);

    // let test03 = wdata.find(x => x.Year === "110");
    // console.log(test03);


    // let tplselectopt = yearSelect.getElementById("tpl-yearSelect-option");
    // let yearSelect = tplyearSelect.content.cloneNode(true);
    // col.appendChild(tplyearSelect);
    // tplselectopt.
    // yearSelect.appendChild(tplselectopt);

    // let 


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
    LoadDataByXHR("WaterData", waterDataUrl, dataMap, checkfinished);
}


// LoadDataByXHR
function LoadDataByXHR(name, url, dataMap, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == 4 && this.status == 200) {

            dataMap.set(name, JSON.parse(this.responseText));
            // dataMap.set(name, this.responseText);

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
