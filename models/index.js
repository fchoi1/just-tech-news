const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');

// create associations from tables
// User can have many posts
User.hasMany(Post, { foreignKey: 'user_id' });

Post.belongsTo(User, { foreignKey: 'user_id' });

// Many link between users and posts
User.belongsToMany(Post, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'user_id',
});

Post.belongsToMany(User, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'post_id',
});

// Create link between votes and users

User.hasMany(Vote, { foreignKey: 'user_id' });
Vote.belongsTo(User, { foreignKey: 'user_id' });

// Create link between votes and posts

Post.hasMany(Vote, { foreignKey: 'vote_id' });
Vote.belongsTo(Post, { foreignKey: 'post_id' });

module.exports = { User, Post, Vote };
