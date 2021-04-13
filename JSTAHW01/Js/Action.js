let pdAction = document.getElementById("pd-action");
let pdPic = document.getElementById("pd-pic");

let product = [
  {
    type: "iphone",
    nameInfo: {
      name: "iphone-12",
    },
    specInfo: {
      colorInfo: [
        {
          pdColor: "white",
        },
        {
          pdColor: "black",
        },
        {
          pdColor: "blue",
        },
        {
          pdColor: "green",
        },
        {
          pdColor: "red",
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
    type: "iphone",
    nameInfo: { name: "iphone-12-mini" },
    specInfo: {
      colorInfo: [
        {
          pdColor: "white",
        },
        {
          pdColor: "black",
        },
        {
          pdColor: "blue",
        },
        {
          pdColor: "green",
        },
        {
          pdColor: "red",
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
    type: "ipad",
    nameInfo: { name: "ipad" },
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

console.log(product);

// let data = JSON.stringify(iphoneData);
// console.log(data);

window.onload = function () {
  let btnIphone = document.getElementById("btn-iphone");
  btnIphone.addEventListener("click", GetIphoneData);

  let btnIpad = document.getElementById("btn-ipad");
  //   btnIpad.addEventListener("click", GetIpadData);

  InitContent();
};

function GetIphoneData() {
  InitContent();
}

// function GetIpadData(){
//     console.log("456");
// }

function InitContent() {
  pdAction.innerHTML = "";
  pdPic.innerHTML = "";
}
