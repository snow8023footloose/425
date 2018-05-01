<template>
  <div class="cartcontrol" enter-active-class="bounceInUp" leave-active-class="bounceOutDown">
    <transition name="move">
      <div class="cart-decrease icon-add_circle" v-show="food.count>0" @click.stop="decreaseCart">
        <i class="el-icon-remove-outline inner icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <i class="el-icon-circle-plus cart-add icon-add_circle" @click.prevent.stop="addCart" ref="add"></i>

    <dialog v-if="show === 1" class="skuselect animated" style="margin-top: 20px" >
        <p>请选择</p>
        <el-form label-width="50px" label-position="left">
          <el-form-item label="份量">
            <el-radio-group v-model="radio1" size="medium">
              <el-radio-button label="上海" ></el-radio-button>
              <el-radio-button label="北京"></el-radio-button>
              <el-radio-button label="广州"></el-radio-button>
              <el-radio-button label="深圳"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="温度">
            <el-radio-group v-model="radio2" size="medium">
              <el-radio-button label="上海" ></el-radio-button>
              <el-radio-button label="北京"></el-radio-button>
              <el-radio-button label="广州"></el-radio-button>
              <el-radio-button label="深圳"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="颜色">
            <el-radio-group v-model="radio3" size="medium">
              <el-radio-button label="上海" ></el-radio-button>
              <el-radio-button label="北京"></el-radio-button>
              <el-radio-button label="广州"></el-radio-button>
              <el-radio-button label="深圳"></el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <el-button style="margin-left: 100px" @click="delaySku" type="text" size="small" round>取消</el-button>
        <el-button type="danger" size="small" @click="closeSku" round>确定</el-button>
      </dialog>



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
        radio1:'上海',
        radio2:'上海',
        radio3:'上海',
        show:0,
      }
    },
    created () {
    },
    beforeDestroy(){
    },
    mounted(){
      // console.log(this.$refs.add);

      window.removeEventListener('click' ,this.addCart)
    },
    methods: {
      closeSku(){
        this.show = 0
      },
      delaySku(){
        this.show = 0
      },

      addCart(event) {
        this.show = 1

        // if (!event._constructed) {
        //   return false;
        // }
        console.log(this.food);
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$emit('increment', event.target);


        let data = {
          did: this.food.id,
          num: 1
        }
        this.$request(this.url.cart1,'json',data).then((res)=>{

        }).catch((err)=>{

          console.log(err);
        })

      },
      decreaseCart(event) {
        // if (!event._constructed) {
        //   return false;
        // }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  @import "animate.css";
  .skuselect
    position fixed
    top 20%
    left 35%
    background rgba(255, 255, 255, 0.9)
    z-index 9999
    border-radius 10px
    padding 20px
    box-shadow 6px 15px 5px rgba(0, 0, 0, 0.3)


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
