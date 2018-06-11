import axios from 'axios';

export default {
  //获取验证码
  getCode({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/UserInfo/SendMessage', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //注册提交
  registerSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/UserInfo/RegByCode', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //登录提交
  loginSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/UserInfo/Login', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.data);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //查询余额
  searchMoney({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/UserPot/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.data[0]);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //查询余额
  searchMoneyId({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/UserPot/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.data[0].sm_up_ID);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //查询积分明细
  searchUserIntegral({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/UseScoreDetail/SelectTotal', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('searchUserIntegral', data.data);
            relove();
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //查询用户信息
  initUserInfromation({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/UserInfo/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('userInfromationObj', data.data[0]);
            relove();
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //发红包支付
  addHandRedEnvelopes({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/SharePackage/AddShare', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //获取红包明细
  getRedEnvelopes({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/SharePackage/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            let surplusArr = data.data.filter(item => {
              if (item.ui_sp_Status == 0) {
                return true;
              }
              return false;
            });
            let surplusMoney = 0;
            for (let i = 0; i < surplusArr.length; i++) {
              surplusMoney += parseInt(surplusArr[i].ui_sp_Money);
            }
            let leadArr = data.data.filter(item => {
              if (item.ui_sp_Status == 1) {
                return true;
              }
              return false;
            });
            let leadMoney = 0;
            for (let i = 0; i < leadArr.length; i++) {
              leadMoney += parseInt(leadArr[i].ui_sp_Money);
            }
            var obj = {
              redNumber: data.data.length,
              surplusNumber: surplusArr.length,
              surplusMoney: surplusMoney,
              leadNumber: leadArr.length,
              leadMoney: leadMoney
            }
            relove(obj);
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  getRedEnvelopesDetails({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/SharePackage/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('getRedEnvelopes', data.data)
            relove();
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //获取订单数据
  getOrderData({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/UserOrder/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            for (let i = 0; i < data.data.length; i++) {
              if (data.data[i].oi_OrderTypeID == 0) {
                data.data[i].oi_OrderType = '旅行社订单'
              }
              if (data.data[i].oi_OrderTypeID == 1) {
                data.data[i].oi_OrderType = '车票订单'
              }
              if (data.data[i].oi_OrderTypeID == 2) {
                data.data[i].oi_OrderType = '门票订单'
              }
              if (data.data[i].oi_OrderTypeID == 3) {
                data.data[i].oi_OrderType = '美食订单'
              }
              if (data.data[i].oi_OrderTypeID == 4) {
                data.data[i].oi_OrderType = '酒店订单'
              }
              if (data.data[i].oi_OrderTypeID == 5) {
                data.data[i].oi_OrderType = '租车订单'
              }
            }
            commit('orderData', data.data);
            relove();
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //初始化推广明细
  initExensionDetails({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/IntroduceInfo/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initExensionDetails', data.data);
            relove();
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //获取省
  initProvinceData({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/AreaFull/SelectProvice', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initProvinceData', data.data);
            relove();
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //获取市
  initCityList({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/AreaFull/SelectProvice', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initCityData', data.data);
            relove();
          } else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //获取职业
  initOccupation({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/Job/SelectGroupJob', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          if (Number(data.data.resultcode) == 200) {
            var data = data.data;
            commit('initOccupation',data.data)
            relove()
          }else {
            reject(data.resultcontent)
          }

        })
    })
  },
  //获取学历
  initEducation({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/Job/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          if (Number(data.data.resultcode) == 200) {
            var data = data.data;
            commit('initEducation',data.data)
            relove()
          }else {
            reject(data.resultcontent)
          }

        })
    })
  },
  //修改个人资料提交
  updatePersonalData({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/UserInfo/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          if (Number(data.data.resultcode) == 200) {
            var data = data.data;
            relove(data.resultcontent)
          }else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //删除订单
  deleteOrder({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/UserOrder/DeleteStatus', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          if (Number(data.data.resultcode) == 200) {
            var data = data.data;
            relove(data.resultcontent)
          }else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //获取消费明细
  initMoneyDetails({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/PotDetail/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          if (Number(data.data.resultcode) == 200) {
            var data = data.data;
            commit('initMoneyDetails',data.data)
            relove()
          }else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //修改支付密码
  setPayPasswordSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/UserPot/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          if (Number(data.data.resultcode) == 200) {
            var data = data.data;
            relove(data.resultcontent)
          }else {
            reject(data.resultcontent)
          }
        })
    })
  },
}
