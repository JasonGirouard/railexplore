const express = require('express');
const path = require('path');
const { spawn } = require('child_process');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// API endpoint for path calculation
app.get('/api/paths', (req, res) => {
  const { origin, destination } = req.query;

  // Execute the Python script
  const pythonProcess = spawn('python', ['scripts/path_calculation.py', origin, destination]);

  let pythonOutput = '';
  pythonProcess.stdout.on('data', (data) => {
    pythonOutput += data.toString();
  });

  pythonProcess.on('close', (code) => {
    res.json(JSON.parse(pythonOutput));
  });
});

// Catch-all route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});