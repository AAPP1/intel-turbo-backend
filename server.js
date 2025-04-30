
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const updatesFile = path.join(__dirname, 'updates.json');

app.use(cors());
app.use(express.json());

// Utility to read updates from file
function readUpdates() {
  if (!fs.existsSync(updatesFile)) return [];
  const data = fs.readFileSync(updatesFile, 'utf-8');
  return JSON.parse(data || '[]');
}

// Utility to write updates to file
function writeUpdates(updates) {
  fs.writeFileSync(updatesFile, JSON.stringify(updates, null, 2));
}

// GET all updates
app.get('/api/updates', (req, res) => {
  const updates = readUpdates();
  res.json(updates);
});

// POST a new update
app.post('/api/updates', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required." });

  const updates = readUpdates();
  const newUpdate = {
    message,
    timestamp: new Date().toISOString()
  };
  updates.unshift(newUpdate);
  writeUpdates(updates);
  res.status(201).json(newUpdate);
});

// DELETE an update by timestamp
app.delete('/api/updates/:timestamp', (req, res) => {
  const { timestamp } = req.params;
  let updates = readUpdates();
  const index = updates.findIndex(update => update.timestamp === timestamp);
  if (index === -1) return res.status(404).json({ error: "Update not found." });

  updates.splice(index, 1);
  writeUpdates(updates);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
