'use strict';
const seedImages = ['https://i.imgur.com/482dvW1_d.webp?maxwidth=760&fidelity=grand', 'https://i.imgur.com/0vWcL75_d.webp?maxwidth=760&fidelity=grand', 'https://i.imgur.com/f6xLS0B_d.webp?maxwidth=760&fidelity=grand', 'https://i.imgur.com/K8zsFeh_d.webp?maxwidth=760&fidelity=grand', 'https://i.imgur.com/uhEVBn1_d.webp?maxwidth=1520&fidelity=grand', 'https://i.imgur.com/fqE1UNC_d.webp?maxwidth=760&fidelity=grand', 'https://i.imgur.com/e1gMEyR_d.webp?maxwidth=760&fidelity=grand', 'https://i.imgur.com/bJuMg1z_d.webp?maxwidth=760&fidelity=grand', 'https://i.imgur.com/cCLMizF_d.webp?maxwidth=760&fidelity=grand', 'https://i.imgur.com/0i7Ux8c_d.webp?maxwidth=760&fidelity=grand', 'https://i.imgur.com/KBoltaT_d.webp?maxwidth=1520&fidelity=grand']
const moreImages = ['https://s.zillowstatic.com/pfs/static/z-logo-default.svg', 'https://s.zillowstatic.com/pfs/static/z-logo-icon.svg',  'https://photos.zillowstatic.com/fp/3943f6f823fe18bd0cdabf620a715e89-p_e.jpg', 'https://photos.zillowstatic.com/fp/2c1b2849fa93b53f619a9c04399b9e93-p_e.jpg', 'https://photos.zillowstatic.com/fp/b869e578f4cfb14c834b945548f1ae83-p_e.jpg',  'https://photos.zillowstatic.com/fp/8bd5650b02ea3c86b578bc3b0b003276-p_e.jpg', 'https://photos.zillowstatic.com/fp/65992c2d4a81d126120318830927ab1c-p_e.jpg', 'https://photos.zillowstatic.com/fp/6e14886354933c5527c08ce08a262f85-p_e.jpg', 'https://photos.zillowstatic.com/fp/8220cbcfb33612826eba63c564991450-zillow_web_48_23.jpg', 'https://photos.zillowstatic.com/fp/ac2d6af4ef773de3534afa82e324f9d4-p_e.jpg', 'https://photos.zillowstatic.com/fp/d1a4df7cb8071af77cfffbcf3393847f-p_e.jpg', 'https://photos.zillowstatic.com/fp/1d79ed4e0225dd3e970ddacd79da8804-p_e.jpg', 'https://photos.zillowstatic.com/fp/8220cbcfb33612826eba63c564991450-zillow_web_48_23.jpg', 'https://photos.zillowstatic.com/fp/60b2a50cc6f48a7450b450f166098d01-p_e.jpg', 'https://photos.zillowstatic.com/fp/09902ed84619a552c943fb46929d308e-p_e.jpg', 'https://photos.zillowstatic.com/fp/dc00ad01b97617e5d8ee28d5255794de-p_e.jpg', 'https://photos.zillowstatic.com/fp/8220cbcfb33612826eba63c564991450-zillow_web_48_23.jpg', 'https://photos.zillowstatic.com/fp/25658f60f8476145f511fcb9f52acb22-p_e.jpg', 'https://photos.zillowstatic.com/fp/20cf2ef02abf377ab1f4e18756bc8d96-p_e.jpg', 'https://photos.zillowstatic.com/fp/dc00ad01b97617e5d8ee28d5255794de-p_e.jpg', 'https://photos.zillowstatic.com/fp/8bac4d59d071910668c75663c389f3a1-zillow_web_95_35.jpg',  'https://photos.zillowstatic.com/fp/8220cbcfb33612826eba63c564991450-zillow_web_95_35.jpg', 'https://s.zillowstatic.com/pfs/static/app-store-badge.svg', 'https://s.zillowstatic.com/pfs/static/google-play-badge.svg', 'https://s.zillowstatic.com/pfs/static/z-logo-default.svg', 'https://s.zillowstatic.com/pfs/static/footer-art.svg', 'https://photos.zillowstatic.com/fp/8bd5650b02ea3c86b578bc3b0b003276-cc_ft_960.jpg', 'https://photos.zillowstatic.com/fp/65992c2d4a81d126120318830927ab1c-cc_ft_576.jpg', 'https://photos.zillowstatic.com/fp/d4a2ceaab3afd0d4219abe8bf9d4943f-cc_ft_576.jpg', 'https://photos.zillowstatic.com/fp/99b83f8dcd092318270fba50e31e5309-cc_ft_576.jpg', 'https://photos.zillowstatic.com/fp/4373287c83b850e8a75fe987621276ed-cc_ft_576.jpg', 'https://photos.zillowstatic.com/fp/0aaa37006ae2f8ed8af1e6d89312872c-cc_ft_576.jpg', 'https://photos.zillowstatic.com/fp/3a4730646313b28c4e88a4894d50b333-cc_ft_576.jpg', 'https://photos.zillowstatic.com/fp/adfc401769ab3dd6dd7a3630c376f3b9-cc_ft_576.jpg', 'https://photos.zillowstatic.com/fp/376d6316c5a0a39e91e8da4b009d43a2-cc_ft_576.jpg', 'https://photos.zillowstatic.com/fp/6ebcd55fee86064fc0a51405f1d95cbd-cc_ft_576.jpg', 'https://photos.zillowstatic.com/fp/5e588db4a693610ab62581b9d73cb0a7-cc_ft_576.jpg', 'https://photos.zillowstatic.com/fp/5a198877f06831ad1434302702b88c9c-cc_ft_576.jpg', 'https://photos.zillowstatic.com/fp/a09156e1a486adea236906f28c05d1eb-cc_ft_576.jpg', 'https://photos.zillowstatic.com/fp/5e82a93b5d30583ce0047da46519e36f-cc_ft_576.jpg', 'https://photos.zillowstatic.com/fp/7a44abe670409c79ba9a8457119725db-cc_ft_576.jpg', 'https://photos.zillowstatic.com/fp/30ee2329fc09378c2fb013be0182601d-cc_ft_576.jpg', 'https://photos.zillowstatic.com/fp/d89a1773d08e35fcfd59786b2b6287c0-cc_ft_576.jpg', 'https://photos.zillowstatic.com/fp/d7d4eb5b1b6913b15d69715c0907e623-cc_ft_576.jpg', 'https://photos.zillowstatic.com/fp/86f0df442dd7680593001ffe4258f443-cc_ft_576.jpg', 'https://photos.zillowstatic.com/fp/8bd5650b02ea3c86b578bc3b0b003276-cc_ft_960.jpg', 'https://photos.zillowstatic.com/fp/65992c2d4a81d126120318830927ab1c-cc_ft_960.jpg', 'https://photos.zillowstatic.com/fp/d4a2ceaab3afd0d4219abe8bf9d4943f-cc_ft_960.jpg',   'https://photos.zillowstatic.com/fp/8220cbcfb33612826eba63c564991450-zillow_web_logo_inf_11.jpg', 'https://s.zillowstatic.com/partner-showcase/static/images/agents/agent6.jpg', 'https://s.zillowstatic.com/partner-showcase/static/images/agents/agent1.jpg', 'https://s.zillowstatic.com/partner-showcase/static/images/agents/agent7.jpg', 'https://s.zillowstatic.com/pfs/static/app-store-badge.svg', 'https://s.zillowstatic.com/pfs/static/google-play-badge.svg', 'https://s.zillowstatic.com/pfs/static/z-logo-default.svg', 'https://s.zillowstatic.com/pfs/static/footer-art.svg', 'https://www.facebook.com/tr/?id=547145892064117&ev=PageView&zscript=1&dl=https://www.zillow.com/', 'https://pt.ispot.tv/v2/TC-2215-1.gif?type=universal_view', 'https://insight.adsrvr.org/track/pxl/?adv=li61105&ct=0:x9l88fw&fmt=3', 'https://insight.adsrvr.org/track/pxl/?adv=a7e53b0&ct=0:q3869dg&fmt=3', 'https://pt.ispot.tv/v2/TC-2215-4.gif?app=web&type=…ersal_view&customdata=channel_Other&channel=Other', 'https://pt.ispot.tv/v2/TC-2215-1.gif?type=view_item', 'https://www.facebook.com/tr/?id=547145892064117&ev=PageView&zscript=1&dl=https://www.zillow.com/', 'https://www.facebook.com/tr/?id=547145892064117&ev…rhood]=undefined&cd[Source]=na&cd[emailHash]=null', 'https://insight.adsrvr.org/track/pxl/?adv=a7e53b0&ct=0:zf5sv35&fmt=3', 'https://ciqtracking.com/p/v/1/628687baf87081045da50f70/format/img?', 'https://pt.ispot.tv/v2/TC-2215-3.gif?app=web&type=…mdata=channel_%2522cpc%2522&channel=%2522cpc%2522', 'https://t.co/1/i/adsct?bci=5&eci=3&event=%7B%7D&ev…tus=0&txn_id=o2cye&type=javascript&version=2.3.29', 'https://analytics.twitter.com/1/i/adsct?bci=5&eci=…tus=0&txn_id=o2cye&type=javascript&version=2.3.29', 'https://t.co/1/i/adsct?bci=5&eci=3&event=%7B%7D&ev…tus=0&txn_id=o5dv3&type=javascript&version=2.3.29', 'https://analytics.twitter.com/1/i/adsct?bci=5&eci=…tus=0&txn_id=o5dv3&type=javascript&version=2.3.29', 'https://t.co/i/adsct?bci=5&eci=2&event_id=6315c8d7…unt=0&txn_id=o688a&type=javascript&version=2.3.29', 'https://analytics.twitter.com/i/adsct?bci=5&eci=2&…unt=0&txn_id=o688a&type=javascript&version=2.3.29', 'https://t.co/1/i/adsct?bci=5&eci=4&event=%7B%7D&ev…_id=tw-o5dv3-o91uz&type=javascript&version=2.3.29', 'https://analytics.twitter.com/1/i/adsct?bci=5&eci=…_id=tw-o5dv3-o91uz&type=javascript&version=2.3.29', 'https://bat.bing.com/action/0?ti=4017789&Ver=2&mid…aAhlbEALw_wcB&lt=1579&evt=pageLoad&sv=1&rn=556696', 'https://bat.bing.com/action/0?ti=5527014&tm=gtm002…aAhlbEALw_wcB&lt=1579&evt=pageLoad&sv=1&rn=618999', 'https://t.co/i/adsct?bci=5&eci=1&event_id=e456cc16…unt=0&txn_id=o2frn&type=javascript&version=2.3.29', 'https://analytics.twitter.com/i/adsct?bci=5&eci=1&…unt=0&txn_id=o2frn&type=javascript&version=2.3.29'].filter(
  image => {
    if (image.includes('//photos.zillowstatic')) {
      return image
    }
  })
