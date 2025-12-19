const express = require('express');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());

// Serve static files from files directory
app.use('/files', express.static(path.join(__dirname, '../files')));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// API endpoints
app.get('/api/portfolio', (req, res) => {
  res.json({
    name: "Gunaseelan V",
    email: "gunaseelanvinothv@gmail.com",
    github: "https://github.com/gunaseelanvinoth",
    linkedin: "https://www.linkedin.com/in/gunaseelan-v-a68731293/",
    status: "success"
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Handle all other routes - serve index.html for SPA behavior
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

module.exports = app;

