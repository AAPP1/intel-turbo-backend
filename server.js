
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let updates = [
  { message: "Intel launches RibbonFET 3!", timestamp: "2025-04-30T14:00:00Z" },
  { message: "Panther Lake enters mass production", timestamp: "2025-04-30T15:00:00Z" }
];

app.get('/api/updates', (req, res) => {
  res.json(updates);
});

app.post('/api/updates', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required." });

  const newUpdate = {
    message,
    timestamp: new Date().toISOString()
  };
  updates.unshift(newUpdate); // Add to top of list
  res.status(201).json(newUpdate);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
