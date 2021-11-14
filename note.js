// call API
// 'https://ptx.transportdata.tw/MOTC//v2/Tourism/Activity?$top=20&$format=JSON'
const fetchActivity = async(APIURL) => {
    const res = await fetch(
      APIURL,{headers: getAuthorizationHeader()}
    )
    const json = await res.json();
    console.log('接到的資料：',json);

    function getAuthorizationHeader() {
    //  填入自己 ID、KEY
      let AppID = '14eabd52f5ac43a5a98f0d9e32389dae';
      let AppKey = 'k8ENBf6WGRw4ib1cOSJg7I9RHQk';
      let GMTString = new Date().toGMTString();     // UTC時間
      let ShaObj = new jsSHA('SHA-1', 'TEXT');
      ShaObj.setHMACKey(AppKey, 'TEXT');
      ShaObj.update('x-date: ' + GMTString);
      let HMAC = ShaObj.getHMAC('B64');
      // 加密驗證
      let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"'; 
      return { 'Authorization': Authorization, 'X-Date': GMTString }; 
    }
  }