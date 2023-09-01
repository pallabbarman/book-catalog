import { Server } from 'http';
import app from './app';
import envConfig from './configs';

const startServer = async () => {
    const server: Server = app.listen(envConfig.port, () => {
        console.log(`Server running on port ${envConfig.port || 5000}`);
    });

    const exitHandler = () => {
        if (server) {
            server.close(() => {
                console.log('Server closed');
            });
        }
        process.exit(1);
    };

    const unexpectedErrorHandler = (error: unknown) => {
        console.log(error);
        exitHandler();
    };

    process.on('uncaughtException', unexpectedErrorHandler);
    process.on('unhandledRejection', unexpectedErrorHandler);

    process.on('SIGTERM', () => {
        console.log('SIGTERM is received');
        if (server) {
            server.close();
        }
    });
};

startServer();
