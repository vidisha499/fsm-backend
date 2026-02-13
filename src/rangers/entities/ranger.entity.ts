// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   CreateDateColumn,
// } from 'typeorm';

// @Entity('rangers') // Explicitly naming the table 'rangers'
// export class Ranger {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ length: 50, unique: true })
//   username: string;

//   @Column({ name: 'phone_no', length: 20 }) // Maps camelCase to snake_case
//   phoneNo: string;

//   @Column({ name: 'email_id', length: 100, unique: true })
//   emailId: string;

//   @Column({ length: 255 })
//   password: string;

//   @CreateDateColumn({
//     name: 'created_at',
//     type: 'timestamp',
//     default: () => 'CURRENT_TIMESTAMP',
//   })
//   createdAt: Date;

//   @Column({ unique: true })
//   email: string;

//   @Column({ nullable: true })
//   otp: string; // To store the 6-digit code
// }


import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('rangers') 
export class Ranger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  username: string;


  @Column({ name: 'phone_no', length: 10, unique: true })
phoneNo: string;

  @Column({ name: 'email_id', length: 100, unique: true })
  emailId: string; // ✅ This matches your SQL 'email_id'

  @Column({ length: 255 })
  password: string;

  

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
// src/rangers/entities/ranger.entity.ts

@Column({ 
  type: 'varchar', 
  length: 10, 
  nullable: false, // ❌ No longer allows null
  default: ''      // ✅ Defaults to an empty string
})
otp: string; // ❌ Removed "| null"

  
}