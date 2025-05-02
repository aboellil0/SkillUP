import server from './server';

async function startServer() {
  try {
    // Connect to MongoDB
    await server.connectToDatabase();
    
    // Start Express server
    server.start();
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();