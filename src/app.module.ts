

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RangersModule } from './rangers/rangers.module';
import { PatrolsModule } from './patrols/patrols.module';
import { IncidentsModule } from './incidents/incidents.module';
import { AttendanceModule } from './attendance/attendance.module';
import { OnsiteAttendanceModule } from './onsite-attendance/onsite-attendance.module';

@Module({
  imports: [
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'ep-rough-brook-aiun0w3c.c-4.us-east-1.aws.neon.tech',
  port: 5432,
  username: 'neondb_owner',
  password: 'npg_Rz3iD9NuJmCa',
  database: 'neondb',
  autoLoadEntities: true,
  synchronize: true, // Set to true once to create tables, then false later
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
}),
    RangersModule,
    PatrolsModule,
    IncidentsModule,
    AttendanceModule,
    OnsiteAttendanceModule,
  ],
})
export class AppModule {}
