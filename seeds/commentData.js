const { Comment } = require('../models');

const commentData = [
  {
    comment_text: 'Comment 1 here',
    user_id: 1,
    post_id: 2
  },
  {
    comment_text: 'Comment 2 here',
    user_id: 1,
    post_id: 1
  },
  {
    comment_text: 'Comment 4 here',
    user_id: 2,
    post_id: 3
  },
  {
    comment_text: 'Comment 4 here',
    user_id: 1,
    post_id: 1
  },
  {
    comment_text: 'Comment 5 here by the same user!',
    user_id: 1,
    post_id: 1
  }
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
