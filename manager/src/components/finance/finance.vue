<template>
  <div class="finance">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane label="收益统计" name="first">

        <!--Schart 表格-->
        <schart :canvasId="canvasId"
                :type="type"
                :width="width"
                :height="height"
                :data="data"
                :options="options"
                class="schart1"
        ></schart>

        <span class="title1">今日总收入
          <span class="total">{{dailyTotal}}</span>元</span>
        <span class="title1">本月总收入
          <span class="total">{{mouthTotal}}</span>元</span>


        <el-button-group v-if="buttonShow === 0" class="radio">
          <el-button size="mini" @click="radioChange1">柱状图</el-button>
          <el-button size="mini" @click="radioChange2">折线图</el-button>
        </el-button-group>
        <el-button type="success" @click="withDraw" round>提现</el-button>
      </el-tab-pane>
      <el-tab-pane label="消费统计" name="second" :disabled="true">
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
          <el-tab-pane label="餐桌" name="first">暂无信息……</el-tab-pane>
          <el-tab-pane label="菜品" name="second">暂无信息……</el-tab-pane>
          <el-tab-pane label="时段" name="third">暂无信息……</el-tab-pane>
        </el-tabs>

      </el-tab-pane>
    </el-tabs>

    <el-dialog title="提现" :visible.sync="showForm">
      <div class="withDraw" v-show="loginShow">
        <span slot="footer" class="dialog-footer">
            </span>
        <!--<img class="loginPic" src="../logo.png" alt="">-->
        <el-form
          label-width="100px"
          :label-position="labelPosition"
          class="demo-ruleForm withDraw"
          status-icon
          ref="ruleForm"
          :inline="true"
          :rules="rules2">
          <el-form-item label="请输入验证码" prop="recode">
              <el-input v-model="getAccountPhoneCode" placeholder="输入餐厅绑定的手机验证码"></el-input>
          </el-form-item>
          <el-form-item label="点击获取">
            <el-button :loading="bindAliShowLoading" type="primary" @click="getAccountCode">{{confirmMsg}}</el-button>
          </el-form-item>
        </el-form>
        <el-form
          label-width="100px"
          :label-position="labelPosition"
          class="demo-ruleForm withDraw"
          status-icon
          ref="ruleForm"
          :rules="rules2">
          <el-form-item v-if="showPasswordInput === 1"  label="密码" prop="password">
          <el-input placeholder="请输入提现金额" v-model="moneyNumber" class="input-with-select">
            <el-select style="width: 110px" v-model="withdrawType" slot="prepend" placeholder="到账类型">
              <el-option label="微信" value="wechat"></el-option>
              <el-option label="支付宝" value="alipay"></el-option>
            </el-select>
          </el-input>
          </el-form-item>
          <el-form-item>

            <el-button v-if="showPasswordInput === 1" style="float: right;margin-left: 10px" type="primary"
                       @click="submitConfirmPassWord">立即提现</el-button>
            <el-button style="float: right" @click="closeForm">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import schart from 'vue-schart'
