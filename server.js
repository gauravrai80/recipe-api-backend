require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

/**
 * Server Configuration
 */

const PORT = process.env.PORT || 5000;

/**
 * Start Server
 * Connects to database first, then starts listening
 */
const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB();

        // Start Express server
        app.listen(PORT, () => {
            console.log(`\n🚀 Server running in ${process.env.NODE_ENV || 'development'} mode`);
            console.log(`📡 Listening on port ${PORT}`);
            console.log(`🌐 Health check: http://localhost:${PORT}/health`);
            console.log(`📝 API Base URL: http://localhost:${PORT}/api/recipes\n`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err.message);
    process.exit(1);
});

// Start the server
startServer();
