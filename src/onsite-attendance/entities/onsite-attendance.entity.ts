import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  ManyToOne, 
  JoinColumn 
} from 'typeorm';
import { Ranger } from '../../rangers/entities/ranger.entity';

@Entity('onsite_attendance')
export class OnsiteAttendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'ranger_id' })
  rangerId: number;

  @Column({ length: 50, nullable: true })
  type: string; // matches your VARCHAR(50)

  @Column({ length: 255, nullable: true })
  photo: string;

  @Column({ length: 100, nullable: true })
  ranger: string;

  @Column({ length: 255, nullable: true })
  geofence: string;

  @Column({ name: 'attendance_type', length: 100, nullable: true })
  attendanceType: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => Ranger, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ranger_id' })
  rangerDetails: Ranger;
}