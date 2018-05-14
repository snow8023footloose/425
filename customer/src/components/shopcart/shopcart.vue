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
        <div class="price" v-show="totalCount>0" :class="{'highlight':totalPrice>0}"><span class="dollar">￥</span>{{totalPrice.toFixed(2)}}</div>
        <!--<div class="desc" v-show="totalCount>0">另需餐桌费￥{{deliveryPrice}}元</div>-->
        <div class="desc" v-show="totalCount===0">亲，购物车为空</div>
      </div>
      <div class="content-right" @click.stop.prevent="prePay">
        <div class="pay" :class="payClass" style="background: rgba(0,180,60,.8)">
          结算
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
          <h1 class="title" style="line-height: 41px;">购物车</h1>
          <!--<span class="empty" @click="empty">清空</span>-->
        </div>
        <div class="list-content" ref="list-content">
          <ul>
            <li class="food" @click="selectCart(good)" v-for="(good,key) in cartList" :key="key" v-if="good.num > 0">
              <span class="name" >{{good.dishes.name}}</span>
              <span class="dishseNumber" style="margin-left: 10px"><i class="el-icon-close"></i>{{good.num}}</span>
                <span>￥{{good.totalPrice}}</span>
              <div class="cartcontrol-wrapper">
                <cartcontrol
                  :confirmMessage="confirmMessage"
                  :food="good"
                  @incrementmi="incrementTotalDecre"
                  @increment="incrementTotalAdd">
                </cartcontrol>
              </div>
              <div class="cartShowDetil">
                <span style="font-size: 10px" v-for="tags in good.tags">{{tags.name}}&nbsp;</span><span style="font-size: 10px" v-if="good.skus">{{good.sid}}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="list-header2" style="background: white">

        </div>
      </div>
    </transition>
    <transition name="fade" enter-active-class="bounceInUp" leave-active-class="bounceOutDown">
      <div style="color: white" v-show="prePayShow" class="detail animated">
        <div class="detail-wrapper clearfix">

          <div class="scroll" style="height: 490px" ref="confirm-scroll">
            <div class="s-scroll" style="background: rgba(255,255,255,0);width: 100%;margin: 0px auto;">
              <h1 class="name">确认订单</h1>
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
              <div class="headertitle">
                <div class="line"></div>
                <div class="text">订单详情</div>
                <div class="line"></div>
              </div>
              <div class="info">
                <ul>
                  <li class="orderList info-item" v-for="item in PreCartList" v-if="item.num > 0">
                    <span > {{item.dishes.name}} </span> <span>x{{item.num}} </span><span>￥{{item.totalPrice}} </span>
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
      cartList: {
        type: Array,
      },
    },
    data() {
      return {
        markTxt:'',
        discountMoney:'',
        PreCartList:[],
        realPay:'',
        needPay:0,
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
        dialogFormVisible:false,
        formLabelWidth: '50px',
      };
    },
    watch:{

    },
    methods: {
      selectCart(val){
        console.log(val);
      },
      prePay() {
        let _this = this
        this.prePayShow = !this.prePayShow
        let data= {
          restaurantId: parseInt(localStorage.getItem('rid')),
          orderType:'single',
          tableId: parseInt(localStorage.getItem('tid'))
        }
        this.$request(this.url.confirmOrder,'form',data).then((res)=>{
          this.PreCartList = res.data.data.cartList
          console.log('this.cartList',this.cartList);
          this.discountMoney = res.data.data.discountMoney
          this.needPay = res.data.data.needPay
          this.realPay = res.data.data.realPay
          _this._intScroll
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs['confirm-scroll'], {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }).catch((err)=>{
          console.log(err);
        })
      },
      _intScroll(){
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs['confirm-scroll'], {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      confirmPay(){

        var data = {
          restaurantId: parseInt(localStorage.getItem('rid')),
          orderType:'single',
          serverType:'real-time',
          tableId: parseInt(localStorage.getItem('tid'))
        }
        let clientType = localStorage.getItem('clientType');
        if(clientType && clientType == 'wechat'){
          data.payType = 'wechat-online';
          this.$request(this.url.payOrder, 'form', data).then((res) => {
            wx.config({
              //debug : true,
              appId: res.data.data.appId, // 必填，公众号的唯一标识
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
                    location.reload()
                    this.$emit('updateCart',true);
                    this.$router.push({path:'mall/order'})
                    // alert('支付成功')

                  }
                },
                cancel: function(res) {
                  this.$emit('updateCart',true);

                  location.reload();
                  this.$router.push({path:'mall/order'})
                }
              });
            });
            wx.error(function (res) {
              this.$emit('updateCart',true);
              this.$router.push({path:'mall/order'})
            });
          }).catch((err) => {
            this.$emit('updateCart',true);
            this.$router.push({path:'mall/order'})
          })
        } else {
          // alert('========支付宝')
          data.payType = 'alipay-online'
          // alert(data.payType);
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
            this.$emit('updateCart',true);
            this.$router.push({path:'mall/order'})
          }).then(_=>{
            location.reload();
          })
        }
        this.$emit('updateCart',true);
      },
      hidePrePayShow(){
        this.prePayShow = !this.prePayShow
      },
      incrementTotalAdd(g) {
        let _this = this
        let Data = [
          {
            feild: 'rid',
            value: parseInt(localStorage.getItem('rid')),
            joinType: 'eq'
          }
        ];
        this.$request(this.url.cart2,'json',Data).then((res)=>{
          let response = res.data.data
          for(var i = 0;i<response.length;i++){
            //通过循环，找到购物车id，然后将其加1
            if(response[i].id == g.food.id){
              let data = {
                id:g.food.id,
                delta:1
              }
              this.$request(this.url.cart5,'form',data).then((res)=>{
                this.$emit('updateCart',true);
              }).catch((err)=>{
                console.log('加入购物车失败',err);
              })
            }
          }
        }).catch((err)=>{
        })
      },
      incrementTotalDecre(g){
        let _this = this
        let Data = [
          {
            feild: 'rid',
            value: parseInt(localStorage.getItem('rid')),
            joinType: 'eq'
          }
        ];
        this.$request(this.url.cart2,'json',Data).then((res)=>{
          let response = res.data.data
          for(var i = 0;i<response.length;i++){
            if(response[i].id == g.food.id){
              let data = {
                delta:-1,
                id:g.food.id
              }
              this.$request(this.url.cart5,'form',data).then((res)=>{
                this.$emit('updateCart',true);
              }).catch((err)=>{
                console.log('加入购物车失败',err);
              })
            }
          }
        }).catch((err)=>{
        })
      },
      _pullCart(){
        let Data = [
          {
            feild: 'rid',
            value: parseInt(localStorage.getItem('rid')),
            joinType: 'eq'
          }
        ];
        this.$request(this.url.cart2,'json',Data).then((res)=>{
        }).catch((err)=>{
        })
      },
      serveCall() {
        alert("已为您呼叫服务")
      },
      drop(el) {
        //小球落下
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
        //小球落下之前
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
        //特色菜单
        this.book = !this.book
        let Goods = document.getElementById("goods");
        if(this.book){
          Goods.className = "goods-"
        }else if(!this.book){
          Goods.className = "goods"
        }

        // /restaurant/13f1ffe7-2715-4c4f-bdd0-e3474118f3bd
        // 中国题材
        let BgOfBook = document.getElementById('foods-wrapper')
        let BgOfBookUl = document.getElementById('foods-ul')
        BgOfBook.style.background = 'url(https://order-online.oss-cn-shenzhen.aliyuncs.com//restaurant/13f1ffe7-2715-4c4f-bdd0-e3474118f3bd)'
        BgOfBookUl.style.background = 'url(https://order-online.oss-cn-shenzhen.aliyuncs.com/restaurant/13f1ffe7-2715-4c4f-bdd0-e3474118f3bd)'
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
        let res = this.cartList
        var cartListTotalPrice = 0
        if(res === null){
          return 0
        }else {
          for(let i=0;i<res.length;i++){
            cartListTotalPrice += res[i].totalPrice
          }
        }
        return cartListTotalPrice
      },
      totalCount() {
        let res = this.cartList
        let totalCount = 0
        console.log(res);
        if(res === null){
          return
        }else {
          for(let i=0;i<res.length;i++){
            totalCount += res[i].num
          }
        }
        return totalCount
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
      bottom: 220px
      z-index: -1
      width: 95%
      height 120px
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
      .list-header2
        height: 200px
        line-height: 31px
        width : 100%
        padding: 0 2.5%
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)

      .list-content
        padding: 0 2.5%
        max-height: 200px
        bottom : 300px
        padding-bottom 50px
        width : 100%
        overflow hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child:after
            {content "台词："}
          .name
            line-height: 24px
            display inline-block
            font-size: 14px
            color: rgb(7, 17, 27)
            font-weight :100
            text-overflow: clip
            text-align left
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


.cartShowDetil
  position absolute
  bottom 2px
  color rgba(0, 0, 0, 0.45)
</style>
