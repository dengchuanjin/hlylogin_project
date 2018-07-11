<template>
  <div>

    <section class="re">
      <x-header :right-options="{showMore: true}"
      @on-click-more="showMenus = true">我的订单({{orderType}})
      </x-header>
    </section>
    <scroller
              :on-refresh="refresh"
              :on-infinite="infinite"
              ref="my_scroller"
              refresh-layer-color="#4b8bf4"
              loading-layer-color="#ec4949"
    >
      <!-- custom refresh spinner, use default `spinner` & viewBox 0,0,64,64 class -->
      <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
        <g stroke-width="7" stroke-linecap="round">
          <line x1="10" x2="10" y1="27.3836" y2="36.4931">
            <animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate>
            <animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1"
                     repeatCount="indefinite"></animate>
          </line>
          <line x1="24" x2="24" y1="18.6164" y2="45.3836">
            <animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate>
            <animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1"
                     repeatCount="indefinite"></animate>
          </line>
          <line x1="38" x2="38" y1="16.1233" y2="47.8767">
            <animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate>
            <animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8"
                     repeatCount="indefinite"></animate>
          </line>
          <line x1="52" x2="52" y1="16" y2="48">
            <animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate>
            <animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5"
                     repeatCount="indefinite"></animate>
          </line>
        </g>
      </svg>
      <ul class="orderDataList padd">
        <li class="row" :class="{'grey-bg': index % 2 == 0}" v-for="item,index in orderDataList">
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
      <!-- custom infinite spinner -->
      <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
        <g>
          <circle cx="16" cy="32" stroke-width="0" r="3">
            <animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5"
                     repeatCount="indefinite"></animate>
            <animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate>
          </circle>
          <circle cx="32" cy="32" stroke-width="0" r="3.09351">
            <animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5"
                     repeatCount="indefinite"></animate>
            <animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate>
          </circle>
          <circle cx="48" cy="32" stroke-width="0" r="4.09351">
            <animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6"
                     repeatCount="indefinite"></animate>
            <animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate>
          </circle>
        </g>
      </svg>
    </scroller>
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
  import {XHeader, Actionsheet, XButton, Toast, Loading} from 'vux'
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
        rows: 0,
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
    },
    mounted() {
      this.top = 1
      this.bottom = 20
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
          "huiuserid": this.userInfo.sm_ui_ID,
          "orderType": id ? id : '',
          "page": "1",
          "rows": rows ? rows : 5,
          "isDelete": 0
        };
        return this.$store.dispatch('getOrderData', getUserOrderDetail)
      },
      //选择订单类型
      changeOrderType(menuKey, menuValue) {
        this.id = menuKey;
        this.orderType = menuValue;
        this.initData(this.id)
          .then(()=>{
            this.showLoding = false;
          })
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
        this.$store.dispatch('deleteOrder', deleteOrder)
          .then(suc => {
            this.successShow = true;
            this.successContent = suc;
            this.initData()
              .then(() => {
                this.showLoding = false;
              })
          }, err => {
            this.errorShow = true;
            this.errorContent = err;
          })
      },
      //上拉刷新
      refresh(done) {
        this.initData(this.id,5)
          .then(() => {
            this.showLoding = false;
            done(true)
          })
      },
      //下拉加载
      infinite(done) {
        this.rows += 5;
        this.initData(this.id, this.rows)
          .then(() => {
            this.showLoding = false;
            done(true)
          })
      }
    },
  }
</script>
<style scoped>
  .padd{
    padding-top: 50px !important;
  }
  .re {
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 111;
  }
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


</style>
