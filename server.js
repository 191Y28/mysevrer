import { createBareServer } from '@tomphttp/bare-server-node';
import { createServer } from 'node:http';

const bare = createBareServer('/bare/');
const server = createServer();

server.on('request', (req, res) => {
    if (bare.shouldRoute(req)) {
        bare.route(req, res);
    } else {
        res.writeHead(200);
        res.end('Bare Server is running.');
    }
});

server.on('upgrade', (req, socket, head) => {
    if (bare.shouldRoute(req)) {
        bare.routeUpgrade(req, socket, head);
    } else {
        socket.end();
    }
});

server.listen(process.env.PORT || 8080);
