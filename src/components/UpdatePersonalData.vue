<template>
  <div>
    <x-header>编辑个人资料</x-header>
    <group>
      <x-input title="昵称" text-align="right" v-model="userInfromationObj.ui_Name" placeholder="请输入昵称"></x-input>
      <x-input title="身份证号" text-align="right" v-model="userInfromationObj.ui_CertNo" placeholder="请输入身份证号"></x-input>
      <x-input title="手机号" text-align="right" v-model="userInfromationObj.ui_Phone" placeholder="请输入手机号"></x-input>
      <datetime
        v-model="userInfromationObj.ui_Birthday"
        @on-change="change"
        start-date="1970-01-01"
        :end-date="endTiem"
        title="生日"
      ></datetime>
      <cell title="性别">
        <button-tab style="width: 200px;" v-model="userInfromationObj.ts_ui_Sex">
          <button-tab-item @on-item-click="consoleIndex()">男</button-tab-item>
          <button-tab-item @on-item-click="consoleIndex()">女</button-tab-item>
        </button-tab>
      </cell>
      <x-input title="电子邮箱" text-align="right" v-model="userInfromationObj.ts_ui_Email" placeholder="请输入电子邮箱"></x-input>
      <cell title="省" is-link @click.native="showProvice">{{userInfromationObj.proviceName}}</cell>
      <cell title="市" is-link @click.native="showCity">{{userInfromationObj.cityName}}</cell>
      <x-input title="详细地址" text-align="right" v-model="userInfromationObj.ui_Address" placeholder="请输入详细地址"></x-input>
      <cell title="婚姻状况">
        <button-tab style="width: 200px;" v-model="userInfromationObj.ui_MarryStatus">
          <button-tab-item @on-item-click="stateIndex()">未婚</button-tab-item>
          <button-tab-item @on-item-click="stateIndex()">已婚</button-tab-item>
        </button-tab>
      </cell>
      <cell title="职业" is-link @click.native="showOccupation">{{userInfromationObj.ts_ui_JobName}}</cell>
      <cell title="学历" is-link @click.native="showEducation">{{userInfromationObj.ts_ui_EducationName}}</cell>
    </group>
    <div class="submit">
      <x-button type="primary" @click.native="updateSubmit">确认</x-button>
    </div>
    <!--省-->
    <div class="boxMask" v-show="showProviceBox" @click="closeShowProviceBox">
      <ul class="showProviceBox">
        <li v-for="item,index in provinceDataList" @click.stop="changeProvice(item)">{{item.sm_af_AreaName}}</li>
      </ul>
    </div>
    <!--市-->
    <div class="boxMask" @click="closeShowCity" v-show="showCityBox">
      <ul class="showProviceBox">
        <li v-for="item,index in cityDataList" @click.stop="changeCity(item)">{{item.sm_af_AreaName}}</li>
      </ul>
    </div>
    <!--职业-->
    <div class="boxMask" @click="closeShowOccupationBox" v-show="showOccupationBox">
      <ul class="showProviceBox">
        <li v-for="item,index in occupationList">
          <strong>{{item.label}}</strong>
          <span v-for="item,index in item.children" @click="changeOccupation(item)">{{item.label}}</span>
        </li>
      </ul>
    </div>
    <!--学历-->
    <div class="boxMask" @click="closeShowEducationBox" v-show="showEducationBox">
      <ul class="showProviceBox">
        <li v-for="item,index in educationList" @click="changeEducation(item)">{{item.ts_jb_Name}}</li>
      </ul>
    </div>


    <!--提示信息-->
    <toast v-model="errorShow" type="warn" is-show-mask :time="2000" :text="errorContent"></toast>
    <toast v-model="successShow" type="primary" is-show-mask :time="2000" :text="successContent"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {XHeader, Group, XInput, Cell, ButtonTab, ButtonTabItem, Datetime, Selector, XButton, Toast} from 'vux'

  export default {
    computed: mapGetters([
      'userInfromationObj',
      'provinceDataList',
      'cityDataList',
      'occupationList',
      'educationList'
    ]),
    components: {
      XHeader,
      Group,
      XInput,
      Cell,
      ButtonTab,
      ButtonTabItem,
      Datetime,
      Selector,
      XButton,
      Toast
    },
    data() {
      return {
        sexItem: 0,
        stateItem: 0,
        endTiem: '',
        proviceData: '',
        cityData: '',
        showProviceBox: false,
        showCityBox: false,
        showOccupationBox: false,
        showEducationBox: false,
        timeDate: '',
        occupationData: '',
        educationData: '',
        errorShow: false,
        errorContent: '',
        successShow: false,
        successContent: '',
      }
    },
    created() {
      let t = new Date();
      let year = t.getFullYear();
      let month = this.addZroe(t.getMonth() + 1);
      let day = this.addZroe(t.getDate());
      this.endTiem = year + "-" + month + "-" + day;
      this.initProvinceList();
      this.initOccupation();
      this.initEducation();
    },
    methods: {
      //选择性别
      consoleIndex() {
      },
      //婚姻状况
      stateIndex() {

      },
      //补零
      addZroe(num) {
        return num < 10 ? '0' + num : '' + num;
      },
      //选择日期
      change(val) {
        this.timeDate = val;
      },
      //展示省列表
      showProvice() {
        this.showProviceBox = true;
      },
      //关闭省列表
      closeShowProviceBox() {
        this.showProviceBox = false;
      },
      //展示市列表
      showCity() {
        this.showCityBox = true;
      },
      //关闭市列表
      closeShowCity() {
        this.showCityBox = false;
      },
      //获取省
      initProvinceList() {
        let getAreaProvice = {
          "areaPid": 3337
        }
        this.$store.dispatch('initProvinceData', getAreaProvice)
      },
      //选择省
      changeProvice(item) {
        this.userInfromationObj.proviceName = item.sm_af_AreaName;
        this.userInfromationObj.ui_Provice = item.sm_af_AreaID;
        this.userInfromationObj.cityName = '';
        this.userInfromationObj.ui_City = '';
        this.showProviceBox = false;
        this.initCityList(item.sm_af_AreaID)
      },
      //选择市
      changeCity(item) {
        this.userInfromationObj.cityName = item.sm_af_AreaName;
        this.userInfromationObj.ui_City = item.sm_af_AreaID;
        this.cityData = item;
        this.showCityBox = false;
      },
      //获取市
      initCityList(id) {
        let getAreaProvice = {
          "areaPid": id ? id : ''
        }
        this.$store.dispatch('initCityList', getAreaProvice)
      },
      //获取职业
      initOccupation() {
        let selectGroupJob = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "parentID": "38",
        };
        this.$store.dispatch('initOccupation', selectGroupJob)
      },
      //展示职业列表
      showOccupation() {
        this.showOccupationBox = true;
      },
      //关闭职业列表
      closeShowOccupationBox() {
        this.showOccupationBox = false;
      },
      //选择职业
      changeOccupation(item) {
        this.userInfromationObj.ts_ui_JobID = item.value;
        this.userInfromationObj.ts_ui_JobName = item.label
      },
      //获取学历
      initEducation() {
        let selectJob = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ui_jb_ParentID": "39",
        };
        this.$store.dispatch('initEducation', selectJob)
      },
      //展示学历列表
      showEducation() {
        this.showEducationBox = true;
      },
      //关闭学历列表
      closeShowEducationBox() {
        this.showEducationBox = false;
      },
      //选择学历
      changeEducation(item) {
        this.userInfromationObj.ts_ui_EducationID = item.ui_jb_ParentID;
        this.userInfromationObj.ts_ui_EducationName = item.ts_jb_Name;
      },
      //修改提交
      updateSubmit() {
        let updateUser = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": this.userInfromationObj
        };
        this.$store.dispatch('updatePersonalData', updateUser)
          .then(suc => {
            this.successShow = true;
            this.successContent = suc;
          }, err => {
            this.errorShow = true;
            this.errorContent = err;
          })
      }
    },
    mounted() {

    }
  }
</script>
<style scoped>
  .vux-header .weui-cells {
    overflow: visible !important;
  }

  .vux-header {
    background-color: #288DF7;
  }

  .showProviceBox {
    width: 100%;
    max-height: 300px;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
    overflow: auto;
    font: 16px/2 "微软雅黑";
    padding: 10px;
    background-color: #fff;
    color: #999;
    border: 1px solid #ccc;
  }

  .showProviceBox > li {
    text-align: left;
  }

  .showProviceBox > li > strong {
    display: block;
  }

  .showProviceBox > li > span {
    display: block;
    font: 14px/2 "微软雅黑";
    padding-left: 50px;
  }

  .boxMask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .3);
  }

  .submit {
    width: 60%;
    margin: 20px auto;
  }
</style>
