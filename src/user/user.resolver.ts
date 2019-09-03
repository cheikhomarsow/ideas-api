import { AuthGuard } from './../shared/auth.guard';
import { UseGuards } from '@nestjs/common';
import { CommentService } from './../comment/comment.service';
import { Resolver, Query, Args, ResolveProperty, Parent, Mutation, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';

@Resolver('User')
export class UserResolver {
    constructor(
        private userService: UserService,
        private commentService: CommentService
    ) { }

    @Query()
    users(@Args('page') page: number) {
        return this.userService.showAll(page);
    }

    @Query()
    async user(@Args('username') username: string) {
      return await this.userService.read(username);
    }

    @Query()
    @UseGuards(new AuthGuard())
    async whoami(@Context('user') user) {
      const { username } = user;
      return await this.userService.read(username);
    }

    @Mutation()
    async login(
      @Args('username') username: string,
      @Args('password') password: string,
    ) {
      const user: UserDTO = { username, password };
      return await this.userService.login(user);
    }

    @Mutation()
    async register(
      @Args('username') username: string,
      @Args('password') password: string,
    ) {
      const user: UserDTO = { username, password };
      return await this.userService.register(user);
    }

    @ResolveProperty()
    async comments(@Parent() user) {
      const { id } = user;
      return await this.commentService.showByUser(id);
    }
}