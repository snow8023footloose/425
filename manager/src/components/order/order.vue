<template>
  <div class="order">

    <el-tabs
      v-loading="loading"
      v-model="activeName"
      @tab-click="handleClick"
    >
      <!--<el-tab-pane label="外卖订单" name="first">
        <template>
          <el-table
            :data="listGoods"
            style="width: 100%"
            height="600"
          >
            <el-table-column
              fixed="left"
              type="selection"
              width="30">
            </el-table-column>
            <el-table-column
              sortable
              fixed="left"
              prop="name"
              label="品名"
              width="180"
            >
            </el-table-column>
            <el-table-column
              sortable
              prop="sellCount"
              label="售卖情况"
              width="150">
            </el-table-column>
            <el-table-column
              sortable
              width="150"
              prop="price"
              label="价格">
            </el-table-column>
            <el-table-column
              sortable
              width="150"
              prop="oldPrice"
              label="原价">
            </el-table-column>
            <el-table-column
              sortable
              width="100"
              prop="rating"
              label="评价">
            </el-table-column>
          </el-table>
        </template>
      </el-tab-pane>-->

      <el-tab-pane label="历史订单" name="first">
        <template>
          <el-table
            :data="userOrder"
            style="width: 100%"
            height="600"
          >
            <el-table-column type="expand" fixed="left">
              <template slot-scope="props" style="width: 20%">
                <div v-for="item in props.row.orderDishes" style="display: flex;margin: 10px 0px">
                  <span style="width: 7%;padding-left: 30px">{{ item.dishes.name }}：</span>
                  {{item.skus}}
                  <span style="width: 6%"><i class="el-icon-close"></i>{{ item.num }}</span>
                  <span style="width: 30%">
                    <span v-for="tag in item.tags">
                      {{ tag.name }} / <span v-if="tag.price">{{ tag.price.toFixed(2) }} ￥</span>
                      <span v-else="tag.price">0.00 ￥</span>,&nbsp;&nbsp;&nbsp;
                    </span>
                  </span>
                  <span style="width: 5%">{{ item.totalPrice.toFixed(2) }} ￥</span>
                </div>
                <el-button style="margin: 5px 0px 5px 30px" size="mini" type="primary" plain round>{{props.row.table.name}}&nbsp;/&nbsp;{{props.row.table.num}}</el-button>
              </template>
            </el-table-column>
            <!--<el-table-column-->
              <!--sortable-->
              <!--fixed="left"-->
              <!--prop="index"-->
              <!--label="序号"-->
              <!--width="100"-->
            <!--&gt;-->
            <!--</el-table-column>-->
            <el-table-column
              sortable
              fixed="left"
              prop="id"
              label="订单编号"
              width="160"
            >
            </el-table-column>
            <el-table-column
              sortable
              width="130"
              prop="payType"
              label="支付方式"
              :filters="[{text:'微信支付',value:'wechat-online'},{text:'支付宝支付',value:'alipay-online'}]"
              :filter-method="filterPayArr"
              filter-placement="bottom-end"
            >
              <template slot-scope="props">
                <span v-if="props.row.payType === 'wechat-online'">微信支付</span>
                <span v-if="props.row.payType === 'alipay-online'">支付宝支付</span>
              </template>
            </el-table-column>
            <el-table-column
              sortable
              width="130"
              prop="orderType"
              label="订单类型"
              :filters="[{text:'单人点餐',value:'single'},{text:'多人点餐',value:'multi'}]"
              :filter-method="filterOrderTypeArr"
              filter-placement="bottom-end"
            >
              <template slot-scope="props">
                <span v-if="props.row.orderType === 'single'">单人点餐</span>
                <span v-if="props.row.orderType === 'multi'">多人点餐</span>
              </template>
            </el-table-column>
            <el-table-column
              sortable
              prop="needPay"
              label="应付金额"
              width="110">
              <template slot-scope="props">
                {{props.row.needPay.toFixed(2)}}
              </template>
            </el-table-column>
            <el-table-column
              sortable
              width="110"
              prop="realPay"
              label="实付金额">
              <template slot-scope="props">
                {{props.row.realPay.toFixed(2)}}
              </template>
            </el-table-column>
            <el-table-column
              sortable
              width="100"
              prop="discountMoney"
              label="优惠金额">
              <template slot-scope="props">
                {{props.row.discountMoney.toFixed(2)}}
              </template>
            </el-table-column>
            <el-table-column
              sortable
              width="150"
              prop="createTime"
              label="下单时间">
            </el-table-column>

            <el-table-column
              sortable
              width="100"
              prop="rating"
              label="退款金额">

            </el-table-column>
            <el-table-column
              sortable
              width="100"
              prop="discountType"
              label="打折类型">
            </el-table-column>

            <el-table-column
              sortable
              width="150"
              prop="thirdPartCode"
              label="第三方code">
            </el-table-column>
            <el-table-column
              sortable
              width="150"
              prop="thirdPartName"
              label="第三方名称">
            </el-table-column>
          </el-table>
          <div class="filter">
            <!--<el-select-->
            <!--style="margin-right: 5px"-->
            <!--v-model="filterOrderType"-->
            <!--@change="filterOrderTypeFun"-->
            <!--placeholder="请选择订单类型">-->
            <!--<el-option-->
            <!--v-for="(item,index) in optionsOrder"-->
            <!--:key="index"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
            <!--</el-option>-->
            <!--</el-select>-->
            <!--<el-select-->
            <!--style="margin-right: 5px"-->
            <!--v-model="filterPayType"-->
            <!--@change="filterPayTypeFun"-->
            <!--placeholder="请选择支付类型">-->
            <!--<el-option-->
            <!--v-for="(item,index) in optionsPay"-->
            <!--:key="index"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
            <!--</el-option>-->
            <!--</el-select>-->

            <el-date-picker
              style="margin-left: 45%;margin-top: 10px"
              v-model="filterOrderDate"
              type="daterange"
              align="right"
              unlink-panels
              @change="filterDateTypeFun"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
            <el-button type="success" @click="resetFilters" icon="el-icon-refresh" circle></el-button>

          </div>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>

  const ERR_OK = 0
  export default {
    name: 'New',
    data:() => ({
      start:{
        feild:'startTime',
        value: '',
        joinType:'startTime'
      },
      end:{
        feild:'endTime',
        value: '',
        joinType:'endTime'
      },

      filters:[
        {
          feild: 'startTime',
          value:'',
          joinType:'startTime',
        },
        {
          feild: 'endTime',
          value:'',
          joinType:'endTime',
        }
      ],
      currentPage1:5,
      activeName: 'first',
      userOrder:[],
      loading: true,
      filterOrderDate:'',
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
            picker.$emit('pick', [start, end]);
          }
        },

          {
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    }),
    watch:{
      filters:{
        handler:function(val,oldval){
          console.log('watch',val);
          this.$request(this.url.dishes2,'json',val).then((res)=>{
            console.log(res);
            this.userOrder = res.data.data
          }).catch((err)=>{
          })
        },
        deep:true//深度监听
      }
    },
    methods: {
      resetFilters(){
        this.start = {
          feild:'startTime',
          value: '',
          joinType:'startTime'
        }
        this.end = {
          feild:'endTime',
            value: '',
            joinType:'endTime'
        }
      },
      filterDateTypeFun(){
        this.filters =[]
        console.log('filterDateTypeFun',this.filterOrderDate);
        let startTime =
          this.filterOrderDate[0].getFullYear()+
        '-'+(this.filterOrderDate[0].getMonth()+1)+
        '-'+this.filterOrderDate[0].getDate()
        let endTime = this.filterOrderDate[1].getFullYear()+
        '-'+(this.filterOrderDate[1].getMonth()+1)+
        '-'+this.filterOrderDate[1].getDate()
        console.log('得到时间段',startTime,endTime);

        this.start = {
          feild:'startTime',
          value: startTime,
          joinType:'startTime'
        }
        this.end = {
          feild:'endTime',
          value: endTime,
          joinType:'endTime'
        }
        this.filters.push(this.start,this.end)
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      handleClick(tab, event) {
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      filterPayArr(value,row){
        return row.payType === value;
      },
      filterOrderTypeArr(value,row){
        return row.orderType === value;
      },
      _pullUserOrder(){
        // let data = [
        //   {
        //     feild:'status',
        //     value: 'enable',
        //     joinType:'eq'
        //   }
        // ]

        let data = [
          {
            feild:'time',
            value: '',
            joinType:'time'
          }
        ]
        this.$request(this.url.userOrder,'json',data).then((res)=>{
          console.log('orderComplexPageQuery',res);
          let response = res.data.data
          this.userOrder = response

          this.loading = false
        }).catch((err)=>{

        })
      }
    },
    created() {
      this._pullUserOrder()
    },
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

  .el-pagination
    margin 5px
  .demo-table-expand
    font-size: 0
    label
      width: 90px
      color: #99a9bf
    .el-form-item
      margin-right: 0
      margin-bottom: 0
      width: 50%


  .cell
    text-align center


</style>


