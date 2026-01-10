const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Health check endpoint (required for load balancers)
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to my containerized API!',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      users: '/api/users',
      info: '/api/info'
    }
  });
});

// Sample data endpoint
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'Alice', role: 'Developer' },
    { id: 2, name: 'Bob', role: 'Designer' },
    { id: 3, name: 'Charlie', role: 'Manager' }
  ];
  res.json(users);
});

// Info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    environment: process.env.NODE_ENV || 'development',
    hostname: require('os').hostname(),
    platform: process.platform,
    nodeVersion: process.version
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});