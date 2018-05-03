<template>
    <div class="entrance" v-loading.fullscreen.lock="fullscreenLoading">
      <el-button @click="clickTest" size="mini">click</el-button>
    </div>
</template>
<script type="text/ecmascript-6">
/* eslint-disable */
    export default {
      data(){
        return{
          fullscreenLoading: false,
          URLentrance:'',
          arrURL:[]
        }
      },
      created(){
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 2000);

        this.URLentrance = document.location.href.split('?')[1].split(',');

        // for(var i = 0; i<this.URLentrance.length; i++){
        //   this.arrURL.unshift({
        //     name:this.URLentrance[i].split('=')[0],
        //     value:this.URLentrance[i].split('=')[1]
        //   })
        // }
        // this.URLentrance[0] //第一个值
        // this.URLentrance[1] //第二个值

        console.log(this.arrURL);

        localStorage.setItem('rid',JSON.stringify(this.URLentrance[0])) //保存rid
        alert(localStorage.getItem('rid'));
        localStorage.setItem('tid',JSON.stringify(this.URLentrance[1])) //保存tid
        alert(localStorage.getItem('tid'));
        if (/MicroMessenger/.test(window.navigator.userAgent)) {
          // 微信
          localStorage.setItem('clientType','weixin') //保存tid
          window.location.href =
            'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7fdd9f5dd8f455f2&redirect_uri=http://wangyufeng.pagekite.me&response_type=code&scope=snsapi_userinfo&state=1'+ '#wechat_redirect';

        } else if (/AlipayClient/.test(window.navigator.userAgent)) {
          // 支付宝 
          localStorage.setItem('clientType','alipay') //保存tid
          window.location.href =
            'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2018012902106000&scope=auth_user&redirect_uri=http://wangyufeng.pagekite.me&state=1';
        }
        alert(localStorage.getItem('clientType'));
      },
      computed:{
      },
      methods:{
        clickTest(){
          console.log(this.URLentrance);
        }
      }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>
