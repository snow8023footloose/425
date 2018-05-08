<template>
  <div class="shopcart">
    <div class="message">使用优惠券支付更加便宜
      <!--<u @click="serveCall">呼叫服务</u>>-->
    </div>
    <div class="cart-content">
      <div class="content-left" @click="cookBook($event)">
        <div class="logo-wrapper" @click.stop="toggleList">
          <div class="logo" :class="{'highlight':totalCount<0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" v-show="totalCount>0" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
        <div class="desc" v-show="totalCount>0">另需餐桌费￥{{deliveryPrice}}元</div>
        <div class="desc" v-show="totalCount===0">亲，购物车为空</div>
      </div>
      <div class="content-right" @click.stop.prevent="prePay">
        <div class="pay" :class="payClass" >
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <transition
        name="drop"
        v-for="(ball,key) in balls"
        @before-enter="beforeDrop"
        @enter="dropping"
        :key="key"
        @after-enter="afterDrop">
        <div v-show="ball.show" class="ball" v-bind:css="false">
          <div class="inner inner-hook"></div>
        </div>
      </transition>
    </div>
    <transition name="fold" enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
      <div class="shopcart-list animated" v-show="listShow">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="empty">清空</span>
      </div>
      <div class="list-content" ref="list-content">
        <ul>
          <li class="food" v-for="(food,key) in selectFoods" :key="key">
            <span class="name">{{food.name}}</span>
            <div class="price">
              <span>￥{{food.normalPrice*food.count}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol
                :confirmMessage="confirmMessage"
                :food="food"
                @incrementmi="incrementTotalDecre"
                @increment="incrementTotalAdd">
              </cartcontrol>
            </div>
            <!--<div class="delete-wrapper">-->
              <!--<el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteSelect"></el-button>-->
            <!--</div>-->
          </li>
        </ul>
      </div>
    </div>
    </transition>
    <transition name="fade" enter-active-class="bounceInUp" leave-active-class="bounceOutDown">
      <div style="color: white" v-show="prePayShow" class="detail animated">
        <div class="detail-wrapper clearfix">

          <div class="scroll" style="height: 490px" ref="s-scroll">
            <div class="s-scroll" style="background: rgba(255,255,255,0);width: 100%;margin: 0px auto;">
              <h1 class="name">确认订单</h1>
              <!--<div class="favorite">
                <span class="icon-favorite" :class="{'active':favorite}" @click="toggleFavorite()"></span>
                <span class="text">{{favoriteText}}</span>
              </div>-->
              <!--<div class="star-wrapper">-->
              <!--<star :size="48" :score="seller.score"></star>-->
              <!--</div>-->
              <div class="headertitle">
                <div class="line"></div>
                <div class="text">备注</div>
                <div class="line"></div>
              </div>

              <div class="bulletin">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入备注信息"
                  v-model="markTxt">
                </el-input>
              </div>



              <div class="headertitle">
                <div class="line"></div>
                <div class="text">账单信息</div>
                <div class="line"></div>
              </div>

              <div class="info">

                <ul>
                  <li class="orderList info-item">
                    <span> 优惠金额 </span> <span> </span><span>￥{{discountMoney}} </span>
                  </li>
                  <li class="orderList info-item">
                    <span> 应付金额 </span> <span> </span><span>￥{{needPay}} </span>
                  </li>
                  <li class="orderList info-item">
                    <span> 实付金额 </span> <span></span><span style="font-size: 16px;font-weight: bolder">￥{{realPay}} </span>
                  </li>
                </ul>
              </div>

              <!--<div class="headertitle">
                <div class="line"></div>
                <div class="text">优惠信息</div>
                <div class="line"></div>
              </div>

              <div class="info">
                <ul>
                  <li class="info-item"></li>
                </ul>
              </div>-->


              <div class="headertitle">
                <div class="line"></div>
                <div class="text">订单详情</div>
                <div class="line"></div>
              </div>

              <div class="info">

                <!--<p class="content">订单状态：{{seller.description}}</p>-->
                <!--<p class="content">订单号：{{seller.description}}</p>-->
                <!--<p class="content">支付方式：{{seller.description}}</p>-->
                <!--<p class="content">下单时间：{{seller.description}}</p>-->

                <ul>
                  <li class="orderList info-item" v-for="item in cartList">
                    <span> {{item.dishes.name}} </span> <span>x{{item.num}} </span><span>￥{{item.totalPrice}} </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="confirmPayBox"
             style="
             background: rgba(255,255,255,0);
             text-align: center;
             width: 100%;
             position: fixed;
             bottom: 30px;
          ">
          <i style="font-size: 27px;position: fixed;right: 30px;top: 30px;" @click="hidePrePayShow" class="icon-close"></i>

          <el-button style=" width: 280px" type="success" @click="confirmPay" round>确认支付</el-button>
        </div>
      </div>

    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable */
  import BScroll from 'better-scroll';
  import cartcontrol from '@/components/cartcontrol/cartcontrol';
const ERR_OK = 0

  export default {
    props: {
      selectFoods: {

        type: Array,
        default() {
          return [
            {
              price: 4,
              count: 1,
            }
          ];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        markTxt:'',
        confirmOnce:0,
        cartList:[],
        discountMoney:'',
        needPay:'',
        realPay:'',
        prePayShow:false,
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true,
        book: false,
        confirmMessage: {
          is: 0
        },
        getFoods:{},

        specs:[],
        selectedTags:[],
        selectedSkuArr : [],
        dialogFormVisible:false,
        formLabelWidth: '50px',
      };
    },
    watch:{
      selectFoods(val){
        this.confirmOnce = 0
      }
    },
    methods: {
      prePay() {
        // if (this.totalPrice < this.minPrice) {
        //   return;
        // }

        // if(this.confirmOnce === 0){
          this.prePayShow = !this.prePayShow
          let data= {
            // restaurantId: localStorage.getItem('rid'),
            restaurantId: 1524988356660049,
            orderType:'single',
            // tableId: localStorage.getItem('tid')
            tableId: 12
          }
          this.$request(this.url.confirmOrder,'form',data).then((res)=>{
            this.cartList = res.data.data.cartList
            console.log('this.cartList',this.cartList);
            this.discountMoney = res.data.data.discountMoney.toFixed(1)
            this.needPay = res.data.data.needPay.toFixed(1)
            this.realPay = res.data.data.realPay.toFixed(1)
            console.log('confirmOrder',res);
            // alert(this.needPay)
            this.$nextTick(() => {
              if (!this.scroll) {
                this.scroll = new BScroll(this.$refs['s-scroll'], {
                  click: true
                });
              } else {
                this.scroll.refresh();
              }
            });
            // window.alert(`支付${this.totalPrice}元`);
          }).catch((err)=>{
            console.log(err);
          })
        //   this.confirmOnce ++;
        // }else {
        //   this.prePayShow = !this.prePayShow
        // }
        // window.alert(`支付${this.totalPrice}元`);
      },
      confirmPay(){
        let data= {
          restaurantId: localStorage.getItem('rid'),
          // restaurantId: 1524988356660049,
          orderType:'single',
          // payType:'alipay-online',
          serverType:'real-time',
          tableId: localStorage.getItem('tid')
          // tableId: 12
        }
        let clientType = localStorage.getItem('clientType');
        if(clientType && clientType == 'wechat'){
          data.payType = 'wechat-online';
          this.$request(this.url.payOrder, 'form', data).then((res) => {
            wx.config({
              //debug : true,
              appId: res.data.data.appid, // 必填，公众号的唯一标识
              timestamp: res.data.data.timeStamp + "", // 必填，生成签名的时间戳
              nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
              signature: res.data.data.paySign, // 必填，签名，见附录1
              jsApiList: ['chooseWXPay']
              // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function () {
              wx.chooseWXPay({
                timestamp: res.data.data.timeStamp + "", // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: res.data.data.nonceStr, // 支付签名随机串，不长于 32 位
                package: res.data.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: res.data.data.paySign, // 支付签名
                success: function (response) {
                  if(response.errMsg == "chooseWXPay:ok"){
                    alert('支付成功')
                  }
                }
              });
            });
            wx.error(function (res) {
              alert('签名错误');
            });
          }).catch((err) => {
            console.log(err);
          })
        } else {
          data.payType = 'alipay-online'
          this.$request(this.url.payOrder, 'form', data).then((res) => {
            console.log('confirmOrder', res);
            console.log(res.data);
            this.$message({
              type: 'success',
              message: '安全支付'
            });
            const div = document.createElement('div');
            div.innerHTML = res.data;
            document.body.appendChild(div);
            div.children[0].submit();
          }).catch((err) => {
            console.log(err);
          })
        }
      },
      hidePrePayShow(){
        this.prePayShow = !this.prePayShow
      },
      deleteSelect(){
        let data = {
          did: this.getFoods.id,
          rid: this.getFoods.rid,
          tid: 12,
          type: 'single',
        }

        this.$request(this.url.cart3,'json',data).then((res)=>{
          console.log(res);
        }).catch((err)=>{
          console.log(err);
        })
      },
      transformArrySku(){
        let selectedSkuArr = []
        for(var i=0;0<this.selectedSkuArr.length;i++){
          if(this.selectedSkuArr.length === i){
            return selectedSkuArr
          }else {
            for(var j=0;j<this.specs[i].attrs.length;j++){
              // console.log(this.specs[i].attrs);
              if(this.selectedSkuArr.length === i){
                continue
              }else if(this.selectedSkuArr[i] === this.specs[i].attrs[j].name){
                selectedSkuArr.push(this.specs[i].attrs[j].id)
              }
            }
          }
        }
      },
      transformArryTags(){
        let selectedArryTags = []
        let data = [
          {
            feild:'status',
            value:'enable',
            joinType: 'eq'
          }
        ]
        this.$request(this.url.restaurantTag2,'json',data).then((res)=>{
          console.log(res);
          let response = res.data.data
          for(var i=0;0<this.selectedTags.length;i++){
            if(this.selectedTags.length === i){
              this.transformArryTag = selectedArryTags
              return true
            }else {
              for(var j=0;j<this.response.length;j++){
                // console.log(this.specs[i].attrs);
                if(this.selectedTags.length === i){
                  continue
                }else if(this.selectedTags[i] === this.response[j].name){
                  selectedArryTags.push(this.response[j].id)
                }
              }
            }
          }
        }).catch((err)=>{
          console.log(err);
        })
      },
      findSkuByAttrJoin(selectedJoinAttr){
        for(let item of this.getFoods.skus){
          if(item.attrJion === selectedJoinAttr){
            return item;
          }
        }

      },
      confirmSku(){
        // console.log(this.specs);
        // console.log(this.selectedSkuArr);
        console.log(this.selectedTags);
        // console.log(this.trueLabelofSpecs+'trueLabelofSpecs');
        // console.log(this.trueLabelofTags+'trueLabelofTags');
        let attrJoin = this.transformArrySku().join('_');
        // this.transformArryTags()
        // console.log(this.transformArryTags());
        let attrTags = this.selectedTags.join(',');
        let selectedSkuObj = this.findSkuByAttrJoin(attrJoin);
        let data = {
          num:1,
          sid: selectedSkuObj.id,
          did: this.getFoods.id,
          rid: this.getFoods.rid,
          tid: 12,
          type: 'single',
          tagIds: attrTags
        }
        this.$request(this.url.cart1,'json',data).then((res)=>{
          console.log(res);
        }).catch((err)=>{
          console.log(err);
        })
        if (!this.getFoods.count) {
          Vue.set(this.getFoods, 'count', 1);
        } else {
          this.getFoods.count++;
        }
        this.dialogFormVisible = !this.dialogFormVisible
      },
      incrementTotalAdd(g) {
        console.log(g.event,g.food,'456546456456')
        //体验优化,异步执行下落动画
        if(g.specs){
          this.dialogFormVisible = !this.dialogFormVisible
          this.getFoods = g.food
          this.specs = g.food.specs
        }else{

          let data = {
            num: 1,
            did: g.food.id,
            rid: g.food.rid,
            tid: 12,
            type: 'single',
          }
          this.$request(this.url.cart1,'json',data).then((res)=>{
            console.log(res);
          }).catch((err)=>{
            console.log(err);
          })
        }
      },
      incrementTotalDecre(g){
        // console.log(g.event,g.food,'456546456456')
        //体验优化,异步执行下落动画
        if(g.specs){
          this.dialogFormVisible = !this.dialogFormVisible
          this.getFoods = g.food
          this.specs = g.food.specs
        }else{
          let data = {
            num: -1,
            did: g.food.id,
            rid: g.food.rid,
            tid: 12,
            type: 'single',
          }
          this.$request(this.url.cart1,'json',data).then((res)=>{
            console.log(res);
          }).catch((err)=>{
            console.log(err);
          })
        }
      },
      serveCall() {
        alert("已为您呼叫服务")
      },
      drop(el) {
        // console.log("shopcart")
        for(let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if(!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return ;
          }
        }
      },
      beforeDrop(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if(ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      dropping(el) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
        });
      },
      afterDrop(el){
        let ball = this.dropBalls.shift();
        if(ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      cookBook(event) {
        this.book = !this.book
        let Goods = document.getElementById("goods");
        if(this.book){
          Goods.className = "goods-"
        }else if(!this.book){
          Goods.className = "goods"
        }
        let BgOfBook = document.getElementById('foods-wrapper')
        let BgOfBookUl = document.getElementById('foods-ul')
        BgOfBook.style.background = 'url(https://order-online.oss-cn-shenzhen.aliyuncs.com/restaurant/860ad5a4-6a07-4ce1-a90f-4f12988abb84)'
        BgOfBookUl.style.background = 'url(https://order-online.oss-cn-shenzhen.aliyuncs.com/restaurant/860ad5a4-6a07-4ce1-a90f-4f12988abb84)'
        BgOfBook.style.backgroundSize = '100%'
        BgOfBookUl.style.backgroundSize = '100%'

      },
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      hideList() {
        this.fold = true;
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },

    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.normalPrice * food.count;

        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc() {
        if (this.totalPrice < this.minPrice) {
          return `￥还差${this.minPrice-this.totalPrice}元开单`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元减10元`;
        } else {
          return '去结算';
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs['list-content'], {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    },
    created () {

    },
    components: {
      cartcontrol
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/styles/mixin.styl"
  @import "../../common/animate.css";

  .shopcart
    position: fixed
    left: 0
    bottom: 24px
    z-index: 50
    width: 100%
    height: 48px
    .message
      text-align center
      border-top-right-radius:50%;
      border-top-left-radius:50%;
      font-size 12px
      color #2b333b
      background rgba(245, 255, 205, 0.8)
      line-height 24px
    .cart-content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: rgb(0, 160, 220)
              opacity 0.5
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: black
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff

    .shopcart-list
      position: absolute
      /*right: 36px*/
      bottom: 26px
      z-index: -1
      width: 95%
      .list-header
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        height: 40px
        line-height: 31px
        width : 100%
        padding: 0 2.5%
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: left
          margin-left: 15px
          padding-top: 2px
          font-size: 12px
          color: rgb(0, 160, 220)

      .list-content
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        padding: 0 2.5%
        max-height: 200px
        bottom : 40px
        padding-bottom 20px
        width : 100%
        overflow hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            display inline-block
            font-size: 13px
            color: rgb(7, 17, 27)
            font-weight :100
            text-overflow: clip
            width 135px
          .price
            position: absolute
            right: 50%
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 5%
            bottom: 6px
          .delete-wrapper
            position: absolute
            right: 0%
            bottom: 12px
            .el-button
              padding 5px !important

.ball-container
  .ball
    position fixed
    left 32px
    bottom 22px
    z-index 200
    transition all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)
    .inner
      width 16px
      height 16px
      border-radius 50%
      background-color rgb(0,160,220)
      transition all 0.4s linear


.detail
  position: fixed
  z-index: 100
  top: 0
  left: 0
  width: 100%
  height: 100%
  /*overflow: hidden*/
  transition: all 0.5s
  backdrop-filter: blur(10px)
  background: rgba(7, 17, 27, 0.8)
  .detail-wrapper
    display flex
    width: 100%
    height: 589px
    margin-top: 30px
    justify-content center


.orderList
  display: flex
  justify-content: space-between
  span:nth-child(1)
    display block
    width 60%
  span:nth-child(2)
    display block
    width 20%
  span:nth-child(3)
    display block
    width 25%
</style>
