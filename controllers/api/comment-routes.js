const router = require('express').Router();
const { Comment } = require('../../models');

// GET /api/comments
router.get('/', (req, res) => {
  Comment.findAll()
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      res.status(500).json(err);
    });
});

// POST /api/comments
router.post('/', (req, res) => {
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      user_id: req.session.user_id,
      post_id: req.body.post_id
    })
      .then((dbCommentData) => res.json(dbCommentData))
      .catch((err) => {
        res.status(500).json(err);
      });
  }
});

router.post('/seed', (req, res) => {
  Comment.bulkCreate([
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
    }
  ])
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((dbCommentData) =>
      !dbCommentData
        ? res.status(404).json({ message: 'No Comment found with this id' })
        : res.json(dbCommentData)
    )
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
