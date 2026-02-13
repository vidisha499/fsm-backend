

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RangersModule } from './rangers/rangers.module';
import { PatrolsModule } from './patrols/patrols.module';
import { IncidentsModule } from './incidents/incidents.module';
import { AttendanceModule } from './attendance/attendance.module';
import { OnsiteAttendanceModule } from './onsite-attendance/onsite-attendance.module';
import { TranslationsService } from './translations/translations.service';
import { TranslationsController } from './translations/translations.controller';



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
  synchronize: true, 
      // ✅ Move SSL directly here for better stability with Neon
      ssl: {
        rejectUnauthorized: false,
      },
      // ✅ Add timeout to prevent the socket from dropping during the handshake
      connectTimeoutMS: 10000,
      extra: {
    // These settings keep the connection alive and healthy
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 20000,
  },
}),
    RangersModule,
    PatrolsModule,
    IncidentsModule,
    AttendanceModule,
    OnsiteAttendanceModule,
  ],
  providers: [TranslationsService],
  controllers: [TranslationsController],
})
export class AppModule {}
