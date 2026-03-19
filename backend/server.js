const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { rights, categories, chatResponses } = require('./data');

const app = express();
app.use(cors());
app.use(express.json());

const USERS_FILE = path.join(__dirname, 'users.json');

const loadUsers = () => {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
};

const saveUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// GET all rights
app.get('/api/rights', (req, res) => {
  res.json({ rights, categories });
});

// GET single right
app.get('/api/rights/:id', (req, res) => {
  const r = rights.find(x => x.id === parseInt(req.params.id));
  if (!r) return res.status(404).json({ error: 'Not found' });
  res.json(r);
});

// POST filter rights by profile
app.post('/api/rights/filter', (req, res) => {
  const { age, gender, work, income, isDisabled, isPregnant, isVeteran, hasChildren, isLowIncome } = req.body;
  const filtered = rights.filter(r => {
    if (age !== undefined && age !== null && age !== '') {
      const a = parseInt(age);
      if (a < r.ageMin || a > r.ageMax) return false;
    }
    if (r.conditions.length > 0) {
      const userConds = [];
      if (work) userConds.push(work);
      if (isDisabled) userConds.push('disabled');
      if (isPregnant) userConds.push('pregnant');
      if (isVeteran) userConds.push('veteran');
      if (hasChildren) userConds.push('hasChildren');
      if (isLowIncome) userConds.push('lowIncome');
      if (gender) userConds.push(gender);
      const match = r.conditions.some(c => userConds.includes(c));
      if (!match) return false;
    }
    return true;
  });
  res.json({ rights: filtered, total: filtered.length });
});

// GET all saved users
app.get('/api/users', (req, res) => {
  res.json(loadUsers());
});

// POST save user profile
app.post('/api/users', (req, res) => {
  const { name, ...profile } = req.body;
  if (!name) return res.status(400).json({ error: 'กรุณาระบุชื่อ' });
  const users = loadUsers();
  const idx = users.findIndex(u => u.name === name);
  if (idx >= 0) {
    users[idx] = { name, profile };
  } else {
    users.push({ name, profile });
  }
  saveUsers(users);
  res.json({ success: true });
});

// POST chat
app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  const msg = message || '';
  let reply = '';
  const found = Object.keys(chatResponses).find(k => msg.includes(k));
  if (found) {
    reply = chatResponses[found];
  } else {
    const matched = rights.filter(r => msg.includes(r.name) || r.description.includes(msg) || r.category.includes(msg));
    if (matched.length > 0) {
      reply = matched.map(r => r.icon + ' <b>' + r.name + '</b> - ' + r.description + '<br>📞 ' + r.contact).join('<br><br>');
    } else {
      reply = '🐘 ขอบคุณที่ถามครับ! ลองถามเกี่ยวกับสิทธิต่างๆ เช่น "บัตรทอง", "ประกันสังคม", "เบี้ยผู้สูงอายุ", "เบี้ยผู้พิการ" หรือ กดดูที่เมนู สิทธิทั้งหมด ได้เลยครับ';
    }
  }
  res.json({ reply });
});

const PORT = 5000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
