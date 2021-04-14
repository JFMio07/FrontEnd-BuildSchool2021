import { $g } from "./helpers.js";

const imgFolder = "./images";
const imgExtension = ".png";
let pdAction = $g("#pd-action");
let pdPic = $g("#pd-pic");

// function productInfo(type,pdInfo){
//   this.name
// }

// 產品資料
let products = [
  {
    type: "iPhone",
    pdInfo: {
      catelog:"iPhone 12",
      ver: "12",
      series: "",
    },
    specInfo: {
      colorInfo: [
        {
          pdColor: "white",
          btnImg: "btn-white.png",
        },
        {
          pdColor: "black",
          btnImg: "btn-black.png",
        },
        {
          pdColor: "blue",
          btnImg: "btn-blue.png",
        },
        {
          pdColor: "green",
          btnImg: "btn-green.png",
        },
        {
          pdColor: "red",
          btnImg: "btn-red.png",
        },
      ],
      sellPrice: [
        { storage: "64GB", price: 26900 },
        { storage: "128GB", price: 28500 },
        { storage: "256GB", price: 32000 },
      ],
    },
  },
  {
    type: "iPhone",
    pdInfo: {
      catelog:"iPhone 12",
      ver: "12",
      series: "mini",
    },
    specInfo: {
      colorInfo: [
        {
          pdColor: "white",
          btnImg: "btn-white.png",
        },
        {
          pdColor: "black",
          btnImg: "btn-black.png",
        },
        {
          pdColor: "blue",
          btnImg: "btn-blue.png",
        },
        {
          pdColor: "green",
          btnImg: "btn-green.png",
        },
        {
          pdColor: "red",
          btnImg: "btn-red.png",
        },
      ],
      sellPrice: [
        { storage: "64GB", price: 23900 },
        { storage: "128GB", price: 25500 },
        { storage: "256GB", price: 29000 },
      ],
    },
  },
  {
    type: "iPad",
    pdInfo: {
      catelog:"iPad",
      series: "",
    },
    specInfo: {
      colorInfo: [
        {
          pdColor: "spacegray",
        },
        {
          pdColor: "silver",
        },
        {
          pdColor: "gold",
        },
      ],
      sellPrice: [
        {
          storage: "32GB",
          net: "wifi",
          price: 10500,
        },
        {
          storage: "32GB",
          net: "wifi",
          price: 14800,
        },
        {
          storage: "128GB",
          net: "cell",
          price: 13500,
        },
        {
          storage: "128GB",
          net: "cell",
          price: 17800,
        },
      ],
    },
  },
];

window.onload = function () {
  let btnIphone = document.getElementById("btn-iphone");
  btnIphone.addEventListener("click", ShowIphoneData);

  let btnIpad = document.getElementById("btn-ipad");
  btnIpad.addEventListener("click", ShowIpadData);
};

function ShowIphoneData() {
  EraseContent();
  CreateTypeContent("iPhone");
}

function ShowIpadData() {
  EraseContent();
  CreateTypeContent("iPad");
}

function EraseContent() {
  pdAction.innerHTML = "";
  pdPic.innerHTML = "";
}

function CreateTypeContent(type) {
  let selproducts = products.filter((product) => product.type == type);

  // pd select area
  let title = document.createElement("h2");
  title.innerHTML = `<span>全新</span> 購買 ${selproducts[0].pdInfo.catelog}`;
  title.classList.add("buy-title");
  pdAction.appendChild(title);
  

  let decisionType = document.createElement("div");
  decisionType = ``;
  
  
  
  
  
  // pic area
  // let typepic = document.createElement("img");
  // imgfoler/typefolder/namefolder.imgFileName.extenssion
  // let picUrl = `${BuildPDFolderPath(type,selproducts[0].pdInfo)}/${BuildPdFullName(type, selproducts[0].pdInfo)}${imgExtension}`;
  // typepic.setAttribute("src", picUrl);
  // typepic.classList.add("w-100");
  // pdPic.appendChild(typepic);



}

function CreatePDDetail(type,pdInfo,){

}

function BuildPDFolderPath(type, pdInfo) {
  return `${imgFolder}/${type}/${BuildPdFullName(type, pdInfo)}`;
}

function BuildPdFullName(type, pdInfo) {
  let ver = pdInfo.hasOwnProperty("ver") ? pdInfo.ver: "";
  ver = ver.length == 0 ? "" : ` ${ver}`;
  let series = pdInfo.series;
  series = series.length == 0 ? "" : ` ${series}`;
  return `${type}${ver}${series}`;
}

