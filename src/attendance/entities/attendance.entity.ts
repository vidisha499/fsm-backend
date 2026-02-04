import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  ManyToOne, 
  JoinColumn 
} from 'typeorm';
import { Ranger } from '../../rangers/entities/ranger.entity';

@Entity('beat_attendance')
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'ranger_id' })
  rangerId: number;

  @Column({ length: 255, nullable: true })
  photo: string;

  @Column({ length: 100, nullable: true })
  ranger: string; // This matches your VARCHAR(100) 'ranger' column

  @Column({ length: 255, nullable: true })
  geofence: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => Ranger, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ranger_id' })
  rangerDetails: Ranger;
}