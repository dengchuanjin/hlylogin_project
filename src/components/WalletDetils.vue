<template>
  <div>
    <x-header>钱包<a slot="right" @click="goMoneyDetails">明细</a></x-header>
    <group>
      <cell title="余额" :value="moneyNum + ' 元'"></cell>
    </group>
    <group>
      <cell title="充值" is-link></cell>
      <cell title="提现" is-link></cell>
      <cell title="设置/修改支付密码" is-link @click.native="setPayPassword"></cell>
    </group>

    <alert
      v-model="showPayPassword"
      title="设置支付密码"
      @on-hide="setPayPasswordSubmit"
    >
      <x-input style="border: 1px solid #ccc;" v-model="payPassword" placeholder="请输入新的支付密码" type="password" :max='6'></x-input>
      <x-input style="border: 1px solid #ccc; margin-top: 10px;" placeholder="请输入账号登录密码" v-model="password" type="password"></x-input>

    </alert>


    <!--提示信息-->
    <toast v-model="errorShow" type="warn" is-show-mask :time="2000" :text="errorContent"></toast>
    <toast v-model="successShow" type="primary" is-show-mask :time="2000" :text="successContent"></toast>

    <!--加载-->
    <loading :show="showLoding" text=""></loading>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {XHeader, Group, Cell, Toast, Loading, Alert, XInput} from 'vux'

  export default {
    computed: mapGetters([]),
    components: {
      XHeader,
      Group,
      Cell,
      Toast,
      Loading,
      Alert,
      XInput
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
        showPayPassword: false,
        moneyId: '',
        payPassword: '',
        password: '',
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
          "operateUserID": this.userInfo.sm_ui_ID,//操作员编码
          "operatePassword": "123",//操作员密码
          "operateUserName": "",//
          "pcName": "",
          "sm_up_ID": this.userInfo.sm_ui_ID,//用户编码
        };
        this.$store.dispatch('searchMoney', selectUserPot)
          .then(moneyObj => {
            this.showLoding = false;
            this.moneyNum = moneyObj.sm_up_Money;
            this.moneyId = moneyObj.sm_up_ID;
          }, err => {
            this.errorShow = true;
            this.errorContent = err;
          })
      },
//     go钱包明细
      goMoneyDetails() {
        this.$router.push({name: 'MoneyDetails'})
      },
      //设置支付密码
      setPayPassword() {
        this.showPayPassword = true;
      },
      setPayPasswordSubmit() {
        if (this.payPassword) {
          if (this.payPassword.length != 6 || isNaN(Number(this.payPassword))) {
            this.errorShow = true;
            this.errorContent = '支付密码必须为6位纯数字组成！！';
            this.payPassword = '';
            return;
          };
          if(this.password == ''){
            this.errorShow = true;
            this.errorContent = '请输入此账号的登录密码！！';
            return
          }
          let updateUserPot = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": this.userInfo.sm_ui_ID,//操作员编码
            "operatePassword": this.password,//操作员密码
            "operateUserName": "",//
            "pcName": "",
            "payCode": this.payPassword,//钱包密码
            "isDelete": "0",//钱包状态  1停用 0启用
          };
          this.$store.dispatch('setPayPasswordSubmit', updateUserPot)
            .then(suc => {
              this.successShow = true;
              this.successContent = suc;
              this.payPassword = '';
              this.searchMoney();
            }, err => {
              this.errorShow = true;
              this.errorContent = err;
            })
        } else {
          this.showPayPassword = false;
        }
      },
    },
  }
</script>
<style scoped>
  .vux-header {
    background-color: #288DF7;
  }
</style>
