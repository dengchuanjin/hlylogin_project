<template>
  <div>
    <x-header style="position: fixed;left: 0; top: 0; z-index: 999; width: 100%;">红包明细</x-header>
    <div id="wrap">
      <div id="Home">
        <div id="load">
          <span class="loadImg"></span>
          <span class="loadImg2"></span>
          <span class="loadText">下拉刷新</span>
        </div>
        <ul class="detalisList">
          <li class="clearfix" v-for="item,index in getRedEnvelopesList">
            <div>
              <strong>领取用户: {{item.ui_Name}}</strong>
              <span>领取时间: {{item.ui_sp_GetTime}}</span>
            </div>
            <strong>{{item.ui_sp_Money + ' 元'}}</strong>
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
  import {XHeader, Loading} from 'vux'
  import Scroll from '../assets/public/HomeScroll.js'

  export default {
    computed: mapGetters([
      'getRedEnvelopesList'
    ]),
    components: {
      XHeader,
      Loading
    },
    data() {
      return {
        id: '',
        site: 1,
        showLoding: false
      }
    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('scoresumList'));
      this.id = this.userInfo.ui_ID
      this.initData(this.id, 10, 1);
    },
    methods: {

      //初始化数据
      initData(id, rows, state) {
        this.showLoding = true;
        let getShare = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": id ? id : '',//操作员编码
          "operateUserName": "",
          "pcName": "",
          state: state ? state : '',
          "page": "1",
          "rows": rows ? rows : 10
        };
        this.$store.dispatch('getRedEnvelopesDetails', getShare)
          .then(() => {
            this.showLoding = false;
          })
      }
    },
    mounted() {
      Scroll(this)
    }
  }
</script>
<style scoped>
  .vux-header {
    background-color: #288DF7;
  }

  .detalisList {
    padding: 0 10px;
  }

  .detalisList > li {
    border-bottom: 1px solid #ccc;
    padding: 5px;
  }

  .detalisList > li > div {
    float: left;
    width: 70%;
  }

  .detalisList > li > div > strong {
    display: block;
    font: 18px/2 "微软雅黑";
    color: #666;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .detalisList > li > div > span {
    font: 14px/2 "微软雅黑";
    color: #666;
  }

  .detalisList > li > strong {
    float: right;
    font: 20px/2 "微软雅黑";
    color: #f80;
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
