<template>
  <div>
    <x-header
      :left-options="{showBack: false}"
    >个人中心<a slot="right" @click="noLogin">退出登录</a></x-header>


    <!--会员中心-->
    <div class="VIPBox" v-show="showVIP">
      <div class="personalData clearfix" @click="goPersonalData">
        <div class="headPortrait">
          <img v-show="userInfromationObj.sm_ui_HeadImage"
               :src="userInfromationObj.sm_ui_HeadImage?userInfromationObj.sm_ui_HeadImage:''">
          <img src="../assets/img/center.png" v-show="!userInfromationObj.sm_ui_HeadImage" alt="">
        </div>
        <div class="nickname">
          <strong>{{userInfromationObj.sm_ui_Name}}</strong>
          <span>{{userInfromationObj.sm_ui_UserCode}}</span>
        </div>
        <div class="goIcon"></div>
      </div>
      <group style="text-align: left">
        <cell title="订单" is-link @click.native="goOrderDetails"></cell>
        <cell title="积分" is-link @click.native="goIntegral"></cell>
        <cell title="钱包" is-link @click.native="goWalletDetails"></cell>
        <cell title="红包" is-link @click.native="goRedEnvelopes"></cell>
        <cell title="我的推广" is-link @click.native="goMyExtension"></cell>
      </group>
      <!--<group style="text-align: left">-->
      <!--<cell title="我的分享推广" is-link></cell>-->
      <!--</group>-->
    </div>
    <!--提示信息-->
    <toast v-model="errorShow" type="warn" is-show-mask :time="2000" :text="errorContent"></toast>
    <toast v-model="successShow" type="primary" is-show-mask :time="2000" :text="successContent"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Tab, TabItem, XHeader, Divider, Qrcode, XButton, Group, Cell, Toast} from 'vux'

  export default {
    computed: mapGetters([
      'userInfromationObj'
    ]),
    components: {
      Tab,
      TabItem,
      XHeader,
      Qrcode,
      Divider,
      XButton,
      Group,
      Cell,
      Toast
    },
    data() {
      return {
        showVIP: true,
        showAgent: false,
        showApplyAgent: true,
        showAgentBoxContent: false,
        integralTypeList: [],
        isShow: false,
        errorShow: false,
        errorContent: '',
        successShow: false,
        successContent: '',
        VIPQrcodeUrl: '',
        agentQrcodeUrl: '',
        userInfo: {},
        moneyNum: '',
      }
    },
    methods: {
      initData() {
        let selectUser = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "sm_ui_ID": this.userInfo.sm_ui_ID
        };
        this.$store.dispatch('initUserInfromation', selectUser)
          .then(() => {
          }, err => {
            this.errorShow = true;
            this.errorContent = err;
          })
      },
      //退出登录
      noLogin() {
        this.$router.push({name: 'Login'})
        sessionStorage.removeItem('scoresumList')
      },
      //go个人信息
      goPersonalData() {
        this.$router.push({name: 'PersonalData'})
      },
      //go红包信息
      goRedEnvelopes() {
        this.$router.push({name: 'RedEnvelopes'})
      },
      //go钱包
      goWalletDetails() {
        this.$router.push({name: 'WalletDetils'})
      },
      //go积分
      goIntegral() {
        this.$router.push({name: 'IntegralDetails'})
      },
      //go我的推广
      goMyExtension() {
        this.$router.push({name: 'MyExtension'})
      },
      //go我的订单详情
      goOrderDetails() {
        this.$router.push({name: 'OrderDetails'})
      }
    },
    created() {
      let obj = sessionStorage.getItem('scoresumList');
      if (obj) {
        this.userInfo = JSON.parse(obj);
        this.integralTypeList = this.userInfo.scoresumList;
        if (this.integralTypeList == '') {
          this.isShow = true;
        }
        if (JSON.parse(obj).ui_extensionID != '') {
          this.showApplyAgent = false;
          this.showAgentBoxContent = true;
        }
        this.VIPQrcodeUrl = JSON.parse(sessionStorage.getItem('scoresumList')).userExtendCode;
        this.agentQrcodeUrl = JSON.parse(sessionStorage.getItem('scoresumList')).proxyExtendCode;
      }else {
        this.$router.push({name:'Login'})
      }
      this.initData();
    }
  }
</script>
<style scoped>

  .vux-header {
    background-color: #288DF7;
  }

  .agentBox {
    margin-top: 20px;
  }

  .agentBoxContent {
    margin-top: 20px;
    text-align: center;
  }

  h2 {
    font: 14px/2 "微软雅黑";
    color: #ccc;
  }

  .personalData {
    height: 70px;
    background-color: #288DF7;
    padding: 20px 10px;
  }

  .headPortrait {
    float: left;
    width: 70px;
    height: 70px;
    overflow: hidden;
    border: 3px solid #2B70B8;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    background-color: #fff;
  }

  .headPortrait > img {
    width: 70px;
    height: 70px;
  }

  .nickname {
    float: left;
    margin-left: 10px;
  }

  .nickname > strong {
    display: block;
    font: 18px/2 "微软雅黑";
    color: #ffffff;
  }

  .nickname > span {
    font: 14px/2 "微软雅黑";
    color: #8ABDF2;
  }

  .goIcon {
    float: right;
    width: 10px;
    height: 10px;
    border-top: 2px solid #fff;
    border-left: 2px solid #fff;
    transform: rotate(135deg);
    margin: 30px 10px 0 0;
  }
</style>
