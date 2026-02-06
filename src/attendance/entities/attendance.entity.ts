import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Ranger } from '../../rangers/entities/ranger.entity';

@Entity('beat_attendance')
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ranger_id: number;

  @Column({ nullable: true })
  photo: string;

  @Column({ nullable: true })
  ranger: string;

  @Column({ nullable: true })
  geofence: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => Ranger, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ranger_id' })
  rangerDetails: Ranger;
}