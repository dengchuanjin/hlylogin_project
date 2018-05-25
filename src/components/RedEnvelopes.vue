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
  import {Toast, XHeader, Group, Cell,Loading} from 'vux'

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
      }
    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('scoresumList'));
      this.initData();
    },
    methods: {
      //go发红包
      goHandRedEnvelopes() {
        this.$router.push({name: 'HandRedEnvelopes'})
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
          "operateUserID": this.userInfo.ui_ID,//操作员编码
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
