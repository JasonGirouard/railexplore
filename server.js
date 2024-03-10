const express = require('express');
const path = require('path');
const { spawn } = require('child_process');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// API endpoint for path calculation
app.get('/api/paths/:origin/:destination', async (req, res) => {
    const { origin, destination } = req.params;
  
    // Validate the origin and destination parameters
    if (!origin || !destination || origin.length !== 3 || destination.length !== 3) {
      return res.status(400).json({ error: 'Invalid origin or destination' });
    }
  
    // Execute the Python script
    const pythonProcess = await spawn('python3', ['scripts/path_calculation.py', origin, destination]);
  
    // opt 1 - wait for this to finish, then write this to a file and then read it. 
    // the problem is that the pythonProcess doesn't get a result. I need to need for pythonProcess.stdout to finish before finishing the rest. 
    let pythonOutput = '';
    pythonProcess.stdout.on('data', (data) => {
      console.log('pythonOutput1: ',data)
      pythonOutput += data.toString();
    });
  
    pythonProcess.on('close', (code) => {
      console.log('pythonOutput2: ',code)
      console.log('pythonOutput3: ',res)
      console.log('pythonOutput4:', pythonOutput)
      console.log('pythonOutput5:',JSON.parse(pythonOutput) )
  
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