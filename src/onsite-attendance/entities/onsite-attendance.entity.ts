import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('onsite_attendance')
export class OnsiteAttendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'ranger_id' })
  ranger_id: number;

  @Column({ length: 50, nullable: true })
  type: string; 

  @Column({ type: 'text', nullable: true }) // Text type allows for large Base64 photo strings
  photo: string;

  @Column({ length: 100, nullable: true })
  ranger: string;

  @Column({ length: 255, nullable: true })
  geofence: string;

  @Column({ name: 'attendance_type', length: 100, nullable: true })
  attendance_type: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;
}