<template>
  <div class="goods" id="goods" ref="goods-top">
    <transition enter-active-class="bounceInUp" leave-active-class="bounceOutDown">
      <div class="menu-wrapper animated" ref="menu-wrapper" v-show="show">
        <ul>
          <li v-for="(item,index,key) in goods" :key="key" class="menu-item" :class="{'current':currentIndex === index}" @click.stop.prevent="selectMenu(index,$event)">
              <span class="text border-1px">
                <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
                {{item.name}}
              </span>
          </li>
        </ul>
      </div>
    </transition>
    <div @click="show=!show" class="menu-button">
      <i class="icon-keyboard_arrow_right button-icon"></i>
    </div>
    <div class="foods-wrapper" id="foods-wrapper" ref="foods-wrapper" @touchend="otouch">
      <ul class="foods-ul" id="foods-ul">
        <li v-for="(item,key) in goods" :key="key" class="food-list food-list-hook">
          <h1 class="goods-title">{{item.name}}</h1>
          <ul>
            <!--单个菜品信息遍历-->
            <li
              ref="food-li"
              @click.stop="selectFood(food,$event)"
              v-for="(food,key) in item.foods"
              :key="key"
              class="food-item border-1px"
            >
              <div class="icon">
                <img width="95px" height="95px" :src="'https://order-online.oss-cn-shenzhen.aliyuncs.com' + food.thumb">
              </div>
              <div class="goods-content" style="padding-left: 5px">
                <h2 class="goods-name">{{food.name}}<div class="tagShow" v-for="Tags in food.popularizeTags"><span>
                  {{Tags.name}}</span>
                  </div>
                </h2>
                <p class="desc">{{food.description}}</p>
                <!--<div class="extra">-->
                  <!--<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>-->
                <!--</div>-->
                <div class="price">
                  <span class="now"><span class="dollar">￥</span>{{food.normalPrice}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper" id="cartcontrol-wrapper">
                  <cartcontrol
                    :confirmMessage="confirmMessage"
                    :food="food"
                    @incrementmi="incrementTotalDecre"
                    @increment="incrementTotalAdd">
                  </cartcontrol>
                </div>
              </div>

            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart
      v-show="shopcartRefresh"
      ref="shop-cart"
      :select-foods="selectFoods"
      :cartList = 'cartList'
      @updateCart = 'updateCart'
    ></shopcart>
    <food :food="selectedFood" @foodAdd="updateCart" ref="food"></food>
    <el-dialog
      width="95%"
      title="规格"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      style="z-index: 9999"
    >
      <el-form size="mini" :label-width="formLabelWidth" v-for="(item,index) in specs" label-position="left">
        <el-form-item :label="item.name">
          <el-radio-group v-model="selectedSkuArr[index]">
            <el-radio-button v-for="(attrs,index) in item.attrs" :label="attrs.name"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-form size="mini" label-position="left">
        <el-form-item label="标签" label-width="50px">
          <el-checkbox-group v-model="selectedTags">
            <el-checkbox  v-for="(attrs,index) in getFoods.tags" :label="attrs.name" border></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <span style="float: left">价格：￥{{basePrice+tagsTotalPrice}}</span>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSku">确 定</el-button>
      </div>
    </el-dialog>

    <!--<el-dialog-->

    <!--:visible.sync="startOrderVisible"-->
    <!--:show-close="false"-->
    <!--:center="true"-->
    <!--width="80%">-->
    <!--<p style="text-align: center">欢迎光临</p>-->
    <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button type="success" plain @click="startOrder">成功按钮</el-button>-->
    <!--&lt;!&ndash;<el-button type="primary" @click="startOrder">确 定</el-button>&ndash;&gt;-->
    <!--</span>-->
    <!--</el-dialog>-->
  </div>
</template>
<script type="text/ecmascript-6">
/* eslint-disable */
  import BScroll from 'better-scroll'
  import shopcart from '@/components/shopcart/shopcart.vue'
  import cartcontrol from '@/components/cartcontrol/cartcontrol.vue'
  import food from '@/components/food/food.vue'

  const ERR_OK = 0

  import Vue from 'vue';
  var once = 0
  export default {
    props: {
      seller: {
        type: Object
      },
    },
    data() {
      return {
        startOrderVisible:false,
        shopcartRefresh:true,
        selectedSpec:'',
        sideTagsPrice:0,
        goods: [],
        listHeight: [],
        tid: 0,
        scrollY: 0,
        selectedFood: {},
        show: false,
        divTop: "divTop",
        dishesCategory:[],
        SColor: 'SColor',
        specs:[],
        addCart:[],
        scrollOnce:0,
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '50px',
        getFoods:{},
        cartList:[],
        confirmMessage: {
          is: 0
        },
        getData:{},
        selectedTags:[], //得到name
        selectedSkuArr : [],
        trueLabelofSpecs:[],
        trueLabelofTags:[],
        transformArryTag:[],
        tagsPrice:0,
        tagsTotalPrice:0,
        basePrice:0,
        oldTagArr : []
      };
    },
    watch: {
      addCart(val){
        console.log(this.cartList, val);
      },
      getFoods(){
        this.basePrice = this.getFoods.normalPrice
      },
      selectedSkuArr(val){
        if(val.length === 0){
          return
        }
        let  attrJoin = this.transformArrySku().join('_');
        let  selectedSkuObj = this.findSkuByAttrJoin(attrJoin);
        let  skusTotalPrice = 0
        if(!selectedSkuObj){
          return false
        }else{
          if(this.getFoods.skus){
            for(let i=0;i<this.getFoods.skus.length;i++) {
              if (selectedSkuObj.id === this.getFoods.skus[i].id) {
                console.log(this.getFoods.skus[i].normalPrice);
                skusTotalPrice += this.getFoods.skus[i].normalPrice
              }
            }
          }else {
            return false
          }
        }
        this.basePrice = skusTotalPrice
      },
      selectedTags(val) {
        let tagsTotalPrice = 0
        if(this.getFoods.tags){
          for(let i=0;i<this.getFoods.tags.length;i++){
            if(val.length > 0 ){
              for(let j=0;j<val.length;j++){
                if(val[j] === this.getFoods.tags[i].name){
                  // console.log('得到价格',this.getFoods.tags[i].price);
                  tagsTotalPrice += this.getFoods.tags[i].price
                }
              }
            }
          }
        }else {
          return
        }
        this.tagsTotalPrice = tagsTotalPrice
      }
    },
    created () {

      this.tid = parseInt(localStorage.getItem('tid'))
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this._pullTable();
      this.openFullScreen2()

      let _this = this
      this.$request(this.url.login2,'form',{
        thirdId:2088112484988593
      }).then((res)=>{

        let Data = [
          {
            feild: 'rid',
            value: parseInt(localStorage.getItem('rid')),
            joinType: 'eq'
          }
        ];
        _this.$request(_this.url.cart2,'json',Data).then((res)=>{

          _this.$router.push({
            path: '/mall/',
            query: {
              cartList: res.data.data,
              num:123456,
            }
          })
          _this.cartList = res.data.data

          // this.cartList = res.data.data
          console.log('555555555555555555555',res.data.data);
          console.log('this.cartList',res.data.data);
        }).catch((err)=>{

        })

        // alert('欢迎光临测试'+res.data.data.nickname);
      }).catch((err)=>{
        console.log(err);
        alert('登陆失败'+err);
      })
      // this.cartList = this.$route.query.cartList
      // console.log(this.$route.query.cartList);


    },
    mounted (){

    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i+1];
          // console.log(height1, height2, this.scrollY);
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            // console.log('外',i)
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        if(this.goods){
          this.goods.forEach((good) => {
            good.foods.forEach((food) => {
              if (food.count) {
                foods.push(food);
              }
            });
          });
        }
        return foods;
      }
    },
    methods: {
      updateCart(){
        console.log('刷新页面');
        this._pullCart()
        this.shopcartRefresh = false
        this.shopcartRefresh = true
      },
      openFullScreen2() {
        // const loading = this.$loading({
        //   lock: true,
        //   text: 'Loading',
        //   spinner: 'el-icon-loading',
        //   background: 'rgba(0, 0, 0, 0.7)'
        // });
        setTimeout(() => {
          if(this.scrollOnce === 0){
            this._initScroll()
            this._calculateHeight()
            this.scrollOnce= 1
          }
          // loading.close();
        }, 700);
      },
      startOrder(){
        if(this.scrollOnce === 0){
          this._initScroll()
          this._calculateHeight()
          this.scrollOnce= 1
        }
        console.log('hello');
        this.startOrderVisible =!this.startOrderVisible
      },
      transformArrySku(){
        let selectedSkuArr = []
        for(var i=0;0<this.selectedSkuArr.length;i++){
          if(this.selectedSkuArr.length === i){
            return selectedSkuArr
          }else {

            if(this.specs[i].attrs === undefined){
            } else{
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
        }
      },
      transformArryTags(){
        let selectedArryTags = []
        let data1 = [
          {
            feild:'status',
            value:'enable',
            joinType: 'eq'
          }
        ]
        let _this = this
        console.log('请求tags', data1);
        this.$request(this.url.restaurantTag2,'json',data1).then((res)=>{
          var response = res.data.data

          for(var i=0;0<this.selectedTags.length;i++) {
            if(this.selectedTags.length === i){
              // this.selectedTags.length === i的时候循环已经到尾了这个时候应该弹出
              //selectedArryTags.push(response[j].id) id
              // 但是这是个promise只有在这里面执行请求
              //是最直接的


              _this.restaurantTagRes = selectedArryTags
              // console.log('selectedArryTags111111111111111',selectedArryTags);
              let attrTags = selectedArryTags.join(',');
              let attrJoin = _this.transformArrySku().join('_');
              let selectedSkuObj = _this.findSkuByAttrJoin(attrJoin);
              // console.log('selectedSkuObj===================',selectedSkuObj);

              if(!selectedSkuObj){
                alert('规格没有选完')
                return false
              }
              //删掉相关联的规格都会引起id出现问题
              //删掉相关联的分类都会引起forEach出现问题
              console.log(_this.getFoods.rid);
              let data = {
                num: 1,
                sid: selectedSkuObj.id,
                did: _this.getFoods.id,
                rid: _this.getFoods.rid,
                tid: _this.tid,
                type: 'single',
                tagIds: attrTags
              }
              // console.log('加入标签，加入SKU',data);
              _this.$request(_this.url.cart1,'json',data).then((res)=>{
                if(res.data.msg === 'success'){
                  _this.ballDrop()
                  _this._pullCart()
                }
                console.log(res);
              }).catch((err)=>{
                console.log(err);
              })
              return
            }else{
              for (var j = 0; j < response.length; j++) {
                if(this.selectedTags[i] === response[j].name) {
                  selectedArryTags.push(response[j].id)
                  // console.log('response[j].id',response[j].id);
                }
              }
            }
          }
        }).catch((err)=>{
          console.log(err);
        })
      },
      ballDrop(){
        if (!this.getFoods.count) {
          Vue.set(this.getFoods, 'count', 1);
        } else {
          this.getFoods.count++;
        }
        this.dialogFormVisible = !this.dialogFormVisible
        this.$nextTick(() => {
          this.$refs['shop-cart'].drop(this.getData.event);
        });
      },


      confirmSku(){
        console.log('1');
        if(!this.transformArrySku()){
          this.$message({
            type: 'info',
            message: '亲，没有选择规格哦~'
          });
          return
        }

        if(this.selectedTags.length > 0){
          this.transformArryTags()
        }else {
          let attrJoin = this.transformArrySku().join('_');
          // this.transformArryTags()

          // console.log('transformArryTags',this.transformArryTags());
          // console.log(attrJoin,'SKU-Tags',attrTags);
          let selectedSkuObj = this.findSkuByAttrJoin(attrJoin);
          if(!selectedSkuObj){
            alert('规格没有选完')
            return false
          }
          let data = {
            num:1,
            sid: selectedSkuObj.id,
            did: this.getFoods.id,
            rid: this.getFoods.rid,
            tid: parseInt(localStorage.getItem('tid')),
            type: 'single',
          }
          this.$request(this.url.cart1,'json',data).then((res)=>{
            if(res.data.msg === 'success'){
              this.ballDrop()
              console.log('加入购物车成功',res.data.msg);
              return
            }else{
              console.log('数据提交成功但是数据错误',res);
            }
          }).catch((err)=>{
            console.log('加入购物车失败',err);
          })
        }
      },
      incrementTotalAdd(g) {
        console.log(g);
        this.getData.event = g.event
        this.sideTagsPrice = 0
        this.getData = g
        this.selectedSkuArr = []
        this.selectedTags = []
        this.getFoods = Object.assign({},g.food)
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
            tid: parseInt(localStorage.getItem('tid')),
            type: 'single',
          }
          console.log(data);
          this.$request(this.url.cart1,'json',data).then((res)=>{
            console.log('加入购物车成功',res);
            this._pullCart()
          }).catch((err)=>{
            console.log('加入购物车失败',err);
          })
        }
      },
      incrementTotalDecre(g){
        console.log(g.food);
        if(g.food.skus.length > 0){
          alert('规格菜品请到购物车删减')
          return false
        }
        if(g.specs){
          this.dialogFormVisible = !this.dialogFormVisible
          this.getFoods = g.food
          this.specs = g.food.specs
        }else{
          let data = {
            did: g.food.id,
            rid: g.food.rid,
            tid: parseInt(localStorage.getItem('tid')),
            type: 'single',
          }
          this.$request(this.url.cart5,'json',data).then((res)=>{
            this._pullCart()
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
      otouch() {
        this.show = false
      },
      selectMenu(index, event) {
        console.log('1')
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs['foods-wrapper'].getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      selectFood(food, event) {
        console.log(this.goods,'======================');
        if (!event._constructed) {
          return;
        }
        // if (document.getElementById("goods").offsetTop < 124) {
        //   return;
        // };
        console.log('得到选择food',food);
        this.selectedFood = food;
        if(once === 0){
          this.$message({
            type: 'info',
            message: '点击图片也可以关闭哦~',
            showClose:true
          });
          once++;
        }

        this.$refs['food'].show();
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs['menu-wrapper'], {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs['foods-wrapper'], {
          click: true,
          probeType: 3
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let foodList = this.$refs['foods-wrapper'].getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },

      // 拉取列表
      _pullTable(){
        var _this = this;
        var Data = [
          {
            feild: 'rid',
            value: parseInt(localStorage.getItem('rid')),
            // value: 1000000000,
            joinType: 'eq'
          }
        ];
        _this.$request(_this.url.dishesCategory2, 'json', Data).then((res)=>{
          _this.dishesCategory = res.data.data;
        }).catch((err)=>{
          // console.log(err)
        }).then(function () {
          _this.goods = _this.goodsArr(_this);
          // console.log('555555555', _this.goods);
        })

      },
      //  拉取规格
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
    },
    components:{
      shopcart,
      cartcontrol,
      food
    },
    mounted(){
      this.$request(this.url.dishes2,'json',[{
        feild: 'time',
        value:'',
        joinType: 'time'
      }]).then((res)=>{
        console.log(res);
      })
      this.startOrderVisible = !this.startOrderVisible
    },
    events: {
      'cart.add'(target) {
        this._drop(target);
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/styles/mixin.styl"
  @import "../../common/animate.css";
  @import "../../common/style.css";
  .goods
    display: flex
    background white
    position: absolute
    top: 124px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-button
      position relative
      width 20px
      height 20px
      background #f3f5f7
      border-radius 100%
      display none

    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      display block !important
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')/**/
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 14px

    .foods-wrapper
      flex: 1
      ul
        .food-list
          padding-top 20px
          background white
          .goods-title
            padding-left: 14px
            height: 26px
            line-height: 26px
            border-left: 2px solid #d9dde1
            font-size: 12px
            color: rgb(147, 153, 159)
            background: #f3f5f7
          .food-item
            display: flex
            margin: 5px
            padding-bottom: 6px
            border-1px(rgba(7, 17, 27, 0.1))
            &:last-child
              border-none()
              margin-bottom: 0
            .icon
              flex: 0 0 57px
              margin-right: 5px
              .goods-content
                flex: 1
                .goods-name
                  margin: 2px 0 8px 0
                  height: 14px
                  line-height: 14px
                  font-size: 14px
                  color: rgb(7, 17, 27)

  .desc, .extra
    line-height: 10px
    font-size: 10px
    color: rgb(147, 153, 159)
  .desc
    line-height: 12px
    margin: 3px 0px 8px
  .extra
    .count
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
    right: 0
    bottom: 12px
    background white
    border-radius 20px
    .cartcontrol
      padding-top 1px
      .cart-decrease,.cart-add,.cart-count
        padding 1px


  .goods-
    display: flex
    position: absolute
    background white
    top: 0px
    bottom: 46px
    z-index 30
    width: 100%
    overflow: hidden
    height: 100%
    .menu-button
      position fixed
      bottom 13%
      left 5%
      width 44px
      height 44px
      background rgba(0, 180, 60, 0.8)
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3)
      /*background #f3f5f7*/
      border-radius 100%
      z-index 30
      .button-icon
        font-size 45px
        text-align center
        vertical-align middle
        color white
    .menu-wrapper
      flex: 0 0 80px
      position: absolute
      bottom 30%
      width 90%
      left -47%
      margin-left 50%
      padding 8px
      background: rgba(0, 180, 60, 0.8)
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3)
      z-index 30
      overflow hidden
      border-radius 10px
      ul
        display flex
        flex-wrap wrap
        justify-content center
        .menu-item
          float left
          padding: 0 5px
          line-height: 14px
          margin 6px
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 2px
            background-size: 12px 12px
            background-repeat: no-repeat
          .text
            vertical-align: middle
            border-1px(rgba(7, 17, 27, 0.1))
            text-align center
            font-size: 16px
            color white
    .foods-wrapper
      flex: 1
      .foods-ul
        background-size 100%
        .food-list
          padding 10px 0px 10px
          margin-top 25px
          background rgba(255,255,255,0.75)
          border-radius 10px
          .goods-title
            left 0
            top 0
            text-align center
            height: 26px
            line-height: 26px
            width 35%
            margin 0px auto 15px
            font-weight bolder
            color: white
            font-size 16px
            border-radius 10px
            background: rgba(0,180,60,0.8)
            margin-bottom 0px
          .food-item
            display: flex
            margin: 10px 18px
            padding-bottom: 0px
            border-1px(rgba(7, 17, 27, 0))
            &:last-child
              border-none()
              margin-bottom: 0
            .icon
              flex: 0 0 57px
              margin-right: 10px
              display none
            .goods-content
              width 100%
              .goods-name
                margin: 2px 0 8px 0
                height: 14px
                line-height: 14px
                font-size: 20px
                display inline-block
              .desc
                display block
                margin-bottom 0px
                width 90%
              .extra
                display inline-block
              .price
                position absolute
                display inline-block
                top 0px
                left 75%
                font-size 25px !important
              &:first-child
                width 35% !important
            .tagShow
              position: static;
              display inline-block
              margin 0px 2px
              span
                border-radius 3px
                background: rgba(0, 180, 60, 0.5)
            &:first-child
              /*background #2b333b*/
              .goods-content
                width 50%
              .icon
                width 50%
                height 160px
                display block
                img
                  width 160px !important
                  height 160px !important
              .tagShow
                position: absolute
                width 35%
                top -2px
                left -1px
                span
                  font-size: 1px
                  background: rgba(0, 180, 60, 0.8)
                  color white
                  padding: 1px
                  display inline-block

              .price
                position relative
                display inline-block
                top 0px
                left 0px
                font-size 25px !important
        &:last-child
          margin-bottom 94px



  .desc, .extra
    line-height: 10px
    font-size: 10px
    color: rgb(147, 153, 159)
  .desc
    line-height: 12px
    margin: 3px 0px 8px
  .extra
    .count
      margin-right: 12px
    .now
      margin-right: 8px
      font-size: 20px
      color: rgb(240, 20, 20)
    .old
      text-decoration: line-through
      font-size: 10px
      color: rgb(147, 153, 159)

    .el-dialog__body
      padding 7px 20px !important


.tagShow
  position: absolute
  top -2px
  left -1px
  span
    font-size: 1px
    background: #00b43c
    color white
    padding: 1px
    display inline-block
</style>
