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
          <!-- <span>{{msg}}</span> -->

          <!--<el-button-group>-->
            <!--<el-button type="primary" icon="el-icon-document">订单类型</el-button>-->
            <!--<el-button type="primary" icon="el-icon-share"></el-button>-->
            <!--<el-button type="primary" icon="el-icon-delete"></el-button>-->
          <!--</el-button-group>-->
          <div class="filter" style="display: flex;justify-content: space-around">
            <el-select
              style="margin-right: 5px"
              v-model="filterOrderType"
              @change="filterOrderTypeFun"
              placeholder="请选择订单类型">
              <el-option
                v-for="(item,index) in optionsOrder"
                :key="index"
                :label="item.label"

                :value="item.value">
              </el-option>
            </el-select>
            <el-select
              style="margin-right: 5px"
              v-model="filterPayType"
              @change="filterPayTypeFun"
              placeholder="请选择支付类型">
              <el-option
                v-for="(item,index) in optionsPay"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-date-picker
              style="margin-right: 5px"
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

          <el-table
            :data="userOrder"
            style="width: 100%"
            height="600"
          >
            <el-table-column type="expand" fixed="right">
              <template slot-scope="props">
                <el-form label-position="right" class="demo-table-expand">
                  <el-form-item label="商品名称">
                    <span>{{ props.row.name }}</span>
                  </el-form-item>

                  <el-form-item label="商品 ID">
                    <span>{{ props.row.id }}</span>
                  </el-form-item>
                  <el-form-item label="商品 ID">
                    <span>{{ props.row.id }}</span>
                  </el-form-item>
                  <el-form-item label="商品 ID">
                    <span>{{ props.row.id }}</span>
                  </el-form-item>
                  <el-form-item label="商品 ID">
                    <span>{{ props.row.id }}</span>
                  </el-form-item>
                  <el-form-item label="商品 ID">
                    <span>{{ props.row.id }}</span>
                  </el-form-item>
                  <el-form-item label="商品 ID">
                    <span>{{ props.row.id }}</span>
                  </el-form-item>
                  <el-form-item label="商品 ID">
                    <span>{{ props.row.id }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              sortable
              fixed="left"
              prop="id"
              label="序号"
              width="100"
            >
            </el-table-column>
            <el-table-column
              sortable
              fixed="left"
              prop="order_sn"
              label="订单编号"
              width="150"
            >
            </el-table-column>
            <el-table-column
              sortable
              prop="needPay"
              label="应付金额"
              width="150">
            </el-table-column>
            <el-table-column
              sortable
              width="150"
              prop="realPay"
              label="实付金额">
            </el-table-column>
            <el-table-column
              sortable
              width="150"
              prop="oldPrice"
              label="下单时间">
            </el-table-column>
            <el-table-column
              sortable
              width="100"
              prop="discountMoney"
              label="优惠金额">
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
              width="100"
              prop="payType"
              label="支付方式">
            </el-table-column>
            <el-table-column
              sortable
              width="100"
              prop="orderType"
              label="订单类型">
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
        </template>
        {{filters}}
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
      optionsPay: [
        {
          value: {
            feild: 'cid',
            value: 51,
            joinType: 'eq',
          },
          label: '全部'
        },

        {
          value: {
            feild: 'normalPrice',
            value:18,
            joinType:'lt',
          },
          label: '微信支付'
        },
        {
          value: {
            feild: 'payType',
            value:'Alipay',
            joinType:'eq',
          },
          label: '支付宝支付'
        }
      ],
      optionsOrder: [
        {
          value: {
            feild: 'id',
            value:96,
            joinType:'eq',
          },
          label: '全选'
        },
          {
          value: {
            feild: 'orderType',
            value:'single',
            joinType:'eq',
          },
          label: '单人点餐'
        },
          {
          value: {
            feild: 'orderType',
            value:'multi',
            joinType:'eq',
          },
          label: '多人点餐/服务员点餐'
        }
      ],
      filterOrderType: {
        feild:'time',
        value: '',
        joinType:'time'
      },
      filterPayType:{
        feild:'time',
        value: '',
        joinType:'time'
      },
      filters:[
        {
          feild: 'cid',
          value:'',
          joinType:'eq',
        },
        {
          feild: 'id',
          value:'',
          joinType:'eq',
        },
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
        this.filters = [
          {
            feild: 'cid',
            value:'',
            joinType:'eq',
          },
          {
            feild: 'id',
            value:'',
            joinType:'eq',
          },
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
        ]
        this.filterOrderType = {
          feild:'time',
          value: '',
          joinType:'time'
        }
        this.filterPayType = {
          feild:'time',
          value: '',
          joinType:'time'
        }
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
      filterOrderTypeFun(){
        this.filters =[]
        console.log('filterOrderTypeFun',this.filterOrderType);
        this.filters.push(this.filterOrderType,this.filterPayType,this.start,this.end)
      },
      filterPayTypeFun(){
        this.filters =[]
        console.log('filterPayTypeFun',this.filterPayType);
        this.filters.push(this.filterOrderType,this.filterPayType,this.start,this.end)
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
        this.filters.push(this.filterOrderType,this.filterPayType,this.start,this.end)
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
          this.userOrder = res.data.data
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


