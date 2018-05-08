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

    <el-dialog title="请输入提现密码" :visible.sync="dialogFormVisible">
      <div class="withDraw" v-show="loginShow">
        <!--<img class="loginPic" src="../logo.png" alt="">-->
        <el-form
          label-width="100px"
          :label-position="labelPosition"
          class="demo-ruleForm withDraw"
          status-icon
          ref="ruleForm"
          :rules="rules2">
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="ruleForm"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="float: right;margin-left: 10px" type="primary" @click="submitConfirmPassWord">确定</el-button>
            <el-button style="float: right" @click="resetForm('ruleForm')">重置</el-button>
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
      password: [
        {required: true, message:'请输入密码', trigger:'blur'},
      ],
    },
    ruleForm:'',
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
    dialogFormVisible:false,
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
          console.log(that.screenWidth)
          if(that.screenWidth<721){
            console.log('1');

          }
          // that.init()
          that.timer = false
        }, 400)
      }
    }
  },
  created(){
    if(this.screenWidth < 721){
      this.height = 220
      this.width = 450
      this.type = 'line'
      this.buttonShow = 1
    }
  },
  methods: {
    handleClick(tab, event) {
    },
    radioChange1(){
      this.type = 'bar'
    },
    radioChange2(){
      this.type = 'line'
    },
    resetForm(formName) {
      this.ruleForm = ''
      this.$refs[formName].resetFields();
    },
    submitConfirmPassWord(){
      console.log(this.password);
    },
    withDraw(){
      this.dialogFormVisible = !this.dialogFormVisible
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

