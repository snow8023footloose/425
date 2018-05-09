<template>
  <div v-show="showFlag" class="food" transition="move" ref="food">
    <div class="food-content">
      <div class="image-header">
        <img :src="'https://order-online.oss-cn-shenzhen.aliyuncs.com' + food.highDefinitionImg" @click="hide">
        <div class="back" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail-">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="now">￥{{food.normalPrice}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrapper">
          <cartcontrol
            :confirmMessage="confirmMessage"
            :food="food"
            @incrementmi="incrementTotalDecre"
            @increment="incrementTotalAdd">
          </cartcontrol>
        </div>
        <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0" transition="fade" :style="{background:SColor}">加入购物车
        </div>
      </div>
      <split v-show="food.info"></split>
      <div class="info" v-show="food.info">
        <h1 class="title">商品信息</h1>
        <p class="text">{{food.info}}</p>
      </div>
      <split></split>
      <div class="rating">
        <h1 class="title">商品评价</h1>
        <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
        <div class="rating-wrapper">
          <ul v-show="food.ratings && food.ratings.length">
            <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,key) in food.ratings" :key="key"
                class="rating-item border-1px">
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img class="avatar" width="12" height="12" :src="rating.avatar">
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
              <p class="text">
                <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
              </p>
            </li>
          </ul>
          <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
        </div>
      </div>
      <split></split>
    </div>

    <el-dialog
      width="95%"
      title="规格"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      style="z-index: 9999"
    >
      <el-form v-for="(item,index) in specs" label-position="left">
        <el-form-item :label="item.name" :label-width="formLabelWidth">
          <el-radio-group size="mini" v-model="selectedSkuArr[index]">
            <el-radio-button v-for="(attrs,index) in item.attrs" :label="attrs.name"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-form label-position="left">
        <el-form-item label="标签" :label-width="formLabelWidth">
          <!--<input type="radio" name="user.sex" id="male" value="男" >-->
          <el-checkbox-group size="mini" v-model="selectedTags">
            <el-checkbox  v-for="(attrs,index) in getFoods.tags" :label="attrs.id" border></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSku">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable */
  import BScroll from 'better-scroll';
  import Vue from 'vue';
  import {formatDate} from '@/common/js/date';
  import cartcontrol from '@/components/cartcontrol/cartcontrol'
  import ratingselect from '@/components/ratingselect/ratingselect.vue';
  import split from '@/components/split/split';
  const ERR_OK = 0
  const ALL = 2;

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        },
        SColor: 'SColor',
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
    methods: {
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
          this.$nextTick(() => {
            this.$refs['shop-cart'].drop(g.event);
          });
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
      findSkuByAttrJoin(selectedJoinAttr){
        for(let item of this.getFoods.skus){
          if(item.attrJion === selectedJoinAttr){
            return item;
          }
        }

      },
      show() {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs['food'], {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.showFlag = false;
      },
      addFirst(event) {
        if (!event._constructed) {
          return;
        }
        if(this.food.specs){
          this.dialogFormVisible = !this.dialogFormVisible
          this.getFoods = this.food
          this.specs = this.food.specs
        }else{
          Vue.set(this.food, 'count', 1);
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
      },
      'cart.add'(target) {
        this._drop(target);
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      cartcontrol,
      ratingselect,
      split
    },
    created () {
      this.$axios.get('../api/seller').then((response) => {
        var response = response.data
        if (response.errno === ERR_OK) {
          this.seller = response.data
          this.SColor = this.seller.sysColor[1].plan
        }
      });
      // document.getElementById('order').className = "theme"
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/styles/mixin.styl"

  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff
    &.move-transition
      transition: all 0.2s linear
      transform: translate3d(0, 0, 0)
    &.move-enter, &.move-leave
      transform: translate3d(100%, 0, 0)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 10px
          font-size: 20px
          color: #fff

    .content
      position: relative
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail-
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        font-size: 0
        .sell-count, .rating
          font-size: 10px
          color: rgb(147, 153, 159)
        .sell-count
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240, 20, 20)
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)
      .cartcontrol-wrapper
        position: absolute
        right: 31px
        bottom: 12px
      .buy
        position: absolute
        right: 31px
        bottom: 19px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        border-radius: 12px
        font-size: 10px
        color: #fff
        background: rgb(0, 160, 220)
        &.fade-transition
          transition: all 0.2s
          opacity: 1
        &.fade-enter, &.fade-leave
          opacity: 0
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7, 17, 27)
      .text
        line-height: 24px
        padding: 0 8px
        font-size: 12px
        color: rgb(77, 85, 93)
    .rating
      padding-top: 18px
      .title
        line-height: 14px
        margin-left: 18px
        font-size: 14px
        color: rgb(7, 17, 27)
      .rating-wrapper
        padding: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          border-1px(rgba(7, 17, 27, 0.1))
          .user
            position: absolute
            right: 0
            top: 16px
            line-height: 12px
            font-size: 0
            .name
              display: inline-block
              margin-right: 6px
              vertical-align: top
              font-size: 10px
              color: rgb(147, 153, 159)
            .avatar
              border-radius: 50%
          .time
            margin-bottom: 6px
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
          .text
            line-height: 16px
            font-size: 12px
            color: rgb(7, 17, 27)
            .icon-thumb_up, .icon-thumb_down
              margin-right: 4px
              line-height: 16px
              font-size: 12px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(147, 153, 159)

        .no-rating
          padding: 16px 0
          font-size: 12px
          color: rgb(147, 153, 159)
</style>
