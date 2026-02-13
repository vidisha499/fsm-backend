// export class CreatePatrolLogDto {
//   rangerId: number;
//   patrolName: string;
//   startTime: Date;
//   endTime: Date;
//   status?: string;
//   siteLocation?: string;
// }

export class CreatePatrolLogDto {
  rangerId: number; //
  patrolName: string; //
  startTime: string; // Sent as ISO string from frontend
  endTime: string; // Sent as ISO string from frontend
  status?: string; //
  siteLocation?: string; //
}