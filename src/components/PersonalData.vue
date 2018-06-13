<template>
  <div>
    <x-header style="position: fixed;left: 0; top: 0; z-index: 999; width: 100%;">个人资料 <a slot="right" @click="update">编辑个人资料</a></x-header>
    <group style="text-align: left; padding:50px 0;">
      <div class="headImage clearfix">
        <img :src="userInfromationObj.sm_ui_HeadImage" width="70" height="70">
        <strong @click="replaceHeadImage">更换头像&gt;</strong>
      </div>
      <cell title="昵称" :value="userInfromationObj.sm_ui_Name"></cell>
      <cell title="身份证号" :value="userInfromationObj.sm_ui_CertNo"></cell>
      <cell title="手机号" :value="userInfromationObj.sm_ui_Phone"></cell>
      <cell title="生日" :value="userInfromationObj.sm_ui_Birthday"></cell>
      <cell title="性别" :value="userInfromationObj.sm_ui_SexName"></cell>
      <cell title="电子邮箱" :value="userInfromationObj.sm_ui_Email"></cell>
      <cell title="省" :value="userInfromationObj.sm_ui_ProviceName"></cell>
      <cell title="市" :value="userInfromationObj.sm_ui_CityName"></cell>
      <cell title="详细地址" :value="userInfromationObj.sm_ui_Address"></cell>
      <cell title="婚姻状况" :value="userInfromationObj.sm_ui_Marray"></cell>
      <cell title="职业" :value="userInfromationObj.sm_ui_JobName"></cell>
      <cell title="学历" :value="userInfromationObj.sm_ui_EducationName"></cell>
    </group>
    <alert
      v-model="showHead"
      title="选择头像"
      @on-hide="replaceImage"
    >
      <input type="file" name="fileToUpload" id="fileToUpload" ref="upload"/>

      <img :src="headImageUrl" alt="" width="70" height="70">
    </alert>
    <!--加载-->
    <loading :show="showLoding" style="position: relative; z-index: 9999" text=""></loading>
    <!--提示信息-->
    <toast v-model="errorShow" type="warn" is-show-mask :time="2000" :text="errorContent"></toast>
    <toast v-model="successShow" type="primary" is-show-mask :time="2000" :text="successContent"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {XHeader, Group, Cell, Loading, Alert, Toast} from 'vux'

  export default {
    computed: mapGetters([
      'userInfromationObj'
    ]),
    components: {
      XHeader,
      Group,
      Cell,
      Loading,
      Alert,
      Toast
    },
    data() {
      return {
        userInfo: '',
        showLoding: false,
        showHead: false,
        headImageUrl: '',
        errorShow: false,
        errorContent: '',
        successShow: false,
        successContent: '',
      }
    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('scoresumList'));
      this.initData();
    },
    methods: {
      initData() {
        this.showLoding = true;
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
            this.showLoding = false;
          })
      },
      update() {
        this.$router.push({name: 'UpdatePersonalData'})
      },
      //更换头像
      replaceHeadImage() {
        this.uploaNode()
        this.showHead = true;
      },

      uploadToOSS(file) {
        return new Promise((relove,reject)=>{
          var fd = new FormData();
          fd.append("fileToUpload", file);
          var xhr = new XMLHttpRequest();
          xhr.open("POST", "http://hly.1000da.com.cn/OSSFile/PostToOSS");
          xhr.send(fd);
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
              if (xhr.responseText) {
                var data = xhr.responseText
                relove(JSON.parse(data))
              }
            }else{

            }
          }
        })
      },
      //添加图片
      uploaNode() {
        this.headImageUrl = '';
        setTimeout(() => {
          if (this.$refs.upload) {
            this.$refs.upload.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload.files.length; i++) {
                this.uploadToOSS(this.$refs.upload.files[i])
                  .then(data => {
                    if (data) {
                      this.headImageUrl = '';
                      this.headImageUrl = data.data;
                    } else {
                      this.$notify({
                        message: '图片地址不存在!',
                        type: 'error'
                      });
                    }
                  })
              }
            })
          };
        }, 30)
      },

      replaceImage() {
        this.userInfromationObj.sm_ui_HeadImage = this.headImageUrl;
        //修改提交
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
            this.initData();
          }, err => {
            this.errorShow = true;
            this.errorContent = err;
          })
      }
    },
  }
</script>
<style scoped>

  .vux-header {
    background-color: #288DF7;
  }

  .headImage {
    padding: 10px;
  }

  .headImage > img {
    border: 3px solid #ccc;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    float: left;
  }

  .headImage > strong {
    float: right;
    font: 16px/2 "微软雅黑";
    color: #999;
    margin-top: 20px;
  }
</style>
