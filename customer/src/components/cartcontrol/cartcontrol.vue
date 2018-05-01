<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease icon-add_circle" v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <i class="el-icon-remove-outline inner icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <i class="el-icon-circle-plus cart-add icon-add_circle" @click.stop.prevent="addCart"></i>
    <div class="skuSelect"></div>
    <!--<el-dialog title="请选择口味" :visible.sync="dialogVisible" width="80%" :modal-append-to-body="false" style="position: fixed!important;left: 50px;top:50px;">-->
      <!--<span>-->
        <!--<div>-->
          <!--<el-radio-group size="small" v-model="falg1">-->
            <!--<el-radio-button label="大份"></el-radio-button>-->
            <!--<el-radio-button label="中份"></el-radio-button>-->
            <!--<el-radio-button label="小份"></el-radio-button>-->
          <!--</el-radio-group>-->
        <!--</div>-->
        <!--<div style="margin-top: 20px">-->
          <!--<el-radio-group size="small" v-model="falg2">-->
            <!--<el-radio-button label="热"></el-radio-button>-->
            <!--<el-radio-button label="温"></el-radio-button>-->
            <!--<el-radio-button label="冷"></el-radio-button>-->
          <!--</el-radio-group>-->
        <!--</div>-->
        <!--<div style="margin-top: 20px">-->
          <!--<el-radio-group size="small" v-model="falg3">-->
            <!--<el-radio-button label="辣"></el-radio-button>-->
            <!--<el-radio-button label="中辣"></el-radio-button>-->
            <!--<el-radio-button label="无辣"></el-radio-button>-->
          <!--</el-radio-group>-->
        <!--</div>-->
      <!--</span>-->
      <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button @click.stop.prevent="dialogVisible = false">取 消</el-button>-->
        <!--<el-button type="primary" @click.stop.prevent="dialogVisible = false">确 定</el-button>-->
      <!--</span>-->
    <!--</el-dialog>-->
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable */
  import Vue from 'vue';
  const ERR_OK = 0
  export default {
    props: {
      food: {
        type: Object,
      }
    },
    data() {
      return {
        SColor: 'SColor',
        dialogVisible: true,
        spce: [],
        falg1: '大份',
        falg2: '热',
        falg3: '辣'
      }
    },
    created () {
    },
    mounted(){
      // this.$nextTick(()=>{
      //   this._initScroll()
      //   this._calculateHeight()
      // })
      this._pullSpec();
      console.log(1, this.food);
    },
    methods: {
      // handleClose(done){
      //   this.$confirm('确认关闭？')
      //     .then(_ => {
      //       done();
      //     })
      //     .catch(_ => {});
      // },
      addCart(event) {
        if (!event._constructed) {
          return;
        }
        console.log(event)
        // if (1 === 1) {
        //   this.dialogVisible = true
        //   return;
        // }

        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$emit('increment', {event:event.target,food:this.food});
        console.log("cartcontrol")
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      },
      //  拉取规格
      _pullSpec(){
        var _this = this;
        var Data = [
          {
            feild: '',
            value: '',
            joinType: ''
          }
        ];
        this.$request(this.url.spec2, 'json', Data).then((res)=>{
          // console.log(res)
          _this.spce = res.data.data;
          console.log(_this.spce)
        })
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

  .inner
    display: inline-block
    line-height: 24px
    font-size: 24px
    color: rgb(0, 160, 220)
    transition: all 0.2s linear
    transform: rotate(0deg)


  .cart-decrease
    display: inline-block
    padding: 6px
    transition: all 0.2s linear
    &.move-enter-active
      opacity: 1
      transform: translate3d(0, 0, 0)

    &.move-enter, &.move-leave-active
      opacity: 0
      transform: translate3d(24px, 0, 0)
      .inner
        transform: rotate(180deg)

</style>
