import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('beat_attendance')
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ranger_id: number;

  @Column({ type: 'text', nullable: true }) 
  // Postgres 'text' has no limit, perfect for Base64 photos
  photo: string;

  @Column({ length: 100, nullable: true })
  rangerName: string;

  @Column({ length: 100, nullable: true })
  region: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  geofence: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  type: string;

  @Column({ type: 'double precision', nullable: true })
  // 'double precision' is the correct Postgres type for GPS coordinates
  latitude: number;

  @Column({ type: 'double precision', nullable: true })
  longitude: number;

  @CreateDateColumn()
  created_at: Date;
}