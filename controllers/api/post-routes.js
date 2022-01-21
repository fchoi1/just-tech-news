/* eslint-disable no-console */
const router = require('express').Router();
const { Post, User, Vote, Comment } = require('../../models');
const sequelize = require('../../config/connection');

// GET /api/posts
router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      // Count the votes that the post has and put it into vote_count
      // prettier-ignore
      [sequelize.literal(
          '(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'
        ), 'vote_count']
    ],
    // Order by column
    order: [['created_at', 'DESC']],
    // JOIN command
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        // Nested Join command for comments
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      res.status(500).json(err);
    });
});

// GET /api/posts/1
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      // prettier-ignore
      [ sequelize.literal(
          '(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'
        ), 'vote_count' ]
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      { model: User, attributes: ['username'] }
    ]
  })
    .then((dbPostData) =>
      !dbPostData
        ? res.status(404).json({ message: 'No post found with this id' })
        : res.json(dbPostData)
    )
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

// PUT /api/posts/upvote
router.put('/upvote', (req, res) => {
  // custom static method created in models/Post.js
  // Check for session and then deconstruct
  if (req.session) {
    Post.upvote(
      { ...req.body, user_id: req.session.user_id },
      { Vote, Comment, User }
    )
      .then((updatedVoteData) => res.json(updatedVoteData))
      .catch((err) => res.status(500).json(err));
  }
});

// PUT /api/posts/1
router.put('/:id', (req, res) => {
  Post.update(
    {
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then((dbPostData) =>
      !dbPostData
        ? res.status(404).json({ message: 'No post found with this id' })
        : res.json(dbPostData)
    )
    .catch((err) => {
      res.status(500).json(err);
    });
});

// DELETE /api/posts/1
router.delete('/:id', (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((dbPostData) =>
      !dbPostData
        ? res.status(404).json({ message: 'No post found with this id' })
        : res.json(dbPostData)
    )
    .catch((err) => {
      res.status(500).json(err);
    });
});
module.exports = router;
