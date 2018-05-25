<template>
  <div>
    <x-header style="position: fixed;left: 0; top: 0; z-index: 999; width: 100%;">消费明细</x-header>
    <div id="wrap">
      <div id="Home">
        <div id="load">
          <span class="loadImg"></span>
          <span class="loadImg2"></span>
          <span class="loadText">下拉刷新</span>
        </div>
        <ul class="orderDataList">
          <li v-for="item,index in moneyDetailsList">
            <strong>订单名称: {{item.sm_pd_CostContent}}</strong>
            <span>支付时间: {{item.sm_pd_CostTime}}</span>
          </li>
        </ul>
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
  import Scroll from '../assets/public/HomeScroll.js'

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
        id: ''
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
        this.$store.dispatch('initMoneyDetails', getUserPotInfo)
          .then(() => {
            this.showLoding = false;
          })
      },
    },
    mounted() {
      Scroll(this);
    }
  }
</script>
<style scoped>
  .vux-header {
    background-color: #288DF7;
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

  .orderDataList {
    padding: 10px;
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
