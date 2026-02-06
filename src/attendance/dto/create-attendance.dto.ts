// export class CreateAttendanceDto {
//   rangerId: number;
//   photo?: string;
//   ranger?: string;
//   geofence?: string;
// }

export class CreateAttendanceDto {
  ranger_id: number;
  rangerName: string;
  region: string;
  geofence: string;
  type: string;
  photo: string;
}