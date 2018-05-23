<template>
  <div class="coupon">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane label="便捷卡券" name="first">
        <el-collapse v-model="activeName1" accordion>
          <el-collapse-item title="优惠券 Best coupon" name="1">
            <el-col class="card" :span="23">
              <el-card shadow="hover">
                <div class="clearfix">
                  <span style="font-size: 18px;margin-right: 22px">优惠券</span>
                  <el-tooltip :content="'状态: ' + bestStatus" placement="top">
                    <el-switch
                      v-model="bestStatus"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-value="开启"
                      inactive-value="关闭">
                    </el-switch>
                  </el-tooltip>
                </div>
                <el-form label-position="left" inline >
                  <el-form-item label="面值">
                    <el-input v-model.number="bestData.money"></el-input>
                  </el-form-item>
                  <el-form-item label="描述" style="width: 380px">
                    <el-input style="width: 280px" name="max-height:100px;" :rows="2" type="textarea" v-model.number="rechargeData.money"></el-input>
                  </el-form-item>
                </el-form>
              </el-card>
            </el-col>

          </el-collapse-item>
          <el-collapse-item title="充值券 Recharge coupon" name="2">
            <el-col  class="card deduce" :span="23">
              <el-card shadow="hover">
                <div class="clearfix">
                  <span style="font-size: 18px;margin-right: 22px">充值券</span>
                  <el-tooltip :content="'状态: ' + rechargeStatus" placement="top">
                    <el-switch
                      v-model="rechargeStatus"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-value="开启"
                      inactive-value="关闭">
                    </el-switch>
                  </el-tooltip>
                </div>
                <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
                  <el-form-item
                    prop="email"
                    label="金额"
                  >
                    <span>充</span>
                    <el-input v-model="dynamicValidateForm.email"></el-input>
                    <span>送</span>
                    <el-input v-model="dynamicValidateForm.email"></el-input>
                  </el-form-item>
                  <el-form-item
                    v-for="(domain, index) in dynamicValidateForm.domains"
                    :label="'金额' + index"
                    :key="domain.key"
                    :prop="'domains.' + index + '.value'"
                  >
                    <span>充</span>
                    <el-input v-model="domain.value"></el-input>
                    <span>送</span>
                    <el-input v-model="domain.value"></el-input>
                    <el-button style="position: absolute; left: -80px;top:9px;padding: 5px" size="mini" type="danger" icon="el-icon-delete" circle @click.prevent="removeDomain(domain)"></el-button>
                  </el-form-item>
                  <el-form-item label-width="65%">
                    <el-button @click="addDomain">新增充值券类型</el-button>
                    <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
                  </el-form-item>
                </el-form>
              </el-card>
            </el-col>

          </el-collapse-item>
          <el-collapse-item title="代金券 Money coupon" name="3">
            <el-col class="card" :span="23">
              <el-card shadow="hover">
                <div class="clearfix">
                  <span style="font-size: 18px;margin-right: 22px">代金券</span>
                  <el-tooltip :content="'状态: ' + headerStatus" placement="top">
                    <el-switch
                      v-model="headerStatus"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-value="开启"
                      inactive-value="关闭">
                    </el-switch>
                  </el-tooltip>
                </div>
                <el-form label-position="left" inline>
                  <el-form-item label="面值">
                    <el-input v-model.number="headerData.money"></el-input>
                  </el-form-item>
                  <el-form-item label="描述" style="width: 380px">
                    <el-input style="width: 280px" name="max-height:100px;" :rows="2" type="textarea" v-model.number="rechargeData.money"></el-input>
                  </el-form-item>
                </el-form>
              </el-card>
            </el-col>

          </el-collapse-item>
          <el-collapse-item title="人头券 Header coupon" name="4">
            <el-col class="card" :span="23">
              <el-card shadow="hover">
                <div class="clearfix">
                  <span style="font-size: 18px;margin-right: 22px">人头券</span>
                  <el-tooltip :content="'状态: ' + headerStatus" placement="top">
                    <el-switch
                      v-model="headerStatus"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-value="开启"
                      inactive-value="关闭">
                    </el-switch>
                  </el-tooltip>
                </div>
                <el-form label-position="left" inline>
                  <el-form-item label="面值">
                    <el-input v-model.number="headerData.money"></el-input>
                  </el-form-item>
                  <el-form-item label="描述" style="width: 380px">
                    <el-input style="width: 280px" name="max-height:100px;" :rows="2" type="textarea" v-model.number="rechargeData.money"></el-input>
                  </el-form-item>
                </el-form>
              </el-card>
            </el-col>

          </el-collapse-item>
          <el-collapse-item title="满减券 Deduce coupon" name="5">
            <el-col class="card deduce" :span="23">
              <el-card shadow="hover">
                <div class="clearfix">
                  <span style="font-size: 18px;margin-right: 22px">满减券</span>
                  <el-tooltip :content="'状态: ' + deduceStatus" placement="top">
                    <el-switch
                      v-model="deduceStatus"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-value="开启"
                      inactive-value="关闭">
                    </el-switch>
                  </el-tooltip>
                </div>
                <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
                  <el-form-item
                    prop="email"
                    label="满减金额"
                  >
                    <span>满</span>
                    <el-input v-model="dynamicValidateForm.email"></el-input>
                    <span>减</span>
                    <el-input v-model="dynamicValidateForm.email"></el-input>
                  </el-form-item>
                  <el-form-item
                    v-for="(domain, index) in dynamicValidateForm.domains"
                    :label="'金额' + index"
                    :key="domain.key"
                    :prop="'domains.' + index + '.value'"
                    inline
                  >
                    <span>满</span>
                    <el-input v-model="domain.value"></el-input>
                    <span>减</span>
                    <el-input v-model="domain.value"></el-input>
                    <el-button style="position: absolute; left: -80px;top:9px;padding: 5px" size="mini" type="danger" icon="el-icon-delete" circle @click.prevent="removeDomain(domain)"></el-button>
                  </el-form-item>
                  <el-form-item label-width="65%">
                    <el-button @click="addDomain">新增满减类型</el-button>
                    <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
                  </el-form-item>
                </el-form>
              </el-card>
            </el-col>

          </el-collapse-item>
        </el-collapse>
        <el-button class="control-button" type="primary" @click="onSubmitCoupon" :loading="saveCoupon">保存</el-button>
      </el-tab-pane>
      <el-tab-pane label="卡券管理" name="second">
        <template>
          <el-table
            :data="couponTable"
            style="width: 100%"
            height="600"
          >
            <el-table-column
              sortable
              fixed="left"
              prop="name"
              label="卡券名"
              width="120">
            </el-table-column>
            <el-table-column
              sortable
              width="100"
              prop="status"
              label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.status === 'disable'">不可用</span>
                <span v-if="scope.row.status === 'enable'">可用</span>
              </template>
            </el-table-column>
            <el-table-column
              sortable
              prop="driverName"
              label="数量"
              width="100">
            </el-table-column>
            <el-table-column
              sortable
              width="100"
              prop="description"
              label="金额">
            </el-table-column>
            <el-table-column
              sortable
              prop="remark"
              label="类型"
              width="100">
            </el-table-column>
            <el-table-column
              sortable
              width="150"
              prop="description"
              label="获得条件">
            </el-table-column>
            <el-table-column
              sortable
              width="150"
              prop="description"
              label="使用方式">
            </el-table-column>
            <el-table-column
              sortable
              width="150"
              prop="description"
              label="期限">
            </el-table-column>

            <el-table-column
              sortable
              width="150"
              prop="description"
              label="描述/介绍">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="60">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteCoupon(scope.row)"
                  type="text"
                  size="small">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>

        </template>
        <el-button type="primary" @click="plusCoupon" class="control-button">添加卡券</el-button>
      </el-tab-pane>
    </el-tabs>

    <el-dialog top="7vh" title="增加卡券" :visible.sync="showFormCoupon">
      <el-form :model="couponForm" :label-width="formLabelWidth">
        <el-form-item label="卡券名" >
          <el-input
            autofocus="true"
            v-model="couponForm.name"
            auto-complete="off"
            @keyup="onkeyup(e)"
            placeholder="请输入卡券名"></el-input>
        </el-form-item>
        <el-form-item label="数量">
          <el-input
            v-model.number="couponForm.num"
            auto-complete="off"
            placeholder="请输入数量"></el-input>
        </el-form-item>
        <el-form-item label="金额">
          <el-input
            v-model.number="couponForm.money"
            auto-complete="off"
            placeholder="请输入金额"></el-input>
        </el-form-item>
        <el-form-item label="卡券类型">
          <el-select
            style="display: inline-block;margin: 0px 2px"
            v-model="couponForm.customerType"
            placeholder="卡券类型">
            <el-option label="折扣券" value="discont"></el-option>
            <el-option label="代金券" value="money"></el-option>
            <el-option label="礼品券" value="present"></el-option>
            <el-option label="团购券" value="group-buy"></el-option>
            <el-option label="人头券" value="header"></el-option>
            <el-option label="充值券" value="recharge"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="获得条件" inline>
          <div style="display: flex;justify-content: space-between" >
            <el-select
              style="display: inline-block;margin: 0px 2px"
              v-model="couponForm.condition1"
              placeholder="顾客类型">
              <el-option label="新顾客" value="new"></el-option>
              <el-option label="老顾客" value="old"></el-option>
            </el-select>
            <el-select
              style="display: inline-block;margin: 0px 2px"
              v-model="couponForm.condition3"
              placeholder="模式">
              <el-option label="单人" value="multi"></el-option>
              <el-option label="多人" value="single"></el-option>
            </el-select>
            <el-select
              style="display: inline-block;margin: 0px 2px"
              v-model="couponForm.condition2"
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
        <el-form-item label="获得次数">
          <el-input
            v-model.number="couponForm.times"
            auto-complete="off"
            placeholder="请输入次数"></el-input>
        </el-form-item>
        <el-form-item label="派发方式">
          <el-select
            style="display: inline-block"
            v-model="couponForm.way"
            placeholder="请选择派发方式">
            <el-option label="随机人群" value="random"></el-option>
            <el-option label="全部" value="all"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用期限">
          <el-select
            style="display: inline-block;margin: 0px 2px"
            v-model="couponForm.timeType"
            placeholder="选择使用期限类型">
            <el-option label="到期时间" value="dot"></el-option>
            <el-option label="时间段" value="part"></el-option>
            <el-option label="时长" value="long"></el-option>
          </el-select>
          <el-input
            style="width: 220px;margin: 5px 0px"
            v-model="couponUseDateLong"
            placeholder="输入时间/小时"
            v-if="couponForm.timeType === 'long'">
          </el-input>
          <el-date-picker
            style="width: 220px;margin: 5px 0px"
            v-model="couponUseDateDot"
            type="date"
            v-if="couponForm.timeType === 'dot'"
            placeholder="选择日期">
          </el-date-picker>
          <el-date-picker
            v-model="couponUseDatePart"
            style="width: 220px;margin: 5px 0px"
            type="daterange"
            v-if="couponForm.timeType === 'part'"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>


        </el-form-item>
        <el-form-item label="叠加使用" style="text-align: left">
          <el-select
            style="display: inline-block"
            v-model="couponForm.superType"
            placeholder="请选择状态">
            <el-option label="可叠加" value="super"></el-option>
            <el-option label="不可叠加使用" value="no-super"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" style="text-align: left">
          <el-select
            style="display: inline-block"
            v-model="couponForm.status"
            placeholder="请选择状态">
            <el-option label="可用" value="enable"></el-option>
            <el-option label="不可用" value="disable"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="couponForm.description" auto-complete="off" placeholder="请输入描述"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="couponForm.remark" auto-complete="off" placeholder="请输入备注"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showFormCoupon = false;">取 消</el-button>
        <el-button type="primary" @click="plusConponConfirm">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  export default {
    name: 'printer',
    data:() => ({
      activeName: 'first',
      activeName1:'1',
      formLabelWidth: '80px',
      rechargeStatus:'',
      deduceStatus:'',
      headerStatus:'',
      bestStatus:'',
      rechargeData:{},
      headerData:{},
      bestData:{},
      deduceData:{},
      couponTable:[],
      couponUseDatePart:'',
      couponUseDateDot:'',
      couponUseDateLong:'',
      showFormCoupon:false,
      saveCoupon: false,
      couponForm:{},
      couponStatus:[],
      dynamicValidateForm: {
        domains: [{
          value: ''
        }],
        email: ''
      }

    }),
    methods: {
      handleClick(tab, event) {
      },
      plusCoupon(){
        this.couponForm = {}
        this.showFormCoupon = !this.showFormCoupon
      },
      plusConponConfirm(){
        this.showFormCoupon = !this.showFormCoupon
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now()
        });
      },
      onSubmitCoupon() {
        setTimeout(() => {
          this.saveCoupon = false
          alert('已保存')
        }, 1000);
        this.saveCoupon =!this.saveCoupon
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.card
  margin 10px 0px


.el-form-item
  margin-bottom 5px

.clearfix
  margin-bottom 10px


.el-card__header
  padding 5px 20px !important

.deduce
  .el-input
    display inline-block
    width 30%
  span
    margin 0px 5px
</style>
