
<template>
  <div class="goods">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <!--菜品模块-->
        <el-tab-pane label="菜品列表" name="first">
          <template>
          <!-- <span>{{msg}}</span> -->
            <el-table
              v-loading="loading"
              :data="dishesDataTable"
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
                        @click="editDishes(scope.row,scope.$index); visible2 = false ;dialogFormVisibleGoodsPlus = true"
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
              <!--<el-table-column-->
                <!--sortable-->
                <!--width="150"-->
                <!--prop="bannerImg"-->
                <!--label="banner">-->
                <!--<template slot-scope="scope">-->
                  <!--<img class="previewImg" :src="'https://order-online.oss-cn-shenzhen.aliyuncs.com' + scope.row.bannerImg" alt="未上传">-->
                <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column
                sortable
                width="150"
                prop="thumb"
                label="缩略图">
                <template slot-scope="scope">
                  <img class="previewImg" :src="'https://order-online.oss-cn-shenzhen.aliyuncs.com' + scope.row.thumb" alt="未上传">
                </template>
              </el-table-column>
              <!--<el-table-column-->
                <!--sortable-->
                <!--width="150"-->
                <!--prop="highDefinitionImg"-->
                <!--label="高清图">-->
                <!--<template slot-scope="scope">-->
                  <!--<img class="previewImg" :src="'https://order-online.oss-cn-shenzhen.aliyuncs.com' + scope.row.highDefinitionImg" alt="未上传">-->
                <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column
                sortable
                width="150"
                prop="showType"
                label="展示类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.showType === 'always'">一直展示</span>
                  <span v-if="scope.row.showType === 'sometimes'">按时间段</span>
                  <span v-if="scope.row.showType === 'invisible'">不展示</span>

                </template>
              </el-table-column>
              <el-table-column
                sortable
                prop="sale"
                label="售卖情况"
                width="120">
              </el-table-column>

              <el-table-column
                sortable
                width="100"
                prop="normalPrice"
                label="标准价">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="memberPrice"
                label="会员价">
              </el-table-column>
              <el-table-column
                sortable
                width="100"
                prop="promotionPrice"
                label="活动价">
              </el-table-column>
              <el-table-column
                sortable
                prop="stock"
                label="库存"
                width="100">
                <template slot-scope="scope">
                  <span v-if="scope.row.stock === -1">无限</span>
                  <span v-else>{{scope.row.stock}}</span>
                </template>
              </el-table-column>
              <el-table-column
                sortable
                width="150"
                prop="description"
                label="描述">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>{{ scope.row.description }}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.description }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>


              <!--<el-table-column-->
                <!--sortable-->
                <!--width="150"-->
                <!--prop="banner"-->
                <!--label="banner">-->
                <!--<template slot-scope="scope">-->
                    <!--<img class="previewImg" :src="'https://order-online.oss-cn-shenzhen.aliyuncs.com' + scope.row.banner" alt="未上传">-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--sortable-->
                <!--width="150"-->
                <!--prop="bannerStatus"-->
                <!--label="banner状态">-->
              <!--</el-table-column>-->
              <el-table-column
                v-if="changeSortShow === 0"
                fixed="right"
                label="排序"
                width="110">
                <template slot-scope="scope">
                  <!--<el-button-->
                    <!--type="primary"-->
                    <!--size="mini"-->
                    <!--icon="el-icon-edit"-->
                    <!--circle-->
                    <!--@click="editDishes(scope.row,scope.$index); dialogFormVisibleGoodsPlus = true">-->
                  <!--</el-button>-->
                  <!--<el-button-->
                    <!--type="danger"-->
                    <!--size="mini"-->
                    <!--icon="el-icon-delete"-->
                    <!--circle-->
                    <!--@click.native.prevent="deleteDishes(scope.row,scope.$index)">-->
                  <!--</el-button>-->
                  <el-button-group>
                    <el-button size="mini" icon="el-icon-sort-up" @click="sortUP"></el-button>
                    <el-button size="mini" icon="el-icon-sort-down"></el-button>
                  </el-button-group>
                </template>
              </el-table-column>
            </el-table>
            <editcontrol @plusMethods="plusMethodsThis"></editcontrol>
          </template>
        </el-tab-pane>

        <!--特性模块-->
        <el-tab-pane label="特性管理" name="second">

          <!--分类-->
          <div class="categoryGroup">
            <h6>请不要建立同名分类，注意：所有分类都必须有菜品！</h6>
            <span style="width: 20%;">分类：</span>
            <span style="width: 80%;">
            <el-tag
              :key="index"
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

          <!--规格-->
          <div class="categoryGroup">
            <h6>请不要建立同名规格类</h6>
            规格：
            <el-tag
              :key="index"
              v-for="(tag,index) in dynamicTags2"
              closable
              :disable-transitions="false"
              @close="handleClose2(tag,index)"
            >
              <span>{{tag.name}}</span>
              <el-button
                type="primary"
                style="padding: 5px"
                size="mini"
                icon="el-icon-edit"
                circle
                @click.native="editSpec(tag,index)"
              ></el-button>
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible2"
              v-model="inputValue2"
              ref="saveTagInput2"
              @keyup.enter.native="handleInputConfirm2"
              @blur="handleInputConfirm2"
            >
            </el-input>
            <el-button v-else class="button-new-tag" @click="showInput2">+ 新一类规格</el-button>
          </div>

          <!--标签-->
          <div class="tagGroup">
            <h6>请不要建立同名标签</h6>
            标签：
            <el-tag
              :key="index"
              v-for="(tag,index) in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag,index)"
            >
              {{tag.name}}
              <el-button
                type="primary"
                style="padding: 5px"
                size="mini"
                icon="el-icon-edit"
                circle
                @click.native="editTags(tag,index)"
              ></el-button>
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"

            >
            </el-input>
            <el-button v-else class="button-new-tag" @click="showInput">+ 新标签</el-button>
          </div>

          <!--推广标签-->
          <div class="tagGroup">
            <h6>请不要建立同名标签</h6>
            推广标签：
            <el-tag
              :key="index"
              v-for="(tag,index) in dynamicTagsPopularize"
              closable
              :disable-transitions="false"
              @close="handleClosePopularize(tag,index)"
            >
              {{tag.name}}
              <el-button
                type="primary"
                style="padding: 5px"
                size="mini"
                icon="el-icon-edit"
                circle
                @click.native="editTagsPopularize(tag,index)"
              ></el-button>
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisiblePopularize"
              v-model="inputValuePopularize"
              ref="saveTagInputPopularize"
              @keyup.enter.native="handleInputConfirmPopularize"
              @blur="handleInputConfirmPopularize"

            >
            </el-input>
            <el-button v-else class="button-new-tag" @click="showInputPopularize">+ 新标签</el-button>
          </div>
        </el-tab-pane>
        <!--未开发功能-->
        <!--<el-tab-pane label="菜品统计" name="fourth">-->
          <!--菜品统计，正在建设中……-->
        <!--</el-tab-pane>-->

      </el-tabs>

    <!--标签弹框-->
    <el-dialog
      width="80%" title="标签编辑"
      :visible.sync="dialogFormVisibleTagEdit"
      ref="showTags">
      <el-form  :label-width="formLabelWidth" status-icon :model="toDynamicTags" :rules="rules" ref="DynamicTags">
        <el-form-item label="标签名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="toDynamicTags.name" auto-complete="off" placeholder="请输入标签名"></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth" prop="zindex">
          <el-input v-model.number="toDynamicTags.zindex" auto-complete="off" placeholder="请输入数字"></el-input>
        </el-form-item>
        <el-form-item label="状态" style="text-align: left">
          <el-select clearable v-model="toDynamicTags.status" placeholder="请选择状态">
            <el-option
              v-for="item in categoryStatus"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签类型" style="text-align: left">
          <el-select clearable v-model="toDynamicTags.chargeType" placeholder="请选择标签类型">
            <el-option
              v-for="item in tagType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="toDynamicTags.chargeType === 'charge'" class="price-form" label="价格">
          <el-input
            size="small"
            v-model.number="toDynamicTags.price"
            auto-complete="off"
            placeholder="请输入价格"
            class="price-item"
          >
            <template slot="prepend">普通价</template>
          </el-input>
        </el-form-item>
        <el-form-item style="display: flex;justify-content: flex-end;">
          <el-button @click="dialogFormVisibleTagEdit = false">取 消</el-button>
          <el-button type="primary" @click="updateTags('DynamicTags','showTags')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


    <!--推广标签弹框-->
    <el-dialog
      width="80%" title="推广标签编辑"
      :visible.sync="dialogFormVisiblePopularizeTagEdit"
      ref="showTags">
      <el-form
        :label-width="formLabelWidth"
        status-icon :model="toDynamicTagsPopularize"
        :rules="rules"
        ref="DynamicTags">
        <el-form-item label="标签名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="toDynamicTagsPopularize.name" auto-complete="off" placeholder="请输入标签名"></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth" prop="zindex">
          <el-input v-model.number="toDynamicTagsPopularize.zindex" auto-complete="off" placeholder="请输入数字"></el-input>
        </el-form-item>
        <el-form-item label="状态" style="text-align: left">
          <el-select clearable v-model="toDynamicTagsPopularize.status" placeholder="请选择状态">
            <el-option
              v-for="item in categoryStatus"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="标签类型" style="text-align: left">
          <el-select v-model="toDynamicTagsPopularize.chargeType" placeholder="请选择标签类型">
            <el-option
              v-for="item in tagType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="标签类型" style="text-align: left">
          <upload
            v-on:ToUrl="listenUrlPopularizeTags"
            :name="UID('/PopularizeTags/')"
            :target="this.dynamicTagsPopularize.thumb"></upload>
        </el-form-item>

        <el-form-item style="display: flex;justify-content: flex-end;">
          <el-button @click="dialogFormVisiblePopularizeTagEdit = false">取 消</el-button>
          <el-button type="primary" @click="updatePopularizeTags('DynamicTags','showTags')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


    <!--分类弹框-->
    <el-dialog
      top="5vh"
      width="80%"
      title="分类编辑"
      :visible.sync="dialogFormVisibleCategoryEdit"
      ref="showCategory">
      <el-form :label-width="formLabelWidth" status-icon :model="toDynamicTags1" :rules="rules1" ref="toDynamicTags1">
        <el-form-item label="分类名" prop="name">
          <el-input v-model="toDynamicTags1.name" auto-complete="off" placeholder="请输入分类名"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="zindex">
          <el-input v-model.number="toDynamicTags1.zindex" auto-complete="off" placeholder="请输入数字"></el-input>
        </el-form-item>
        <el-form-item label="状态" style="text-align: left">
          <el-select clearable v-model="toDynamicTags1.status" placeholder="请选择状态">
            <el-option
              v-for="item in categoryStatus"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类介绍" >
          <el-input v-model="toDynamicTags1.description" auto-complete="off" placeholder="请输入描述"></el-input>
        </el-form-item>
        <el-form-item label="展示类型" prop="showType">
          <el-select clearable v-model="toDynamicTags1.showType" placeholder="请选择展示类型">
            <el-option
              v-for="item in categoryShowType"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="toDynamicTags1.showType === 'sometimes'" v-model="toDynamicTags1.showTime" label="时间段" :label-width="formLabelWidth">
          <el-time-picker
            style="width: 170px"
            v-model="categoryStartTimePre"
            :picker-options="{
                selectableRange: '06:30:00 - 23:30:00'
              }"
            :placeholder="categoryStartTimePre">
          </el-time-picker>
          <el-col class="line" style="text-align: center; display: inline-block; float: none" :span="2">-</el-col>
          <el-time-picker
            style="width: 170px"
            arrow-control
            v-model="categoryEndTimePre"
            @change="categoryEndTimeFun"
            :picker-options="{
                selectableRange: '06:30:00 - 23:30:00'
              }"
            :placeholder="categoryEndTimePre">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="打印机" prop="pid">
          <el-select clearable v-model="toDynamicTags1.pid" placeholder="请选择">
            <el-option
              v-for="(item,index) in pid"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="display: flex;justify-content: flex-end;">
            <el-button @click="dialogFormVisibleCategoryEdit = false">取 消</el-button>
            <el-button type="primary" @click="updateCategory('toDynamicTags1','showCategory')">确 定</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>

    <!--SKU弹框-->
    <el-dialog
      width="80%"
      title="规格编辑"
      :visible.sync="dialogFormVisibleSKUEdit">
      <el-form :model="toDynamicTags2" :rules="rules">
        <div class="SKUGroup">
          <el-form-item label="规格名" prop="name" :label-width="formLabelWidth">
            <el-input
              style="display: inline"
              v-model="toDynamicTags2.name"
              placeholder="请输入SKU规格名"
            ></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="zindex" :label-width="formLabelWidth">
            <el-input
            style="display: inline"
            v-model="toDynamicTags2.zindex"
            placeholder="请输入SKU排序"
          ></el-input>
          </el-form-item>
          <h6>请不要建立同名SKU</h6>

          <!--SKU内部标签-->
          <el-tag
            :key="tag.zindex"
            v-for="(tag,index) in toDynamicTags2.attrs"
            closable
            :disable-transitions="false"
            @close="handleClose3(tag,index)"
          >

            {{tag.name}}
            <!--<el-button-->
              <!--type="primary"-->
              <!--style="padding: 5px"-->
              <!--size="mini"-->
              <!--icon="el-icon-edit"-->
              <!--circle-->
              <!--@click.native="editAttr(tag)"-->
            <!--&gt;</el-button>-->

          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible3"
            v-model="inputValue3"
            ref="saveTagInput3"
            @keyup.enter.native="handleInputConfirm3"
            @blur="handleInputConfirm3"
          >
          </el-input>

          <el-button v-else class="button-new-tag" @click="showInput3">+ 新规格项</el-button>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleSKUEdit = false">取 消</el-button>
        <el-button type="primary" @click="updateSpec">确 定</el-button>
      </div>
    </el-dialog>

    <!--SKU内部弹框 属性修改-->
    <!--<el-dialog width="80%" title="SKU编辑" :visible.sync="dialogFormVisibleInSKUEdit">-->
      <!--<el-form :model="toDynamicTags3">-->
        <!--<el-form-item label="排序" :label-width="formLabelWidth">-->
          <!--<el-input v-model="toDynamicTags3.zindex" auto-complete="off" placeholder="请输入数字"></el-input>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button @click="dialogFormVisibleInSKUEdit = false">取 消</el-button>-->
        <!--<el-button type="primary" @click="updateAttrs()">确 定</el-button>-->
      <!--</div>-->
    <!--</el-dialog>-->

    <!--添加菜品弹框-->
    <el-dialog
      top="3vh"
      width="80%"
      title="增加菜品"
      :visible.sync="dialogFormVisibleGoodsPlus"
      ref="showDishesData">
      <div class="matter2">
        <span
          class="matter2-hint">该部分为必填
        </span>
        <el-form :inline="true" :rules="rules2" ref="confirmDishesData" status-icon :model="dishes" :label-width="formLabelWidth">
          <el-form-item label="品名" width="227px" prop="name">
            <el-input autofocus="true" v-model="dishes.name" auto-complete="off" placeholder="请输入品名"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="cid">
            <el-select clearable v-model="dishes.cid" clearable placeholder="请选择，默认其他">
              <el-option
                v-for="item in dynamicTags1"
                :key="item.zindex"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数量" prop="stock">
            <el-input v-model.number="dishes.stock" auto-complete="off" placeholder="请输入数量"></el-input>
          </el-form-item>
          <el-form-item label="打印机" prop="pid">
            <el-select clearable v-model="dishes.pid" placeholder="请选择">
              <el-option
                v-for="(item,index) in pid"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序" prop="zindex">
            <el-input v-model.number="dishes.zindex" auto-complete="off" placeholder="请输入序号"></el-input>
          </el-form-item>

          <el-form-item label="单位" prop="uid">
            <el-select clearable v-model="dishes.uid" placeholder="请选择单位">
              <el-option
                v-for="item in unit"
                :key="item.zindex"
                :label="item.name"
                :value="item.id"
                @change="getUnit"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <el-form  :rules="rules2" ref="DynamicTags2" status-icon :model="dishes" :label-width="formLabelWidth">
          <el-form-item label="菜品介绍" prop="description">
            <el-input type="textarea" v-model="dishes.description" auto-complete="off" placeholder="请输入菜品介绍,50字以内"></el-input>
          </el-form-item>
          <el-form-item label="展示类型" prop="showType">
            <el-select clearable v-model="dishes.showType" placeholder="请选择时间段">
              <el-option
                v-for="item in showType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="dishes.showType === 'sometimes'" v-model="dishes.showTime" label="时间段" :label-width="formLabelWidth">
            <el-time-picker
              style="width: 170px"
              v-model="startTime"
              :picker-options="{
                selectableRange: '06:30:00 - 23:30:00'
              }"
              :placeholder="startTimePre">
            </el-time-picker>
            <el-col class="line" style="text-align: center; display: inline-block; float: none" :span="2">-</el-col>
            <el-time-picker
              style="width: 170px"
              arrow-control
              v-model="endTime"
              @change="endTimeFun"
              :picker-options="{
                selectableRange: '06:30:00 - 23:30:00'
              }"
              :placeholder="endTimePre">
            </el-time-picker>
          </el-form-item>


        <!--菜品价格类型：标准价格、会员价格、活动价格-->
          <el-form-item class="price-form" label="价格" prop="price">
            <el-input
              size="small"
              v-model.number="dishes.normalPrice"
              auto-complete="off"
              :value.number="dishes.normalPrice"
              placeholder="请输入价格"
              class="price-item"
            >
              <template slot="prepend">普通价</template>
            </el-input>
            <el-input
              size="small"
              v-model.number="dishes.memberPrice"
              auto-complete="off"
              :value.number="mPrice"
              placeholder="会员价"
              class="price-item"
            >
              <template slot="prepend"><el-checkbox v-model="checked2"></el-checkbox>&nbsp;会员价{{memberDiscont}}</template>
            </el-input>
            <el-input
              size="small"
              v-model.number="dishes.promotionPrice"
              auto-complete="off"
              :value.number="pPrice"
              placeholder="活动价"
              class="price-item"
            >
              <template slot="prepend"><el-checkbox v-model="checked3"></el-checkbox>&nbsp;活动价{{promotionDiscont}}</template>
            </el-input>
          </el-form-item>
          <div style="display: flex;">
            <el-form-item style="width: 20%;float: left" label="缩略图" prop="thumb">
              <upload
                v-on:ToUrl="listenUrl"
                :name="UID('/dishes/')"
                :target="this.dishes.thumb"></upload>
            </el-form-item>
            <el-form-item style="width: 20%;float: left" label="高清图" prop="highDefinitionImg">
              <upload
                v-on:ToUrl="listenUrl1"
                :name="UID('/dishes/')"
                :target="this.dishes.highDefinitionImg"></upload>
            </el-form-item>
            <el-form-item style="width: 20%;float: left" label="菜单图" prop="bannerImg">
              <upload
                v-on:ToUrl="listenUrl2"
                :name="UID('/dishes/')"
                :target="this.dishes.bannerImg"></upload>
            </el-form-item>
            <!--<el-form-item style="width: 20%;float: left" label="banner" prop="banner">-->
              <!--<upload-->
                <!--v-on:ToUrl="listenUrl3"-->
                <!--:name="UID('/dishes/')"-->
                <!--:target="this.dishes.banner"></upload>-->
            <!--</el-form-item>-->
            <!--<el-form-item style="width: 20%;float: left" label="推广图" prop="bannerStatus">-->
              <!--<upload :name="dishes.bannerImg"></upload>-->
            <!--</el-form-item>-->
          </div>
        </el-form>
      </div>

      <!--菜品特性编辑-->

      <div class="matter2">
        <span
          class="matter2-hint">该部分为非必填，数据可在
          <el-button @click="toNature" type="primary" plain style="padding: 4px" size="mini" round>&nbsp;特性管理&nbsp;</el-button>编辑
        </span>
        <el-form :label-width="formLabelWidth" :model="dishes" status-icon :rules="rules2">

          <el-form-item label="推广标签">
            <el-select
              clearable
              style="display: inline-block; width: 555px"
              v-model="valueOfTagsPopularize"
              multiple placeholder="请选择，默认无标签">
              <el-option
                v-for="(item,index) in dynamicTagsPopularize"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>

          </el-form-item>
          <p v-if="valueOfTagsPopularizeShow === 1" style="display: flex;justify-content: left">
            &nbsp;&nbsp;&nbsp;已选&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button
              size="mini"
              style="padding: 4px"
              round
              type="primary"
              v-for="item in valueOfTagsPopularize1">{{item.name}}
            </el-button>
          </p>


          <el-form-item label="添加标签">
            <el-select
              clearable
              style="display: inline-block; width: 555px"
              v-model="valueOfTags"
              multiple placeholder="请选择，默认无标签">
              <el-option
                v-for="(item,index) in dynamicTags"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <p v-if="dynamicTagsOldShow === 1" style="display: flex;justify-content: left">
            &nbsp;&nbsp;&nbsp;已选&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button
              size="mini"
              style="padding: 4px"
              round
              type="primary"
              v-for="item in dynamicTagsOld">{{item.name}}
            </el-button>
          </p>


          <el-form-item label="添加SKU">
            <el-select
              clearable
              style="display: inline-block; width: 555px"
              v-model="valueOfSKU"
              value-key="zindex"
              @change="optsChange"
              multiple placeholder="请选择，默认无SKU">
              <el-option
                v-for="(item,index) in dynamicTags2"
                :key="index"
                :label="item.name"
                :value="item"
              >
              </el-option>
            </el-select>
            <el-button type="primary" :loading="generating" @click="outputSku">生成SKU</el-button>
          </el-form-item>
          <p v-if="valueOfSKUOldShow === 1" style="display: flex;justify-content: left">
            &nbsp;&nbsp;&nbsp;已选&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button
              size="mini"
              style="padding: 4px"
              round
              type="primary"
              v-for="item in valueOfSKU1">{{item.name}}
            </el-button>
          </p>


          <el-form-item style="text-align: center " label-width="0px" v-if="this.generatTable === true">

          <!--sku2-->
            <el-table
              ref="multipleTable"
              :data="generateSkuDate"
              border
              @cell-mouse-enter="handleMouseEnter"
              @cell-mouse-leave="handleMouseOut"
              style="width: 100%;height: auto !important;">

              <el-table-column
                label="SKU"
                prop="content"
              >
              </el-table-column>
              <!--如何把normalPrice 和 dishes.normalPrice绑定起来-->
              <el-table-column
                prop="normalPrice"
                label="价格">
                <template scope="scope">
                  <input style="
                  border-radius: 8px;
                  border: 1px solid rgba(0,0,0,0.25);
                  height: 30px;
                  width: 89%;
                  outline: none;
                  padding: 0px 5%" class="SKUinput"
                         :value="scope.row.normalPrice"
                         @focus="changeStyle($event)"
                         @blur="priceBlurtest(scope.row,scope.$index,$event,'normalPrice')" type="number">
                </template>
              </el-table-column>
              <el-table-column
                prop="memberPrice"
                label="会员价"
              >
                <template scope="scope">
                  <input style="
                  border-radius: 8px;
                  border: 1px solid rgba(0,0,0,0.25);
                  height: 30px;
                  width: 89%;
                  outline: none;
                  padding: 0px 5%"  class="SKUinput"
                         :value="scope.row.memberPrice"
                         @focus="changeStyle($event)"
                         @blur="priceBlurtest(scope.row,scope.$index,$event,'memberPrice')" type="number">
                </template>
              </el-table-column>
              <el-table-column
                prop="promotionPrice"
                label="活动价"
              >
                <template scope="scope">
                  <input style="
                  border-radius: 8px;
                  border: 1px solid rgba(0,0,0,0.25);
                  height: 30px;
                  width: 89%;
                  outline: none;
                  padding: 0px 5%"  class="SKUinput"
                         :value="scope.row.promotionPrice"
                         @focus="changeStyle($event)"
                         @blur="priceBlurtest(scope.row,scope.$index,$event,'promotionPrice')" type="number">
                </template>
              </el-table-column>
            </el-table>
            <!--<i class="el-icon-refresh" @click="updateSKU">&nbsp;更新SKU</i>-->
          </el-form-item>
        </el-form>
      </div>

      <!--其他-->
      <div slot="footer" class="dialog-footer" v-if="addOrEdit === 2">
        <el-button @click="dialogFormVisibleGoodsPlus = false">取 消</el-button>
        <el-button type="primary" @click="updateDishes('confirmDishesData','showDishesData')">修改</el-button>
      </div>


      <div slot="footer" class="dialog-footer" v-if="addOrEdit === 1">
        <el-button @click="addDishesDelay('confirmDishesData','showDishesData')" icon="el-icon-time">暂不上架</el-button>
        <el-button @click="dialogFormVisibleGoodsPlus = false">取 消</el-button>
        <el-button type="primary" @click="addDishes('confirmDishesData','showDishesData')">立即上架</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import editcontrol from '@/components/editcontrol/editcontrol';
