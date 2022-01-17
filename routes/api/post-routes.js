const router = require('express').Router();
const { Post, User, Vote } = require('../../models');
const sequelize = require('../../config/connection');

// GET /api/posts
router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
    attributes: ['id', 'post_url', 'title', 'created_at',
    // Count the votes that the post has and put it into vote_count
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count'],
    ],
    // Order by column
    order: [['created_at', 'DESC']],
    // JOIN command
    include: [{
      model: User,
      // Select username column from User table
      attributes: ['username'],
    }],
  }).then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      res.status(500).json(err);
    });
});

// GET /api/posts/1
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'post_url', 'title', 'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count'],
    ],
    include: [{ model: User, attributes: ['username'] }],
  }).then((dbPostData) => (!dbPostData ? res.status(404).json({ message: 'No post found with this id' }) : res.json(dbPostData)))
    .catch((err) => {
      res.status(500).json(err);
    });
});

// POST /api/posts
router.post('/', (req, res) => {
  Post.create(req.body)
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      res.status(500).json(err);
    });
});

// POST /api/posts/seed
router.post('/seed', (req, res) => {
  Post.bulkCreate([
    {
      title: 'post 1',
      post_url: 'post1.com',
      user_id: 1,
    }, {
      title: 'post 2',
      post_url: 'post2.com',
      user_id: 1,
    }, {
      title: 'post 3',
      post_url: 'post3.com',
      user_id: 2,
    }]).then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      res.status(500).json(err);
    });
});

// PUT /api/posts/upvote
router.put('/upvote', (req, res) => {
  // custom static method created in models/Post.js
  Post.upvote(req.body, { Vote })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => res.status(400).json(err));
});

// PUT /api/posts/1
router.put('/:id', (req, res) => {
  Post.update({
    title: req.body.title,
  }, {
    where: {
      id: req.params.id,
    },
  }).then((dbPostData) => (!dbPostData ? res.status(404).json({ message: 'No post found with this id' }) : res.json(dbPostData)))
    .catch((err) => {
      res.status(500).json(err);
    });
});

// DELETE /api/posts/1
router.delete('/:id', (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  }).then((dbPostData) => (!dbPostData ? res.status(404).json({ message: 'No post found with this id' }) : res.json(dbPostData)))
    .catch((err) => {
      res.status(500).json(err);
    });
});
module.exports = router;
