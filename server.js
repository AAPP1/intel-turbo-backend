
import express from 'express';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/updates', (req, res) => {
  res.json([
    { message: "Intel launches RibbonFET 3!", timestamp: "2025-04-30T14:00:00Z" },
    { message: "Panther Lake enters mass production", timestamp: "2025-04-30T15:00:00Z" }
  ]);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
