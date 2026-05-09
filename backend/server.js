const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DATA = path.join(__dirname, 'data');
const readJSON  = (f) => JSON.parse(fs.readFileSync(path.join(DATA, f), 'utf-8'));
const writeJSON = (f, d) => fs.writeFileSync(path.join(DATA, f), JSON.stringify(d, null, 2));

function verifyToken(req, res, next) {
  const auth = req.headers['authorization'];
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant ou invalide' });
  }
  req.token = auth.split(' ')[1];
  next();
}

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const users = readJSON('utilisateurs.json');
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Identifiants incorrects' });

  const token = Buffer.from(JSON.stringify({
    id: user.id, username: user.username, role: user.role
  })).toString('base64');

  res.json({ token, role: user.role, username: user.username });
});

app.get('/api/produits', verifyToken, (req, res) => {
  res.json(readJSON('liste-produits.json'));
});

app.get('/api/produits/:id', verifyToken, (req, res) => {
  const produits = readJSON('liste-produits.json');
  const produit = produits.find(p => p.id === parseInt(req.params.id));
  if (!produit) return res.status(404).json({ message: 'Produit introuvable' });
  res.json(produit);
});

app.post('/api/produits', verifyToken, (req, res) => {
  const produits = readJSON('liste-produits.json');
  const newId = Math.max(...produits.map(p => p.id), 0) + 1;
  const nouveau = { id: newId, ...req.body };
  produits.push(nouveau);
  writeJSON('liste-produits.json', produits);
  res.status(201).json(nouveau);
});

app.delete('/api/produits/:id', verifyToken, (req, res) => {
  let produits = readJSON('liste-produits.json');
  const before = produits.length;
  produits = produits.filter(p => p.id !== parseInt(req.params.id));
  if (produits.length === before)
    return res.status(404).json({ message: 'Produit introuvable' });
  writeJSON('liste-produits.json', produits);
  res.json({ message: 'Produit supprimé' });
});

app.listen(3000, () => console.log('✅ Backend démarré sur http://localhost:3000'));