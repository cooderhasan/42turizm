const postgres = require('postgres');

const connectionString = 'postgresql://postgres:123456@localhost:5433/postgres';
const sql = postgres(connectionString);

async function main() {
    try {
        const dbs = await sql`SELECT datname FROM pg_database WHERE datname = 'turizm_db'`;
        if (dbs.length === 0) {
            await sql`CREATE DATABASE turizm_db`;
            console.log('Database turizm_db created');
        } else {
            console.log('Database turizm_db already exists');
        }
    } catch (e) {
        console.error('Error creating database:', e);
    } finally {
        await sql.end();
    }
}

main();