export default {
  name: 'collect',
  data:() => ({
    rules2: {
      // password: [
      //   {required: true, message:'请输入密码', trigger:'blur'},
      // ],
      // recode: [
      //   {required: true, message:'请输入验证码', trigger:'blur'},
      // ],
    },
    confirmMsg:'免费获取验证码',
    moneyNumber:'',
    countdown:60,
    withdrawType:'alipay',
    bindAliShowLoading:false,
    getAccountPhoneCode:'',
    showPasswordInput:0,
    labelPosition: 'top',
    msg: '财务信息！',
    activeName: 'first',
    activeName2: 'first',
    screenWidth: document.body.clientWidth,
    canvasId: 'myCanvas',
    type: 'bar',
    width: 500,
    buttonShow:0,
    height: 300,
    loginShow:true,
    showForm:false,
    radio: '1',
    data: [
      {name: '3.24', value: 742},
      {name: '3.25', value: 1523},
      {name: '3.26', value: 1654},
      {name: '3.28', value: 1095},
      {name: '3.29', value: 1595},
      {name: '3.30', value: 2095},
    ],
    options: {
      padding: 50,                    // canvas 内边距
      bgColor: '#FFFFFF',             // 默认背景颜色
      title: '本月收益基本统计（单位：元）',         // 图表标题
      titleColor: '#000000',          // 图表标题颜色
      titlePosition: 'top',           // 图表标题位置: top / bottom
      yEqual: 5,                     // y轴分成5等分
      fillColor: '#1E9FFF',           // 默认填充颜色
      contentColor: '#eeeeee',        // 内容横线颜色
      axisColor: '#666666',           // 坐标轴颜色
    }
  }),
  mounted () {
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    }
  },
  watch: {
    screenWidth (val) {
      if (!this.timer) {
        this.screenWidth = val
        this.timer = true
        let that = this
        setTimeout(function () {
          // that.screenWidth = that.$store.state.canvasWidth
          if(that.screenWidth<721){
          }
          // that.init()
          that.timer = false
        }, 400)
      }else {
        this.height = 500
      }
    },
    getAccountPhoneCode(val){
      if(val.length === 6){
        this.showPasswordInput =1
        this.$message({
          type: 'success',
          message: '验证码正确!'
        });
      }else {
        this.showPasswordInput =0
      }
    }
  },

  created(){
    if(this.screenWidth < 721){
      this.height = 220
      this.width = 450
      this.type = 'line'
      this.buttonShow = 1
    }else {
      this.height = 400
    }
  },
  methods: {
    confirmRecode(){
      if(!this.getAccountPhoneCode){
        this.$message({
          type: 'info',
          message: '请输入验证码!'
        });
        return
      }
      this.showForm = !this.showForm
    },
    closeForm() {
      this.showForm = !this.showForm
    },
    submitConfirmPassWord(){

      // console.log(this.getAccountPhoneCode);
      // console.log(this.moneyNumber);
      // console.log(this.withdrawType);
      this.$request(this.url.restaurantAccountWithdraw,'form',{
        type: this.withdrawType,
        smsCode:this.getAccountPhoneCode,
        money:this.moneyNumber
        // account:
      }).then((res)=>{
      }).catch((err)=>{
        console.log(err);
      })
      this.showForm = !this.showForm
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
          this.countdown = 0
        })
        .catch(_ => {});
    },
    getAccountCode(){
      this.$request(this.url.restaurantBindAccount,'form',{}).then((res)=>{
        // console.log(res);
      }).catch((err)=>{
        console.log(err);
      })
      this.rollTime()
      // this.bindAliShowVisible = !this.bindAliShowVisible
    },
    rollTime(){
      var _this = this
      if (this.countdown == 0) {
        this.bindAliShowLoading = false
        this.confirmMsg="免费获取验证码";
        this.countdown = 60;
        return
      } else {
        this.bindAliShowLoading = true
        this.confirmMsg="重新发送(" + this.countdown + ")";
        this.countdown--;
      }
      setTimeout(function() {
        _this.rollTime(this.confirmMsg)
      },1000)
    },
    handleClick(tab, event) {
    },
    radioChange1(){
      this.type = 'bar'
    },
    radioChange2(){
      this.type = 'line'
    },

    withDraw(){
      this.showForm = !this.showForm
    }
  },
  computed:{
    mouthTotal: function () {
      var sum1 = 0
      for(var i=0; i<this.data.length; i++){
        sum1 += this.data[i].value
      }
      return sum1
    },
    dailyTotal: function () {
      var sum2 = 2
      for(var i=0; i<this.data.length; i++){

        sum2 = this.data[i].value
      }
      return sum2
    }
  },
  components:{
    schart
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.new
  background white

.schart1
  display flex
  justify-content center

.radio
  float right


.total
  font-size 30px

.title1
  margin-right 20px
</style>

