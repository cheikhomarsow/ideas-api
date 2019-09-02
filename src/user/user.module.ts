import { CommentService } from './../comment/comment.service';
import { IdeaEntity } from '../idea/idea.entity';
import { CommentEntity } from './../comment/comment.entity';
import { UserEntity } from './user.entity';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, IdeaEntity,CommentEntity])],
  controllers: [UserController],
  providers: [UserService, UserResolver, CommentService ]
})
export class UserModule {}
