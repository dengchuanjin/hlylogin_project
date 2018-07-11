<template>
  <div>
    <x-header style="position: fixed;left: 0; top: 0; z-index: 999; width: 100%;">消费明细</x-header>
    <scroller
      :on-refresh="refresh"
      :on-infinite="infinite"
      ref="my_scroller"
      refresh-layer-color="#4b8bf4"
      loading-layer-color="#ec4949"
    >
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
        <li class="row" :class="{'grey-bg': index % 2 == 0}" v-for="item,index in moneyDetailsList">
          <strong>订单名称: {{item.sm_pd_CostContent}}</strong>
          <span>支付时间: {{item.sm_pd_CostTime}}</span>
        </li>
      </ul>
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
    <div id="wrap">
      <div id="Home">
        <div id="load">
          <span class="loadImg"></span>
          <span class="loadImg2"></span>
          <span class="loadText">下拉刷新</span>
        </div>
        <div id="footerLoad">
          <span class="footLoadImg"></span>
          <span class="footLoadImg2"></span>
          <span class="footLoadText">加载更多</span>
        </div>
      </div>
    </div>
    <!--提示信息-->
    <toast v-model="errorShow" type="warn" is-show-mask :time="2000" :text="errorContent"></toast>
    <!--加载-->
    <loading :show="showLoding" text=""></loading>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {XHeader, Toast, Loading} from 'vux'
  export default {
    computed: mapGetters([
      'moneyDetailsList'
    ]),
    components: {
      XHeader,
      Toast,
      Loading
    },
    data() {
      return {
        userInfo: '',
        errorShow: false,
        errorContent: '',
        showLoding: false,
        id: '',
        rows: 0,
      }
    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('scoresumList'));
      this.searchMoneyId();
    },
    methods: {
      searchMoneyId() {
        this.showLoding = true;
        let selectUserPot = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "huileyou",//操作员编码
          "operatePassword": "123",//操作员密码
          "operateUserName": "",//
          "pcName": "",
          "sm_up_UserID": this.userInfo.ui_ID,//用户编码
          "sm_up_PackageType": "0",//用户类型  0用户 1供应商
        };
        this.$store.dispatch('searchMoneyId', selectUserPot)
          .then(id => {
            this.id = id;
            this.initData(this.id)
          }, err => {
            this.errorShow = true;
            this.errorContent = err;
          })
      },
      initData(id, rows) {
        this.showLoding = true;
        let getUserPotInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "huileyou",//操作员编码
          "operatePassword": "123",//操作员密码
          "operateUserName": "",//
          "pcName": "",
          "potID": id ? id : '',//钱包编码
          "page": "1",
          "rows": rows ? rows : 10
        };
        return this.$store.dispatch('initMoneyDetails', getUserPotInfo)
      },
      //上拉刷新
      refresh(done) {
        this.initData(this.id,10)
          .then(() => {
            this.showLoding = false;
            done(true)
          })
      },
      //下拉加载
      infinite(done) {
        this.rows += 10;
        this.initData(this.id, this.rows)
          .then(() => {
            this.showLoding = false;
            done(true)
          })
      }
    },
    mounted() {
    }
  }
</script>
<style scoped>
  .vux-header {
    background-color: #288DF7;
  }


  .orderDataList {
    padding: 50px 10px 10px;
  }

  .orderDataList > li {
    padding: 10px;
    border-bottom: 1px solid #999;
  }

  .orderDataList > li > strong {
    display: block;
    font: 16px/2 "微软雅黑";
    height: 32px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #999;
  }

  .orderDataList > li > span {
    display: block;
    font: 14px/2 "微软雅黑";
    color: #666;
  }
</style>
