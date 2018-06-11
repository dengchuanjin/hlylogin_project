<template>
  <div>
    <x-header>红包</x-header>
    <group>
      <cell title="红包数量" :value="redNumber + ' 个'"></cell>
      <cell title="剩余个数" :value="surplusNumber + ' 个'"></cell>
      <cell title="剩余金额" :value="surplusMoney + ' 元'"></cell>
      <cell title="已领个数" :value="leadNumber + ' 个'"></cell>
      <cell title="已领金额" :value="leadMoney + ' 元'"></cell>
    </group>
    <group>
      <cell title="发红包" is-link @click.native="goHandRedEnvelopes"></cell>
      <cell title="红包明细" is-link @click.native="goRedEnvelopesDetails"></cell>
    </group>


    <!--提示信息-->
    <toast v-model="errorShow" type="warn" is-show-mask :time="2000" :text="errorContent"></toast>
    <toast v-model="successShow" type="primary" is-show-mask :time="2000" :text="successContent"></toast>
    <!--加载-->
    <loading :show="showLoding" text=""></loading>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Toast, XHeader, Group, Cell, Loading} from 'vux'

  export default {
    computed: mapGetters([]),
    components: {
      Toast,
      XHeader,
      Group,
      Cell,
      Loading
    },
    data() {
      return {
        errorShow: false,
        successShow: false,
        errorContent: '',
        successContent: '',
        redNumber: '',
        surplusNumber: '',
        surplusMoney: '',
        leadNumber: '',
        leadMoney: '',
        userInfo: '',
        showLoding: false,
        payPassword: '',
      }
    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('scoresumList'));
      this.initData();
      this.searchMoney();
    },
    methods: {
      //查询钱包信息
      searchMoney() {
        this.showLoding = true;
        let selectUserPot = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": this.userInfo.sm_ui_ID,//操作员编码
          "operatePassword": "123",//操作员密码
          "operateUserName": "",//
          "pcName": "",
          "sm_up_ID": this.userInfo.sm_ui_ID,//用户编码
        };
        this.$store.dispatch('searchMoney', selectUserPot)
          .then(moneyObj => {
            this.payPassword = moneyObj.sm_up_PayCode;
          }, err => {
            this.errorShow = true;
            this.errorContent = err;
          })
      },
      //go发红包
      goHandRedEnvelopes() {
        if( this.payPassword == '' || this.payPassword == null ){
          this.errorShow = true;
          this.errorContent = '请先设置支付密码';
          setTimeout(()=>{
            this.$router.push({name:'WalletDetils'})
          },1000)
        }else{
          this.$router.push({name: 'HandRedEnvelopes'})
        }
      },
      //go红包明细
      goRedEnvelopesDetails() {
        this.$router.push({name: 'RedEnvelopesDetails'})
      },
      //初始化数据
      initData() {
        this.showLoding = true;
        let getShare = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": this.userInfo.sm_ui_ID,//操作员编码
          "operateUserName": "",
          "pcName": "",
        };
        this.$store.dispatch('getRedEnvelopes', getShare)
          .then((obj) => {
            this.redNumber = obj.redNumber;
            this.surplusNumber = obj.surplusNumber;
            this.surplusMoney = obj.surplusMoney;
            this.leadNumber = obj.leadNumber;
            this.leadMoney = obj.leadMoney;
            this.showLoding = false;
          })
      }
    },
  }
</script>
<style scoped>
  .vux-header {
    background-color: #288DF7;
  }
</style>
