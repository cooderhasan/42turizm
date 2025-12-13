
import { db } from './src/db/index.js';
import { users } from './src/db/schema.js';

async function checkUsers() {
    try {
        const result = await db.select().from(users);
        console.log('Users in database:', JSON.stringify(result, null, 2));
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkUsers();
