
<template>
    <div class="computer">
      <div @click="close" class="mask" v-show="container">11111111</div>
      <button style="font-size: 16px;opacity: 0" id="calc_clear" class="closeComputer" value="C/E" >清空</button>
      <el-button id="calc_clear_button" class="closeComputer" icon="el-icon-tickets" circle @click="close"></el-button>
      <div id="container" v-show="container">
        <div id="the-calculator">
          <div id="the-display">
            <form name="calculator">
              <span id="total">0</span>
            </form>
          </div>
          <div id="the-buttons">
            <div class="button-row clearfix">
              <button id="calc_sqrt" value="&radic;" >&radic;</button>
              <button id="calc_neg" value="-/+" >-/+</button>
              <button id="calc_square" value="x2" >x<span class="exponent">2</span></button>
              <button id="calc_powerof" class="calc_op" value="^" >y<span class="exponent">x</span></button>
            </div>
            <div class="button-row clearfix">
              <button class="calc_int" value="7" >7</button>
              <button class="calc_int" value="8" >8</button>
              <button class="calc_int" value="9" >9</button>
              <button class="calc_op" value="*" >&times;</button>
            </div>
            <div class="button-row clearfix">
              <button class="calc_int" value="4" >4</button>
              <button class="calc_int" value="5" >5</button>
              <button class="calc_int" value="6" >6</button>
              <button class="calc_op" value="-" >-</button>
            </div>
            <div class="button-row clearfix">
              <button class="calc_int" value="1" >1</button>
              <button class="calc_int" value="2" >2</button>
              <button class="calc_int" value="3" >3</button>
              <button class="calc_op" value="+" >+</button>
            </div>
            <div class="button-row clearfix">
              <button id="calc_zero" class="calc_int" value="0" >0</button>
              <button id="calc_decimal" value="." >.</button>
              <button class="calc_op" value="/" >&divide;</button>
            </div>
            <div id="extra-buttons" class="button-row">
              <button id="calc_denom" value="1/x" ><span class="denominator"><span class="denom-top">1</span><span class="denom-slash">/</span><span class="denom-btm">x</span></span></button>
              <button style="font-size: 16px" id="calc_clear" value="C/E" >清空</button>
              <button id="calc_back" value="&larr;" >&larr;</button>
              <button id="calc_eval" value="=" >=</button>
            </div>
          </div>
        </div>
        <div id="the-results">
          <ul id="results_list">
            <li id="result_default">没有记录</li>
          </ul>
          <el-button id="result_clear" type="success" round>清空记录</el-button>
        </div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
      data(){
        return{
          container: false,
        }

      },
      methods: {
        close(){
          this.container =!this.container
        }
      }
    }
    /*
** global vars
*/



