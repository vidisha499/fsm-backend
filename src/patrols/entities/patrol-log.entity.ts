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

  @Column({ name: 'startTime', type: 'timestamp' }) // Matches your DB camelCase
  startTime: Date;

  @Column({ name: 'endTime', type: 'timestamp' }) // Matches your DB camelCase
  endTime: Date;

  @Column({ length: 20, default: 'COMPLETED' })
  status: string;

  @Column({ name: 'site_location', length: 100, default: 'PANNA SITE' })
  siteLocation: string;

  @Column({ name: 'distance_km', type: 'decimal', precision: 10, scale: 2, default: 0 })
  distanceKm: number;

  @Column({ length: 20, nullable: true })
  duration: string;

  @Column({ name: 'observationData', type: 'json', nullable: true }) // Matches generated query
  observationData: any;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Ranger, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ranger_id' })
  ranger: Ranger;
}