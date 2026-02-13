import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  ManyToOne, 
  JoinColumn 
} from 'typeorm';
import { Ranger } from '../../rangers/entities/ranger.entity';

@Entity('incidents')
export class Incident {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'ranger_id' })
  rangerId: number;

  // @Column({ length: 255, nullable: true })
  // photo: string;

  @Column({ name: 'response_priority', length: 50, nullable: true })
  responsePriority: string;

  @Column({ name: 'incident_criteria', length: 100, nullable: true })
  incidentCriteria: string;

  @Column({ name: 'root_cause', length: 100, nullable: true })
  rootCause: string;

  @Column({ name: 'field_observation', type: 'text', nullable: true })
  fieldObservation: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  // This creates the link to the Rangers table
  @ManyToOne(() => Ranger, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ranger_id' })
  ranger: Ranger;

  // src/incidents/entities/incident.entity.ts

@Column({ type: 'text', nullable: true }) // Changed 'longtext' to 'text'
photo: string;


}