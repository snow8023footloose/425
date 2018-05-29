<template>
  <div class="member">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane label='会员列表' name="first">
        <template>
          <el-table
            v-loading="loading"
            :data="memberTable"
            style="width: 100%"
            height="600"
          >
            <el-table-column
              sortable
              fixed="left"
              prop="name"
              label="会员名"
              width="120">
              <template slot-scope="scope">
                <el-popover :width="120" trigger="hover" placement="right">
                  <!--<p>姓名: 1111111111111</p>-->
                  <!--<p>住址: 222222222222222</p>-->
                  <div slot="reference" class="name-wrapper">
                    <el-tag style="background: rgba(0,0,0,0.11);color: white" v-if="scope.row.status === 'disable'" size="medium">{{ scope.row.name }}</el-tag>
                    <el-tag v-if="scope.row.status === 'enable'" size="medium">{{ scope.row.name }}</el-tag>
                  </div>
                  <div style="margin: 0;">
                    <el-button
                      type="primary"
                      size="mini"
                      round
                      @click="editDishes(scope.row,scope.$index); visible2 = false ;showFormGoodsPlus = true"
                      icon="el-icon-edit">编辑</el-button>
                    <el-button
                      size="mini"
                      type="text"
                      @click.native.prevent="deleteDishes(scope.row,scope.$index); visible2 = false"
                      icon="el-icon-delete">删除</el-button>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              sortable
              width="150"
              prop="memberType"
              label="会员类型">
              <template slot-scope="scope">
                <span v-if="scope.row.showType === 'always'">一直展示</span>
                <span v-if="scope.row.showType === 'sometimes'">按时间段</span>
                <span v-if="scope.row.showType === 'invisible'">不展示</span>
              </template>
            </el-table-column>
            <el-table-column
              sortable
              prop="sale"
              label="享受优惠"
              width="120">
            </el-table-column>
            <el-table-column
              sortable
              width="130"
              prop="cid"
              label="类">
              <template slot-scope="scope">
                <span v-for="item in filterTagArr" v-if="scope.row.cid === item.value">{{item.text}}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-button size="large" type="primary" icon="el-icon-plus" @click="addMember" class="control-button">添加会员</el-button>
        </template>
      </el-tab-pane>
      <el-tab-pane label="会员设置" name="second">
        会员管理
        <el-button class="control-button" type="primary" @click="saveMemberSetting">保存</el-button>

      </el-tab-pane>
    </el-tabs>

    <el-dialog title="增加会员" :visible.sync="showFormMember" top="10vh">
      <el-form :model="memberForm" :label-width="formLabelWidth">
        <el-form-item label="会员名" >
          <el-input
            autofocus="true"
            v-model="memberForm.name"
            auto-complete="off"
            @keyup="onkeyup(e)"
            placeholder="请输入卡券名"></el-input>
        </el-form-item>
        <el-form-item label="金额">
          <el-input
            v-model.number="memberForm.money"
            auto-complete="off"
            placeholder="请输入金额"></el-input>
        </el-form-item>
        <el-form-item label="获得条件" inline>
          <div style="display: flex;justify-content: space-between" >
            <el-select
              style="display: inline-block;margin: 0px 2px"
              v-model="memberForm.condition1"
              placeholder="顾客类型">
              <el-option label="新顾客" value="new"></el-option>
              <el-option label="老顾客" value="old"></el-option>
            </el-select>
            <el-select
              style="display: inline-block;margin: 0px 2px"
              v-model="memberForm.condition3"
              placeholder="模式">
              <el-option label="单人" value="multi"></el-option>
              <el-option label="多人" value="single"></el-option>
            </el-select>
            <el-select
              style="display: inline-block;margin: 0px 2px"
              v-model="memberForm.condition2"
              placeholder="行为">
              <el-option label="扫码" value="code"></el-option>
              <el-option label="支付" value="pay"></el-option>
              <el-option label="充值" value="recharge"></el-option>
              <el-option label="满" value="old"></el-option>
              <el-option label="分享" value="share"></el-option>
              <el-option label="推荐" value="commend"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="消费次数">
          <el-input
            v-model.number="memberForm.times"
            auto-complete="off"
            placeholder="请输入次数"></el-input>
        </el-form-item>
        <el-form-item label="状态" style="text-align: left">
          <el-select
            style="display: inline-block"
            v-model="memberForm.status"
            placeholder="请选择状态">
            <el-option label="可用" value="enable"></el-option>
            <el-option label="不可用" value="disable"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="memberForm.remark" auto-complete="off" placeholder="请输入备注"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showFormMember = false;">取 消</el-button>
        <el-button type="primary" @click="addMemberConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'printer',
  data:() => ({
    activeName: 'first',
    dishesDataTable:[],
    showFormMember:false,
    loading:false,
    memberTable:[],
    memberForm:{},
    formLabelWidth:'80px',
    memberSetting:{}
  }),
  methods: {
    handleClick(tab, event) {
    },
    addMember(){
      this.showFormMember = !this.showFormMember
    },
    addMemberConfirm(){

    },
    _pullMemberSetting(){
      this.$request(this.url.memberSettingComplexPageQuery,'json',[]).then((res)=>{
        this.memberSettingUpdate = res.data.data[0]
        console.log(this.memberSettingUpdate);
      })
    },
    saveMemberSetting(){
      let data = this.memberSetting
      this.$request(this.url.memberSettingUpdate,'json',data).then((res)=>{
        this.$message({
          type: 'success',
          message: '保存成功!'
        });
        this._pullMemberSetting()

      }).catch((err)=>{
        console.log(err);
        this.$message({
          type: 'info',
          message: '保存失败'
        });
      })
    }
  },
  created(){
    this._pullMemberSetting()
  }

}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
