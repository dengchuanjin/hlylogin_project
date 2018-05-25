<template>
  <div>
    <x-header style="position: fixed;left: 0; top: 0; z-index: 999; width: 100%;" :right-options="{showMore: true}"
              @on-click-more="showMenus = true">我的订单({{orderType}})
    </x-header>

    <div id="wrap">
      <div id="Home">
        <div id="load">
          <span class="loadImg"></span>
          <span class="loadImg2"></span>
          <span class="loadText">下拉刷新</span>
        </div>
        <ul class="orderDataList">
          <li v-for="item,index in orderDataList">
            <div class="clearfix"><strong>产品信息</strong><span>{{item.oi_OrderName}}</span></div>
            <div class="clearfix"><strong>订单金额</strong><span>{{item.oi_SellMoney + ' 元'}}</span></div>
            <div class="clearfix"><strong>下单时间</strong><span>{{item.oi_CreateTime}}</span></div>
            <div class="clearfix"><strong>订单号</strong><span>{{item.oi_OrderID}}</span></div>
            <div class="clearfix"><strong>订单类型</strong><span>{{item.oi_OrderType}}</span></div>
            <div class="clearfix"><strong>数量</strong><span>{{item.oi_Number}}</span></div>
            <div class="clearfix"><strong>支付状态</strong><span>{{item.oi_OrderStatus == 0 ? '未支付' : '已支付'}}</span></div>
            <div class="clearfix"><strong>出票状态</strong><span>{{item.oi_OutStatus == 0 ? '商家出单中' : '商家出单成功'}}</span>
            </div>
            <div class="clearfix"><strong>操作</strong><span><x-button type="warn" mini
                                                                     @click.native="deleteOrder(item.oi_OrderID)">删除</x-button></span>
            </div>
          </li>
        </ul>
        <div id="footerLoad">
          <span class="footLoadImg"></span>
          <span class="footLoadImg2"></span>
          <span class="footLoadText">加载更多</span>
        </div>
      </div>
    </div>
    <div>
      <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu="changeOrderType"></actionsheet>
    </div>
    <!--提示信息-->
    <toast v-model="errorShow" type="warn" is-show-mask :time="2000" :text="errorContent"></toast>
    <toast v-model="successShow" type="primary" is-show-mask :time="2000" :text="successContent"></toast>
    <!--加载-->
    <loading :show="showLoding" text=""></loading>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {XHeader, Actionsheet, XButton,Toast,Loading} from 'vux'
  import Scroll from '../assets/public/HomeScroll.js'

  export default {
    computed: mapGetters([
      'orderDataList'
    ]),
    components: {
      XHeader,
      Actionsheet,
      XButton,
      Toast,
      Loading
    },
    data() {
      return {
        menus: {
          0: '旅行社',
          1: '车票',
          2: '门票',
          3: '美食',
          4: '酒店',
          5: '租车',
          '': '全部订单',
        },
        showMenus: false,
        userInfo: '',
        rows: 10,
        id: '',
        orderType: '全部订单',
        errorShow: false,
        errorContent: '',
        successShow: false,
        successContent: '',
        showLoding: false,
      }
    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('scoresumList'));
      this.initData();
    },
    mounted() {
      Scroll(this)
    },
    methods: {
      initData(id, rows) {
        this.showLoding = true;
        let getUserOrderDetail = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "huiuserid": this.userInfo.ui_ID,
          "orderType": id ? id : '',
          "page": "1",
          "rows": rows ? rows : 10,
          "isDelete":0
        };
        this.$store.dispatch('getOrderData', getUserOrderDetail)
         .then(()=>{
          this.showLoding = false;
         })
      },
      //选择订单类型
      changeOrderType(menuKey, menuValue) {
        this.id = menuKey;
        this.orderType = menuValue;
        this.initData(this.id)
      },
      //删除订单
      deleteOrder(id) {
        let deleteOrder = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "orderID": id ? id : ''
        };
        this.$store.dispatch('deleteOrder',deleteOrder)
          .then(suc => {
            this.successShow = true;
            this.successContent = suc;
            this.initData();
          }, err => {
            this.errorShow = true;
            this.errorContent = err;
          })
      }
    },
  }
</script>
<style scoped>
  .vux-header {
    background-color: #288DF7;
  }

  .orderDataList {
    margin-bottom: 10px;
    padding: 10px;
    font: 16px/2 "微软雅黑";
    color: #550;
  }

  .orderDataList > li {
    padding: 10px;
    border: 1px solid #ccc;
    margin-top: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
  }

  .orderDataList > li > div {
    border-bottom: 1px solid #ccc;
    padding: 0 2%;
  }

  .orderDataList > li > div:last-of-type {
    border-bottom: none;
  }

  .orderDataList strong {
    width: 30%;
    float: left;
  }

  .orderDataList span {
    width: 60%;
    text-align: right;
    float: right;
    height: 32px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  #load {
    position: absolute;
    left: 0;
    top: -2.4rem;
    width: 100%;
    height: 2.4rem;
  }

  .loadImg {
    position: absolute;
    left: 2.5rem;
    top: .2rem;
    width: .8rem;
    height: 2rem;
    background: url("../assets/img/load.png") no-repeat center;
    background-size: cover;
  }

  .loadImg2 {
    display: none;
    position: absolute;
    left: 4rem;
    top: .95rem;
    width: .5rem;
    height: .5rem;
    background: url("../assets/img/loading.gif") no-repeat center;
    background-size: cover;
  }

  .loadText {
    display: block;
    font: 1rem/2.4rem "宋体";
    color: #fff;
    text-align: center;
  }

  #footerLoad {
    position: absolute;
    left: 0;
    bottom: -2.4rem;
    width: 100%;
    height: 2.4rem;
  }

  .footLoadText {
    display: block;
    font: 1rem/2.4rem "宋体";
    color: #fff;
    text-align: center;
  }

  .footLoadImg {
    position: absolute;
    left: 2.5rem;
    top: .2rem;
    width: .8rem;
    height: 2rem;
    background: url("../assets/img/load.png") no-repeat center;
    background-size: cover;
  }

  .footLoadImg2 {
    display: none;
    position: absolute;
    left: 4rem;
    top: .95rem;
    width: .8rem;
    height: .8rem;
    background: url("../assets/img/loading.gif") no-repeat center;
    background-size: cover;
  }

  #wrap {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    background: #282828;
  }

  #Home {
    position: relative;
    background: #fff;
  }


</style>
