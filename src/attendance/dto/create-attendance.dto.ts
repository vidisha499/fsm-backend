
export class CreateAttendanceDto {
  ranger_id: number;
  rangerName: string; // From Vidisha
  region: string;     // From Vidisha
  geofence: string;   // Both had this
  type: string;       // From Vidisha
  photo: string;      // Both had this (one made it optional, one required)
}