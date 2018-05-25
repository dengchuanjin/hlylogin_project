import Login from '@/components/Login';//登录
import Register from '@/components/Register'//注册
import PersonalCenter from '@/components/PersonalCenter'//个人中心
import PersonalData from '@/components/PersonalData'//个人资料
import WalletDetils from '@/components/WalletDetils'//钱包信息
import RedEnvelopes from '@/components/RedEnvelopes'//红包
import HandRedEnvelopes from '@/components/HandRedEnvelopes' //发红包
import RedEnvelopesDetails from '@/components/RedEnvelopesDetails'//红包明细
import IntegralDetails from '@/components/IntegralDetails' //积分
import MyExtension from '@/components/MyExtension'//我的推广
import OrderDetails from '@/components/OrderDetails' //订单详情
import ExtensionDetails from '@/components/ExtensionDetails' // 查询推广明细
import UpdatePersonalData from '@/components/UpdatePersonalData' //修改个人资料
import MoneyDetails from '@/components/MoneyDetails'//消费明细

export default [
  {
    path:'/login',
    component: Login,
    name:'Login'
  },
  {
    path:'/',
    component: Register,
    name:'Register'
  },
  {
    path:'/personalData',
    component: PersonalData,
    name:'PersonalData'
  },
  {
    path:'/personalCenter',
    component: PersonalCenter,
    name:'PersonalCenter'
  },
  {
    path:'/walletDetils',
    component: WalletDetils,
    name:'WalletDetils'
  },
  {
    path:'/redEnvelopes',
    component: RedEnvelopes,
    name:'RedEnvelopes'
  },
  {
    path:'/handRedEnvelopes',
    component: HandRedEnvelopes,
    name:'HandRedEnvelopes'
  },
  {
    path:'/redEnvelopesDetails',
    component: RedEnvelopesDetails,
    name:'RedEnvelopesDetails'
  },
  {
    path:'/integralDetails',
    component: IntegralDetails,
    name:'IntegralDetails'
  },
  {
    path:'/myExtension',
    component: MyExtension,
    name:'MyExtension'
  },
  {
    path:'/orderDetails',
    component: OrderDetails,
    name:'OrderDetails'
  },
  {
    path:'/extensionDetails',
    component: ExtensionDetails,
    name:'ExtensionDetails'
  },
  {
    path:'/updatePersonalData',
    component: UpdatePersonalData,
    name:'UpdatePersonalData'
  },
  {
    path:'/moneyDetails',
    component: MoneyDetails,
    name:'MoneyDetails'
  },


]
