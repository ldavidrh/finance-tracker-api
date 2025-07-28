import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`src/.env.${process.env.NODE_ENV}.local`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        if (config.get<string>('DATABASE_TYPE') === 'sqlite') {
          return {
            type: 'sqlite',
            database: config.get<string>('DATABASE_NAME'),
            autoLoadEntities: true,
            synchronize: true, // Be cautious with this in production
          };
        } else {
          return {
            type: 'postgres',
            host: config.get<string>('DATABASE_HOST'),
            port: config.get<number>('DATABASE_PORT'),
            username: config.get<string>('DATABASE_USER'),
            password: config.get<string>('DATABASE_PASSWORD'),
            database: config.get<string>('DATABASE_NAME'),
            autoLoadEntities: true,
            synchronize: false, // Strongly recommended to be false in production
            migrationsRun: true,
            migrations: ['dist/migrations/*.js'],
          };
        }
      },
    }),
  ],
})
export class DatabaseModule {}
