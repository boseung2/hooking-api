import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BoardsModule } from './boards/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'hooking2024!',
      database: 'hooking_graphql',
      entities: [],
      synchronize: !(process.env.NODE_ENV === 'production'),
      logging: !(process.env.NODE_ENV === 'production'),
      autoLoadEntities: true,
    }),
    BoardsModule,
    UsersModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