</script>
<style scoped>

  .mask{
    position: fixed;
    width: 300%;
    height: 300%;
    background: rgba(0, 0, 0, 0.5);
    left: -60%;
    top: -20%;
    z-index: 9997;
  }


  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .closeComputer{
    position: fixed;
    left: 3%;
    bottom: 5%;
    z-index: 9998;
  }
  .computer{
  }
  #container {
    position: fixed;
    bottom: 5%;
    right: 5%;
    width: 73%;
    margin: 0 auto;
    font-family: 'Helvetica Neue LT Pro', 'Helvetica', sans-serif;
    z-index: 9999;
  }

  a {
    text-decoration: none;
    color: black;
  }

  #the-calculator {
    font-size: 1.2em;
    display: block;
    /*width: 400px;*/
    width: 58%;
    float: left;
    margin: 0;
    padding: 20px;
    border: 2px solid #e0e0e0;
    background: #00544b;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.26);
    background: -webkit-gradient(linear, left bottom, left top, color-stop(0, #003b34), color-stop(1, #00544b));
    background: -ms-linear-gradient(bottom, #003b34, #00544b);
    background: -moz-linear-gradient(center bottom, #003b34 0%, #00544b 100%);
    background: -o-linear-gradient(#00544b, #003b34);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00544b', endColorstr='#003b34', GradientType=0);
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    -moz-background-clip: padding-box;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
  }
  #the-calculator button,
  #the-calculator input,
  #the-calculator #total {
    font-size: 1em;
    display: inline-block;
    position: relative;
    padding: 12px;
    font-family: 'Helvetica Neue LT Pro', 'Helvetica', sans-serif;

  }
  #the-calculator button .exponent,
  #the-calculator input .exponent,
  #the-calculator #total .exponent {
    font-size: 0.6em;
    position: absolute;
  }
  #the-calculator button .denominator,
  #the-calculator input .denominator,
  #the-calculator #total .denominator {
    position: relative;
  }
  #the-calculator button .denominator .denom-top,
  #the-calculator input .denominator .denom-top,
  #the-calculator #total .denominator .denom-top {
    font-size: 0.75em;
    position: absolute;
    left: -8px;
  }
  #the-calculator button .denominator .denom-slash,
  #the-calculator input .denominator .denom-slash,
  #the-calculator #total .denominator .denom-slash {
    padding: 0px 2px;
  }
  #the-calculator button .denominator .denom-btm,
  #the-calculator input .denominator .denom-btm,
  #the-calculator #total .denominator .denom-btm {
    font-size: 0.75em;
    position: absolute;
    bottom: 0px;
  }
  #the-calculator #the-display {
    width: 100%;
  }
  #the-calculator #the-display #total {
    width: 98%;
    margin: 0 auto 8px;
    display: block;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    -moz-background-clip: padding-box;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    font-size: 1.2em;
    color: #2f2f2f;
    text-shadow: 1px 1px 0px #fff;
    background: #fff;
    text-align: right;
  }
  #the-calculator #the-buttons {
    width: 100%;
  }
  #the-calculator #the-buttons #extra-buttons {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #00544b;
  }
  #the-calculator #the-buttons .button-row {
    width: 100%;
    zoom: 1;
  }
  #the-calculator #the-buttons .button-row:before,
  #the-calculator #the-buttons .button-row:after {
    content: "";
    display: table;
  }
  #the-calculator #the-buttons .button-row:after {
    clear: both;
  }
  #the-calculator #the-buttons .button-row:before,
  #the-calculator #the-buttons .button-row:after {
    content: "";
    display: table;
  }
  #the-calculator #the-buttons .button-row:after {
    clear: both;
  }
  #the-calculator #the-buttons .button-row button {
    width: 23%;
    margin: 1%;
    float: left;
    border: none;
    background: #006e62;
    background: -webkit-gradient(linear, left bottom, left top, color-stop(0, #00544b), color-stop(1, #006e62));
    background: -ms-linear-gradient(bottom, #00544b, #006e62);
    background: -moz-linear-gradient(center bottom, #00544b 0%, #006e62 100%);
    background: -o-linear-gradient(#006e62, #00544b);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#006e62', endColorstr='#00544b', GradientType=0);
    border-style: solid;
    border-color: #333;
    border-width: 0px 1px 1px 0px;
    color: #f0f0f0;
    cursor: pointer;
    text-shadow: -1px -1px rgba(0, 0, 0, 0.3);
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    -moz-background-clip: padding-box;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
  }
  #the-calculator #the-buttons .button-row button:hover,
  #the-calculator #the-buttons .button-row button.hovering {
    border-width: 1px 0px 0px 1px;
    -moz-opacity: 0.7;
    -khtml-opacity: 0.7;
    -webkit-opacity: 0.7;
    opacity: 0.7;
    -ms-filter: progid:DXImageTransform.Microsoft.Alpha(opacity=70);
    filter: alpha(opacity=70);
  }
  #the-calculator #the-buttons #calc_zero {
    width: 48%;
  }
  #the-calculator #the-buttons #calc_clear {
    background: #103f3a;
    background: -webkit-gradient(linear, left bottom, left top, color-stop(0, #0d332f), color-stop(1, #103f3a));
    background: -ms-linear-gradient(bottom, #0d332f, #103f3a);
    background: -moz-linear-gradient(center bottom, #0d332f 0%, #103f3a 100%);
    background: -o-linear-gradient(#103f3a, #0d332f);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#103f3a', endColorstr='#0d332f', GradientType=0);
  }
  #the-calculator #the-buttons #calc_back {
    background: #103f3a;
    background: -webkit-gradient(linear, left bottom, left top, color-stop(0, #0d332f), color-stop(1, #103f3a));
    background: -ms-linear-gradient(bottom, #0d332f, #103f3a);
    background: -moz-linear-gradient(center bottom, #0d332f 0%, #103f3a 100%);
    background: -o-linear-gradient(#103f3a, #0d332f);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#103f3a', endColorstr='#0d332f', GradientType=0);
  }
  #the-calculator #the-buttons #calc_eval {
    background: #dfdfdf;
    background: -webkit-gradient(linear, left bottom, left top, color-stop(0, #cdcdcd), color-stop(1, #dfdfdf));
    background: -ms-linear-gradient(bottom, #cdcdcd, #dfdfdf);
    background: -moz-linear-gradient(center bottom, #cdcdcd 0%, #dfdfdf 100%);
    background: -o-linear-gradient(#dfdfdf, #cdcdcd);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#dfdfdf', endColorstr='#cdcdcd', GradientType=0);
    color: #00544b;
    text-shadow: 1px 1px 0px #fff;
  }
  #the-results {
    width: 40%;
    float: right;
    /*min-width: 400px;*/
    margin: 0;
    /*padding: 20px;*/
    border: 2px solid #e0e0e0;
    background: #00544b;
    background: -webkit-gradient(linear, left bottom, left top, color-stop(0, #003b34), color-stop(1, #00544b));
    background: -ms-linear-gradient(bottom, #003b34, #00544b);
    background: -moz-linear-gradient(center bottom, #003b34 0%, #00544b 100%);
    background: -o-linear-gradient(#00544b, #003b34);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00544b', endColorstr='#003b34', GradientType=0);
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    -moz-background-clip: padding-box;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    -ms-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
  }
  #the-results #result_clear {
    position: absolute;
    right: 0;
    top: 105%;
  }
  #the-results ul {
    height: 340px;
    overflow-y: scroll;
    list-style: none;
    padding: 5px;
    border-radius: 3px;
    margin: 0 ;
    background: rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: inset 0px 0px 64px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: inset 0px 0px 64px rgba(0, 0, 0, 0.2);
    box-shadow: inset 0px 0px 64px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  #the-results ul li {
    font-size: 0.8em;
    width: 100%;
    -ms-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
  }
  #the-results ul li#result_default {
    /*padding-left: 24px;*/
    text-align: center;
    color: #a9a9a9;
    font-style: italic;
    font-weight: 200;
  }
  #the-results ul li.result {
    display: none;
    font-size: 0.8em;
    color: #f9f9f9;
    background: rgba(255, 255, 255, 0.05);
    zoom: 1;
    position: relative;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  #the-results ul li.result:before,
  #the-results ul li.result:after {
    content: "";
    display: table;
  }
  #the-results ul li.result:after {
    clear: both;
  }
  #the-results ul li.result:before,
  #the-results ul li.result:after {
    content: "";
    display: table;
  }
  #the-results ul li.result:after {
    clear: both;
  }
  #the-results ul li.result:nth-child(even) {
    background: rgba(255, 255, 255, 0.15);
  }
  #the-results ul li.result:nth-child(even) .answer {
    background: #103f3a;
    background: -webkit-gradient(linear, left bottom, left top, color-stop(0, #0d332f), color-stop(1, #103f3a));
    background: -ms-linear-gradient(bottom, #0d332f, #103f3a);
    background: -moz-linear-gradient(center bottom, #0d332f 0%, #103f3a 100%);
    background: -o-linear-gradient(#103f3a, #0d332f);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#103f3a', endColorstr='#0d332f', GradientType=0);
  }
  #the-results ul li.result .equation,
  #the-results ul li.result .answer {
    display: inline-block;
    padding: 0px 12px;
    -ms-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 60px;
    line-height: 40px;
  }
  #the-results ul li.result .equation {
    float: left;
    height: 100%;
    font-style: italic;
  }
  #the-results ul li.result .answer {
    position: absolute;
    right: 52px;
    top: 0;
    height: 100%;
    background: #0e3733;
    background: -webkit-gradient(linear, left bottom, left top, color-stop(0, #0b2b27), color-stop(1, #0e3733));
    background: -ms-linear-gradient(bottom, #0b2b27, #0e3733);
    background: -moz-linear-gradient(center bottom, #0b2b27 0%, #0e3733 100%);
    background: -o-linear-gradient(#0e3733, #0b2b27);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#0e3733', endColorstr='#0b2b27', GradientType=0);
  }
  #the-results ul li.result .use {
    height: 100%;
  }
  #the-results ul li.result .use a {
    background: #008779;
    background: -webkit-gradient(linear, left bottom, left top, color-stop(0, #006359), color-stop(1, #008779));
    background: -ms-linear-gradient(bottom, #006359, #008779);
    background: -moz-linear-gradient(center bottom, #006359 0%, #008779 100%);
    background: -o-linear-gradient(#008779, #006359);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#008779', endColorstr='#006359', GradientType=0);
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    display: block;
    padding: 0px 8px;
    width: 52px;
    text-align: center;
    text-decoration: none;
    margin: 0;
    font-size: 0.9em;
    cursor: pointer;
    border: none;
    color: #f9f9f9;
    text-shadow: -1px -1px rgba(0, 0, 0, 0.2);
  }
  #the-results ul li.result .use a:hover,
  #the-results ul li.result .use aactive {
    -moz-opacity: 0.7;
    -khtml-opacity: 0.7;
    -webkit-opacity: 0.7;
    opacity: 0.7;
    -ms-filter: progid:DXImageTransform.Microsoft.Alpha(opacity=70);
    filter: alpha(opacity=70);
  }


</style>
