<template>
  <div>
    <x-header style="position: fixed;left: 0; top: 0; z-index: 999; width: 100%;">推广明细</x-header>
    <scroller
      :on-refresh="refresh"
      :on-infinite="infinite"
      ref="my_scroller"
      refresh-layer-color="#4b8bf4"
      loading-layer-color="#ec4949"
    >
      <!-- custom refresh spinner, use default `spinner` & viewBox 0,0,64,64 class -->
      <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
        <g stroke-width="7" stroke-linecap="round">
          <line x1="10" x2="10" y1="27.3836" y2="36.4931">
            <animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate>
            <animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1"
                     repeatCount="indefinite"></animate>
          </line>
          <line x1="24" x2="24" y1="18.6164" y2="45.3836">
            <animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate>
            <animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1"
                     repeatCount="indefinite"></animate>
          </line>
          <line x1="38" x2="38" y1="16.1233" y2="47.8767">
            <animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate>
            <animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8"
                     repeatCount="indefinite"></animate>
          </line>
          <line x1="52" x2="52" y1="16" y2="48">
            <animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate>
            <animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5"
                     repeatCount="indefinite"></animate>
          </line>
        </g>
      </svg>

      <ul class="userList padd">
        <li class="row" :class="{'grey-bg': index % 2 == 0}" v-for="item,index in exensionDetailsList">
          <strong>用户名称: {{item.SharedName}}</strong>
          <span>创建时间: {{item.sm_ii_CreateTime}}</span>
        </li>
      </ul>


      <!-- custom infinite spinner -->
      <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
        <g>
          <circle cx="16" cy="32" stroke-width="0" r="3">
            <animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5"
                     repeatCount="indefinite"></animate>
            <animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate>
          </circle>
          <circle cx="32" cy="32" stroke-width="0" r="3.09351">
            <animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5"
                     repeatCount="indefinite"></animate>
            <animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate>
          </circle>
          <circle cx="48" cy="32" stroke-width="0" r="4.09351">
            <animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6"
                     repeatCount="indefinite"></animate>
            <animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate>
          </circle>
        </g>
      </svg>
    </scroller>
    <!--加载-->
    <loading :show="showLoding" text=""></loading>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {XHeader, Loading} from 'vux'

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
        rows: 0,
        userInfo: '',
        id: '',
        showLoding: false
      }
    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('scoresumList'));
      this.id = this.userInfo.sm_ui_ID
    },
    methods: {
      initData(id, rows) {
        this.showLoding = true;
        let getShareInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": id ? id : '',//操作员编码
          "operateUserName": "",
          "pcName": "",
          "sm_ii_UserID": id ? id : '',//推广员编号
          "page": "1",
          "rows": rows ? rows : 10
        };
        return this.$store.dispatch('initExensionDetails', getShareInfo)
      },

      //上拉刷新
      refresh(done) {
        this.initData(this.id, 10)
          .then(() => {
            this.showLoding = false;
            done(true)
          })

      },
      //下拉加载
      infinite(done) {
        this.rows += 10;
        this.initData(this.id, this.rows)
          .then(() => {
            this.showLoding = false;
            done(true)
          })

      }
    },
    mounted() {
    },

  }
</script>
<style scoped>
  .padd {
    padding-top: 50px !important;
  }

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
