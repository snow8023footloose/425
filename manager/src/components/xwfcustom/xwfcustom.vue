<template>
    <div class="xwfcustom">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <!--餐厅信息表模块-->
        <el-tab-pane label="餐厅表" name="first">
          <template>
            <!-- <span>{{msg}}</span> -->
            <el-table
              :data="restaurantDataTable"
              style="width: 100%"
              height="600"
              :fit="true"
              size="small"
            >
              <el-table-column
                sortable
                fixed="left"
                prop="name"
                label="餐厅名"
                width="120"
              >
              </el-table-column>
              <el-table-column
                sortable
                prop="Tid"
                label="餐厅类型"
                width="100">
              </el-table-column>
              <el-table-column
                sortable
                width="80"
                prop="status"
                label="状态">
              </el-table-column>
              <el-table-column
                sortable
                width="120"
                prop="phone"
                label="电话号码">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="country"
                label="国别">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="province"
                label="省">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="city"
                label="市">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="area"
                label="区/县">
              </el-table-column>
              <el-table-column
                sortable
                width="150"
                prop="address"
                label="详细地址">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="pid"
                label="法人id">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="eid"
                label="业务员">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="eleId"
                label="饿了么">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="wifiName"
                label="Wifi名">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="wifiPassword"
                label="Wifi密码">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="brand"
                label="品牌名称">
              </el-table-column>
              <el-table-column
                sortable
                width="150"
                prop="brandLogo"
                label="品牌logo">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="businessTime"
                label="营业时间">
              </el-table-column>
              <el-table-column
                sortable
                width="150"
                prop="businessPermitNum"
                label="营业执照号">
              </el-table-column>
              <el-table-column
                sortable
                width="150"
                prop="businessPermitImg"
                label="营业执照图">
              </el-table-column>
              <el-table-column
                sortable
                width="150"
                prop="foodPermitNum"
                label="食品许可证号">
              </el-table-column>
              <el-table-column
                sortable
                width="150"
                prop="foodPermitImg"
                label="食品许可证图">
              </el-table-column>
              <el-table-column
                sortable
                width="120"
                prop="logo"
                label="餐厅logo图">
              </el-table-column>
              <el-table-column
                sortable
                width="150"
                prop="Door_img"
                label="餐厅门头大图">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="cashierDeskImg"
                label="收银台图">
              </el-table-column>
              <el-table-column
                sortable
                width="150"
                prop="sceneImgOne"
                label="店内场景图1">
              </el-table-column>
              <el-table-column
                sortable
                width="150"
                prop="sceneImgTwo"
                label="店内场景图2">
              </el-table-column>
              <el-table-column
                sortable
                width="150"
                prop="sceneImgThree"
                label="店内场景图3">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="description"
                label="店铺介绍">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="remark"
                label="备注">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="longitude"
                label="店铺经度">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="latitude"
                label="店铺维度">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="creatTime"
                label="创建时间">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="upDate"
                label="修改时间">
              </el-table-column>
              <el-table-column
                sortable
                width="150"
                prop="expireTime"
                label="到期时间">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="expireDay"
                label="有效期">
              </el-table-column>
              <el-table-column
                sortable
                width="150"
                prop="serviceCharge"
                label="软件服务费">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="oid"
                label="操作者id">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="150">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    icon="el-icon-edit"
                    circle
                    @click="editRestaurant(scope.row,scope.$index);  addOrEdit = 2; dialogFormVisibleMsg = true">
                  </el-button>
                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    circle
                    @click.native.prevent="deleteRestaurant(scope.row,scope.$index)">
                  </el-button>
                  <el-button-group>
                    <el-button size="mini" icon="el-icon-sort-up"></el-button>
                    <el-button size="mini" icon="el-icon-sort-down"></el-button>
                  </el-button-group>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
      </el-tabs>

      <!--餐厅信息弹框-->
      <el-dialog top="4vh" title="餐厅信息" :visible.sync="dialogFormVisibleMsg" ref="showRestaurantData">
        <el-form :model="restaurantData" ref="confirmRestaurantData" :rules="rulesRestaurantData">
          <el-form-item label="餐厅名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="restaurantData.name" auto-complete="off" placeholder="请填写餐厅名称"></el-input>
          </el-form-item>
          <el-form-item label="餐厅介绍" :label-width="formLabelWidth">
            <el-input v-model="restaurantData.description" auto-complete="off" placeholder="请填写简要餐厅介绍"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
            <el-input v-model.number="restaurantData.phone" auto-complete="off" placeholder="请填写餐厅固定电话"></el-input>
          </el-form-item>
          <el-form-item label="餐厅类型" :label-width="formLabelWidth" prop="tid" style="text-align: left">
            <el-select v-model.number="restaurantData.tid" placeholder="请选择餐厅类型">
              <el-option label="快餐店" value="1"></el-option>
              <el-option label="粉店" value="2"></el-option>
              <el-option label="餐馆" value="3"></el-option>
              <el-option label="早餐馆" value="4"></el-option>
              <el-option label="其他" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="餐厅状态" :label-width="formLabelWidth" prop="status" style="text-align: left">
            <el-select v-model="restaurantData.status" placeholder="餐厅状态">
              <el-option label="可用" value="enable"></el-option>
              <el-option label="不可用" value="disable"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="餐厅地址" :label-width="formLabelWidth">
            <el-cascader
              :options="options2"
              @active-item-change="handleItemChange"
              :props="props"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" :label-width="formLabelWidth" prop="address">
            <el-input v-model="restaurantData.address" auto-complete="off" placeholder="请填写餐厅详细地址"></el-input>
          </el-form-item>
          <el-form-item label="法人" :label-width="formLabelWidth">
            <el-input v-model.number="restaurantData.pid" auto-complete="off" placeholder="请填写法人id"></el-input>
          </el-form-item>
          <el-form-item label="业务员" :label-width="formLabelWidth">
            <el-input v-model.number="restaurantData.eid" auto-complete="off" placeholder="请填写业务员id"></el-input>
          </el-form-item>
          <el-form-item label="饿了么" :label-width="formLabelWidth">
            <el-input v-model="restaurantData.eleId" auto-complete="off" placeholder="请填写饿了么id"></el-input>
          </el-form-item>
          <el-form-item label="Wifi名" :label-width="formLabelWidth">
            <el-input v-model="restaurantData.wifiName" auto-complete="off" placeholder="请填写Wifi名"></el-input>
          </el-form-item>
          <el-form-item label="Wifi密码" :label-width="formLabelWidth">
            <el-input v-model="restaurantData.wifiPassword" auto-complete="off" placeholder="请填写Wifi密码"></el-input>
          </el-form-item>
          <el-form-item label="品牌名称" :label-width="formLabelWidth">
            <el-input v-model="restaurantData.brandName" auto-complete="off" placeholder="请填写品牌名称"></el-input>
          </el-form-item>
          <el-form-item label="LOGO" :label-width="formLabelWidth">
              <upload :name="picCollection.brandLogo"></upload>
          </el-form-item>
          <el-form-item label="时间段" :label-width="formLabelWidth">
            <el-time-picker
              style="width: 170px"
              :picker-options="{
                selectableRange: '06:30:00 - 23:30:00'
              }"
              placeholder="任意时间点">
            </el-time-picker>
            <el-col class="line" style="text-align: center; display: inline-block; float: none" :span="2">-</el-col>
            <el-time-picker
              style="width: 170px"
              arrow-control
              :picker-options="{
                selectableRange: '06:30:00 - 23:30:00'
              }"
              placeholder="任意时间点">
            </el-time-picker>
          </el-form-item>
          <el-form-item label="执照号" :label-width="formLabelWidth" prop="businessPermitNum">
            <el-input v-model.number="restaurantData.businessPermitNum" auto-complete="off" placeholder="请填写餐厅执照号"></el-input>
          </el-form-item>
          <el-form-item label="执照图" :label-width="formLabelWidth">
            <upload :name="picCollection.businessPermitImg"></upload>
          </el-form-item>
          <el-form-item label="许可证号" :label-width="formLabelWidth" prop="foodPermitNum">
            <el-input v-model.number="restaurantData.foodPermitNum" auto-complete="off" placeholder="请填写食品许可证号"></el-input>
          </el-form-item>
          <el-form-item label="许可证图" :label-width="formLabelWidth">
            <upload :name="picCollection.foodPermitImg"></upload>
          </el-form-item>
          <el-form-item label="门头大图" :label-width="formLabelWidth">
            <upload :name="picCollection.doorImg"></upload>
          </el-form-item>
          <el-form-item label="收银台图" :label-width="formLabelWidth">
            <upload :name="picCollection.cashierDeskImg"></upload>
          </el-form-item>
          <el-form-item id="sencePic" label="场景图" :label-width="formLabelWidth">
            <upload :name="picCollection.sceneImgOne"></upload>
            <upload :name="picCollection.sceneImgTwo"></upload>
            <upload :name="picCollection.sceneImgThree"></upload>
          </el-form-item>
          <el-form-item label="店铺经度" :label-width="formLabelWidth">
            <el-input v-model="restaurantData.longitude" auto-complete="off" placeholder="请填写店铺经度"></el-input>
          </el-form-item>
          <el-form-item label="店铺纬度" :label-width="formLabelWidth">
            <el-input v-model="restaurantData.latitude" auto-complete="off" placeholder="请填写店铺纬度"></el-input>
          </el-form-item>
          <el-form-item label="服务费" :label-width="formLabelWidth">
            <el-input v-model="restaurantData.serviceChange" auto-complete="off" placeholder="请填写软件服务费"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="restaurantData.remark" auto-complete="off" placeholder="备注"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" v-if="addOrEdit === 2">
          <el-button @click="dialogFormVisibleMsg = false">取 消</el-button>
          <el-button type="primary" @click="updateReataurant('confirmRestaurantData','showRestaurantData')">修 改</el-button>
        </div>
        <div slot="footer" class="dialog-footer" v-if="addOrEdit === 1">
          <el-button @click="dialogFormVisibleMsg = false" v-if="">取 消</el-button>
          <el-button type="primary" @click="addRestaurant('confirmRestaurantData','showRestaurantData')">保 存</el-button>
        </div>
      </el-dialog>

      <!--餐厅法人弹框-->
      <el-dialog top="8vh" title="法人信息" :visible.sync="dialogFormVisibleCeo">
        <el-form :model="eidForm">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="eidForm.name" auto-complete="off" placeholder="请填写法人身份证姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-select v-model="eidForm.region" placeholder="请选择性别">
              <el-option label="女" value="shanghai"></el-option>
              <el-option label="男" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="身份证号" :label-width="formLabelWidth">
            <el-input v-model="eidForm.idCard" auto-complete="off" placeholder="请填写法人身份证号，业务人员请仔细核对"></el-input>
          </el-form-item>
          <el-form-item label="证件正面" :label-width="formLabelWidth">

          </el-form-item>
          <el-form-item label="证件背面" :label-width="formLabelWidth">

          </el-form-item>
          <el-form-item label="银行卡号" :label-width="formLabelWidth">
            <el-input v-model="eidForm.name" auto-complete="off" placeholder="请填写法人的银行卡号，业务人员请仔细核对"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" :label-width="formLabelWidth">
            <el-input v-model="eidForm.phone" auto-complete="off" placeholder="请填写法人常用手机号码"></el-input>
          </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleCeo = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisibleCeo = false">保 存</el-button>
        </div>
      </el-dialog>

      <!--添加餐厅按钮-->
      <div class="bnt-group">
        <el-button-group>
          <el-button size="large" type="primary" icon="el-icon-plus" @click="dialogFormVisibleMsg = true; addOrEdit = 1">新增餐厅</el-button>
        </el-button-group>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import upload from '@/components/upload/upload'

    export default {
      components:{
        upload
      },
      data (){
        return{
          picCollection: {
            brandLogo: 'restaurant/brandLogo/',
            businessPermitImg: 'restaurant/businessPermitImg/',
            foodPermitImg: 'restaurant/foodPermitImg/',
            logo: 'restaurant/logo/',
            doorImg: 'restaurant/doorImg/',
            cashierDeskImg: 'restaurant/cashierDeskImg/',
            sceneImgOne: 'restaurant/sceneImgOne/',
            sceneImgTwo: 'restaurant/sceneImgTwo/',
            sceneImgThree: 'restaurant/sceneImgThree/',
          },
          response:{},
          activeName: 'first',
          addOrEdit: 0,
          dialogFormVisible: false,
          dialogFormVisibleMsg: false,
          dialogFormVisibleCeo: false,
          dialogFormVisibleBrief: false,
          dialogFormVisibleName: false,
          formLabelWidth: '80px',
          eidForm: {
            name: '',
            gender: 1,
            region: '',
            idCard:'',
            phone:'',
          },

          restaurantDataTable: [{
            name: '一家粉店',
            tid: 0,
            status: 1,
            phone: 15773153167,
            backupPhone: '',
            country: '',
            province: '',
            city: '',
            area: '',
            address: '华府一航2915',
            pid: 0,
            eid: '',
            eleId: '',
            wifiName: '',
            wifiPassword: '',
            brandName: '',
            brandLogo: '',
            business: '',
            businessPermitNum: 2012323201212,
            businessPermitImg: '',
            foodPermitNum: 2012323201215,
            foodPermitImg: '',
            logo: '',
            doorImg: '',
            cashierDeskImg: '',
            sceneImgOne: '',
            sceneImgTwo: '',
            sceneImgThree: '',
            description: '',
            remark: '',
            longitude: '',
            latitude: '',
            createTime: '',
            updateTime: '',
            expireTime: '',
            expireDay: '',
            serviceChange: '',
            oid: ''
          }],
          restaurantData: {
          },
          restaurantIndex: 0,

          options2: [{
            label: '江苏',
            cities: []
          }, {
            label: '浙江',
            cities: []
          }],
          props: {
            value: 'label',
            children: 'cities'
          },
          fileList: [{
            name: '1.jpg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }],
          rulesRestaurantData: {
            name: [
              {required: true, message:'请输入名', trigger:'blur'},
            ],
            // tid: [
            //   {required: true, message:'请选择类型', trigger:'blur'},
            //   {type: 'number', required: true, message: '请输入数字', trigger: 'blur'}
            // ],
            // status: [
            //   {required: true, message:'请输入状态', trigger:'change'},
            // ],
            phone: [
              {required: true, message:'请输入电话号码', trigger:'blur'},
              {type: 'number', required: true, message: '请输入数字', trigger: 'blur'}
            ],
            // address: [
            //   {required: true, message:'请输入地址', trigger:'blur'},
            // ],
            // businessPermitNum: [
            //   {required: true, message:'请输入营业证号', trigger:'blur'},
            //   {type: 'number', required: true, message: '请输入数字', trigger: 'blur'}
            // ],
            // foodPermitNum: [
            //   {required: true, message:'请输入食品生产许可证', trigger:'blur'},
            //   {type: 'number', required: true, message: '请输入数字', trigger: 'blur'}
            // ],
          },
        }
      },
      created(){
        this._pullTable();
      },
      methods: {
        // 拉取列表
        _pullTable(){
          var Data =[
            {
              feild: 'time',
              value: '',
              joinType: 'time'
            }
          ]
          this.$request(this.url.restaurant2,'json',Data).then((res)=>{
            let response = res.data.data
            this.restaurantDataTable = response
            console.log(response);
          }).catch((err)=>{
            console.log(err);
          })
        },
        //增加餐厅
        addRestaurant(formName1,formName2){
          console.log(formName1);
          console.log(formName2);
          let data = this.restaurantData
          console.log(data);
          this.$refs[formName1].validate((valid) => {
            if (valid) {
              this.dialogFormVisibleMsg = !this.dialogFormVisibleMsg
              this.$request(this.url.restaurant1,'json',data).then((res)=>{
                this.$message({
                  type: 'success',
                  message: '数据提交成功!'
                });
                this.restaurantDataTable.push(data);
              }).catch((err)=>{
                this.$message({
                  type: 'info',
                  message: '数据提交失败!'
                });
                console.log(err);
              })
            }else{
              this.$message.error(
                '信息不完整或者填写错误！!'
              );
              return false;
            }
          });
        },

        //删除餐厅
        deleteRestaurant (row,index) {
          let data = {
            id:row.id
          }
          this.$confirm('是否删除该餐厅?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$request(this.url.restaurant3,'form',data).then((res)=>{
              this.$message({
                type: 'success',
                message: '数据提交成功!'
              });
              this.restaurantDataTable.splice(index,1)
            }).catch((err)=>{
              this.$message({
                type: 'info',
                message: '数据提交失败!'
              });
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

        //修改餐厅
        editRestaurant (row,index) {
          this.restaurantData = Object.assign({},row);
          this.restaurantIndex = index;
          // to  updateReataurant
        },
        updateReataurant(){
          // let row = this.restaurantData
          let updateObj = {
            id:this.restaurantData.id
          };
          for(let key in this.restaurantData){
            if(this.restaurantData[key] === this.restaurantDataTable[this.restaurantIndex][key]){
              continue;
            }
            updateObj[key] = this.restaurantData[key];
          }
          console.log(updateObj);
          // let index = this.restaurantIndex
          this.$request(this.url.restaurant4,'json',updateObj).then((res)=>{
            this.$message({
              type: 'success',
              message: '数据提交成功!'
            });
            this.dialogFormVisibleMsg = !this.dialogFormVisibleMsg
            this._pullTable();
            // this.restaurantDataTable[this.restaurantIndex] = row
            // console.log(this.restaurantDataTable[this.restaurantIndex]);
          }).catch((err)=>{
            this.$message({
              type: 'info',
              message: '数据提交失败!'
            });
            console.log(err);
          })
        },


        handleClick(row) {
          console.log(row);
        },
        handleItemChange(val) {
          console.log('active item:', val);
          setTimeout(_ => {
            if (val.indexOf('江苏') > -1 && !this.options2[0].cities.length) {
              this.options2[0].cities = [{
                label: '南京'
              }];
            } else if (val.indexOf('浙江') > -1 && !this.options2[1].cities.length) {
              this.options2[1].cities = [{
                label: '杭州'
              }];
            }
          }, 300);
        },
      }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .el-table th>.cell
    text-align center !important

  .el-button.is-circle
    padding 7px

  .el-button-group
    &:first-child
      margin 0px auto !important

  .bnt-group
    width 100%
    position fixed
    bottom 2%
    z-index 15
    .el-button-group
      margin-bottom 3% !important
      margin-left 58% !important
    .block,.small-block
      width 73%

  .text
    font-size: 14px

  .item
    margin-bottom: 18px;


  .el-button
    margin 5px

  .clearfix:before, .clearfix:after
    display: table
    content: ""

  .clearfix:after
    clear: both

  .el-tab-pane
    display flex
    flex-wrap wrap
    .box-card
      width: 280px
      margin 15px
      &:hover
        border 1px solid #409EFF

  .el-upload__tip
    opacity 0.5

  .el-dialog
    margin-top 20px !important

  .el-upload
    margin 0 auto

  .el-table td, .el-table th
    padding 0px
    .el-button
      padding 6px !important
      margin 0px !important

  .el-button--mini, .el-button--mini.is-round
    padding 3px 8px

  #sencePic
    div
      display flex !important
</style>
