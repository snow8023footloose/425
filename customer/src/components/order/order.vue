<template>
  <div class="order">
    <!--<div class="order-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>-->
    <!--<ratingselect :select-type="selectType" :only-content="onlyContent" :ratings="ratings"></ratingselect>-->
    <!--历史订单详情-->
    <div style="overflow: hidden" class="order-wrapper" ref="ratings">
      <ul>
        <li v-for="(rating,key) in ratings" :key="key" class="order-item">
          <!--<div class="avatar">-->
          <!--<img width="28" height="28" :src="rating.avatar">-->
          <!--</div>-->
          <div class="content" @click="showDetils(rating)">
              <span class="outdate" v-if="rating.status === 'has-pay'" style="color: #00b43c">订单已经完成
              <i class="el-icon-success"></i>
              </span>
            <span class="outdate" v-if="rating.status === 'payed'" style="color: #00b43c">订单已经完成
              <i class="el-icon-success"></i>
              </span>
            <span class="outdate" v-if="rating.status === 'not-payed'" style="color: rgba(0,0,0,0.5)">订单未完成
              <i class="el-icon-error"></i>
              </span>
            <h1 class="order-code">订单编号{{rating.id}}</h1>



            <div style="clear:both"></div>
            <span class="order-dishes" v-for="(item,key) in rating.orderDishes" :key="key">
              <!--<span class="icon-thumb_up"></span>-->

              {{item.dishes.name}}
            </span>
            <!--<p class="text">-->
            <!--点击查看订单详情-->
            <!--</p>-->
            <!--<el-button class="button" type="primary" plain v-if="rating.status === 'not-payed'">立即支付</el-button>-->
            <!--<el-button class="button" style="color: #00b43c" type="text" plain v-if="rating.status === 'payed'">已完成支付</el-button>-->
            <div class="time">
              {{rating.createTime}}
            </div>
            <div style="color: red; float: right">
              <span style="color: black;font-size: 12px">合计：</span>
              <span class="dollar">￥</span>{{rating.realPay}}

              <span style="margin-left:10px;color: #ccc;font-size: 12px">点击查看详情</span></div>
          </div>
        </li>
      </ul>
    </div>
    <!--订单详情框-->
    <transition name="fade" enter-active-class="bounceInUp" leave-active-class="bounceOutDown">
      <div v-show="detailShow" class="detail animated">
        <div class="detail-wrapper clearfix">
          <div class="scroll" ref="order-scroll">
            <div class="s-scroll" style="background: rgba(128,128,128,0)">
              <h1 class="name" v-if="selectOrder.status === 'payed'"
                  style="color: #00e34c;font-size: 20px">订单已完成 <i class="el-icon-loading"></i></h1>
              <h1 class="name" v-if="selectOrder.status === 'not-payed'"
                  style="color: #ea3000;font-size: 20px">订单未完成<i class="el-icon-loading"></i></h1>
              <p style="font-size: 12px;font-weight: lighter;margin-top: 10px" class="name">感谢您对新沃丰的信任，期待您再次光临！</p>
              <div class="headertitle">
                <div class="line"></div>
                <div class="text">订单信息</div>
                <div class="line"></div>
              </div>
              <ul class="supports">
                <li class="support-item">
                  <div class="text">订单号：{{selectOrder.id}}</div>
                  <div class="text">应付金额：{{selectOrder.realPay}}</div>
                  <div class="text">实付金额：{{selectOrder.needPay}}</div>
                  <div class="text">优惠金额：{{selectOrder.discountMoney}}</div>
                  <div class="text">创建时间：{{selectOrder.createTime}}</div>
                  <div class="text" v-if="selectOrder.status === 'payed'">下单时间：{{selectOrder.payTime}}</div>
                </li>
              </ul>
              <div class="headertitle">
                <div class="line"></div>
                <div class="text">菜品信息</div>
                <div class="line"></div>
              </div>
              <div class="info">
                <ul>
                  <li class="info-item" v-for="order in selectOrder.orderDishes">
                    <span>{{order.dishes.name}}</span>
                    <span>
                        <i class="el-icon-close"></i>
                        {{order.num}}</span>
                    <span style="width: 20%;float: right">{{order.totalPrice}}<span style="font-size: 10">￥</span></span>
                  </li>
                </ul>
              </div>
              <div class="headertitle">
                <div class="line"></div>
                <div class="text">评价</div>
                <div class="line"></div>
              </div>
              <div class="bulletin">
                <div class="star-wrapper">
                  <star :size="48" :score="seller.score"></star>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
  </div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable */
  import BScroll from 'better-scroll';
  import {formatDate} from '@/common/js/date';
  import star from '@/components/star/star';
  import ratingselect from '@/components/ratingselect/ratingselect';
  import split from '@/components/split/split';

  const ALL = 2;
  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        selectOrder:{},
        detailShow: false,
        selectType: ALL,
        onlyContent: true
      };
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      // this.$http.get('/api/ratings').then((response) => {
      //   response = response.body;
      //   if (response.errno === ERR_OK) {
      //     this.ratings = response.data;
      //     console.log(this.ratings);
      //
      //   }
      // });

      this._pullOder()
    },
    methods: {
      _pullOder(){
        let data = [
          {
            feild:'status',
            value:'123',
            joinType:'ne'
          }
        ]
        this.$request(this.url.order2, 'json', data).then((res)=>{
          console.log(res)
          this.ratings = res.data.data;
          console.log(this.ratings);
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs['ratings'], {
              click: true
            });
          });
        }).catch((err)=>{
          console.log(err);
        })
      },
      showDetils(event){
        // if (!event._constructed) {
        //   return;
        // }
        this.selectOrder = event
        console.log(event);
        this.detailShow = true;
        this.scroll = new BScroll(this.$refs['order-scroll'], {
        });
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs['order-scroll'], {
            });
          } else {
            this.scroll.refresh();
          }
        });

        if (this.seller.pics) {
          // let picWidth = 120;
          // let margin = 6;
          // let width = (picWidth + margin) * this.seller.pics.length - margin;
          // this.$refs['pic-list'].style.width = width + 'px';
          // this.$nextTick(() => {
          //   if (!this.picScroll) {
          //     this.picScroll = new BScroll(this.$refs['pic-wrapper'], {
          //       scrollX: true,
          //       eventPassthrough: 'vertical'
          //     });
          //   } else {
          //     this.picScroll.refresh();
          //   }
          // });
        }
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },

      hideDetail() {
        this.detailShow = false;
      }
    },
    events: {
      'ratingtype.select'(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      'content.toggle'(onlyContent) {
        this.onlyContent = onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      star,
      split,
      ratingselect
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/style.css";
  @import "../../common/animate.css";
  @import "../../common/styles/mixin.styl";

  .order
    position: absolute
    top: 134px
    padding-top 15px
    bottom: 10px
    left: 0
    width: 100%
    overflow: hidden
    background white
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        padding: 6px 0
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)
        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          .title
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            margin: 0 12px
            vertical-align: top
          .score
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
        .delivery-wrapper
          font-size: 0
          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
          .delivery
            margin-left: 12px
            font-size: 12px
            color: rgb(147, 153, 159)
    .order-wrapper
      padding: 0 18px
      height 443px
      .order-item
        display: flex
        padding: 18px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .order-code
            margin: 4px 0px
            line-height: 12px
            font-size: 10px
            color: rgb(7, 17, 27)
          .order-dishes
            font-size 12px
            color rgba(0, 0, 0, 0.64)
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              display: inline-block
              margin-right: 6px
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
          .text
            margin-bottom: 8px
            line-height: 18px
            color: rgb(7, 17, 27)
            font-size: 12px
          .button
            float right
            font-size 15px
            padding 10px
            margin 10px 4px 0px
          .outdate
            font-size 16px
            color: rgb(147, 153, 159)
          .order-content
            line-height: 16px
            margin 5px 0px
            font-size: 0
          .time
            line-height: 12px
            font-size: 10px
            margin 5px 0px
            color: rgb(147, 153, 159)
            text-align right


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
    color white
    .detail-wrapper
      display flex
      width: 100%
      height: 589px
      margin-top: 30px

  .pics
    padding: 0px 20px 18px 18px
    .seemore
      font-size 8px
      float right
      margin 5px 30px
      opacity 0.5
    .pic-wrapper
      width: 82%
      overflow: hidden
      white-space: nowrap
      margin 0 auto
      .pic-list
        font-size: 0
        .pic-item
          display: inline-block
          margin-right: 6px
          width: 120px
          height: 90px
          &:last-child
            margin: 2px


  .name
    line-height: 16px
    text-align: center
    font-size: 16px
    font-weight: 700
  .star-wrapper
    margin-top: 18px
    padding: 2px 0
    text-align: center
  .headertitle
    display: flex
    width: 80%
    margin: 28px auto 24px auto
    .line
      flex: 1
      position: relative
      top: -6px
      border-bottom: 1px solid rgba(255, 255, 255, 0.2)
    .text
      padding: 0 12px
      font-weight: 700
      font-size: 14px

  .info
    width 80%
    margin 0 auto
    color: white
    .title
      padding-bottom: 12px
      line-height: 14px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size: 14px
    .info-item
      padding: 7px
      line-height: 16px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size: 12px
      display flex
      justify-content space-around
      span
        display inline-block
        width 30%
      &:last-child
        border-none()


  .scroll
    height 500px
    overflow hidden
    width 100%
    .s-scroll
      width 100% !important
      .supports
        .support-item
          div
            margin 10px 0px


  .detail-close
    position: fixed
    justify-content: center
    display: flex
    bottom: 0px
    width: 100%
    height: 62px
    clear: both
    background rgba(9, 29, 39, 0.3)
    font-size: 32px
    .icon-close
      padding-top: 15px


.supports
  width: 80%
  margin: 0 auto
  padding-bottom 12px
  .support-item
    padding: 0 12px
    margin-bottom: 12px
    font-size: 14px
    &:last-child
      margin-bottom: 0


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
</style>
