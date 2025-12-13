const postgres = require('postgres');

async function testConnection(port) {
    const url = `postgresql://postgres:123456@localhost:${port}/turizm_db`;
    console.log(`Testing connection to ${url}...`);
    const sql = postgres(url, { connect_timeout: 2 });
    try {
        await sql`SELECT 1`;
        console.log(`SUCCESS: Connected to port ${port}`);
        return true;
    } catch (e) {
        console.log(`FAILED: Could not connect to port ${port}. Error: ${e.message}`);
        return false;
    } finally {
        await sql.end();
    }
}

async function main() {
    await testConnection(5432);
    await testConnection(5433);
}

main();
