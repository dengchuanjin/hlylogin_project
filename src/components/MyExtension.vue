<template>
  <div>
    <x-header>我的推广</x-header>
    <group>
      <cell title="推广明细" is-link @click.native="goExtensionDetails"></cell>
      <cell title="推广网址">
        <button
          class="btn"
          :data-clipboard-text="linkAddress"
          @click="copy">
          复制
        </button>
      </cell>
    </group>
    <div class="qrCode">
      <x-button type="primary" @click.native="showCode">生成用户推广二维码</x-button>
      <alert v-model="showqrCode" title="用户推广二维码">
        <qrcode :value="linkAddress" type="img"></qrcode>
      </alert>
    </div>
    <!-- 提示信息 -->
    <toast v-model="errorShow" type="warn" is-show-mask :time="2000" :text="errorContent"></toast>
    <toast v-model="successShow" type="primary" is-show-mask :time="2000" :text="successContent"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {XHeader, Group, Cell, Toast, XButton, Qrcode, Alert} from 'vux'
  export default {
    computed: mapGetters([]),
    components: {
      XHeader,
      Group,
      Cell,
      Toast,
      XButton,
      Qrcode,
      Alert
    },
    data() {
      return {
        errorShow: false,
        successShow: false,
        errorContent: '',
        successContent: '',
        linkAddress: '',
        userInfo: '',
        showqrCode: false,
        showqrAgainCode: false,
      }
    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('scoresumList'));
      this.linkAddress = this.userInfo.sm_ui_ExtensionURL;
    },
    methods: {
      //复制功能
      copy() {
        var clipboard = new ClipboardJS('.btn');
        clipboard.on('success', function (e) {
          e.clearSelection();
        });
        this.successShow = true;
        this.successContent = '复制成功！！'
      },
      showCode() {
        this.showqrCode = true;
      },
      goExtensionDetails() {
        this.$router.push({name: 'ExtensionDetails'})
      },
      showACode(){
        this.showqrAgainCode = true;
      }
    },
  }
</script>
<style scoped>
  .vux-header {
    background-color: #288DF7;
  }
  .btn {
    background-color: #1AAD19;
    border: 1px solid #999;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    font: 14px/2 "微软雅黑";
    padding: 0 20px;
    color: #fff;
    outline: none;
  }
  .qrCode {
    margin-top: 20px;
    text-align: center;
  }
  .qrCode > button {
    width: 70%;
    margin-bottom: 20px;
  }
</style>
