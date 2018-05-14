<template>
  <div>
    <v-header class="header" :seller="seller"></v-header>
    <div class="closeHeader">
      <i class="icon-close"></i>
    </div>
    <div class="tab">
      <router-link to="/mall/order" @click.native="active($event)">
        <div class="tab-item">
          订单1
        </div>
      </router-link>
      <router-link :to="{path:'/mall/', query:{cartList:cartList}}" @click.native="active($event)">
        <div class="tab-item">
          商品
        </div>
      </router-link>

      <router-link to="/mall/seller" @click.native="active($event)">
        <div class="tab-item">
          领券
        </div>
      </router-link>
      <div class="service"></div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable */
import header from './components/header/header.vue'

window.onload = function () {

}
const ERR_OK = 0
// ERR_OK定义却没有用过，ES6会报错
/* eslint-disable */
export default {
  data () {
    return {
      seller: {},
      SColor: 'SColor',
      cartList:[],
    }
  },
  created(){
    console.log('created');
    let _this = this
    this._pullCart()


    let loginData = {};
    let clientType = localStorage.getItem('clientType');
    alert(clientType);
    if(clientType && clientType == 'wechat'){
      loginData.auth_code = this.$route.query.code;
      loginData.state = this.$route.query.state;
      this.$request(this.url.loginWechat,'form',loginData).then((res)=>{
        // alert(res)
        this.$router.push({
          path: '/mall/',
          query: {
            cartList: _this.cartList
          }
        })
        // alert('登录接口进入')
        // alert('欢迎光临'+res.data.data.nickname);
      }).catch((err)=>{
        console.log(err);
      })
    } else {
      loginData.auth_code=this.$route.query.auth_code;
      loginData.state=this.$route.query.state;
      alert(loginData.auth_code + ':' + loginData.state);
      this.$request(this.url.loginAlipay,'form',loginData).then((res)=>{
        // alert('欢迎光临'+res.data.data.nickname);
        _this.$router.push({
          path: '/mall/',
          query: {
            cartList: _this.cartList
          }
        })
      }).catch((err)=>{
        console.log(err);
        // alert('登陆失败'+err);
      })
    }

    // console.log(localStorage.getItem('rid'));
    console.log(parseInt(localStorage.getItem('rid')));
    this.$request(this.url.restaurant5,'form',{
      id:Number.parseInt(localStorage.getItem('rid'))
    }).then((res)=>{
      this.seller = res.data.data
    }).catch((err)=>{
      console.log(err);
    })





  },
  mounted () {
    console.log('mouted');
    // alert(this.$route.query.auth_code);
    // alert(this.$route.query.state);
    // let dataLoginAli = {
    //   auth_code: this.$route.query.auth_code,
    //   state: this.$route.query.state
    // }


  },
  methods: {
    _pullCart(){
      let Data = [
        {
          feild: 'rid',
          value: parseInt(localStorage.getItem('rid')),
          joinType: 'eq'
        }
      ];
      this.$request(this.url.cart2,'json',Data).then((res)=>{

        this.cartList = res.data.data
        console.log('this.cartList',this.cartList);
      }).catch((err)=>{
      })
    },
    active(event) {
      // console.log(this.SColor)
      // event.target.style = "color:black"
    },
    getParamByName(paramsArr,paramName){
      if(!paramsArr || paramsArr.length == 0){
        return;
      }
      for (let paramArr of paramsArr) {
        if(paramArr[0] == paramName){
          return paramArr[1];
        }
      }
    }
  },
  components: {
    'v-header': header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "common/styles/mixin.styl"

.t1
  my()

body
  letter-spacing: 1px;
.active
  color black

.closeHeader
  float right
  position absolute
  top 5px
  z-index 19
  color white
  right 5px
  width 20px
  height 20px
  border-radius 50%
  background rgba(255,25,25,0.7)
  bgmy('this.SColor')
  display flex
  justify-content center
  display none
  i
    text-align center
.tab
  display: flex
  justify-content: center
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2)
  z-index:30
  position: relative
  border-bottom-right-radius:100%;
  border-bottom-left-radius:100%;
  background white
  a
    height: 40px
    line-height: 40px
    text-align: center
    width: 33%
    background rgba(0, 0, 0, 0)
    .tab-item
      background rgba(0, 0, 0, 0)
      text-align: center;
      &:hover
        color #2b333b
        height 67px
        font-weight bold
        background-image: -webkit-linear-gradient(left, #147B96, #E6D205 25%, #147B96 50%, #E6D205 75%, #147B96);
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        -webkit-background-size: 200% 100%;
        -webkit-animation: masked-animation 4s infinite linear;
        @-webkit-keyframes masked-animation
          0%{ background-position: 0 0;}
          100% { background-position: -100% 0;}


.hello
  display block
  margin 150px auto
  font-size 36px
  color #7e8c8d
  position relative
  z-index -1
  bottom 50%
  left 20%
  .firm
   text-align 22px
   font-size 12px
   margin 5px 0px


.dollar
  font-size 1px
</style>
