export class CreateOnsiteAttendanceDto {
  rangerId: number;
  type?: string;
  photo?: string;
  ranger?: string;
  geofence?: string;
  attendanceType?: string;
}