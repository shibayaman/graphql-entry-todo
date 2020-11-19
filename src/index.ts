import dotenv from 'dotenv';
import { createConnection } from 'typeorm';

dotenv.config();

createConnection()
  .then(async connection => {
    console.log('code starts here');
  })
  .catch(err => {
    console.error(err);
  });
