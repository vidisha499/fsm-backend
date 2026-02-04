export class CreateIncidentDto {
  rangerId: number;
  photo?: string;
  responsePriority?: string;
  incidentCriteria?: string;
  rootCause?: string;
  fieldObservation?: string;
}