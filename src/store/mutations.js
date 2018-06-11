import getters from './getters'

const state = {
  searchUserIntegralList: [],//积分
  userInfromationObj: {},//当前登录用户信息
  getRedEnvelopesList: [],//红包信息
  orderDataList: [],//订单信息
  exensionDetailsList: [],//推广明细
  provinceDataList: [],//获取省
  cityDataList: [],//获取市
  occupationList: [],//职业
  educationList: [],//学历
  moneyDetailsList: [],//消费明细
}

const mutations = {
  searchUserIntegral(state, data) {
    state.searchUserIntegralList = data;
  },
  userInfromationObj(state, obj) {
    state.userInfromationObj = obj;
  },
  getRedEnvelopes(state, data) {
    state.getRedEnvelopesList = data;
  },
  orderData(state, data) {
    state.orderDataList = data;
  },
  initExensionDetails(state, data) {
    state.exensionDetailsList = data;
  },
  initProvinceData(state, data) {
    state.provinceDataList = data;
  },
  initCityData(state, data) {
    state.cityDataList = data;
  },
  initOccupation(state, data) {
    state.occupationList = data;
  },
  initEducation(state, data) {
    state.educationList = data;
  },
  initMoneyDetails(state, data) {
    state.moneyDetailsList = data;
  },
  setHeadImage(state,str){
    state.userInfromationObj.sm_ui_HeadImage = str;
  }
}
export default {
  getters,
  state,
  mutations
}
