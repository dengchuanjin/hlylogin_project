<template>
  <div>
    <x-header>钱包<a slot="right" @click="goMoneyDetails">明细</a></x-header>
    <group>
      <cell title="余额" :value="moneyNum + ' 元'"></cell>
    </group>
    <group>
      <cell title="充值" is-link></cell>
      <cell title="提现" is-link></cell>
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
  import {XHeader, Group, Cell, Toast, Loading} from 'vux'

  export default {
    computed: mapGetters([]),
    components: {
      XHeader,
      Group,
      Cell,
      Toast,
      Loading
    },
    data() {
      return {
        userInfo: '',
        moneyNum: 0,
        errorShow: false,
        successShow: false,
        errorContent: '',
        successContent: '',
        showLoding: false,
      }
    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('scoresumList'));
      this.searchMoney();
    },
    methods: {
      //查询钱包信息
      searchMoney() {
        this.showLoding = true;
        let selectUserPot = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "huileyou",//操作员编码
          "operatePassword": "123",//操作员密码
          "operateUserName": "",//
          "pcName": "",
          "sm_up_UserID": this.userInfo.ui_ID,//用户编码
        };
        this.$store.dispatch('searchMoney', selectUserPot)
          .then(money => {
            this.showLoding = false;
            this.moneyNum = money;
          }, err => {
            this.errorShow = true;
            this.errorContent = err;
          })
      },
//     go钱包明细
      goMoneyDetails(){
        this.$router.push({name:'MoneyDetails'})
      }
    },
  }
</script>
<style scoped>
  .vux-header {
    background-color: #288DF7;
  }
</style>
