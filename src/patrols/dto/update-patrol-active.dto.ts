export class UpdatePatrolActiveDto {
  currentTimer?: string;
  liveLatitude?: number;
  liveLongitude?: number;
  obsAnimal?: number;
  obsWater?: number;
  obsImpact?: number;
  obsDeath?: number;
  obsFelling?: number;
  obsOther?: number;
  photoLogUrl?: string;
  isActive?: boolean;
}