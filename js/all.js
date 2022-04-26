const zoneOption = document.querySelector(".zoneOption");
// const zoneTitle = document.querySelector(".zone");
const locationList = document.querySelector(".location-list");
const button = document.getElementsByTagName("li");
const mainBottom = document.querySelector(".main-bottom");
let data = ""; //抓到API回傳的東西
const dataUrl =
  "https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json";
// 先把API的URL存成一個變數

const zoneTitle = document.createElement("h2");

const zone = [
  "三民區",
  "前鎮區",
  // "仁武區",
  // "燕巢區",
  "茄萣區",
  "六龜區",
  "茂林區",
  // "永安區",
  "鼓山區",
  // "新興區",
  "旗津區",
  // "大寮區",
  // "鳥松區",
  "梓官區",
  "甲仙區",
  // "桃源區",
  // "彌陀區",
  "左營區",
  "前金區",
  "小港區",
  "大樹區",
  "岡山區",
  // "路竹區",
  // "旗山區",
  "杉林區",
  // "那瑪夏區",
  "楠梓區",
  "苓雅區",
  "鳳山區",
  // "大社區",
  // "橋頭區",
  // "湖內區",
  "美濃區",
  "內門區",
  "田寮區",
];

const topButton = document.querySelector(".goTop");

//使用Fetch發送請求 fetch會回傳一個包含response的promise
fetch(dataUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {
    data = myJson.result.records;
    console.log(data);
    console.log(typeof data);
  });

for (let i = 0; i < zone.length; i++) {
  const option = document.createElement("option");
  option.value = zone[i];
  option.textContent = zone[i];
  zoneOption.appendChild(option);
  appendLocation();

}

//select選單綁定發生change
zoneOption.addEventListener("change", updateList, false);

//點選按鈕時觸發updateList
for (let i = 0; i < button.length; i++) {
  //發生change事件把上一次渲染出來的li清空
  button[i].index = i;
  button[i].onclick = function () {
    locationList.innerHTML = "";
    addTitle();
    zoneTitle.innerHTML = this.innerHTML;

    //select 出來的是透過value去更動所以不更改他的textcontent而是value
    //如果這裡改了zoneValue的值等於把請選擇行政區改掉多一個本身就有的行政區
    zoneOption.value = this.innerHTML;
    appendLocation();
    topButton.setAttribute("class", "visible");

  };
}

function updateList(e) {
  //發生change事件把上一次渲染出來的li清空
  locationList.innerHTML = "";
  addTitle();
  //宣告選取到的選單的值綁到zoneTitle
  zoneTitle.innerHTML = e.target.value;
  appendLocation();
  topButton.setAttribute("class", "visible");
  if(zoneTitle.innerHTML==''){
    topButton.removeAttribute("class", "visible");
    topButton.setAttribute("class", "goTop");
  }

}

//當資符合所選取的地區 讓ul 長出符合筆數的li
function appendLocation() {
  for (let i = 0; i < data.length; i++) {

    if (data[i].Zone == zoneOption.value) {
      let location = document.createElement("li");
      location.className = "location fadeIn";
      locationList.appendChild(location);
      location.innerHTML = `        <img class="photo" src="${data[i].Picture1}" alt="" />
      <ul>
        <li class="time">
          <i class="fa fa-clock-o" aria-hidden="true"></i>
          <p>${data[i].Opentime}</p>
        </li>
        <li class="address">
          <i class="fa fa-map-marker" aria-hidden="true"></i>
          <p>${data[i].Add}</p>
        </li>

        <li class="phone">
          <i class="fa fa-phone" aria-hidden="true"></i>
          <p>${data[i].Tel}</p>
        </li>
        <li class="tag">
          <i class="fa fa-tag" aria-hidden="true"></i>
          <p>${data[i].Ticketinfo}</p>
        </li>
      </ul>`;
    }
  }
}

function addTitle() {
  zoneTitle.remove();
  zoneTitle.className='fadeIn';
  mainBottom.insertBefore(zoneTitle, locationList);
}