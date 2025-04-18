import { connect, set } from 'mongoose';
 import { UserModel } from '../models/user.model.js';
 import { StuffModel } from '../models/stuff.model.js';
 import { sample_users } from '../data.js';
 import { sample_stuffs } from '../data.js';
 import bcrypt from 'bcryptjs';
 const PASSWORD_HASH_SALT_ROUNDS = 10;
 set('strictQuery', true);
 
 export const dbconnect = async () => {
   try {
     connect(process.env.MONGO_URI, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
     });
     await seedUsers();
     await seedStuffs();
     console.log('connect successfully---');
   } catch (error) {
     console.log(error);
   }
 };
 
 async function seedUsers() {
   const usersCount = await UserModel.countDocuments();
   if (usersCount > 0) {
     console.log('Users seed is already done!');
     return;
   }
 
   for (let user of sample_users) {
     user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
     await UserModel.create(user);
   }
 
   console.log('Users seed is done!');
 }
 
 async function seedStuffs() {
   const Stuffs = await StuffModel.countDocuments();
   if (Stuffs > 0) {
     console.log('Stuffs seed is already done!');
     return;
   }
 
   for (const stuff of sample_stuffs) {
     stuff.imageUrl = `/Stuffs/${stuff.imageUrl}`;
     await StuffModel.create(stuff);
   }
 
   console.log('Stuffs seed Is Done!');
 }