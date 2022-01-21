const { Post } = require('../models');

const postData = [
  {
    title: 'post 1',
    post_url: 'https://www.insider.com/most-popular-dog-breeds-2019-google-search',
    user_id: 1
  },
  {
    title: 'post 2',
    post_url: 'http://www.cssdrive.com/',
    user_id: 1
  },
  {
    title: 'post 3',
    post_url: 'https://blog.api.rakuten.net/',
    user_id: 2
  },
  {
    title: 'post 4',
    post_url: 'https://www.squarespace.com/templates',
    user_id: 3
  }
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
