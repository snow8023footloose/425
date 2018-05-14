/* eslint-disable */
import axios from 'axios'
import qs from 'qs'

// axios.defaults.baseURL = 'http://192.168.2.189';
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// var BURL = 'http://192.168.2.189/api'
var BURL = 'https://www.xwfwlkj.com/api'
export function _addRestaurant(obj) {
  return axios.post("/restaurant/add",  obj, {
    header:{
      'contentType':'application/json'
    }
  });
}

export function getAliyunSTSAccessToken() {
  return axios.post("/common/getAliOssSTSAccessSToken?name=zhangsan");
}

export  function urlColletion() {
  return {
    //餐厅请求接口

    login2: BURL + '/xwfUser/login',
    loginAlipay: BURL + '/xwfUser/alipayLogin',
    loginWechat: BURL + '/xwfUser/wechatLogin',

    //订单确认
    confirmOrder: BURL +'/userOrder/computePrepayInfo',

    //订单确认
    payOrder: BURL +'/userOrder/submit',

    restaurant1: BURL + '/restaurant/add',
    restaurant2: BURL + '/restaurant/complexPageQuery',
    restaurant3: BURL + '/restaurant/delete',
    restaurant4: BURL + '/restaurant/update',
    restaurant5: BURL + '/restaurant/findByIdWithExtraData',

    //阿里数据上传
    ali: BURL +'/common/getAliOssSTSAccessSToken',

    //菜品
    dishes1: BURL + '/dishes/add',
    dishes2: BURL + '/dishes/complexPageQueryWithExtraData',
    dishes3: BURL + '/dishes/delete',
    dishes4: BURL + '/dishes/update',

    //分类
    dishesCategory1: BURL + '/dishesCategory/add',
    dishesCategory2: BURL + '/dishesCategory/complexPageQuery',
    dishesCategory3: BURL + '/dishesCategory/delete',
    dishesCategory4: BURL + '/dishesCategory/update',

    //标签
    restaurantTag1: BURL + '/restaurantTag/add',
    restaurantTag2: BURL + '/restaurantTag/complexPageQuery',
    restaurantTag3: BURL + '/restaurantTag/delete',
    restaurantTag4: BURL + '/restaurantTag/update',

    //SKU
    sku1: BURL + '/sku/complexPageQuery',

    //规格
    spec1: BURL + '/restaurantSpec/add',
    spec2: BURL + '/restaurantSpec/complexPageQuery',
    spec3: BURL + '/restaurantSpec/delete',
    spec4: BURL + '/restaurantSpec/update',

    //属性
    attr1: BURL + '/restaurantSpec/attr/add',
    attr2: BURL + '/restaurantSpec/attr/complexPageQuery',
    attr3: BURL + '/restaurantSpec/attr/delete',
    attr4: BURL + '/restaurantSpec/attr/update',

    //购物车
    cart1: BURL + '/cart/add',
    cart2: BURL + '/cart/complexPageQuery',
    cart3: BURL + '/cart/delete',
    cart4: BURL + '/cart/update',
    cart5: BURL + '/cart/updateNum',


    //餐桌
    table1: BURL + '/restaurantTable/add',
    table2: BURL + '/restaurantTable/complexPageQuery',
    table3: BURL + '/restaurantTable/delete',
    table4: BURL + '/restaurantTable/update',

    //订单
    order1: BURL + '/userOrder/add',
    order2: BURL + '/userOrder/complexPageQuery',
    order3: BURL + '/userOrder/delete',
    order4: BURL + '/userOrder/update',
    orderComputer: BURL + '/userOrder/computePrepayInfo',

    //订单菜品
    orderDishes1: BURL + '/orderDishes/add',
    orderDishes2: BURL + '/orderDishes/complexPageQuery',
    orderDishes3: BURL + '/orderDishes/delete',
    orderDishes4: BURL + '/orderDishes/update',
  }
}

export function request(url,format,data) {
  let dataFormat = '';
  if(format === 'json' ){
    dataFormat = {
      headers:{
        'Content-Type':'application/json'
      }
    }
  } else {
    data = qs.stringify(data);
    dataFormat = {
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }
  }
  return axios.post(url,data,dataFormat);
}



export function formatDateTime(inputTime) {
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
}


export function getUID() {
  // 生成32位随机数、uuid

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });

}

function handleRes(obj,res,goodsArr){
  for(let i=0;i<res.length;i++) {
    goodsArr.unshift({
      name:obj.dishesCategory[i].name,
      foods:res[i].data.data
    })
  }
}

export function goodsArr(self) {
  let _this = self
  let goodsArr = []
  let promiseArr = [];
  for(let i = 0 ; i< _this.dishesCategory.length; i++) {
    promiseArr.push(request(urlColletion().dishes2, 'json', [
      {
        feild: 'cid',
        value: _this.dishesCategory[i].id,
        joinType: 'eq'
      }
    ]))
  }
  Promise.all(promiseArr).then((res)=>{
    console.log(res);
    handleRes(_this,res,goodsArr);
    _this.goods = goodsArr
  })
}







