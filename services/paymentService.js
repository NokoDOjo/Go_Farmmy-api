const { Order } = require('../models')
const crypto = require('crypto')

const URL = process.env.URL
const MerchantID = process.env.MERCHANT_ID
const HashKey = process.env.HASH_KEY
const HashIV = process.env.HASH_IV

const PayGateWay = 'https://ccore.spgateway.com/MPG/mpg_gateway'
const ReturnURL = URL + '/spgateway/callback?from=ReturnURL' //
const NotifyURL = URL + '/spgateway/callback?from=NotifyURL'
const ClientBackURL = 'https://localhost:8080/order'


function genDataChain(TradeInfo) {
  const results = []
  for (const kv of Object.entries(TradeInfo)) {
    results.push(`${kv[0]}=${kv[1]}`)
  }
  return results.join('&')
}

function createMpgAesEncrypt(TradeInfo) {
  const encrypt = crypto.createCipheriv('aes256', HashKey, HashIV)
  const enc = encrypt.update(genDataChain(TradeInfo), 'utf8', 'hex')
  return enc + encrypt.final('hex')
}

function createMpgAesDecrypt(TradeInfo) {
  const decrypt = crypto.createDecipheriv('aes256', HashKey, HashIV)
  decrypt.setAutoPadding(false)
  const text = decrypt.update(TradeInfo, 'hex', 'utf8')
  const plainText = text + decrypt.final('utf8')
  let result = plainText.replace(/[\x00-\x20]+/g, '') // eslint-disable-line
  return result
}

function createMpgShaEncrypt(TradeInfo) {
  const sha = crypto.createHash('sha256')
  const plainText = `HashKey=${HashKey}&${TradeInfo}&HashIV=${HashIV}`

  return sha.update(plainText).digest('hex').toUpperCase()
}

function getTradeInfo(Amt, Desc, email) {
  // console.log('===== getTradeInfo =====')
  // console.log(Amt, Desc, email)
  // console.log('==========')

  const data = {
    MerchantID: MerchantID, // 商店代號
    RespondType: 'JSON', // 回傳格式
    TimeStamp: Date.now(), // 時間戳記
    Version: 1.5, // 串接程式版本
    MerchantOrderNo: Date.now(), // 商店訂單編號
    LoginType: 0, // 智付通會員
    OrderComment: 'OrderComment', // 商店備註
    Amt: Amt, // 訂單金額
    ItemDesc: Desc, // 產品名稱
    Email: email, // 付款人電子信箱
    ReturnURL: ReturnURL, // 支付完成返回商店網址
    NotifyURL: NotifyURL, // 支付通知網址/每期授權結果通知
    ClientBackURL: ClientBackURL, // 支付取消返回商店網址
  }

  console.log('===== getTradeInfo: data =====')
  console.log(data)

  const mpgAesEncrypt = createMpgAesEncrypt(data)
  const mpgShaEncrypt = createMpgShaEncrypt(mpgAesEncrypt)

  console.log('===== getTradeInfo: mpgAesEncrypt, mpgShaEncrypt =====')
  console.log(mpgAesEncrypt)
  console.log(mpgShaEncrypt)

  const tradeInfo = {
    MerchantID: MerchantID, // 商店代號
    TradeInfo: mpgAesEncrypt, // 加密後參數
    TradeSha: mpgShaEncrypt,
    Version: 1.5, // 串接程式版本
    PayGateWay: PayGateWay,
    MerchantOrderNo: data.MerchantOrderNo,
  }

  console.log('===== getTradeInfo: tradeInfo =====')
  console.log(tradeInfo)

  return tradeInfo
}

const paymentService = {
  getPayment: async (orderId) => {
    const order = await Order.findByPk(orderId)

    const tradeInfo = getTradeInfo(order.amount, order.id, order.customerEmail)
    await order.update({
      sn: tradeInfo.MerchantOrderNo
    })

    return { order, tradeInfo }
  }
}

module.exports = paymentService