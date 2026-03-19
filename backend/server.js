const express = require('express');
const cors = require('cors');
const { rights, categories, chatResponses } = require('./data');

const app = express();
app.use(cors());
app.use(express.json());

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
