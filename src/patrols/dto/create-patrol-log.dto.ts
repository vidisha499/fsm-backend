export class CreatePatrolLogDto {
  rangerId: number;
  patrolName: string;
  startTime: Date;
  endTime: Date;
  status?: string;
  siteLocation?: string;
}