import upload from '@/components/upload/upload'

const ERR_OK = 0
export default {
  name: 'New',
  data(){
    var checkzindex = (rule, value, callback) => {
      if(this.repeatzindex === 2){
        callback(new Error('存在相同序号，不可建立相同序号项'));
      }else {
        callback();
      }
    };
    return {
      picReceive:'',
      screenWidth: document.body.clientWidth,
      changeSortShow: 0,
      startTimePre:'',
      endTimePre:'',
      categoryStartTimePre:'',
      categoryEndTimePre:'',
      imgColletin:{
        brandLogo: 'restaurant/brandLogo',
        businessPermitImg: 'restaurant/businessPermitImg',
        foodPermitImg: 'restaurant/foodPermitImg',
        logo: 'restaurant/logo',
        doorImg: 'restaurant/doorImg',
        cashierDeskImg: 'restaurant/cashierDeskImg',
        sceneImgOne: 'restaurant/sceneImgOne',
        sceneImgTwo: 'restaurant/sceneImgTwo',
        sceneImgThree: 'restaurant/sceneImgThree',
      },
      submitSpec:[],
      multipleSelection: [],
      generating: false,
      arr:[],
      generateSkuDate:[],
      visible2: false,
      startTime:'',
      endTime:'',
      categoryStartTime:'',
      categoryEndTime:'',
      generatTable:false,
      addOrEdit: 0,
      currentPage1:5,
      dialogFormVisibleGoodsPlus:false,
      dialogFormVisibleTagEdit: false,
      dialogFormVisibleSKUEdit: false,
      dialogFormVisibleCategoryEdit: false,
      dialogFormVisibleInSKUEdit: false,
      dialogFormVisiblePopularizeTagEdit:false,
      activeName: 'first',
      checked1: true,
      checked2: false,
      checked3: false,
      goods:[],
      loading: false,
      formLabelWidth:'80px',
      formLabelWidth1:'120px',
      memberDiscont: 0.8,
      promotionDiscont: 0.7,
      colorFont: '#409EFF',
      colorBg: '#409EFF',
      dishesIndex: 1,
      dishesData: {},
      dishesDataTable:[],
      dishes: {},
      showType: [
        {
          value: 'always',
          label: '经常展示'
        }, {
          value: 'invisible',
          label: '不展示'
        }, {
          value: 'sometimes',
          label: '选择时间段展示'
        }
      ],
      pid: [
        {
          value: 1,
          label: '默认端口1'
        }, {
          value: 2,
          label: '端口2'
        }, {
          value: 3,
          label: '端口3'
        }
      ],
      unit: [
        {
          id: 1,
          name: '份'
        }, {
          id: 2,
          name: '厅'
        }, {
          id: 3,
          name: '斤'
        }
      ],
      PreTag:[],
      PreSpec:[],
      PrePopularizeTag:[],
      tagType:[
        {
          value: 'free',
          label: '免费'
        }, {
          value: 'charge',
          label: '收费'
        }
      ],
      toDynamicTags: [],
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      toDynamicTagsPopularize: [],
      dynamicTagsPopularize: [],
      inputVisiblePopularize: false,
      inputValuePopularize: '',
      toDynamicTags1:[

      ],
      dynamicTags1: [
        // {
        //   zindex:'0',
        //   name:'其他',
        //   type:'',
        //   showTime:'',
        //   showType:'',
        //   pid: '',
        //   description: '',
        //   status: '',
        // },
      ],
      categoryPid:[
        {
          value:'1',
          name:'打印机1'
        },
        {
          value:'2',
          name:'打印机2'
        },
        {
          value:'3',
          name:'打印机3'
        },
      ],
      categoryStatus:[
        {
          value:'enable',
          name:'可用'
        },
        {
          value:'disable',
          name:'不可用'
        }
      ],
      categoryShowType:[
        {
          value:'always',
          name:'始终展示'
        },
        {
          value:'invisible',
          name:'始终不展示'
        },
        {
          value:'sometimes',
          name:'按时间段展示'
        }
      ],
      categoryIndex:'',
      inputVisible1: false,
      inputValue1: '',
      toDynamicTags2:[],
      dynamicTags2: [
        // {
        //   zindex:'0',
        //   name:'份量',
        //   attrs: [
        //     {
        //       name:''
        //     }
        //   ],
        // },
      ],
      inputVisible2: false,
      inputValue2: '',
      inputVisible3: false,
      inputValue3: '',
      printValue:'选项1',
      toDynamicTags3:[],
      value4: '',
      valueOfSKU: [],
      valueOfSKU1:[],
      valueOfSKUOldShow:0,
      valueOfTags: [],
      valueOfTagsPopularize: [],
      valueOfTagsPopularize1: [],
      valueOfTagsPopularizeShow:0,
      dynamicTagsOld:[],
      dynamicTagsOldShow:0,
      normalPrice:12,
      value6: '',
      fileList2: [
      ],
      rules: {
        zindex: [
          {required: true, message:'请输入序号', trigger:'blur'},
          {type: 'number', required: true, message: '请输入数字', trigger: 'blur'},
          {validator: checkzindex, trigger:'blur'}
        ],
        name: [
          {required: true, message:'请输入名称', trigger:'blur'}
        ],
      },
      rules1: {
        name : [
          {required: true, message:'请输入分类名', trigger:'blur'},
        ],
        zindex : [
          {required: true, message:'请输入序号', trigger:'blur'},
          {type: 'number', required: true, message: '请输入数字', trigger: 'blur'}
        ],
        // rid : [
        //   {required: true, message: '不能为空', trigger: 'blur'},
        //   {type: 'number', required: true, message: '请输入数字', trigger: 'blur'}
        // ],
      },
      rules2: {
        name: [
          {required: true, message:'请输入品名', trigger:'blur'},
        ],
        stock: [
          {required: true, message:'请输入库存', trigger:'blur'},
          {type: 'number', required: true, message: '请输入数字', trigger: 'blur'}
        ],
        cid: [
          {required: true, message:'请选择类别', trigger:'change'}
        ],
        zindex: [
          {required: true, message:'请输入序号', trigger:'blur'},
          {type: 'number', required: true, message: '请输入数字', trigger: 'blur'}
        ],
        pid: [
          {required: true, message:'请选择打印机', trigger:'change'}
        ],
        uid: [
          {required: true, message:'请输入序号', trigger:'change'}
        ],
        description: [
          {required: true, message:'请输入菜品描述', trigger:'blur'}
        ],
        showType: [
          {required: true, message:'请选择展示类型', trigger:'change'}
        ],
        // price: [
        //   {required: true, message:'请输入价格', trigger:'blur'},
        //   {type: 'number', required: true, message: '请输入数字', trigger: 'blur'}
        // ],
        thumb: [
          {required: true, message:'请上传一张图片', trigger:'change'}
        ]
      },
    }
  },
  computed:{
    normalPrice1: function(){
      return this.dishes.normalPrice
    },
    memberPrice1: function(){
      return this.dishes.memberPrice
    },
    promotionPrice1: function(){
      return this.dishes.promotionPrice
    },
    repeatzindex: function(){
      var n = 0;
      let zindex = this.toDynamicTags.zindex
      for(var i=0; i<this.dynamicTags.length; i++){
        if(this.dynamicTags[i].zindex === zindex){
          n++;
        }
      }
      return n;
    },
    // listGoods(){
    //   let tempArr = [];
    //   this.goods.forEach((item)=>{
    //     tempArr = tempArr.concat(item.foods);
    //   })
    //   return tempArr;
    // },
    mPrice: function(){
      var memberPrice = parseInt(this.dishes.normalPrice)*this.memberDiscont
      return memberPrice.toFixed(2)
    },
    pPrice: function () {
      var promotionPrice = parseInt(this.dishes.normalPrice)*this.promotionDiscont
      return promotionPrice.toFixed(2)
    },

    repeatNumPopularize: function () {
      let inputValuePopularize = this.inputValuePopularize;
      for(var i=0; i<this.dynamicTagsPopularize.length; i++){
        if(this.dynamicTagsPopularize[i].name === inputValuePopularize){

          return false;
        }
      }
    },
    repeatNum: function () {
      let inputValue = this.inputValue;
      for(var i=0; i<this.dynamicTags.length; i++){
        if(this.dynamicTags[i].name === inputValue){

          return false;
        }
      }
    },
    repeatNum1: function () {
      let inputValue = this.inputValue1;
      for(var i=0; i<this.dynamicTags1.length; i++){
        if(this.dynamicTags1[i].name === inputValue){
          return false;
        }
      }
    },
    repeatNum2: function () {

      let inputValue = this.inputValue2;
      if(!this.toDynamicTags2.sku){
        return 0
      }
      for(var i=0; i<this.dynamicTags2.length; i++){
        if(this.dynamicTags2[i].name === inputValue){
          return false;
        }
      }
    }
  },
  created() {
    this._pullDishes()
    this._pullCategory()
    this._pullTags()
    this._pullSpec()
    // this._pullUnit()
    // this._pullPreSpec()
    // this._pullPreTag()
    if(this.screenWidth < 721){
      this.changeSortShow = 1
    }
    // this._pullPrePopularizeTag()
    this._pullPopularizeTag()
    this._pullPrinter()
    this.openFullScreen2()

  },
  methods: {
    openFullScreen2() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        loading.close();
      }, 500);
    },
    sortUP(){
      let data = {
        id1: 12,
        id2: 13
      }
      this.$request(this.url.restaurantWithdrawAccount,'json',data).then((res)=>{
        console.log(res);
      }).catch((err)=>{
        console.log(err);
      })
    },
    changeStyle(event){
      console.log(event);
      event.target.style.background= 'rgba(64,158,255,.1)'
      event.target.style.border = '1px solid rgba(64,158,255,.6)'
    },
    priceBlurtest(row,index,event,type){
      event.target.style.background= 'rgba(146, 199, 253, 0.1)'
      event.target.style.border = '1px solid rgba(0, 0, 0, 0.25)'
      console.log(this.generateSkuDate,'打印出来的normalPriceBlurtest》generateSkuDate');
      if(type === 'normalPrice'){
        this.generateSkuDate[index].normalPrice = Number(event.target.value)
      }else if(type === 'memberPrice'){
        this.generateSkuDate[index].memberPrice = Number(event.target.value)
      }else if(type === 'promotionPrice'){
        this.generateSkuDate[index].promotionPrice = Number(event.target.value)
      }
      console.log(this.generateSkuDate,'实时修改的generateSkuDate');
    },
    UID(n){
      var name = n + this.getUID()
      return name
    },
    listenUrl(data){
      this.dishes.thumb = data.name
    },
    listenUrl1(data){
      this.dishes.highDefinitionImg = data.name
    },
    listenUrl2(data){
      this.dishes.bannerImg = data.name
    },
    listenUrl3(data){
      this.dishes.banner = data.name
    },
    listenUrlPopularizeTags(data){
      this.dynamicTagsPopularize.thumb = data.name
    },
    optsChange(){
      console.log('1');
      console.log(this.valueOfSKU);
    },
    handleEdit:function(row){
      //遍历数组改变editeFlag
    },
    handleSave:function(row){
      //保存数据，向后台取数据
    },
    handleMouseEnter:function(row, column, cell, event){
      // console.log(row, column, cell, event);
      // cell.style.background = 'black'
      //row：一行数据
      //column: 一列数据
      // cell.children[0].children[1].style.color="black";
    },
    confirmPrice(row,index){
      console.log(row, 'row',index,'index');
      console.log(this.normalPrice1);
    },
    handleMouseOut:function(row, column, cell, event){
      console.log(row,'这是row', column,'这是column', cell,'这是cell', event,'handleMouseOut');
      // console.log(row, column, cell, event);
      // cell.children[0].children[1].style.color="#ffffff";
    },
    // 拉取列表
    _pullPrinter(){
      let data=[
        {
          feild:'status',
          value:'enable',
          joinType:'ne'
        }
      ]
      this.$request(this.url.printerComplexPageQuery,'json',data).then((res)=>{
        console.log('11111111111111111111',res);
        this.pid = res.data.data
      }).catch((err)=>{
        console.log(err);
      })
    },
    _pullDishes(){
      var Data = [
        {
          feild:'status',
          value:'123',
          joinType:'ne'
        }
      ]
      this.$request(this.url.dishes2,'json',Data).then((res)=>{
        let response = res.data.data
        this.dishesDataTable = response
        // console.log(response);
      }).catch((err)=>{
        console.log(err);
      })
    },
    _pullTags(){
      var Data = [
        {
          feild:'status',
          value:'123',
          joinType:'ne'
        }
      ]
      this.$request(this.url.restaurantTag2,'json',Data).then((res)=>{
        let response = res.data.data
        this.dynamicTags = response
        console.log(response);
      }).catch((err)=>{
        console.log(err);
      })
    },
    _pullSpec(){
      let Data = [
        {
          feild:'status',
          value:'123',
          joinType:'ne'
        }
      ]
      this.$request(this.url.spec2,'json',Data).then((res)=>{
        let response = res.data.data
        this.dynamicTags2 = response
        // console.log(response);
      }).catch((err)=>{
        console.log(err);
      })
    },
    _pullPreTag(){
      let Data = [
        {
          feild:'status',
          value:'123',
          joinType:'ne'
        }
      ]
      this.$request(this.url.preTag2,'json',Data).then((res)=>{
        let response = res.data.data
        this.PreTag = response
        // console.log(response,'拉取得到单位');
      }).catch((err)=>{
        console.log(err);
      })
    },
    _pullPreSpec(){
      let Data = [
        {
          feild:'status',
          value:'123',
          joinType:'ne'
        }
      ]
      this.$request(this.url.preSpec2,'json',Data).then((res)=>{
        let response = res.data.data
        this.preSpec = response
        // console.log(response,'拉取得到单位');
      }).catch((err)=>{
        console.log(err);
      })
    },
    _pullPopularizeTag(){
      let Data = [
        {
          feild:'status',
          value:'123',
          joinType:'ne'
        }
      ]
      this.$request(this.url.restaurantPopularizeTag2,'json',Data).then((res)=>{
        let response = res.data.data
        this.dynamicTagsPopularize = response
        // console.log(response,'拉取得到单位');
      }).catch((err)=>{
        console.log(err);
      })
    },
    _pullUnit(){
      var Data = [
        {
          feild:'status',
          value:'123',
          joinType:'ne'
        }
      ]
      this.$request(this.url.preUnit2,'json',Data).then((res)=>{
        let response = res.data.data
        this.unit = response
        // console.log(response,'拉取得到单位');
      }).catch((err)=>{
        console.log('预设单位没有拉取到',err);
      })
    },
    _pullCategory(){
      var Data = [
        {
          feild:'status',
          value:'123',
          joinType:'ne'
        }
      ]
      this.$request(this.url.dishesCategory2,'json',Data).then((res)=>{
        let response = res.data.data
        console.log(response);
        this.dynamicTags1 = response
        // console.log(this.dynamicTags1);
      }).catch((err)=>{
        console.log(err);
      })
    },

    // 增加菜品
    addDishes(formName1,formName2){
      if(!this.dishes.normalPrice){
        this.$message({
          type: 'info',
          message: '请输入价格!'
        });
        return false
      }
      console.log(this.dishes.normalPrice);
      if(this.dishes.normalPrice === ''){
        this.$message({
          type: 'info',
          message: '请输入价格!'
        });
        return false
      }
      if(!this.dishes.thumb){
        this.$message({
          type: 'info',
          message: '请重新提交缩略图!'
        });
        return false
      }
      console.log(this.valueOfTags,'得到标签');
      let tags = []
      tags = Object.assign([],this.valueOfTags);
      tags = tags.map(function (item) {
        return {
          id:item
        }
      })
      for(let i=0;i<tags.length;i++){
        tags[i].zindex = i
      }
      let popularizeTags = []
      popularizeTags = Object.assign([],this.valueOfTagsPopularize)
      popularizeTags = popularizeTags.map(function (item) {
        return {
          id:item
        }
      })
      for(let i=0;i<popularizeTags.length;i++){
        popularizeTags[i].zindex = i
      }
      console.log(this.valueOfSKU);

      if(this.valueOfSKU){
        for(let i=0;i<this.valueOfSKU.length;i++){
          this.valueOfSKU[i].zindex = i
        }
        this.dishes.specs = this.valueOfSKU
      }

      this.dishes.zindex = this.dishesIndex
      this.dishes.skus = this.generateSkuDate


      let data = {}
      data = Object.assign({},this.dishes);
      data.tags = tags
      data.popularizeTags = popularizeTags
      console.log(data,'提交菜品数据');

      this.$refs[formName1].validate((valid) => {
        if (valid) {
          this.$request(this.url.dishes1,'json',data).then((res)=>{
            this.$message({
              type: 'success',
              message: '数据提交成功!'
            });
            this._pullDishes()
            this.dialogFormVisibleGoodsPlus = !this.dialogFormVisibleGoodsPlus
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
    addDishesDelay(formName1,formName2){
      console.log(this.valueOfTags,'得到标签');
      let tags = []
      tags = Object.assign([],this.valueOfTags);
      tags = tags.map(function (item) {
        return {
          id:item
        }
      })
      for(let i=0;i<tags.length;i++){
        tags[i].zindex = i
      }
      let popularizeTags = []
      popularizeTags = Object.assign([],this.valueOfTagsPopularize)
      popularizeTags = popularizeTags.map(function (item) {
        return {
          id:item
        }
      })
      for(let i=0;i<popularizeTags.length;i++){
        popularizeTags[i].zindex = i
      }

      for(let i=0;i<this.valueOfSKU.length;i++){
        this.valueOfSKU[i].zindex = i
      }
      this.dishes.zindex = this.dishesIndex
      this.dishes.skus = this.generateSkuDate
      this.dishes.specs = this.valueOfSKU
      this.dishes.status = 'disable'

      let data = {}
      data = Object.assign({},this.dishes);
      data.tags = tags
      data.popularizeTags = popularizeTags
      console.log(data,'提交菜品数据');
      this.$refs[formName1].validate((valid) => {
        if (valid) {
          this.$request(this.url.dishes1,'json',data).then((res)=>{
            this.$message({
              type: 'success',
              message: '数据提交成功!'
            });
            this.dishesDataTable.push(data);
            this.dialogFormVisibleGoodsPlus = !this.dialogFormVisibleGoodsPlus
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
      //提交SKU
    },
    endTimeFun(){
      this.dishes.showTime = this.startTime.getHours()+
        ':'+this.startTime.getMinutes()+
        '-'+this.endTime.getHours()+
        ':'+this.endTime.getMinutes()
      console.log(this.dishes.showTime);
    },
    categoryEndTimeFun(){
      this.toDynamicTags1.showTime = this.categoryStartTimePre.getHours()+
        ':'+this.categoryStartTimePre.getMinutes()+
        '-'+this.categoryEndTimePre.getHours()+
        ':'+this.categoryEndTimePre.getMinutes()
      console.log(this.toDynamicTags1.showTime);
    },
    //更新标签
    updateTags(){
      console.log('2222222222');
      console.log(this.toDynamicTags);
      let index = this.categoryIndex
      let updateObj = {
        id:this.toDynamicTags.id,
      }
      for(let key in this.toDynamicTags){
        if(this.toDynamicTags[key] === this.dynamicTags[index][key]){
          continue;
        }
        updateObj[key] = this.toDynamicTags[key];
      }
      console.log(updateObj,'updateTags');

      this.$request(this.url.restaurantTag4,'json',updateObj).then((res)=>{
        this.$message({
          type: 'success',
          message: '数据提交成功!'
        });
        this.dialogFormVisibleTagEdit = !this.dialogFormVisibleTagEdit

        this._pullTags()

      }).catch((err)=>{
        this.$message({
          type: 'info',
          message: '数据提交失败!'
        });
        console.log(err);
      })
    },
    updatePopularizeTags(){
      console.log('2222222222');
      console.log(this.toDynamicTagsPopularize);
      let index = this.categoryIndex
      let updateObj = {
        id:this.toDynamicTagsPopularize.id,
      }
      for(let key in this.toDynamicTagsPopularize){
        if(this.toDynamicTagsPopularize[key] === this.dynamicTagsPopularize[index][key]){
          continue;
        }
        updateObj[key] = this.toDynamicTagsPopularize[key];
      }
      console.log(updateObj,'updateTags');
      this.$request(this.url.restaurantPopularizeTag4,'json',updateObj).then((res)=>{
        this.$message({
          type: 'success',
          message: '数据提交成功!'
        });
        this.dialogFormVisiblePopularizeTagEdit = !this.dialogFormVisiblePopularizeTagEdit
        this._pullPopularizeTag()
      }).catch((err)=>{
        this.$message({
          type: 'info',
          message: '数据提交失败!'
        });
        console.log(err);
      })
    },
    updateSpec(){
      console.log('得到sku内部分',this.toDynamicTags2.attrs);
      let index = this.categoryIndex
      let updateObj = {
        zindex:parseInt(this.toDynamicTags2.zindex),
        name:this.toDynamicTags2.name,
        id:this.toDynamicTags2.id,
        attrs:this.toDynamicTags2.attrs,
        status:'enable'
      }
      // for(let key in this.toDynamicTags2){
      //   if(this.toDynamicTags2[key] === this.dynamicTags2[index][key]){
      //     continue;
      //   }
      //   updateObj[key] = this.toDynamicTags2[key];
      // }
      console.log(updateObj,'specspec');
      this.$request(this.url.spec4,'json',updateObj).then((res)=>{
        if(res.data.msg === 'success'){
          this.$message({
            type: 'success',
            message: '数据提交成功!'
          });
          this._pullPopularizeTag()
        }else {
          this.$message({
            type: 'info',
            message: '数据问题!'
          });

        }
        this.dialogFormVisibleSKUEdit = !this.dialogFormVisibleSKUEdit
        this._pullSpec()
      }).catch((err)=>{
        this.$message({
          type: 'info',
          message: '数据提交失败!'
        });
        console.log(err);
      })
    },
    updateCategory(){
      console.log(this.toDynamicTags1,'打印category');
      console.log('2222222222');
      let index = this.categoryIndex
      let updateObj = {
        id:this.toDynamicTags1.id,
      }
      for(let key in this.toDynamicTags1){
        if(this.toDynamicTags1[key] === this.dynamicTags1[index][key]){
          continue;
        }
        updateObj[key] = this.toDynamicTags1[key];
      }
      console.log(updateObj,'updateCategory之前');
      this.$request(this.url.dishesCategory4,'json',updateObj).then((res)=>{
        this.$message({
          type: 'success',
          message: '数据提交成功!'
        });
        this.dialogFormVisibleCategoryEdit = !this.dialogFormVisibleCategoryEdit
        this._pullCategory()
      }).catch((err)=>{
        this.$message({
          type: 'info',
          message: '数据提交失败!'
        });
        console.log(err);
      })
    },
    getUnit(){
      console.log(this.dishes.uid);
    },
    updateSKU(){
      let specs = []
      for(let i=0; i<this.valueOfSKU.length; i++){
        specs.unshift({
          name:this.valueOfSKU[i].name,
          did:this.dishesIndex,
          id:this.valueOfSKU[i].id,
          zindex:this.valueOfSKU[i].zindex
        })
      }
      console.log(specs);
      let updateObj = {
        id: this.dishesIndex,
        specs: specs,
        skus: this.generateSkuDate
      }
      console.log(this.generateSkuDate,'ssssssssss');
      console.log(updateObj)

      this.$request(this.url.dishes4,'json',updateObj).then((res)=>{
        this.$message({
          type: 'success',
          message: '数据提交成功!'
        });
      }).catch((err)=>{
        this.$message({
          type: 'info',
          message: '数据提交失败!'
        });
        console.log(err);
      })
    },
    // 删除菜品
    deleteDishes (row,index) {
      let data = {
        id:row.id
      }
      console.log(data);
      console.log(index);
      this.$confirm('是否删除该菜品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$request(this.url.dishes3,'form',data).then((res)=>{
          this.$message({
            type: 'success',
            message: '数据提交成功!'
          });
          this.dishesDataTable.splice(index,1)
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
    // 修改菜品
    editDishes (row,index) {
      this.valueOfSKU = []
      this.valueOfTags = []
      this.valueOfTagsPopularize = []
      this.addOrEdit = 2;
      this.dishes = Object.assign({},row);
      this.dishesIndex = index;
      console.log(row,'点击编辑菜品触发');
      console.log(row.popularizeTags);
      let arrTagsPopularize = []
      if(row.popularizeTags === null){

      }else {
        for(var i =0; i<row.popularizeTags.length;i++){
          arrTagsPopularize.unshift({
            name:row.popularizeTags[i].name,
            id:row.popularizeTags[i].id
          })
        }
        this.valueOfTagsPopularize1 = arrTagsPopularize
        this.valueOfTagsPopularizeShow = 1
        console.log('33333',this.valueOfTagsPopularize);
      }


      let dynamicTagsOld = []
      if(row.tags === null){

      }else {
        for(var i =0; i<row.tags.length;i++){
          dynamicTagsOld.unshift({
            name:row.tags[i].name,
            id:row.tags[i].id
          })
        }
        this.dynamicTagsOld = dynamicTagsOld
        this.dynamicTagsOldShow = 1
      }


      let valueOfSKU = []
      if(row.specs === null){

      }else {
        for(var i =0; i<row.specs.length;i++){
          valueOfSKU.unshift({
            name:row.specs[i].name,
            id:row.specs[i].id
          })
        }
        this.valueOfSKU1 = valueOfSKU
        this.valueOfSKUOldShow = 1
      }

      this.generatTable = true
      this.generateSkuDate = row.skus
      console.log('展示SKU价格',row.skus);


      console.log(this.dishesIndex,'第一打印did');
      if(row.showTime){
        let start = row.showTime.split('-')
        this.startTimePre = start[0]
        this.endTimePre = start[1]
      }
    },
    updateDishes(){

      if(!this.dishes.normalPrice){
        this.$message({
          type: 'info',
          message: '请输入价格!'
        });
        return false
      }
      console.log(this.dishes.normalPrice);
      if(this.dishes.normalPrice === ''){
        this.$message({
          type: 'info',
          message: '请输入价格!'
        });
        return false
      }
      if(!this.dishes.thumb){
        this.$message({
          type: 'info',
          message: '请重新提交缩略图!'
        });
        return false
      }
      console.log(this.picReceive);
      let index = this.dishesIndex
      let updateObj = {
        id:this.dishes.id
      }
      console.log(this.dishes, this.dishesDataTable[index],'提交前数据对比');
      for(let key in this.dishes){
        if(this.dishes[key] === this.dishesDataTable[index][key]){
          continue;
        }
        updateObj[key] = this.dishes[key];
      }



      let tags = []
      if(this.valueOfTags){
        tags = Object.assign([],this.valueOfTags);
        tags = tags.map(function (item) {
          return {
            id:item
          }
        })
        for(let i=0;i<tags.length;i++){
          tags[i].zindex = i
        }
        updateObj.tags = tags
      }

      let popularizeTags = []
      if(this.valueOfTagsPopularize){
        popularizeTags = Object.assign([],this.valueOfTagsPopularize)
        popularizeTags = popularizeTags.map(function (item) {
          return {
            id:item
          }
        })
        for(let i=0;i<popularizeTags.length;i++){
          popularizeTags[i].zindex = i
        }
        updateObj.popularizeTags = popularizeTags
      }
      if(this.valueOfSKU){
        for(let i=0;i<this.valueOfSKU.length;i++){
          this.valueOfSKU[i].zindex = i
        }
        updateObj.specs = this.valueOfSKU
      }


      updateObj.skus = this.generateSkuDate
      console.log(updateObj,'提交的数据');

      this.$request(this.url.dishes4,'json',updateObj).then((res)=>{
        this.$message({
          type: 'success',
          message: '数据提交成功!'
        });
        this.dialogFormVisibleGoodsPlus = !this.dialogFormVisibleGoodsPlus
        this._pullDishes()
      }).catch((err)=>{
        this.$message({
          type: 'info',
          message: '数据提交失败!'
        });
        console.log(err);
      })
    },

    // 0
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    showInputPopularize() {
      this.inputVisiblePopularize = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInputPopularize.$refs.input.focus();
      });
    },
    handleInputConfirmPopularize() {
      let inputValuePopularize = this.inputValuePopularize;
      let repeatNum  = this.repeatNumPopularize

      var lastNumber = 0
      if(this.dynamicTagsPopularize === null){
        lastNumber = 1
      }else{
        lastNumber = this.dynamicTagsPopularize.length+1
      }

      console.log(this.dynamicTagsPopularize);
      if (inputValuePopularize){
        if(repeatNum === false){
          alert('提示：同名项，不可建立')
        }else {

          let data = {
            name: inputValuePopularize,
            status: 'enable'
          }
          console.log('推广标签——提交前的数据',data);
          this.$request(this.url.restaurantPopularizeTag1,'json',data).then((res)=>{
            if(res.data.msg === 'success'){
              this.$message({
                type: 'success',
                message: '数据提交成功!'
              });
              this._pullPopularizeTag()
            }else{
              this.$message({
                type: 'info',
                message: '数据问题!'
              });
            }
          }).catch((err)=>{
            this.$message({
              type: 'info',
              message: '数据提交失败!'
            });
            console.log(err);
          })
          this.dynamicTagsPopularize.push(
            {
              zindex: lastNumber,
              name: inputValuePopularize,
            }
          );
        }
      }
      this.inputVisiblePopularize = false;
      this.inputValuePopularize = '';
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      let repeatNum  = this.repeatNum

      var lastNumber = 0
      if(this.dynamicTags === null){
        lastNumber = 1
      }else{
        lastNumber = this.dynamicTags.length+1
      }

      console.log(this.dynamicTags);
      if (inputValue){
        if(repeatNum === false){
          alert('提示：同名项，不可建立')
        }else {

          let data = {
            zindex: lastNumber,
            name: inputValue,
            chargeType: 'free',
            status:'enable',


          }
          this.$request(this.url.restaurantTag1,'json',data).then((res)=>{

            console.log(res.data.msg);
            if(res.data.msg === 'success'){
              this.$message({
                type: 'success',
                message: '数据提交成功!'
              });
              this._pullTags()
            }else{
              this.$message({
                type: 'info',
                message: '数据问题!'
              });
            }

          }).catch((err)=>{
            this.$message({
              type: 'info',
              message: '数据提交失败!'
            });
            console.log(err);
          })
        }
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    editTags(tag,index){
      console.log(tag.id,'id是多少');
      console.log(index);
      this.toDynamicTags = Object.assign({},tag);
      this.categoryIndex = index;
      console.log(this.toDynamicTags);
      this.dialogFormVisibleTagEdit = !this.dialogFormVisibleTagEdit
    },
    editTagsPopularize(tag,index){
      console.log(tag.id,'id是多少');

      console.log(index);

      this.toDynamicTagsPopularize = Object.assign({},tag);
      this.categoryIndex = index;
      console.log(this.toDynamicTagsPopularize);
      this.dialogFormVisiblePopularizeTagEdit = !this.dialogFormVisiblePopularizeTagEdit
    },

    handleClosePopularize(tag,index) {
      console.log(tag);
      this.$confirm('是否删除该标签，与其的相关菜品标签将全部取消, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          id:tag.id
        }
        this.$request(this.url.restaurantPopularizeTag3,'form',data).then((res)=>{
          this.$message({
            type: 'success',
            message: '数据提交成功!'
          });
          this.dynamicTagsPopularize.splice(this.dynamicTagsPopularize.indexOf(tag), 1);
        }).catch((err)=>{
          this.$message({
            type: 'info',
            message: '数据提交失败!'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleClose(tag,index) {
      console.log(tag);
      this.$confirm('是否删除该标签，与其的相关菜品标签将全部取消, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          id:tag.id
        }
        this.$request(this.url.restaurantTag3,'form',data).then((res)=>{
          this.$message({
            type: 'success',
            message: '数据提交成功!'
          });
          this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        }).catch((err)=>{
          this.$message({
            type: 'info',
            message: '数据提交失败!'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 1
    showInput1() {
      this.inputVisible1 = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput1.$refs.input.focus();
      });
    },
    handleInputConfirm1() {
      let inputValue1 = this.inputValue1;
      let repeatNum1  = this.repeatNum1

      var lastNumber = 0
      if(this.dynamicTags2 === null){
        lastNumber = 1
      }else{
        lastNumber = this.dynamicTags2.length+1
      }
      console.log(this.dynamicTags1);
      if (inputValue1){
        if(repeatNum1 === false){
          alert('提示：同名项，不可建立')
        }else {
          let data = {
            zindex: lastNumber,
            name: inputValue1,
            description:inputValue1,
            pid:7,
            showType:'always',
            status:'enable'
          }
          this.$request(this.url.dishesCategory1,'json',data).then((res)=>{
            if(res.data.msg === 'success'){
              this.$message({
                type: 'success',
                message: '数据提交成功!'
              });
              this._pullCategory()
            }else{
              this.$message({
                type: 'info',
                message: '数据问题!'
              });
            }

          }).catch((err)=>{
            this.$message({
              type: 'info',
              message: '数据提交失败!'
            });
            console.log(err);
          })
        }
      }
      this.inputVisible1 = false;
      this.inputValue1 = '';
    },

    editCategory(tag,index){
      // console.log(tag.zindex);

      console.log(tag);

      this.toDynamicTags1 = Object.assign({},tag);
      this.categoryIndex = index;
      console.log(this.toDynamicTags1);
      this.dialogFormVisibleCategoryEdit = !this.dialogFormVisibleCategoryEdit
      if(tag.showTime){
        let start = tag.showTime.split('-')
        this.categoryStartTimePre = start[0]
        this.categoryEndTimePre = start[1]
      }
    },
    handleClose1(tag,index) {
      console.log(tag);
      this.$confirm('是否删除该分类，此类菜品将无分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          id:tag.id
        }
        this.$request(this.url.dishesCategory3,'form',data).then((res)=>{
          this.$message({
            type: 'success',
            message: '数据提交成功!'
          });
          this.dynamicTags1.splice(this.dynamicTags1.indexOf(tag), 1);
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

    // 2
    showInput2() {
      this.inputVisible2 = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput2.$refs.input.focus();
      });
    },
    handleInputConfirm2() {
      let inputValue2 = this.inputValue2;
      let repeatNum2  = this.repeatNum2

      var lastNumber = 0
      if(this.dynamicTags2 === null){
        lastNumber = 1
      }else{
        lastNumber = this.dynamicTags2.length+1
      }

      console.log(this.dynamicTags2);
      if (inputValue2){
        if(repeatNum2 === false){
          alert('提示：同名项，不可建立')
        }else {

          let data = {
            zindex: lastNumber,
            name: inputValue2,
          }
          this.$request(this.url.spec1,'json',data).then((res)=>{
            if(res.data.msg === 'success'){
              this.$message({
                type: 'success',
                message: '数据提交成功!'
              });
              this._pullSpec()
            }else{
              this.$message({
                type: 'info',
                message: '数据问题!'
              });
            }
          }).catch((err)=>{
            this.$message({
              type: 'info',
              message: '数据提交失败!'
            });
            console.log(err);
          })
        }
      }
      this.inputVisible2 = false;
      this.inputValue2 = '';

    },
    editSpec(tag,index){
      console.log(index);
      console.log(this.dynamicTags2);
      for (var i = 0; i < this.dynamicTags2.length; i++) {
        if(!this.dynamicTags2[i].attrs){
          this.dynamicTags2[i] = {
            name:this.dynamicTags2[i].name,
            attrs:[
            ]
          }
          console.log(this.dynamicTags2[i]);
        }
      }
      this.toDynamicTags2 = Object.assign({},tag);
      this.categoryIndex = index;
      console.log(this.toDynamicTags2);
      this.dialogFormVisibleSKUEdit = !this.dialogFormVisibleSKUEdit
    },

    handleClose2(tag,index) {
      this.$confirm('是否删除该规格，应用此规格的菜品将取消, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          id:tag.id
        }
        this.$request(this.url.spec3,'form',data).then((res)=>{
          this.$message({
            type: 'success',
            message: '数据提交成功!'
          });
          this.dynamicTags2.splice(this.dynamicTags2.indexOf(tag), 1);
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

    // 3
    showInput3() {
      this.inputVisible3 = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput3.$refs.input.focus();
      });
    },
    handleInputConfirm3(index) {
      let inputValue3 = this.inputValue3;

      console.log(this.dynamicTags2[this.categoryIndex].attrs);

      var lastNumber = 0
      if(this.dynamicTags2[this.categoryIndex].attrs === null){
        lastNumber = 0
      }else{
        lastNumber = this.dynamicTags2[this.categoryIndex].attrs.length
      }

      if (inputValue3){
        this.dynamicTags2[this.categoryIndex].attrs.push(
          {
            sid: this.toDynamicTags2.id,
            name: inputValue3,
            zindex: lastNumber,
          }

        );
      }
      console.log(this.dynamicTags2[this.categoryIndex].attrs);
      this.inputVisible3 = false;
      this.inputValue3 = '';
    },
    handleClose3(tag) {
      this.$confirm('是否删除该SKU，应用此SKU的菜品将取消, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.toDynamicTags2.attrs.splice(this.toDynamicTags2.attrs.indexOf(tag), 1);
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
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    toNature(){
      this.dialogFormVisibleGoodsPlus = !this.dialogFormVisibleGoodsPlus
      this.activeName = 'second'
    },
    handlePreview(file) {
      console.log(file);
    },
    plusMethodsThis(){
      //初始化表格
      if(this.dishesDataTable){
        this.dishesIndex = this.dishesDataTable.length
      }
      if(this.dynamicTags2){
        for(let i = 0 ;i<this.dynamicTags2.length;i++){
          this.dynamicTags2[i].zindex = i
        }
      }

      this.addOrEdit = 1
      this.dynamicTagsOldShow = 0
      this.valueOfTagsPopularizeShow = 0
      this.valueOfSKUOldShow = 0
      this.dishes ={}
      this.valueOfSKU = []
      this.valueOfTags = []
      this.valueOfTagsPopularize = []
      this.startTimePre = '请选择开始时间'
      this.endTimePre = '请选择结束时间'
      this.generatTable = false
      this.dynamicTagsOld =[]
      this.valueOfTagsPopularize1 = []
      this.valueOfSKU1 = []
      this.dialogFormVisibleGoodsPlus = !this.dialogFormVisibleGoodsPlus
    },
    plusGoods(){
      console.log(this.pushShowType)
      this.dialogFormVisibleGoodsPlus = !this.dialogFormVisibleGoodsPlus
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

    generateSku(skuArr,specArr) {
      if(specArr.length === 0){
        return skuArr;
      }
      let spec = specArr.shift();
      if(!skuArr || skuArr.length === 0){
        skuArr = spec.attrs.map(function (item) {
          return {
            attrJion:item.id,
            content:item.name,
          }
        })
        return this.generateSku(skuArr,specArr);
      }
      let newSkuArr = [];
      for(let item of skuArr){
        for(let newItem of spec.attrs){
          newSkuArr.unshift({
            attrJion:item.attrJion + "_" + newItem.id,
            content: item.content + "," + newItem.name,
          })
        }
      }
      return this.generateSku(newSkuArr,specArr);
    },

    outputSku(){
      if(!this.dishes.normalPrice){
        this.$message({
          type: 'info',
          message: '没有基本价格!'
        });
        return false
      }
      console.log(this.valueOfSKU,'点击生成SKU弹框');
      if(!this.valueOfSKU.length){
        this.$message({
          type: 'info',
          message: '没有选择规格!'
        });
        return false
      }
      setTimeout(() => {
        this.generating = false;
      }, 2000);
      this.generatTable = true

      var valueOfSku = Object.assign([],this.valueOfSKU);

      console.log(this.valueOfSKU,'this.valueOfSKU');
      this.generating = !this.generating;
      console.log('===================',Object.assign({},valueOfSku));
      this.generateSkuDate =  this.generateSku([],valueOfSku);
      for(var j=0; j<this.generateSkuDate.length; j++){
        this.generateSkuDate[j].did = this.dishesIndex
        this.generateSkuDate[j].normalPrice = this.dishes.normalPrice
        this.generateSkuDate[j].memberPrice = this.dishes.memberPrice
        this.generateSkuDate[j].promotionPrice = this.dishes.promotionPrice
      }
      console.log(this.generateSkuDate,'最后得到的SKU');
    },
  },
  components: {
    editcontrol,
    upload
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">




 .el-upload__tip
   font-size 10px
   line-height 15px
   height auto

 .el-input-group__append,.el-input-group__prepend
   padding 0px 5px

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

.price-item
  width 30%
  margin-right 1%

.tagGroup,.categoryGroup,.SKUGroup
  margin 5px 5px 15px 5px
  padding 5px 10px
  border-radius 10px
  border 1px solid rgba(124, 168, 205, 0.24)

.el-tag
  margin 10px 10px 10px 0px

.button-new-tag
  margin-left: 10px
  height: 32px
  line-height: 30px
  padding-top: 0
  padding-bottom: 0

.input-new-tag
  width: 90px
  margin-left: 10px
  vertical-align: bottom

h6
  font-weight lighter
  opacity 0.5
  margin 5px 0px 0px 0px

.matter2
  border-radius: 5px
  padding: 10px
  span
    margin: 5px 0px 10px 20px
    display: block
    font-size: 10px
    font-weight: lighter
  &:hover
    background rgba(0, 0, 0, 0.02)

td
  padding 12px 0px !important

 .previewImg
   height 40px
   width auto
   &:hover
     height 200px
     position absolute
     left -45%
     top -50%
     border-radius 5px
     border 2px solid white
     z-index 200


.previewImg:first-child
  &:hover
    height 200px
    position absolute
    left -45%
    top -10%
    border-radius 5px
    border 2px solid white
    z-index 200
 /*.el-table--fit*/



.SKUInput
  -webkit-appearance none !important
  background-color #fff !important
  background-image: none !important
  border-radius: 4px !important
  border: 1px solid #dcdfe6 !important
  -webkit-box-sizing: border-box !important
  box-sizing: border-box !important
  color: #606266 !important
  display: inline-block !important
  font-size: inherit !important
  height: 40px !important
  line-height: 40px !important
  outline: 0 !important
  padding: 0 15px !important
</style>
