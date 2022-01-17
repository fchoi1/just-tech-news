const router = require('express').Router();
const { User, Post, Vote } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
  // Use findAll() method
  User.findAll({
    // attributes: {exclude: ['password']} // dont show the passwords column
  }) // SELECT * FROM users;
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      res.status(500).json(err);
    });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
  User.findOne({ // SELECT * FROM users WHERE id = 1
    // attributes: {exclude: ['password']}, // dont show the passwords column
    where: {
      id: req.params.id,
    },
    include: [{
      model: Post,
      attributes: ['id', 'title', 'post_url', 'created_at',]
    }, {
      model: Post,
      attributes: ['title'],
      through: Vote,
      as: 'voted_posts',
    }
    ],
  }).then((dbUserData) => {
    !dbUserData ? res.status(404).json({ message: 'No user found with this id' })
      : res.json(dbUserData);
  }).catch((err) => {
    res.status(500).json(err);
  });
});

// POST /api/users
router.post('/', (req, res) => {
  // Expects req body {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

  /* INSERT INTO users  (username, email, password)
    VALUES ("Lernantino", "lernantino@gmail.com", "password1234"); */
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }).then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      res.status(500).json(err);
    });
});

// POST /api/users/seed
router.post('/seed', (req, res) => {
  // Expects req body {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

  /* INSERT INTO users  (username, email, password)
    VALUES ("Lernantino", "lernantino@gmail.com", "password1234"); */
  User.bulkCreate([{
    username: 'person1',
    email: 'person1@email.com',
    password: 'password1',
  }, {
    username: 'person2',
    email: 'person2@email.com',
    password: 'password2',
  }, {
    username: 'person3',
    email: 'person3@email.com',
    password: 'password3',
  }]).then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      res.status(500).json(err);
    });
});

// POST /api/users/login
router.post('/login', (req, res) => {
  // expects {email: 'lernantino@gmail.com', password: 'password1234'}
  // Check if email exists
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email!' });
    } else {
      // res.json({user: dbUserData});
      const validPassword = dbUserData.checkPassword(req.body.password);
      !validPassword ? res.status(400).json({ message: 'Incorrect Password' })
        : res.json({ user: dbUserData, message: 'You are now logged in' });
    }
  });
  // Validate PW
});

// PUT /api/users/1
router.put('/:id', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead

  /* UPDATE users  SET username = "Lernantino", email = "lernantino@gmail.com", password = "newPassword1234"
    WHERE id = 1; */
  User.update(req.body, {
    individualHooks: true, // calls for when changing one record at a time
    where: {
      id: req.params.id,
    },
  }).then((dbUserData) => {
    !dbUserData ? res.status(404).json({ message: 'No user found with this id' })
      : res.json(dbUserData);
  }).catch((err) => {
    res.status(500).json(err);
  });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  }).then((dbUserData) => {
    !dbUserData ? res.status(404).json({ message: 'No user found with this id' })
      : res.json(dbUserData);
  }).catch((err) => {
    res.status(500).json(err);
  });
});

module.exports = router;
