import { CommentService } from './../comment/comment.service';
import { CommentEntity } from './../comment/comment.entity';
import { UserEntity } from './../user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IdeaController } from './idea.controller';
import { IdeaService } from './idea.service';
import { IdeaEntity } from './idea.entity';
import { IdeaResolver } from './idea.resolver';


@Module({
  imports: [TypeOrmModule.forFeature([IdeaEntity, UserEntity, CommentEntity])],
  controllers: [IdeaController],
  providers: [IdeaService, IdeaResolver, CommentService]
})
export class IdeaModule {}
