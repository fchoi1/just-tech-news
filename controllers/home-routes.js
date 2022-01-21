/* eslint-disable no-console */
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// From ORM
// GET /
router.get('/', (req, res) => {
  console.log(req.session);
  Post.findAll({
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      [
        sequelize.literal(
          '(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'
        ),
        'vote_count'
      ]
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: { model: User, attributes: ['username'] }
      },
      { model: User, attributes: ['username'] }
    ]
  })
    .then((dbPostData) => {
      // pass a single post object into the homepage template
      // Utilizes tempalte engine .handlebars is implied, second argument is the data being passed
      // console.log(dbPostData[0].get({plain: true}));
      // Return only the plain information
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /login
router.get('/login', (req, res) => {
  // Check for login session
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// GET /post/id
router.get('/post/:id', async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: { id: req.params.id },
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at',
        // prettier-ignore
        [ sequelize.literal(
          '(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
        'vote_count' ]
      ],
      // prettier-ignore
      include: [{
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at']
      }, {
        model: User,
        attributes: ['username']
      }]
    });
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with id' });
      return;
    }
    // serialize the data to plain
    const post = dbPostData.get({ plain: true });
    res.render('single-post', { post, loggedIn: req.session.loggedIn});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
