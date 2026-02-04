import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Ranger } from '../../rangers/entities/ranger.entity';

@Entity('patrol_logs')
export class PatrolLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'ranger_id' })
  rangerId: number;

  @Column({ name: 'patrol_name', length: 100 })
  patrolName: string;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;

  @Column({ length: 20, default: 'COMPLETED' })
  status: string;

  @Column({ name: 'site_location', length: 100, default: 'PANNA SITE' })
  siteLocation: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Ranger, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ranger_id' })
  ranger: Ranger;
}