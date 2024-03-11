/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: `${process.env.POSTGRES_HOST}`,
      username: `${process.env.POSTGRES_USER}`,
      password: `${process.env.POSTGRES_PASSWORD}`,
      port: parseInt(process.env.POSTGRES_PORT),
      database: `${process.env.POSTGRES_DATABASE}`,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
