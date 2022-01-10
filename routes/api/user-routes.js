const router = require('express').Router();
const {User} = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    // Use findAll() method
    User.findAll({
        attributes: {exclude: ['password']} // dont show the passwords column
    }) // SELECT * FROM users;
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({ //SELECT * FROM users WHERE id = 1
        attributes: {exclude: ['password']}, // dont show the passwords column
        where: {
            id: req.params.id
        }
    }).then(dbUserData => {
        !dbUserData ? res.status(404).json({message: 'No user found with this id'})
            : res.json(dbUserData)
    }).catch(err => {
        console.log(err);
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
        password: req.body.password
    }).then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// PUT /api/users/1
router.put('/:id', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead

    /* UPDATE users
    SET username = "Lernantino", email = "lernantino@gmail.com", password = "newPassword1234"
    WHERE id = 1; */
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(dbUserData => {
        !dbUserData ? res.status(404).json({message: 'No user found with this id'})
            : res.json(dbUserData)
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbUserData => {
        !dbUserData ? res.status(404).json({message: 'No user found with this id'})
            : res.json(dbUserData)
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

module.exports = router;