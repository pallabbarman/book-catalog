"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const configs_1 = __importDefault(require("./configs"));
const startServer = async () => {
    const server = app_1.default.listen(configs_1.default.port, () => {
        console.log(`Server running on port ${configs_1.default.port || 5000}`);
    });
    const exitHandler = () => {
        if (server) {
            server.close(() => {
                console.log('Server closed');
            });
        }
        process.exit(1);
    };
    const unexpectedErrorHandler = (error) => {
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
