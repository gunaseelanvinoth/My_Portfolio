const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/files', express.static(path.join(__dirname, 'files')));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint for portfolio data (optional - for future enhancements)
app.get('/api/portfolio', (req, res) => {
  res.json({
    name: "Gunaseelan V",
    email: "gunaseelanvinothv@gmail.com",
    github: "https://github.com/gunaseelanvinoth",
    linkedin: "https://www.linkedin.com/in/gunaseelan-v-a68731293/",
    status: "success"
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Portfolio server running on http://localhost:${PORT}`);
    console.log(`📁 Serving static files from: ${__dirname}`);
  });
}

// Export for Vercel
module.exports = app;

