<template>
  <div>
    <x-header style="position: fixed;left: 0; top: 0; z-index: 999; width: 100%;">推广明细</x-header>
    <div id="wrap">
      <div id="Home">
        <div id="load">
          <span class="loadImg"></span>
          <span class="loadImg2"></span>
          <span class="loadText">下拉刷新</span>
        </div>
        <ul class="userList">
          <li v-for="item,index in exensionDetailsList">
            <strong>用户名称: {{item.SharedName}}</strong>
            <span>创建时间: {{item.sm_ii_CreateTime}}</span>
          </li>
        </ul>
        <div id="footerLoad">
          <span class="footLoadImg"></span>
          <span class="footLoadImg2"></span>
          <span class="footLoadText">加载更多</span>
        </div>
      </div>
    </div>
    <!--加载-->
    <loading :show="showLoding" text=""></loading>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {XHeader,Loading} from 'vux'
  import Scroll from '../assets/public/HomeScroll.js'

  export default {
    computed: mapGetters([
      'exensionDetailsList'
    ]),
    components: {
      XHeader,
      Loading
    },
    data() {
      return {
        rows: 20,
        userInfo: '',
        id: '',
        showLoding: false
      }
    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('scoresumList'));
      this.id = this.userInfo.ui_ID
      this.initData(this.id);
    },
    methods: {
      initData(id, rows) {
        this.showLoding = true;
        let getShareInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",//操作员编码
          "operateUserName": "",
          "pcName": "",
          "sm_ii_UserBeID": id ? id : '',//推广员编号
          "page": "1",
          "rows": rows ? rows : 10
        };
        this.$store.dispatch('initExensionDetails', getShareInfo)
          .then(()=>{
            this.showLoding = false;
          },err=>{

          })
      },
    },
    mounted() {
      Scroll(this)
    },

  }
</script>
<style scoped>
  .vux-header {
    background-color: #288DF7;
  }

  .userList {
    padding: 0 10px;
  }

  .userList > li {
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }

  .userList > li > strong {
    font: 16px/2 "微软雅黑";
    display: block;
    color: #10aeff;
  }

  .userList > li > span {
    font: 12px/2 "微软雅黑";
    color: #999;
  }

  #load {
    position: absolute;
    left: 0;
    top: -2.4rem;
    width: 100%;
    height: 2.4rem;
  }

  .loadImg {
    position: absolute;
    left: 2.5rem;
    top: .2rem;
    width: .8rem;
    height: 2rem;
    background: url("../assets/img/load.png") no-repeat center;
    background-size: cover;
  }

  .loadImg2 {
    display: none;
    position: absolute;
    left: 4rem;
    top: .95rem;
    width: .5rem;
    height: .5rem;
    background: url("../assets/img/loading.gif") no-repeat center;
    background-size: cover;
  }

  .loadText {
    display: block;
    font: 1rem/2.4rem "宋体";
    color: #fff;
    text-align: center;
  }

  #footerLoad {
    position: absolute;
    left: 0;
    bottom: -2.4rem;
    width: 100%;
    height: 2.4rem;
  }

  .footLoadText {
    display: block;
    font: 1rem/2.4rem "宋体";
    color: #fff;
    text-align: center;
  }

  .footLoadImg {
    position: absolute;
    left: 2.5rem;
    top: .2rem;
    width: .8rem;
    height: 2rem;
    background: url("../assets/img/load.png") no-repeat center;
    background-size: cover;
  }

  .footLoadImg2 {
    display: none;
    position: absolute;
    left: 4rem;
    top: .95rem;
    width: .8rem;
    height: .8rem;
    background: url("../assets/img/loading.gif") no-repeat center;
    background-size: cover;
  }

  #wrap {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    background: #282828;
  }

  #Home {
    position: relative;
    background: #fff;
  }

</style>
