<template>
  <div>
    <div class="wrap">
      <img src="../assets/img/huileyouLogo.jpg" width="180" height="47">
      <h1>惠乐游用户注册</h1>
      <div class="registerInformation">
        <input type="text" placeholder="电话号码" v-model="telephoneNumber">
        <input type="password" placeholder="密码" v-model="password">
        <input type="text" v-model="extensionID" placeholder="推广员ID" v-show="showExtensionID">
        <div class="verificationCode clearfix">
          <input type="text" placeholder="请输入验证码" v-model="verificationCode">
          <x-button type="primary" mini @click.native="getCode" :disabled="codeDisabled">{{getVerificationCode}}
          </x-button>
        </div>
      </div>
      <x-button type="primary" style="width: 80%; margin: 20px 10%;" mini @click.native="registerSubmit">提交</x-button>
      <a href="javascript:;" @click="goLogin">已有账号? 前往登录&gt;</a>
      <toast v-model="successShow" type="text" is-show-mask :time="1000" :text="successContent"></toast>
      <toast v-model="errorShow" type="warn" is-show-mask :time="1000" :text="errorContent"></toast>
    </div>
  </div>
</template>

<script>
  import {XButton, Toast} from 'vux'

  export default {
    components: {XButton, Toast},
    data() {
      return {
        getVerificationCode: '获取动态验证码',
        codeDisabled: false,
        telephoneNumber: '',
        password: '',
        verificationCode: '',
        successShow: false,
        errorShow: false,
        successContent: '',
        errorContent: '',
        extensionID: '',
        showExtensionID: false,
      }
    },
    methods: {
      //前往登录界面
      goLogin() {
        this.$router.push({name: 'Login'})
      },
      //获取验证码
      getCode() {
        if (this.telephoneNumber == '') {
          this.errorContent = '请输入电话号码';
          this.errorShow = true;
          return
        }
        let num = 60;
        this.getVerificationCode = num + 's后重新获取';
        let timer = setInterval(() => {
          if (num == 0) {
            this.codeDisabled = false;
            this.getVerificationCode = '重新获取验证码'
            clearInterval(timer);
          } else {
            this.codeDisabled = true;
            num--;
            this.getVerificationCode = num + 's后重新获取';
          }
        }, 1000);
        let SendMessage = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "phone": this.telephoneNumber
        }
        this.$store.dispatch('getCode', SendMessage)
          .then(suc => {
            this.successContent = suc;
            this.successShow = true;
          }, err => {
            this.errorContent = err;
            this.errorShow = true;
            this.getVerificationCode = '获取动态验证码'
            clearInterval(timer);
          })
      },
      //注册提交
      registerSubmit() {
        if (this.telephoneNumber == '') {
          this.errorContent = '请输入电话号码！';
          this.errorShow = true;
          return;
        }

        if (this.password == '') {
          this.errorContent = '请输入密码！';
          this.errorShow = true;
          return;
        }

        if (this.verificationCode == '') {
          this.errorContent = '请输入验证码！';
          this.errorShow = true;
          return;
        }
        let RegByCode = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "phone": this.telephoneNumber,
          "extensionID": this.extensionID ? this.extensionID : '',
          "password": this.password,
          "validateNo": this.verificationCode
        };
        this.$store.dispatch('registerSubmit', RegByCode)
          .then(suc => {
            this.successContent = suc;
            this.successShow = true;
            this.login();
          }, err => {
            this.errorContent = err;
            this.errorShow = true;
          })
      },
      //登录
      login() {
        let Login = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "userID": this.telephoneNumber,
          "password": this.password
        };
        this.$store.dispatch('loginSubmit', Login)
          .then(suc => {
            sessionStorage.setItem('scoresumList', JSON.stringify(suc));
            this.$router.push({name: 'PersonalCenter'})
          }, err => {
            this.errorShow = true;
            this.errorContent = err;
          })
      },
      //查询余额
    },
    created() {
      if (window.location.href.includes('?')) {
        let id = window.location.href.split('?')[1].split('=')[1];
        if (id.indexOf('#')) {
          this.extensionID = id.slice(0, id.indexOf('#'));
        } else {
          this.extensionID = id;
        }
      }
      ;
      if (this.extensionID) {
        this.showExtensionID = false;
      }else {
        this.showExtensionID = true;
      }
    }
  }
</script>

<style scoped>
  .wrap {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("../assets/img/loginBg.png") no-repeat center;
    -webkit-background-size: cover;
    background-size: cover;
  }

  h1 {
    font: bold 20px/2 "宋体";
    text-align: center;
    margin: 50px 0;
    color: #066CF9;
  }

  .registerInformation {
    text-align: center;
  }

  .registerInformation input {
    outline: none;
    border: 1px solid #ccc;
    width: 80%;
    text-align: center;
    margin-bottom: 20px;
    font: 15px/2 "微软雅黑";
    -webkit-border-radius: 14px;
    -moz-border-radius: 14px;
    border-radius: 14px;
    color: #000;
  }

  .verificationCode {
    width: 80%;
    margin: 0 auto;
  }

  .verificationCode > input {
    width: 40%;
    text-align: center;
    margin-bottom: 0;
    float: left;
  }

  .verificationCode > button {
    background-color: #41BB88;
    border: none;
    outline: none;
    font: 15px/2 "微软雅黑";
    padding: 0 10px;
    border-radius: 14px;
    color: #fff;
    float: right;
  }

  a {
    text-align: right;
    padding-right: 20px;
    color: #066CF9;
    font: 14px/2 "微软雅黑";
  }
</style>