const images = [{
  "spotId": 1,
  "url": seedImages[0],
  "preview": true
},
{
  "spotId": 1,
  "url": seedImages[1],
  "preview": false
},
{
  "spotId": 1,
  "url": seedImages[2],
  "preview": false
},
{
  "spotId": 2,
  "url": seedImages[3],
  "preview": true
},
{
  "spotId": 2,
  "url": seedImages[4],
  "preview": false
},
{
  "spotId": 2,
  "url": seedImages[5],
  "preview": false
},
{
  "spotId": 3,
  "url": seedImages[6],
  "preview": true
},
{
  "spotId": 3,
  "url": seedImages[7],
  "preview": false
},
{
  "spotId": 3,
  "url": seedImages[8],
  "preview": false
},
{
  "spotId": 4,
  "url": seedImages[9],
  "preview": true
},
{
  "spotId": 4,
  "url": seedImages[10],
  "preview": false
}
  , {
  "spotId": 5,
  "url": moreImages[0],
  "preview": true
}
  , {
  "spotId": 5,
  "url": moreImages[1],
  "preview": false
}
  , {
  "spotId": 5,
  "url": moreImages[2],
  "preview": false
}
  , {
  "spotId": 5,
  "url": moreImages[3],
  "preview": false
}
  , {
  "spotId": 5,
  "url": moreImages[4],
  "preview": false
}

]
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, images

      , {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
