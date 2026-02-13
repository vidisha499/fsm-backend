export class CreateAttendanceDto {
  ranger_id: number;
  rangerName: string; 
  region: string;     
  type: string;       
  photo: string;
  latitude: number;   // Added
  longitude: number;  // Added
  geofence: string;   // Stores the address string
}