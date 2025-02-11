const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

// Extra configuration for Render Deployment, using Neon
// const { Pool } = require('pg');
// import { Pool } from 'pg';

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false // Most cloud providers require SSL
//     }
// });

// pool.connect()
//     .then(() => console.log('✅ Connected to PostgreSQL'))
//     .catch(err => console.error('❌ Database connection error:', err));
// try{
//   pool.connect()
//   .then(() => console.log('✅ Connected to PostgreSQL'))
// }catch (err){
//   console.error('❌ Database connection error:', err);
// }
  


const app = express();
const PORT = process.env.PORT || 3001;

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));

app.use(express.json());
app.use(routes);

sequelize.sync({force: forceDatabaseRefresh}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
