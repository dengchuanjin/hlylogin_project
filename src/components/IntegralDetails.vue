<template>
  <div>
    <x-header>积分</x-header>
    <group>
      <cell
        v-for="item,index in searchUserIntegralList"
        :title="item.sm_ust_Name"
        :value="item.sm_ss_Score+ ' 分'"
        :key="index"
      ></cell>
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
    computed: mapGetters([
      'searchUserIntegralList'
    ]),
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
        errorShow: false,
        successShow: false,
        errorContent: '',
        successContent: '',
        showLoding: false,
      }
    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('scoresumList'));
      this.searchUserIntegral();
    },
    methods: {
      //查询用户积分
      searchUserIntegral() {
        this.showLoding = true;
        let selectUserTotalScore = {
          "loginUserID": "huileyou",//授权码
          "loginUserPass": "123",//授权密码
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",//机器码
          "userCode": this.userInfo.sm_ui_ID,//用户编码
        };
        this.$store.dispatch('searchUserIntegral', selectUserTotalScore)
          .then(() => {
            this.showLoding = false;
          }, err => {
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
</style>
