import { PartialType } from '@nestjs/mapped-types';
import { CreateOnsiteAttendanceDto } from './create-onsite-attendance.dto';

export class UpdateOnsiteAttendanceDto extends PartialType(CreateOnsiteAttendanceDto) {}
