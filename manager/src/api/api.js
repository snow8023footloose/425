import axios from 'axios'
import qs from 'qs'

// axios.defaults.baseURL = 'http://192.168.2.189';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true

var BURL = 'http://192.168.2.189'
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
    //不可改变顺序
    //餐厅请求接口
    restaurant1: BURL +'/restaurant/add',
    restaurant2: BURL +'/restaurant/complexPageQuery',
    restaurant3: BURL +'/restaurant/delete',
    restaurant4: BURL +'/restaurant/update',

    //登录
    login1:BURL +'/restaurantManager/login',

    //阿里数据上传
    ali: BURL +'/common/getAliOssSTSAccessSToken',

    //菜品
    dishes1: BURL +'/dishes/add',
    dishes2: BURL +'/dishes/complexPageQuery',
    dishes3: BURL +'/dishes/delete',
    dishes4: BURL +'/dishes/update',

    //菜品
    sku1: BURL +'/dishes/add',
    sku2: BURL +'/dishes/complexPageQuery',
    sku3: BURL +'/dishes/delete',
    sku4: BURL +'/dishes/update',

    //pre单位
    preUnit1: BURL +'/predefineDishesUnit/add',
    preUnit2: BURL +'/predefineDishesUnit/complexPageQuery',
    preUnit3: BURL +'/predefineDishesUnit/delete',
    preUnit4: BURL +'/predefineDishesUnit/update',

    //pre推广标签
    prePopularizeTag1: BURL +'/predefinePopularizeTag/add',
    prePopularizeTag2: BURL +'/predefinePopularizeTag/complexPageQuery',
    prePopularizeTag3: BURL +'/predefinePopularizeTag/delete',
    prePopularizeTag4: BURL +'/predefinePopularizeTag/update',

    //pre服务类型
    preServiceType1: BURL +'/predefineServiceType/add',
    preServiceType2: BURL +'/predefineServiceType/complexPageQuery',
    preServiceType3: BURL +'/predefineServiceType/delete',
    preServiceType4: BURL +'/predefineServiceType/update',

    //pre分类
    preSpec1: BURL +'/predefineSpec/add',
    preSpec2: BURL +'/predefineSpec/complexPageQuery',
    preSpec3: BURL +'/predefineSpec/delete',
    preSpec4: BURL +'/predefineSpec/update',

    //pre餐桌类型
    preTableType1: BURL +'/predefineTableType/add',
    preTableType2: BURL +'/predefineTableType/complexPageQuery',
    preTableType3: BURL +'/predefineTableType/delete',
    preTableType4: BURL +'/predefineTableType/update',


    //pre标签
    preTag1: BURL +'/predefineTag/add',
    preTag2: BURL +'/predefineTag/complexPageQuery',
    preTag3: BURL +'/predefineTag/delete',
    preTag4: BURL +'/predefineTag/update',

    //分类
    dishesCategory1: BURL +'/dishesCategory/add',
    dishesCategory2: BURL +'/dishesCategory/complexPageQuery',
    dishesCategory3: BURL +'/dishesCategory/delete',
    dishesCategory4: BURL +'/dishesCategory/update',


    //标签
    restaurantTag1: BURL +'/restaurantTag/add',
    restaurantTag2: BURL +'/restaurantTag/complexPageQuery',
    restaurantTag3: BURL +'/restaurantTag/delete',
    restaurantTag4: BURL +'/restaurantTag/update',

    //规格
    spec1: BURL +'/restaurantSpec/add',
    spec2: BURL +'/restaurantSpec/complexPageQuery',
    spec3: BURL +'/restaurantSpec/delete',
    spec4: BURL +'/restaurantSpec/update',

    //属性
    attr1: BURL +'/restaurantSpec/attr/add',
    attr2: BURL +'/restaurantSpec/attr/complexPageQuery',
    attr3: BURL +'/restaurantSpec/attr/delete',
    attr4: BURL +'/restaurantSpec/attr/update',

    //购物车
    cart1: BURL +'/cart/add',
    cart2: BURL +'/cart/complexPageQuery',
    cart3: BURL +'/cart/delete',
    cart4: BURL +'/cart/update',


    //购物车
    table1: BURL +'/restaurantTable/add',
    table2: BURL +'/restaurantTable/complexPageQuery',
    table3: BURL +'/restaurantTable/delete',
    table4: BURL +'/restaurantTable/update',

    //订单
    order1: BURL +'/userOrder/add',
    order2: BURL +'/userOrder/complexPageQuery',
    order3: BURL +'/userOrder/delete',
    order4: BURL +'/userOrder/update',
    orderComputer: BURL +'/userOrder/computePrepayInfo',

    //订单菜品
    orderDishes1: BURL +'/orderDishes/add',
    orderDishes2: BURL +'/orderDishes/complexPageQuery',
    orderDishes3: BURL +'/orderDishes/delete',
    orderDishes4: BURL +'/orderDishes/update',


    //法人
    legalPerson1: BURL +'/legalPerson/add',
    legalPerson2: BURL +'/legalPerson/complexPageQuery',
    legalPerson3: BURL +'/legalPerson/delete',
    legalPerson4: BURL +'/legalPerson/update',
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




export function getUID() {
  // 生成32位随机数、uuid

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

}


export function goodsArr(self) {
  let _this = self
  let goodsArr = []
  for(let i = 0 ; i< _this.dishesCategory.length; i++){
    let cidNum = _this.dishesCategory[i].id
    let cidData = [
      {
        feild: 'cid',
        value: cidNum,
        joinType: 'eq'
      }
    ]
    request(urlColletion().dishes2,'json',cidData).then((res)=>{
      goodsArr.unshift({
        name:_this.dishesCategory[i].name,
        foods:res.data.data
      })
      _this.$nextTick(()=>{
        _this._initScroll()
        _this._calculateHeight()
      })


    }).catch((err)=>{
      this.$message({
        type: 'info',
        message: '数据提交失败!'
      });
      console.log(err);
    })
  }
  return goodsArr

}
