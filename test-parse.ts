import 'dotenv/config';
import { Pool } from '@neondatabase/serverless';

const connectionString = `${process.env.DATABASE_URL}`;
console.log("Creating Pool with:", connectionString);

try {
  const pool = new Pool({ connectionString });
  console.log("Pool created successfully!");
} catch (e) {
  console.error("Pool creation failed!", e);
}
