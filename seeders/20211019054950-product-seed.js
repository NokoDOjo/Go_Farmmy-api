'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Products',
      [
        {
          id: 1,
          name: '火龍果',
          price: 350,
          quantity: 10,
          CategoryId: 1,
          image: 'https://imgur.com/Tbv2Ri3',
          description:
            '來自台中大坑的果農阿火伯夫妻倆默默耕種，悉心栽培，山坡上「大紅」品種的火龍果甜度高，帶有淡淡的甘蔗、蜂蜜甜味，在陽光下宛如紅寶石般的耀眼，產季為六至十二月。',
          storage_method: '冷藏約7~10天',
          origin: '台中大坑',
          specification: '10台斤/箱(約10-14顆)',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 11,
          name: '芭樂',
          price: 150,
          quantity: 5,
          CategoryId: 1,
          image: 'https://imgur.com/nbJ0F0f',
          description:
            '古坑珍珠芭樂，採取友善耕作，一年只有9月至隔年2月採收，所以口感更是清脆。甜度高達10-18度，但又帶著微微的酸味，水份極多，吃起來甜中帶酸，十分爽口',
          storage_method: '冷藏7天',
          origin: '雲林古坑',
          specification: '5台斤/箱(約8-10顆)',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 21,
          name: '茂谷柑',
          price: 830,
          quantity: 3,
          CategoryId: 1,
          image: 'https://imgur.com/RYH3Bup',
          description:
            '果形扁圓福泰、色澤深橙的茂谷柑，是年節意喻大吉大利的頭彩水果！茂谷柑不僅外觀討喜，果肉纖維細緻、甜酸兼具飽嘴多汁，風味濃郁卻又爽口的誘人餘韻，讓人忍不住一吃再吃，是許多柑橘控心中排行榜No.1。增金的茂谷，採用高難度的有機栽培，果樹逐年體質強健，風味富有層次，咬下果汁迸口！甜酸中帶有花與蜜的香氣。',
          storage_method: '置於陰涼通風處，可放置7~14天',
          origin: '南投中寮',
          specification: '6台斤/箱(約20顆)',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Products', null, {})
  }
};
