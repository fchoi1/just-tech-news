const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// GET /dashboard/
router.get('/', async (req, res) => {
  try {
    const dbPostdata = await Post.findAll({
      where: { user_id: req.session.user_id },
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at',
        // prettier-ignore
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
        'vote_count']
      ],
      include: [
        { model: Comment, attributes: { exclude: ['updated_at'] } },
        { model: User, attributes: ['username'] }
      ]
    });
    const posts = dbPostdata.map((post) => post.get({ plain: true }));
    res.render('dashboard', { posts, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const dbPostdata = await Post.findOne({
      where: { id: req.params.id },
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at',
        // prettier-ignore
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
        'vote_count']
      ],
      include: [
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'post_id',
            'user_id',
            'created_at'
          ],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        { model: User, attributes: ['username'] }
      ]
    });
    const post = dbPostdata.get({ plain: true });
    console.log(post);
    res.render('edit-post', { post, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
