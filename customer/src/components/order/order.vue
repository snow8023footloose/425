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
      <ratingselect :select-type="selectType" :only-content="onlyContent" :ratings="ratings"></ratingselect>
      <!--历史订单详情-->
      <div style="overflow: hidden" class="order-wrapper" ref="ratings">
        <ul>
          <li v-for="(rating,key) in ratings" :key="key" v-show="needShow(rating.rateType, rating.text)" class="order-item">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content" @click="showDetils">
              <h1 class="order-code">订单编号{{rating.username}}</h1><span class="outdate">订单已经完成</span>
              <div style="clear:both"></div>
              <div class="order-content" v-show="rating.recommend && rating.recommend.length">
                <!--<span class="icon-thumb_up"></span>-->
                <span class="item" v-for="(item,key) in rating.recommend" :key="key">{{item}}</span>
              </div>
              <p class="text">
                点击查看订单详情
              </p>
              <!--<span class="button">申请退单</span>-->
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!--订单详情框-->
      <transition name="fade" enter-active-class="bounceInUp" leave-active-class="bounceOutDown">
        <div v-show="detailShow" class="detail animated">
          <div class="detail-wrapper clearfix">
            <div class="scroll" ref="s-scroll">
              <div class="s-scroll">
                <h1 class="name">订单已完成 <i class="el-icon-loading"></i></h1>
                <p style="font-size: 12px;font-weight: lighter;margin-top: 10px" class="name">感谢您对新沃丰的信任，期待再次光临！</p>
                <div class="headertitle">
                  <div class="line"></div>
                  <div class="text">优惠信息</div>
                  <div class="line"></div>
                </div>
                <ul v-if="seller.supports" class="supports">
                  <li class="support-item">
                    <div class="text">订单号：13245646465465465</div>
                    <div class="text">支付方式：微信</div>
                    <div class="text">下单时间：{{new Date()}}</div>
                    <div class="text">联系商家：15773153167</div>
                  </li>
                </ul>
                <div class="headertitle">
                  <div class="line"></div>
                  <div class="text">菜品信息</div>
                  <div class="line"></div>
                </div>
                <div class="info">
                  <ul>
                    <li class="info-item" v-for="(info,key) in seller.infos" :key="key">{{info}}</li>
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
                <!--<div class="headertitle">-->
                  <!--<div class="line"></div>-->
                  <!--<div class="text">店家实景</div>-->
                  <!--<div class="line"></div>-->
                <!--</div>-->
                <!--<div class="pics">-->
                  <!--<span class="seemore">向右滑动查看更多 ></span>-->
                  <!--<div class="pic-wrapper" ref="pic-wrapper">-->
                    <!--<ul class="pic-list" ref="pic-list">-->
                      <!--<li class="pic-item" v-for="(pic,key) in seller.pics" :key="key">-->
                        <!--<img :src="pic" width="120" height="90">-->
                      <!--</li>-->
                    <!--</ul>-->
                  <!--</div>-->
                <!--</div>-->
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
        detailShow: false,
        selectType: ALL,
        onlyContent: true
      };
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs['ratings'], {
              click: true
            });
          });
        }
      });
      this._pullOder()
    },
    methods: {
      showDetils(event){
        if (!event._constructed) {
          return;
        }

        this.detailShow = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs['s-scroll'], {
              // scrollX: true,
              // eventPassthrough: 'vertical'
            });
          } else {
            this.scroll.refresh();
          }
        });

        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
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
      _pullOder(){
        var _this = this;
        var Data = [
          {
            feild: '',
            value: '',
            joinType: ''
          }
        ];
        this.$request(this.url.order2, 'json', Data).then((res)=>{
          console.log(res)
        })
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
    top: 124px
    padding-top 15px
    bottom: 0
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
            margin-bottom: 4px
            line-height: 12px
            font-size: 10px
            color: rgb(7, 17, 27)
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
            border-radius 3px
            border 1px solid rgb(0, 160, 220)
            color: rgb(0, 160, 220)
            float right
            font-size 15px
            padding 5px
            margin 0px 4px
          .outdate
            font-size 10px
            color: rgb(147, 153, 159)
          .order-content
            line-height: 16px
            margin 5px 0px
            font-size: 0
            display inline-block
            .icon-thumb_up, .item
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 9px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .item
              padding: 2px 8px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 1px
              color: rgb(147, 153, 159)
              background: #fff
          .time
            position: absolute
            top: 0
            right: 0
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)


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
    &:last-child
      border-none()
</style>
