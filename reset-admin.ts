
import { db } from './src/db';
import { users } from './src/db/schema';
import { eq } from 'drizzle-orm';

async function resetAdminPassword() {
    try {
        console.log('Checking for admin user...');

        const existingUsers = await db.select().from(users);
        console.log('Existing users:', existingUsers);

        if (existingUsers.length === 0) {
            console.log('No users found. Creating admin user...');
            await db.insert(users).values({
                email: 'admin@42turizm.com',
                password: 'admin123',
                name: 'Admin'
            });
            console.log('✅ Admin user created successfully!');
        } else {
            console.log('Updating admin password...');
            await db.update(users)
                .set({ password: 'admin123' })
                .where(eq(users.email, 'admin@42turizm.com'));
            console.log('✅ Admin password updated to: admin123');
        }

        console.log('\nLogin credentials:');
        console.log('Email: admin@42turizm.com');
        console.log('Password: admin123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

resetAdminPassword();
