import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Ranger } from '../../rangers/entities/ranger.entity';

@Entity('patrol_active')
export class PatrolActive {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'ranger_id' })
  rangerId: number;

  @Column({ name: 'start_time', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startTime: Date;

  @Column({ name: 'current_timer', length: 20, nullable: true })
  currentTimer: string;

  // Added transformers to prevent 500 errors when receiving coordinates as strings
  @Column({ 
    type: 'decimal', 
    precision: 10, 
    scale: 8, 
    nullable: true,
    transformer: { to: (value: number) => value, from: (value: string) => parseFloat(value) }
  })
  liveLatitude: number;

  @Column({ 
    type: 'decimal', 
    precision: 11, 
    scale: 8, 
    nullable: true,
    transformer: { to: (value: number) => value, from: (value: string) => parseFloat(value) }
  })
  liveLongitude: number;

  @Column({ default: 0 })
  obsAnimal: number;

  @Column({ default: 0 })
  obsWater: number;

  @Column({ default: 0 })
  obsImpact: number;

  @Column({ default: 0 })
  obsDeath: number;

  @Column({ default: 0 })
  obsFelling: number;

  @Column({ default: 0 })
  obsOther: number;

  @Column({ name: 'photo_log_url', length: 255, nullable: true })
  photoLogUrl: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @ManyToOne(() => Ranger, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ranger_id' })
  ranger: Ranger;
}