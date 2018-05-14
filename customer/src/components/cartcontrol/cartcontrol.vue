<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease icon-add_circle" v-show="food.num>0" @click.stop.prevent="decreaseCart">
        <i style="padding: 5px;font-size: 26px" class="el-icon-remove-outline inner icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div class="cart-count" v-show="food.num>0">{{food.num}}</div>
    <i style="padding: 5px;font-size: 26px" class="el-icon-circle-plus cart-add icon-add_circle" @click.stop.prevent="addCart"></i>
    <div class="skuSelect"></div>
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
      },
    },
    data() {
      return {
      }
    },
    methods: {
      addCart(event) {
        console.log('cartcontrol',this.food);
        if (!event._constructed) {
          return;
        }
        if(this.food.specs){
          this.$emit('increment', {event:event.target,food:this.food,specs:true});
        }else{
          if (!this.food.count) {
            Vue.set(this.food, 'count', 1);
          } else {
            this.food.count++;
          }
          this.$emit('increment', {event:event.target,food:this.food,specs:false});
        }
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return;
        }
          if (!this.food.count) {
            Vue.set(this.food, 'count', 1);
          } else {
            this.food.count--;
          }
          this.$emit('incrementmi', {event:event.target,food:this.food});
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
          _this.spce = res.data.data;
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
      color: #7c4646
    .cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: #7c4646

  .inner
    display: inline-block
    line-height: 24px
    font-size: 24px
    color: #7c4646
    transition: all 0.2s linear
    transform: rotate(0deg)


  .cart-decrease
    display: inline-block
    padding: 6px
    color #7c4646
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
