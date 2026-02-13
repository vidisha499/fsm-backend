import { PartialType } from '@nestjs/mapped-types';
import { CreateRangerDto } from './create-ranger.dto';

export class UpdateRangerDto extends PartialType(CreateRangerDto) {}
