const express = require('express');
const router = express.Router();

// Importer le modèle User
const User = require('../models/User');

// TODO: Ajouter des middlewares pour l'authentification

// Créer un utilisateur
router.post('/', (req, res) => {
    const newUser = new User(req.body);
    newUser.save()
        .then(user => res.status(201).json(user))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Lire tous les utilisateurs
router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Lire un utilisateur
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
            res.json(user);
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Mettre à jour un utilisateur
router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(user => {
            if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
            res.json(user);
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Supprimer un utilisateur
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => {
            if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
            res.json({ message: 'Utilisateur supprimé' });
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

module.exports = router;
