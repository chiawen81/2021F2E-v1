"use strict";

var allActivityAPIPath = "https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$top=30&$format=JSON?$filiter=Picture ne null";
var allFoodAPIPath = "https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$top=30&$format=JSON";
var allActivityAPIData; // API資料- 取得所有觀光活動資料(Tourism/Activity)

var allFoodAPIData; // API資料- 取得所有觀光餐飲資料(Tourism/Restaurant)

callAPIFromAllActivity(allActivityAPIPath, allActivityAPIData); // 取得資料- 活動

callAPIFromAllFood(allFoodAPIPath, allFoodAPIData); // 取得資料- 美食
// 取得查詢條件

function getSearchCondition() {
  console.log('getSearchCondition');
}

; // 取得資料- 美食

function callAPIFromAllFood(APIPath, allFoodAPIData) {
  axios.get(APIPath, {
    headers: getAuthorizationHeader()
  }).then(function (allFoodAPIData) {
    var activityCardGroup = document.querySelector('.food-card-group');
    var webData = [];
    var htmlCode = "";
    console.log('allFoodAPIData', allFoodAPIData); // 刪除沒照片的資料

    allFoodAPIData.data.forEach(function (item, index) {
      if (item.Picture.PictureUrl1) {
        webData.push(item);
      }

      ;
    });
    console.log('webData', webData.slice(0, 5));
    webData.slice(0, 5).forEach(function (item, index) {
      htmlCode += "<div class=\"food-card w-19\">\n    <img class=\"mg_b_10\" src=\"".concat(item.Picture.PictureUrl1, "\" alt=\"\">\n    <div class=\"card-info\">\n        <h5 class=\"ft14 pd_b_40\">").concat(item.Name, "</h5>\n        <span class=\"place\">\n            <img src=\"./assets/images/icon_card_spot_pink.png\" alt=\"\">\n            <h5 class=\"ft12\">").concat(item.Address, "</h5>\n        </span>\n    </div>\n</div>");
    });
    activityCardGroup.innerHTML = htmlCode;
  })["catch"](function (error) {
    console.log(error);
  });
  getAuthorizationHeader();
} // 取得資料- 活動


function callAPIFromAllActivity(APIPath, allActivityAPIData) {
  axios.get(APIPath, {
    headers: getAuthorizationHeader()
  }).then(function (allActivityAPIData) {
    var activityCardGroup = document.querySelector('.activity-card-group');
    var webData = [];
    var htmlCode = "";
    console.log('allActivityAPIData', allActivityAPIData); // 刪除沒照片的資料

    allActivityAPIData.data.forEach(function (item, index) {
      if (item.Picture.PictureUrl1) {
        webData.push(item);
      }

      ;
    });
    console.log('webData', webData.slice(0, 2));
    webData.slice(0, 2).forEach(function (item, index) {
      htmlCode += " <div class=\"activity-card w-48\">\n    <img class=\"pd_r_16\" src=\"".concat(item.Picture.PictureUrl1, "\" alt=\"\">\n    <div class=\"card-info\">\n        <h5 class=\"ft16 mg_b_15\">").concat(item.Name, "</h5>\n        <p class=\"mg_b_15\">").concat(item.Description.slice(0, 90), "</p>\n        <div class=\"more\">\n            <span class=\"place w-50\">\n                <img src=\"./assets/images/icon_card_spot_pink.png\" alt=\"\">\n                <h5 class=\"ft14\">").concat(item.Location, "</h5>\n            </span>\n            <a href=\"\" class=\"btn w150 pd_l_30 pd_r_30 border-pink text-pink\">\u6D3B\u52D5\u8A73\u60C5</a>\n        </div>\n    </div>\n</div>");
    });
    activityCardGroup.innerHTML = htmlCode;
  })["catch"](function (error) {
    console.log(error);
  });
  getAuthorizationHeader();
}

function getAuthorizationHeader() {
  //  填入自己 ID、KEY 開始
  var AppID = '14eabd52f5ac43a5a98f0d9e32389dae';
  var AppKey = 'k8ENBf6WGRw4ib1cOSJg7I9RHQk'; //  填入自己 ID、KEY 結束

  var GMTString = new Date().toGMTString();
  var ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(AppKey, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  var HMAC = ShaObj.getHMAC('B64');
  var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
  return {
    'Authorization': Authorization,
    'X-Date': GMTString
  };
}
//# sourceMappingURL=all.js.map
