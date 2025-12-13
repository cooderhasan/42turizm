const net = require('net');

const ports = [5432, 5433, 5434, 5435];

ports.forEach(port => {
    const client = new net.Socket();
    client.setTimeout(2000);

    client.on('connect', () => {
        console.log(`Port ${port} is OPEN`);
        client.destroy();
    });

    client.on('timeout', () => {
        // console.log(`Port ${port} timed out`);
        client.destroy();
    });

    client.on('error', (err) => {
        // console.log(`Port ${port} error: ${err.message}`);
        client.destroy();
    });

    client.connect(port, '127.0.0.1');
});
