<template>
  <div class="tables">
    <!--table模块-->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="餐桌信息" name="first">
        <el-row :guter="0">
          <div class="table-container">
            <transition name="el-zoom-in-left"  v-for="(item,index) in listTable" :key="item.num">
              <div v-show="show2" class="transition-box"">
              <el-tooltip :content="item.description" placement="top">
                <div class="box-header" style="background: rgba(111,113,128,0.47)" v-if="item.status === 'disable'">
                  <span class="left" style="float: left;margin-left: 7px">桌号：{{item.num}}</span>
                  <span class="right" style="float: right;margin-right: 7px">人数：{{item.seatNum}}</span>
                </div>
                <div class="box-header" v-else-if="item.status === 'preClear'">
                  <span class="left" style="float: left;margin-left: 7px">桌号：{{item.num}}</span>
                  <span class="right" style="float: right;margin-right: 7px">人数：{{item.seatNum}}</span>
                </div>
                <div class="box-header" v-else-if="item.status === 'preOrder'">
                  <span class="left" style="float: left;margin-left: 7px">桌号：{{item.num}}</span>
                  <span class="right" style="float: right;margin-right: 7px">人数：{{item.seatNum}}</span>
                </div>
                <div class="box-header" v-else-if="item.status === 'enable'">
                  <span class="left" style="float: left;margin-left: 7px">桌号：{{item.num}}</span>
                  <span class="right" style="float: right;margin-right: 7px">人数：{{item.seatNum}}</span>
                </div>
                <div class="box-header" style="background: rgba(255,82,91,0.78)" v-else-if="item.status === 'prePay'">

                  <span class="left" style="float: left;margin-left: 7px">桌号：{{item.num}}</span>
                  <span class="right" style="float: right;margin-right: 7px">人数：{{item.seatNum}}</span>
                </div>
              </el-tooltip>
                  <!--总：{{item.recommend.length}}项-->
                <div class="box-content"  @click="selectTable(item,index)">
                  <p style="font-size: 20px;color: rgba(255,82,91,0.51);font-weight: bolder;text-align: center"
                     v-if="item.status === 'preClear'">未清台</p>
                  <p style="font-size: 20px;color: #409eff;font-weight: bolder;text-align: center"
                     v-if="item.status === 'preOrder'">未下单</p>
                  <p style="
                  font-size: 30px;
                  color: rgba(0,0,0,0.15);
                  font-weight: bolder;
                  left: 13%;
                  position: absolute;
                  bottom: 17px;
                  z-index: 100;
                  text-align: center"
                     >{{item.name}}</p>
                </div>
              </div>
            </transition>
          </div>
        </el-row>
      </el-tab-pane>
      <!--<el-tab-pane label="餐桌特性" name="second">
        <div class="categoryGroup">
          <h6>请不要建立同名分类</h6>
          <span style="width: 20%;">分类：</span>
          <span style="width: 80%;">
            <el-tag
              :key="tag.zindex"
              v-for="(tag,index) in dynamicTags1"
              closable
              :disable-transitions="false"
              @close="handleClose1(tag,index)"
            >
              {{tag.name}}
              <el-button
                type="primary"
                style="padding: 5px"
                size="mini"
                icon="el-icon-edit"
                circle
                @click.native="editCategory(tag,index)"
              ></el-button>
            </el-tag>

            <el-input
              class="input-new-tag"
              v-if="inputVisible1"
              v-model="inputValue1"
              ref="saveTagInput1"
              @keyup.enter.native="handleInputConfirm1"
              @blur="handleInputConfirm1"
            >
            </el-input>
            <el-button v-else class="button-new-tag" @click="showInput1">+ 新分类</el-button>
            </span>
        </div>
      </el-tab-pane>-->
      <!--<el-tab-pane label="餐桌记录" name="third">
        <div style="margin-top: 15px; display: flex;justify-content: space-between">
          <el-select v-model="tableSearchSelect1" slot="prepend" placeholder="请选择桌号/订单号">
            <el-option label="桌号" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
          </el-select>
          <el-time-picker
            v-model="valueSearchSelect"
            :picker-options="{
              selectableRange: '18:30:00 - 20:30:00'
            }"
            placeholder="今日任意时间点">
          </el-time-picker>
          <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-tab-pane>-->
    </el-tabs>
    <!--table遮罩-->
    <div class="mask-black" v-if="tableShow === 1"></div>
    <!--table操作按钮-->
    <div class="tableButtonGroup" v-if="tableShow === 1" v-show="true">
      <el-button type="danger" @click="handleDelete" icon="el-icon-delete" circle></el-button>
      <el-button @click="stopTableService" type="warning" icon="el-icon-time" circle></el-button>
      <el-button @click="handleEdit" icon="el-icon-edit" circle></el-button>
      <el-button @click="refreshTable" v-loading.fullscreen.lock="fullscreenLoading" icon="el-icon-refresh" circle></el-button>
      <el-button @click="closeTable" class="closeTable" icon="el-icon-close" circle></el-button>
    </div>
    <!--table订单按钮：个人订单详请-->
    <div class="tableButtonGroup1" v-if="tableShow === 1" v-show="true">
      <span class="singleContainer">
        <el-radio-group v-model="selectSingleOrder">
          <span v-for="(item,index,key) in orderCollection" :key="key">
            <el-popover
              placement="bottom"
              title="个人账单详情"
              width="300"
              trigger="hover"
              class="popover"
              :visible-arrow= "true"
              :popper-class="popperClass"
            >
              <div style="text-align: right; margin: 0">
                <div class="shopcart-list">
                  <div class="list-header" @click.stop="toggleList">
                    <!--<p class="title">购物车</p>-->
                    <span class="empty" @click="empty">清空</span>
                  </div>
                  <div class="list-content" ref="list-content">
                    <ul style="padding: 0px">
                      <li
                        style="display: flex;align-items:center; justify-content: space-around"
                        class="food"
                        v-for="(food,key) in item.dishes"
                        :key="key">
                        <h4 style="text-align: left;font-weight: lighter; width: 100px" class="name">{{food.dishes.name}}</h4>

                        x{{food.num}}
                        <div class="price">
                          <span>￥{{food.totalPrice}}</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <span class="price" style="font-size: 20px;font-weight: bolder;margin-right: 85px">总计 ￥{{item.needPay.toFixed(2)}}</span>
                <!--<el-button size="mini" type="text" @click="minusCustomer">删除</el-button>-->
                <el-button type="success" @click="singleAccounts">结账</el-button>
              </div>
              <el-radio-button slot="reference" icon="el-icon-document" @click.native.stop="selectOrder(item,$event)" :label="index">订单{{index+1}}</el-radio-button>
              <!--<el-button class="singleButton" slot="reference" @click="selectCustomer(item,$event)" type="primary" size="small" icon="el-icon-document" round>订单{{item}}</el-button>-->
            </el-popover>
            <el-badge :value="selectFoods.count" class="item">
            </el-badge>
          </span>
        </el-radio-group>
      </span>
      <el-button
        id="splusOrder"
        @click="plusOrder"
        type="success"
        icon="el-icon-plus"
        round
      >下单</el-button>
    </div>
    <!--table弹框：整个餐桌详细信息，餐桌点餐，餐桌订单详情-->
    <transition>
        <div class="goodse" id="goods" ref="goods-top" v-if="tableShow === 1">
        <el-popover
          placement="top"
          title="餐桌详情"
          width="200"
          trigger="hover"
        >
          <div v-model="toAccountBox" ></div>
          <!--<p v-for="(item,index) in toAccountBox.recommend">{{index+1}}.{{item}}</p>-->
          <!--<div style="text-align: right; margin: 0">-->
            <!--<el-button type="success" size="mini" @click="singleAccounts">结账</el-button>-->
          <!--</div>-->
          <div slot="reference" class="tableNumber">{{tableTitle}}</div>
        </el-popover>
        <!--分类-->
        <transition enter-active-class="bounceInUp" leave-active-class="bounceOutDown">
          <div class="menu-wrapper animated" ref="menu-wrapper" v-show="show">
            <ul class="menu-ul">
              <li
                v-for="(item,index,key) in goods"
                :key="key"
                class="menu-item"
                :class="{'current':currentIndex===index}"
                @click="selectMenu(index,$event)">
                <span class="text border-1px">
                  <!-- <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span> -->
                  {{item.name }}
                </span>
              </li>
            </ul>
          </div>
        </transition>
        <div @click="show=!show" class="menu-button">
        </div>
        <!--菜品展示-->
        <div class="foods-wrapper" id="foods-wrapper" ref="foods-wrapper">
          <ul class="foods-ul">
            <li v-for="(item,key) in goods" :key="key" class="food-list food-list-hook">
              <h1 class="goods-title">{{item.name}}</h1>
              <ul class="goodsUl">
                <li ref="food-li" v-for="(food,key) in item.foods" :key="key" class="food-item border-1px">
                  <div class="icon">
                      <img width="70px" height="70px" class="previewImg" :src="'https://order-online.oss-cn-shenzhen.aliyuncs.com' + food.thumb" alt="点击查看原图">
                  </div>
                  <div class="goods-content">
                    <h3 class="goods-name">{{food.name}}</h3>
                    <p class="desc">{{food.description}}</p>
                    <div class="extra">
                      <span class="count">月售{{food.stock}}份</span><span>好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                      <span class="now">￥{{food.normalPrice}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
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
        <!--加入购物车-->
        <shopcart ref="shop-cart" :select-foods="selectFoods" :goods1="goods"></shopcart>
      </div>
      </transition>
    <!--丢弃弹框-->
    <el-dialog :title="tableTitle" :model="tableForm" :visible.sync="dialogFormVisibleTable" width="70%">
      <!--此处省略搜索输入框-->
      <!-- <el-select v-model="value" placeholder="请选择类别，默认全部">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select
        v-model="value9"
        multiple
        filterable
        remote
        label="搜索"
        reserve-keyword
        placeholder="可输入首字母搜索"
        :remote-method="remoteMethod"
        :loading="loading">
        <el-option
          v-for="item in options4"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-form :model="tableForm">
        <el-form-item label="已点" :label-width="formLabelWidth">
          <div>
          <span v-for="item in tableForm.type" v-model="tableForm.type">
            <el-checkbox :label="item" name="type"></el-checkbox>
          </span>
          </div>
        </el-form-item>
      </el-form>
      <el-form :model="tableForm">
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="tableForm.content" auto-complete="off" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form> -->
      <div slot="footer" class="dialog-footer">
        <el-button size="large" type="danger" icon="el-icon-delete" @click="dialogFormVisibleTable = false">删除</el-button>
        <el-button @click="dialogFormVisibleTable = false">暂停</el-button>
        <el-button @click="dialogFormVisibleTable = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleTable = false">立即开启</el-button>
      </div>
    </el-dialog>

    <!--订单确认-->
    <el-dialog
      lock-scroll
      fullscreen
      close-on-press-escape
      append-to-body
      title="订单确认" :visible.sync="dialogConfirmOrder">
      <div class="shopcart-list animated" v-show="dialogConfirmOrder">
        <!--<div class="list-header" @click.stop="toggleList">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>-->
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入备注"
          v-model="textarea">
        </el-input>

        <div class="list-content" ref="list-content">
          <ul>
            <li class="orderList info-item" v-for="item in cartList">
              <span> {{item.dishes.name}} </span> <span>x{{item.num}} </span><span style="text-align: right">￥{{item.totalPrice}} </span>
            </li>
          </ul>
        </div>
        <div class="list-header" @click.stop="toggleList" style="display: flex;justify-content: flex-end;padding: 0px 6px;margin-bottom: 20px">
          <span class="empty" @click="empty">清空</span>
        </div>
        <div>
          <div class="price" style="font-size: 20px;text-align: center">优惠 ￥{{discountMoney}}</div>
          <div class="price" style="font-size: 20px;text-align: center">需付 ￥{{needPay}}</div>
          <div class="price" style="font-size: 20px;font-weight: bolder;text-align: center">总计 ￥{{realPay}}</div>
          <el-button-group>
            <el-button style="position: fixed;bottom: 30px;left: 50%;width: 30%;margin-left: -15%" type="success" round @click="confirmOrder">确认下单</el-button>
          </el-button-group>
        </div>
      </div>
      <!--<el-table :data="selectFoods">-->
      <!--<el-table-column property="name" label="菜品" width="150"></el-table-column>-->
      <!--<el-table-column property="normalPrice" label="价格" width="200"></el-table-column>-->
      <!--<el-table-column property="address" label="地址"></el-table-column>-->
      <!--</el-table>-->
    </el-dialog>

    <!--添加餐桌弹框-->
    <el-dialog title="增加餐桌" :visible.sync="dialogFormVisibleTablePlus">
      <el-form :model="tableForm" :label-width="formLabelWidth">
        <el-form-item label="名称" >
          <el-input
            autofocus="true"
            v-model="tableForm.name"
            auto-complete="off"
            @keyup="onkeyup(e)"
            placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="桌号">
          <el-input
            v-model.number="tableForm.num"
            auto-complete="off"
            placeholder="请输入桌号"></el-input>
        </el-form-item>
        <el-form-item label="容纳人数">
          <el-input
            v-model.number="tableForm.seatNum"
            auto-complete="off" placeholder="请输入容纳人数"></el-input>
        </el-form-item>
        <el-form-item label="餐桌类型" style="text-align: left">
          <el-select
            style="display: inline-block"
            v-model="tableForm.tid"
            @change="tableTypeChange"
            placeholder="请选择餐桌类型">
            <el-option
              v-for="(item,index) in tableType"
              :key="item.index"
              :label="item.typeName"
              :value="item.typeIndex"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="收费类型" style="text-align: left">
          <el-select
            style="display: inline-block"
            v-model="tableForm.chargeType"
            @change="tableTypeChange"
            placeholder="请选择收费类型">
            <el-option
              v-for="(item,index) in chargeType"
              :key="index"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="tableForm.chargeType === 'charge'" label="价格">
          <el-input v-model.number="tableForm.money" auto-complete="off" placeholder="请输入价格"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model.number="tableForm.description" auto-complete="off" placeholder="请输入描述"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="large" @click="plusTable1" icon="el-icon-time">暂停</el-button>
        <el-button @click="dialogFormVisibleTablePlus = false; tableForm = {}">取 消</el-button>
        <el-button type="primary" @click="plusTable">立即开启</el-button>
      </div>
    </el-dialog>

    <!--修改餐桌弹框-->
    <el-dialog title="修改餐桌" :visible.sync="dialogFormVisibleTableChange">
      <el-form :model="toAccountBox" :label-width="formLabelWidth">
        <el-form-item label="名称" >
          <el-input
            autofocus="true"
            v-model="toAccountBox.name" auto-complete="off" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="桌号">
          <el-input v-model.number="toAccountBox.num" auto-complete="off" placeholder="请输入桌号"></el-input>
        </el-form-item>
        <el-form-item label="容纳人数">
          <el-input v-model.number="toAccountBox.seatNum" auto-complete="off" placeholder="请输入容纳人数"></el-input>
        </el-form-item>
        <el-form-item label="餐桌类型" style="text-align: left">
          <el-select
            style="display: inline-block"
            v-model="toAccountBox.tid"
            @change="tableTypeChange"
            placeholder="请选择餐桌类型">
            <el-option
              v-for="item in tableType"
              :key="item.typeIndex"
              :label="item.typeName"
              :value="item.typeIndex"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收费类型" style="text-align: left">
          <el-select
            style="display: inline-block"
            v-model="toAccountBox.chargeType"
            placeholder="请选择收费类型">
            <el-option
              v-for="(item,index) in chargeType"
              :key="index"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="toAccountBox.chargeType === 'charge'" label="价格">
          <el-input v-model.number="toAccountBox.money" auto-complete="off" placeholder="请输入价格"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model.number="toAccountBox.description" auto-complete="off" placeholder="请输入描述"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="large" @click="changeTable1" icon="el-icon-time">暂停</el-button>
        <el-button @click="dialogFormVisibleTableChange = false; tableForm = {}">取 消</el-button>
        <el-button type="primary" @click="changeTable">修改&开启</el-button>
      </div>
    </el-dialog>

    <!--添加组件-->
    <editcontrol @plusMethods="plusMethodsThis"></editcontrol>

    <el-dialog
      width="70%"
      title="选择规格"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      style="z-index: 9999"
    >
      <el-form v-for="(item,index) in specs" label-position="left" :label-width="formLabelWidth1">
        <el-form-item :label="item.name">
          <el-radio-group v-model="selectedSkuArr[index]">
            <el-radio-button v-for="(attrs,index) in item.attrs" :label="attrs.name"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-form label-position="left" label-width="50px">
        <el-form-item label="标签">
          <!--<input type="radio" name="user.sex" id="male" value="男" >-->
          <el-checkbox-group v-model="selectedTags">
            <el-checkbox  v-for="(attrs,index) in getFoods.tags" :label="attrs.name" border></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <span style="float: left">价格：￥ {{getFoods.normalPrice}}</span>

        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSku">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Vue from 'vue';
import shopcart from '@/components/tables/shopcart.vue'
import cartcontrol from '@/components/tables/cartcontrol.vue'
import editcontrol from '@/components/editcontrol/editcontrol';
const ERR_OK = 0
export default {
  name: 'tables',
  data: () => ({
    cartList:[],
    discountMoney:'',
    needPay:'',
    realPay:'',
    tableShow:0,
    confirmMessage: {
      is: 0
    },
    specs:[],
    getFoods:{},
    selectedSpec:'',
    screenWidth: document.body.clientWidth,
    getData:{},
    selectedTags:[],
    selectedSkuArr : [],
    trueLabelofSpecs:[],
    trueLabelofTags:[],
    transformArryTag:[],
    popperClass:'popperClass',
    show3: false,
    inputCustomer:'',
    input5: '',
    dishesCategory:'',
    fullscreenLoading: false,
    tableSearchSelect1: '',
    tableSearchSelect2: '',
    valueSearchSelect: new Date(2016, 9, 10, 18, 40),
    goods: [],
    listHeight: [],
    scrollY: 0,
    selectedFood: {},
    show: false,
    divTop: "divTop",
    SColor: 'SColor',
    show2: false,
    activeName: 'first',
    textarea:'',
    dialogConfirmOrder:false,
    dialogFormVisible:false,
    dialogFormVisibleTable: false,
    dialogFormVisibleTablePlus: false,
    dialogFormVisibleTableChange: false,
    listTable:[],
    goodsTable:[],
    value5:[],
    tableData:[],
    tableType:[
      {
        typeName: '大厅',
        typeIndex: 36,
      },
      {
        typeName: '包厢',
        typeIndex: 35,
      },
      {
        typeName: '卡座',
        typeIndex: 34,
      },
    ],
    tid:0,
    tableOrderConfirm:[],
    currentDate: new Date(),
    formLabelWidth:'80px',
    formLabelWidth1:'50px',
    tableTitle:"",
    toCustomer:'',
    visible2: false,
    toAccountBox: [],
    tableVisible:false,
    classes:[],
    food1:[],
    orderCollection:[
    ],
    tableForm: {},
    chargeType:[
      {
        name:'免费',
        value:'free'
      },
      {
        name:'收费',
        value:'charge'
      }
    ],
    value6:'',
    options4: [],

    restaurantTagRes:[],
    selectSingleOrder: 0,
    singleOrder:[],
    scrollOnce:0,
    value9: [],
    list: [],
    loading: false,
    states: ["Alabama", "Alaska", "Arizona",
      "Arkansas", "California", "Colorado",
      "Connecticut", "Delaware", "Florida",
      "Georgia", "Hawaii", "Idaho", "Illinois",
      "Indiana", "Iowa", "Kansas", "Kentucky",
      "Louisiana", "Maine", "Maryland",
      "Massachusetts", "Michigan", "Minnesota",
      "Mississippi", "Missouri", "Montana",
      "Nebraska", "Nevada", "New Hampshire",
      "New Jersey", "New Mexico", "New York",
      "North Carolina", "North Dakota", "Ohio",
      "Oklahoma", "Oregon", "Pennsylvania",
      "Rhode Island", "South Carolina",
      "South Dakota", "Tennessee", "Texas",
      "Utah", "Vermont", "Virginia",
      "Washington", "West Virginia", "Wisconsin",
      "Wyoming"],
    options: [],
    value: '',
    foodss:[],
    tagsPrice:0,
    oldTagArr : []
  }),

  computed: {
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
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    },
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach((food) => {
        total += food.normalPrice * food.count;
      });
      return total;
    },
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
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
        this.singleOrder = foods
      }
      return foods;
    }
  },
  watch:{
    selectedSkuArr(val){
      console.log(val);
    },
    selectedTags(val) {
      console.log('123213213', val);
      // console.log('this.getFoods.tags',this.getFoods,val);
      if (val.length > 0) {
        if (this.getFoods.tags) {
          if(this.oldTagArr.length == 0){
            for(let newTag of val){
              for(let originTag of this.getFoods.tags){
                if(newTag == originTag.name && originTag.chargeType == 'charge'){
                  this.getFoods.normalPrice += originTag.price;
                  this.oldTagArr = Object.assign({},val);
                  break;
                }
              }
            }
          } else {
            if (val.length > this.oldTagArr.length) {
              for (let newTag of val) {
                for (let oldTag of this.oldTagArr) {
                  if (newTag != oldTag) {
                    for (let orininTag of this.getFoods.tags) {
                      if (orininTag.name == newTag && orininTag.chargeType == 'charge') {
                        this.getFoods.normalPrice += orininTag.price;
                        break;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        if (this.oldTagArr.length > 0) {
          for (let oldTag of this.oldTagArr) {
            for (let originTag of this.getFoods.tags) {
              if (oldTag == originTag.name && originTag.chargeType == 'charge') {
                this.getFoods.normalPrice -= originTag.price;
              }
            }
          }
        }
      }
      console.log('=====最新价格',this.getFoods.normalPrice);
    }
  },
  methods: {
    toggleList() {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    },
    pay(){
      if (this.totalPrice < this.minPrice) {
        return;
      }
      let data= {
        restaurantId: localStorage.getItem('rid'),
        orderType:'multi',
        tableId: this.tid
      }

      this.$request(this.url.confirmOrder,'form',data).then((res)=>{
        console.log('confirmOrder',res);
      }).catch((err)=>{
        console.log(err);
      })

      window.alert(`支付${this.totalPrice}元`);
    },
    transformArrySku(){
      let selectedSkuArr = []
      // console.log(this.selectedSkuArr);
      for(var i=0;0<this.selectedSkuArr.length;i++){
        // console.log(i);
        if(this.selectedSkuArr.length === i){
          // console.log(selectedSkuArr);
          return selectedSkuArr
        }else {
          // console.log(this.specs);
          // console.log(this.specs[i].attrs);
          if(this.specs[i].attrs === undefined){
          }else{
            for(var j=0;j<this.specs[i].attrs.length;j++){
              // console.log(this.specs[i].attrs);
              if(this.selectedSkuArr.length === i){
                continue
              }else if(this.selectedSkuArr[i] === this.specs[i].attrs[j].name){
                selectedSkuArr.push(this.specs[i].attrs[j].id)
              }
            }
          };
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
      let _this = this
      this.$request(this.url.restaurantTag2,'json',data).then((res)=>{
        var response = res.data.data
        for(var i=0;0<this.selectedTags.length;i++) {
          if(this.selectedTags.length === i){
            _this.restaurantTagRes = selectedArryTags
            console.log('selectedArryTags111111111111111',selectedArryTags);
            let attrTags = selectedArryTags.join(',');
            let attrJoin = _this.transformArrySku().join('_');
            console.log('attrJoin', attrJoin);
            let selectedSkuObj = _this.findSkuByAttrJoin(attrJoin);
            console.log('确定_this.getFoods',_this.getFoods);
            console.log('selectedSkuObj===================',selectedSkuObj);

            let data = {
              num:1,
              sid: selectedSkuObj.id,
              did: _this.getFoods.id,
              rid: _this.getFoods.rid,
              tid: _this.tid,
              type: 'multi',
              tagIds: attrTags
            }
            _this.$request(_this.url.cart1,'json',data).then((res)=>{
              if(res.data.msg === 'success'){
                _this.ballDrop()
              }
            }).catch((err)=>{
              console.log(err);
            })
            return
          }else{
            for (var j = 0; j < response.length; j++) {
              if(this.selectedTags[i] === response[j].name) {
                selectedArryTags.push(response[j].id)
                console.log('response[j].id',response[j].id);
              }
            }
          }
        }
      }).catch((err)=>{
        console.log(err);
      })
    },
    confirmSku(){
      if(!this.transformArrySku()){
        this.$message({
          type: 'info',
          message: '亲，没有选择规格哦~'
        });
        return
      }
      if(this.selectedTags.length > 0){
        this.transformArryTags()
      }else{
        let  attrJoin = this.transformArrySku().join('_');
        let  selectedSkuObj = this.findSkuByAttrJoin(attrJoin);
        console.log('12121212121212',selectedSkuObj);
        if(!selectedSkuObj){
          alert('规格没有选完')
          return false
        }
        let data = {
          num:1,
          sid: selectedSkuObj.id,
          did: this.getFoods.id,
          rid: this.getFoods.rid,
          tid: this.tid,
          type: 'multi',
        }
        console.log('提交购物车数据，包含sid',data);
        this.$request(this.url.cart1,'json',data).then((res)=>{
          if(res.data.msg === 'success'){
            this.ballDrop()
          }else{
            console.log('加入购物车成功',res.data.msg);
          }

        }).catch((err)=>{
          console.log('加入购物车失败',err);
        })
      }
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
    incrementTotalAdd(g) {
      // console.log('餐桌',this.tableForm);
      this.getData = g
      this.selectedSkuArr = []
      this.selectedTags = []
      // console.log(g.event,g.food,'456546456456')
      //体验优化,异步执行下落动画
      this.getFoods = Object.assign({},g.food)
      console.log(this.getFoods);
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
          tid: this.tid,
          type: 'multi',
        }
        this.$request(this.url.cart1,'json',data).then((res)=>{
          console.log('加入购物车成功',res);
        }).catch((err)=>{
          console.log('加入购物车失败',err);
        })
      }
    },
    incrementTotalDecre(g){
      if(g.specs){
        this.dialogFormVisible = !this.dialogFormVisible
        this.getFoods = g.food
        this.specs = g.food.specs
      }else{
        let data = {
          num: -1,
          did: g.food.id,
          rid: g.food.rid,
          tid: this.tid,
          type: 'multi',
        }
        this.$request(this.url.cart1,'json',data).then((res)=>{
          console.log(res);
        }).catch((err)=>{
          console.log(err);
        })
      }
    },
    findSkuByAttrJoin(selectedJoinAttr){
      // console.log('findSkuByAttrJoin', selectedJoinAttr);
      // console.log('this.getFoods.skus', this.getFoods.skus);
      for(let item of this.getFoods.skus){
        if(item.attrJion === selectedJoinAttr){
          console.log('item',item);
          return item;
        }
      }

    },

    selectFoodss(){
      let foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      this.foodss = foods
    },
    empty() {
      this.selectFoods.forEach((food) => {
        food.count = 0;
      });
    },
    payConfirm() {
      if (this.totalPrice < this.minPrice) {
        return;
      }
      this.fold = false;
      console.log(this.selectFoods);
      this.dialogTableVisible = !this.dialogTableVisible
    },
    toggleList() {
      if (!this.totalCount) {
        return;
      }
    },
    plusOrder(){
      console.log(this.selectFoods);
      // if(){
      //   this.$message({
      //     type: 'info',
      //     message: '未选中菜品!'
      //   });
      // }
      let i = this.orderCollection.length
      // console.log(this.selectFoods,'获得选择li');
      this.dialogConfirmOrder = !this.dialogConfirmOrder
      let data= {
        // restaurantId: localStorage.getItem('rid'),
        restaurantId: localStorage.getItem('rid'),
        orderType:'multi',
        // tableId: localStorage.getItem('tid')
        tableId: this.tid
      }
      this.$request(this.url.confirmOrder,'form',data).then((res)=>{
        this.cartList = res.data.data.cartList
        console.log('this.cartList',this.cartList);
        this.discountMoney = res.data.data.discountMoney.toFixed(2)
        this.needPay = res.data.data.needPay.toFixed(2)
        this.realPay = res.data.data.realPay.toFixed(2)
        console.log('confirmOrder',res);
        // alert(this.needPay)
        // this.$nextTick(() => {
        //   if (!this.scroll) {
        //     this.scroll = new BScroll(this.$refs['s-scroll'], {
        //       click: true
        //     });
        //   } else {
        //     this.scroll.refresh();
        //   }
        // });
        // window.alert(`支付${this.totalPrice}元`);
      }).catch((err)=>{
        console.log(err);
      })

      // this.selectFoods.forEach((food) => {
      //   food.count = 0;
      // });
      console.log('this.orderCollection',this.orderCollection);
      console.log('this.orderCollection',this.selectFoods);
    },

    selectOrder(item,event){
      console.log(item);
    },
    refreshTable(){
      console.log(this.selectFoods);
      console.log(this.goods);
      console.log(this.singleOrder,'已经得到所选菜品');

      this._pullTable()
    },
    handleDelete(tag) {
      this.$confirm('即将删除该餐桌, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          id:this.toAccountBox.id
        }
        this.$request(this.url.table3,'form',data).then((res)=>{
          this.$message({
            type: 'success',
            message: '数据提交成功!'
          });
          // this.dishesDataTable.push(data);
          // this.show3 = false
          this._pullTable()
          this.tableShow = 0
        }).catch((err)=>{
          this.$message({
            type: 'info',
            message: '数据提交失败!'
          });
          console.log(err);
        })

        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    selectMenu(index, event) {

      let foodList = this.$refs['foods-wrapper'].getElementsByClassName('food-list-hook');
      let el = foodList[index];
      console.log(el,'111111111');
      this.foodsScroll.scrollToElement(el, 300);
    },
    incrementTotal(target) {
      //体验优化,异步执行下落动画
      this.$nextTick(() => {
        this.$refs['shop-cart'].drop(target);
      });
    },

    tableTypeChange(){
      console.log(this.value5);
      console.log(this.tableForm);
    },
    stopTableService(){
      const loading = this.$loading({
        lock: true,
        text: '正在暂停该餐桌服务……',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      let data = {
        id:this.tableForm.id,
        status: 'disable'
      }
      console.log(data);
      this.$request(this.url.table4, 'json', data).then((res)=>{
        this.$message({
          type: 'success',
          message: '数据提交成功!'
        });
        setTimeout(() => {
          loading.close();
          this.$message({
            showClose: true,
            message: '该餐桌二维码已经失效！',
            type: 'success'
          });
        }, 2000);
      }).catch((err)=>{
        this.$message({
          type: 'info',
          message: '数据提交失败!'
        });
        console.log(err);
      })
      this._pullTable()
    },

    confirmOrder(){
      let i = this.orderCollection.length
      this.dialogConfirmOrder = !this.dialogConfirmOrder
      var dish = Object.assign([],this.cartList);
      this.orderCollection.push(
        {
          id:i+1,
          needPay:this.totalPrice,
          dishes: dish
        }
      )
      this.selectFoods.forEach((food) => {
        food.count = 0;
      });
    },

    singleAccounts(){
      this.dialogConfirmOrder = !this.dialogConfirmOrder
      let data = [
        {
          feild:'rid',
          value:localStorage.getItem('rid'),
          joinType:'eq'
        },
        {
          feild:'tid',
          value:this.tid,
          joinType:'eq'
        }
      ]
      console.log('确认订单时提交的数据', data);
      this.$request(this.url.cart2,'json',data).then((res)=>{
        this.tableOrderConfirm = res.data.data
        console.log(res);
        console.log('这个餐厅，这个餐桌的订单数据',res.data.data);
      }).catch((err)=>{
        console.log(err);
      })


      alert("结账中……")
    },
    minusCustomer(){
      let numberOfpeople = this.tableForm.name;
      if (numberOfpeople) {
        numberOfpeople--;
        this.tableForm.name = numberOfpeople
        // this.toCustomer.push(numberOfpeople);
      }
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


    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options4 = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options4 = [];
      }
    },
    plusTable(){
      this.tableForm.rid = localStorage.getItem("rid");
      this.tableForm.status = 'enable'
      let data = this.tableForm
      console.log(data);
      this.$request(this.url.table1, 'json', data).then((res)=>{
        this.$message({
          type: 'success',
          message: '数据提交成功!'
        });
        // this.dishesDataTable.push(data);
        console.log(res);

        this.dialogFormVisibleTablePlus =!this.dialogFormVisibleTablePlus
        this._pullTable()
        // console.log(res);
      }).catch((err)=>{
        this.$message({
          type: 'info',
          message: '数据提交失败!'
        });
        console.log(err);
      })
    },
    plusTable1(){
      this.tableForm.rid = localStorage.getItem("rid");
      this.tableForm.status = 'disable'
      let data = this.tableForm
      console.log(data);
      this.$request(this.url.table1, 'json', data).then((res)=>{
        this.$message({
          type: 'success',
          message: '数据提交成功!'
        });
        // this.dishesDataTable.push(data);
        console.log(res);

        this.dialogFormVisibleTablePlus =!this.dialogFormVisibleTablePlus
        this._pullTable()
        // console.log(res);
      }).catch((err)=>{
        this.$message({
          type: 'info',
          message: '数据提交失败!'
        });
        console.log(err);
      })
    },
    changeTable(){
      this.toAccountBox.status = 'enable'
      console.log(this.toAccountBox);
      let data = this.toAccountBox
      console.log(data);
      this.$request(this.url.table4, 'json', data).then((res)=>{
        this.$message({
          type: 'success',
          message: '数据提交成功!'
        });
        this._pullTable()
        // this.dialogFormVisibleTableChange = !this.dialogFormVisibleTableChange
        // this.dishesDataTable.push(data);
        // console.log(res);
      }).catch((err)=>{
        this.$message({
          type: 'info',
          message: '数据提交失败!'
        });
        console.log(err);
      })
    },
    vuetouch(){
      console.log('1');
    },
    changeTable1(){
      let data = {
        id:this.tableForm.id,
        status: this.tableForm.status
      }
      console.log(data);
      this.$request(this.url.table4, 'json', data).then((res)=>{
        this.$message({
          type: 'success',
          message: '数据提交成功!'
        });
        // this.dishesDataTable.push(data);

        this.dialogFormVisibleTablePlus =!this.dialogFormVisibleTablePlus
        console.log(res);
      }).catch((err)=>{
        this.$message({
          type: 'info',
          message: '数据提交失败!'
        });
        console.log(err);
      })
    },
    plusMethodsThis(data){
      this.tableForm = {}
      this.dialogFormVisibleTablePlus = !this.dialogFormVisibleTablePlus;
    },
    handleEdit(){
      this.dialogFormVisibleTableChange = !this.dialogFormVisibleTableChange;
    },
    selectTable(item,index){

      if(this.screenWidth < 760){
        var splusOrder = document.getElementById('splusOrder')
        console.log(splusOrder);

      }
      this.toAccountBox = item;
      this.tableForm = item
      this.tid = item.id
      console.log('选中餐桌数据',item);
      var _this = this;
      var Data = [
        {
          feild: '',
          value: '',
          joinType: ''
        }
      ];
      this.$request(this.url.loginRestaurantManager,'form',{
        thirdId:123456789
      }).then((res)=>{
        _this.$request(_this.url.dishesCategory2, 'json', Data).then((res)=>{
          _this.dishesCategory = res.data.data;
        }).catch((err)=>{
          console.log(err)
        }).then(function () {
          _this.goods = _this.goodsArr(_this);
          console.log('selectTable - _this.goods', _this.goods);
        }).then((res)=>{

        })
      })
      console.log('selectTable - this.goods',this.goods);
      this.tableVisible = !this.tableVisible
      this.tableShow = 1

      var Title = new Array("桌号"+(index+1))
      this.tableTitle = Title.join('——')

      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        if(this.scrollOnce === 0){
          this._initScroll()
          this._calculateHeight()
          this.scrollOnce= 1
        }
        loading.close();
      }, 500);

    },
    // getTable() {
    //   const loading = this.$loading({
    //     lock: true,
    //     text: 'Loading',
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(0, 0, 0, 0.7)'
    //   });
    //   setTimeout(() => {
    //     if(this.scrollOnce === 0){
    //       this._initScroll()
    //       this._calculateHeight()
    //       this.scrollOnce= 1
    //     }
    //     loading.close();
    //   }, 2000);
    // },
    // getTable(){
    //   if(this.scrollOnce === 0){
    //     this._initScroll()
    //     this._calculateHeight()
    //     this.scrollOnce= 1
    //   }
    //
    // },
    // vuetap:function(s){
    //   console.log(s);
    //   if(this.scrollOnce === 0){
    //     this._initScroll()
    //     this._calculateHeight()
    //     this.scrollOnce= 1
    //   }
    // },
    closeTable(){
      this.tableShow = 0
      console.log('12321');
      this.scrollOnce= 0
      // this.goods = this.goodsArr(this)
      // this.show3 = false

      // location.reload();
    },
    handleClick(tab, event) {
      this.show2 = !this.show2
    },
    labelHideSroll(){
    },
    openMsg(msg){
      const h = this.$createElement;
      this.$msgbox({
        title: '结账',
        message: h('p', null, [
          h('span', null, '内容可以是 '),
          h('el-button', { style: 'color: teal' }, 'VNode')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '结账中...';
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        }
      }).then(action => {
        this.$message({
          type: 'info',
          message: 'action: ' + action
        });
      });
      // this.$alert(
      //   '<el-row>\n' +
      //   '  <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">\n' +
      //   '    <el-card :body-style="{ padding: \'0px\' }">\n' +
      //   '      <div style="padding: 14px;">\n' +
      //   '        <span>好吃的汉堡</span>\n' +
      //   '        <div class="bottom clearfix">\n' +
      //   '          <time class="time">' +
      //                 this.currentDate+
      //               '</time>\n' +
      //   '          <el-button type="text" class="button">操作按钮</el-button>\n' +
      //   '        </div>\n' +
      //   '      </div>\n' +
      //   '    </el-card>\n' +
      //   '  </el-col>\n' +
      //   '</el-row>',
      //   '确认结账', {
      //   dangerouslyUseHTMLString: true
      // });
    },
    _pullTable(){
      let data2 = [
        {
        feild: 'rid',
        value: localStorage.getItem('rid'),
        joinType: 'eq'
        },
      ]
      this.$request(this.url.table2,'json',data2).then((res)=>{
        console.log(res.data.data);
        this.listTable = res.data.data
      }).catch((err)=>{
        console.log(err);
      })
    }
  },
  mounted() {
    setTimeout(this.show2 = !this.show2,2000);
    this.list = this.states.map(item => {
      return { value: item, label: item };
    });


  },
  created() {



    console.log('1');
    let data1 = [{
      feild: 'status',
      value: 'enable',
      joinType: 'eq'
    }]
    this.$request(this.url.dishesCategory2,'json',data1).then((res)=>{
      this.dishesCategory = res.data.data
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    })
    this._pullTable()

  },
  components:{
    editcontrol,
    shopcart,
    cartcontrol
  },
  events: {
    'cart.add'(target) {
      this._drop(target);
    }
  },

}



function vueTouch(el,binding,type,vnode){
  var _this=this;
  this.obj=el;
  this.binding=binding;
  this.touchType=type;
  this.vueTouches={x:0,y:0};
  this.vueMoves=true;
  this.vueLeave=true;
  this.longTouch=true;
  this.vueCallBack=typeof(binding.value)=="object"?binding.value.fn:binding.value;
  this.obj.addEventListener("touchstart",function(e){
    _this.start(e);
  },false);
  this.obj.addEventListener("touchend",function(e){
    _this.end(e);
  },false);
  this.obj.addEventListener("touchmove",function(e){
    _this.move(e);
  },false);
  vnode.key = this.randomString()
};
vueTouch.prototype={
  start:function(e){
    this.vueMoves=true;
    this.vueLeave=true;
    this.longTouch=true;
    this.vueTouches={x:e.changedTouches[0].pageX,y:e.changedTouches[0].pageY};
    this.time=setTimeout(function(){
      if(this.vueLeave&&this.vueMoves){
        this.touchType=="longtap"&&this.vueCallBack(this.binding.value,e);
        this.longTouch=false;
      };
    }.bind(this),1000);
  },
  end:function(e){
    var disX=e.changedTouches[0].pageX-this.vueTouches.x;
    var disY=e.changedTouches[0].pageY-this.vueTouches.y;
    clearTimeout(this.time);
    if(Math.abs(disX)>10||Math.abs(disY)>100){
      this.touchType=="swipe"&&this.vueCallBack(this.binding.value,e);
      if(Math.abs(disX)>Math.abs(disY)){
        if(disX>10){
          this.touchType=="swiperight"&&this.vueCallBack(this.binding.value,e);
        };
        if(disX<-10){
          this.touchType=="swipeleft"&&this.vueCallBack(this.binding.value,e);
        };
      }else{
        if(disY>10){
          this.touchType=="swipedown"&&this.vueCallBack(this.binding.value,e);
        };
        if(disY<-10){
          this.touchType=="swipeup"&&this.vueCallBack(this.binding.value,e);
        };
      };
    }else{
      if(this.longTouch&&this.vueMoves){
        this.touchType=="tap"&&this.vueCallBack(this.binding.value,e);
        this.vueLeave=false
      };
    };
  },
  move:function(e){
    this.vueMoves=false;
  },
  randomString:function(){
    var len = 10;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }
};
Vue.directive("tap",{
  bind:function(el,binding,vnode){
    new vueTouch(el,binding,"tap",vnode);
  }
});
Vue.directive("swipe",{
  bind:function(el,binding,vnode){
    new vueTouch(el,binding,"swipe",vnode);
  }
});
Vue.directive("swipeleft",{
  bind:function(el,binding,vnode){
    new vueTouch(el,binding,"swipeleft",vnode);
  }
});
Vue.directive("swiperight",{
  bind:function(el,binding,vnode){
    new vueTouch(el,binding,"swiperight",vnode);
  }
});
Vue.directive("swipedown",{
  bind:function(el,binding,vnode){
    new vueTouch(el,binding,"swipedown",vnode);
  }
});
Vue.directive("swipeup",{
  bind:function(el,binding,vnode){
    new vueTouch(el,binding,"swipeup",vnode);
  }
});
Vue.directive("longtap",{
  bind:function(el,binding,vnode){
    new vueTouch(el,binding,"longtap",vnode);
  }
});
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "mixin.styl"
@import "animate.css";
.tables
  margin:0 3% 0
  .el-row
    .table-container
      display: flex
      height: 555px
      flex-wrap: wrap
      .transition-box
        margin-bottom: 8px
        width: 10em
        height: 10em
        border-radius: 10px
        background-color: white
        color: white
        text-align: center
        box-sizing: border-box
        margin-right: 20px
        overflow hidden
        position relative
        z-index 99
        .box-header
          width 100%
          height 15%
          display block
          background #409EFF
        .box-content
          overflow-y scroll
          height 77%
          width 95%
          color: rgba(0, 0, 0, 0.5) !important
          border-radius 0px 0px 9px 9px/ 0px 0px 9px 9px
          text-align left
          padding-left 5%
          background rgba(0, 0, 0, 0.05)
          p
            margin 4px 0px
            font-size 14px



  .tableButtonGroup
    position: absolute
    right: 50px
    bottom: 20px
    width 50px
    z-index 100
    button
      margin 0px 0px 10px 10px


  .tableNumber
    position: absolute
    font-size: 17px
    z-index: 1
    background: #f56c6c
    color: white
    width: 111px
    height: 73px
    border-radius: 50%
    text-align: center
    line-height: 100px
    right: 27%
    top: -36px

  .tableButtonGroup1
    position: fixed
    left: 12%
    bottom: 20px
    width 641px
    height 65px
    z-index 100
    overflow-x scroll
    .singleContainer
      height 40px
      width 2000px
      display inline-block
      span
        .popover
          .singleButton
            margin-left 0px
            padding 10px
            margin-top 10px
            &:hover
              box-shadow 1px 2px 3px rgba(0,0,0,0.3)
    >button
      margin-left 2px
      position fixed
      right 13%
      bottom: 35px


  .el-badge
    top -9px
    left -15px


  .time
    font-size: 13px
    color: #999


  .bottom
    margin-top: 13px
    line-height: 12px


  .button
    padding: 0
    float: right


  .image
    width: 100%
    display: block


  .clearfix:before,.clearfix:after
    display: table
    content: ""


  .clearfix:after
    clear: both


.mask-black
  width 150%
  height 150%
  left -50%
  top -50%
  background rgba(0,0,0,0.5)
  position fixed
  z-index 100


.closeTable:hover
  background #f56c6c
  color white
  border-color #f56c6c


.goodse
  display: flex
  position fixed
  top 50px
  left 124px
  background white
  width: 75%
  overflow: hidden
  text-align left
  border-radius 10px
  height 80%
  z-index 103
  .close-bnt
    color white
    position fixed
    bottom 20px
    left 50%
    font-size 40px
  .menu-button
    position relative
    width 20px
    height 20px
    background #f3f5f7
    border-radius 100%
    display none

  .menu-wrapper
    flex: 0 0 80px
    width: auto
    background: #f3f5f7
    display block !important
    .menu-ul
      width 105px
      padding-left 15px
    .menu-item
      display: table
      height: 54px
      width: 75px
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

      .text
        display: table-cell
        width: 56px
        vertical-align: middle
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 12px

  .foods-wrapper
    flex: 1
    ul
      padding 0px 0px 30px
      margin-top 0px
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
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
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
    font-size: 14px
    color: rgb(240, 20, 20)
  .old
    text-decoration: line-through
    font-size: 10px
    color: rgb(147, 153, 159)



  .el-select,.el-input
    width: 130px

  .input-with-select,.el-input-group__prepend
    background-color: #fff


.orderList
  display: flex
  justify-content: space-between
  span:nth-child(1)
    font-size 18px
    font-weight bolder
    display block
    width 65%
  span:nth-child(2)
    font-size 18px
    font-weight bolder
    display block
    width 20%
  span:nth-child(3)
    font-size 18px
    font-weight bolder
    display block
    width 25%


.foods-ul
  li:last-child
    margin-bottom 50px
</style>
