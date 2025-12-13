
const postgres = require('postgres');

// Mimic the logic in src/db/index.ts but purely in node
const connectionString = "postgresql://postgres:123456@localhost:5433/turizm_db";
const sql = postgres(connectionString);

async function verifyLogin() {
    console.log('Testing Admin Login Logic directly against DB...');
    console.log(`Connecting to: ${connectionString.replace(/:[^:]+@/, ':***@')}`);

    try {
        const users = await sql`SELECT * FROM users WHERE email = 'admin@42turizm.com'`;

        if (users.length === 0) {
            console.error('FAILED: User admin@42turizm.com not found.');
            return;
        }

        const user = users[0];
        console.log('User found:', user.email);

        // Simple password check as per current implementation
        if (user.password === 'admin') {
            console.log('SUCCESS: Password matches.');
        } else {
            console.error('FAILED: Password does not match.');
            console.log('Expected: admin');
            console.log('Actual:', user.password);
        }

    } catch (error) {
        console.error('Database Error:', error);
    } finally {
        await sql.end();
    }
}

verifyLogin();
