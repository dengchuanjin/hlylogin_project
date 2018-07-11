<template>
  <div>
    <div class="wrap">
      <img src="../assets/img/huileyouLogo.jpg" width="180" height="47">
      <h1>惠乐游用户登录</h1>
      <div class="loginInformation">
        <input type="text" placeholder="电话号码" v-model="loginNumber">
        <input type="password" placeholder="密码" v-model="password">
        <x-button type="primary" style="width: 80%; margin: 10px 10%;" mini @click.native="loginSubmit">提交</x-button>
      </div>
      <a href="javascript:;" @click="goRegister">未拥有账号? 前往注册&gt;</a>
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
        loginNumber: '',
        password: '',
        errorShow: false,
        errorContent: ''
      }
    },
    methods: {
      //前往注册
      goRegister() {
        this.$router.push({name: 'Register'})
      },
      //登录提交
      loginSubmit() {
        let Login = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "userID": this.loginNumber,
          "password": this.password
        };
        this.$store.dispatch('loginSubmit',Login)
          .then(suc=>{
            sessionStorage.setItem('scoresumList',JSON.stringify(suc));
            this.$router.push({name:'PersonalCenter'})
          },err=>{
            this.errorShow = true;
            this.errorContent = err;
          })
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
  .loginInformation {
    text-align: center;
  }
  .loginInformation input {
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
  a {
    text-align: right;
    padding-right: 20px;
    color: #066CF9;
    font: 14px/2 "微软雅黑";
  }
</style>
