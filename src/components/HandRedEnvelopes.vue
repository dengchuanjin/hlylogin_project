<template>
  <div>
    <x-header>发红包</x-header>
    <divider>新会员注册福利</divider>
    <group>
      <x-input title="总金额" text-align="right" placeholder="请输入红包金额" v-model="totalMoney"></x-input>
      <x-input title="红包个数" text-align="right" placeholder="请输入红包数量" v-model="totalNumber"></x-input>
    </group>

    <div class="primary">
      <x-button type="primary" @click.native="confirm">确定</x-button>
    </div>
    <alert v-model="showAlert" @on-hide="onHide">
      <x-input title="" v-model="payCode" :max="maxLength" placeholder="请输入支付密码" type="password"></x-input>
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
  import {Toast, XHeader, Group, Cell, Divider, XInput, XButton, Alert, Loading} from 'vux'
  export default {
    computed: mapGetters([

    ]),
    components: {
      Toast,
      XHeader,
      Group,
      Cell,
      Divider,
      XInput,
      XButton,
      Alert,
      Loading
    },
    data() {
      return {
        totalMoney: '',
        totalNumber: '',
        payCode: '',
        showAlert: false,
        errorShow: false,
        successShow: false,
        errorContent: '',
        successContent: '',
        maxLength: 6,
        userInfo: '',
        showLoding: false,
      }
    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('scoresumList'));
    },
    methods: {
      confirm() {
        if (isNaN(Number(this.totalMoney)) || isNaN(Number(this.totalNumber))) {
          this.errorShow = true;
          this.errorContent = '请输入数字';
          return
        }
        if (!this.totalMoney || !this.totalNumber) {
          this.errorShow = true;
          this.errorContent = '请输入红包金额或数量';
          return
        }
        this.showAlert = true;
      },
      onHide() {
        if (this.payCode.length != 6) {
          this.showAlert = true;
          this.errorShow = true;
          this.errorContent = '请输入完整的支付密码';
          return
        }
        this.showLoding = true;
        let addShare = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": this.userInfo.sm_ui_ID,//操作员编码
          "operateUserName": "",
          "pcName": "",
          "totalMoney": this.totalMoney,//推广金额
          "totalTimes": this.totalNumber,//分享个数
          "payCode": this.payCode,//支付密码
        };
        this.$store.dispatch('addHandRedEnvelopes', addShare)
          .then(suc => {
            this.showLoding = false;
            this.successShow = true;
            this.successContent = suc;
            setTimeout(() => {
              this.$router.push({name: 'RedEnvelopes'})
            }, 1000)
          }, err => {
            this.showLoding = false;
            this.errorShow = true;
            this.errorContent = err;
          })
      },
    },
  }
</script>
<style scoped>
  .vux-header {
    background-color: #288DF7;
  }

  .primary {
    text-align: center;
    margin-top: 40px;
  }

  .primary > button {
    width: 60%;
  }
</style>
