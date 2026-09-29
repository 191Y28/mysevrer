import { createBareServer } from '@tomphttp/bare-server-node';
import { createServer } from 'node:http';

// Changed endpoint from '/bare/' to '/myserver/'
const bare = createBareServer('/myserver/'); 
const server = createServer();

server.on('request', (req, res) => {
    if (bare.shouldRoute(req)) {
        bare.route(req, res);
    } else {
        res.writeHead(200);
        res.end('Server connection active.'); // Disguised fallback text
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
