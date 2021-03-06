import { UserRO } from './user.dto';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert, OneToMany, ManyToMany, JoinTable } from "typeorm";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { IdeaEntity } from 'src/idea/idea.entity';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    created: Date;

    @Column({
        type: 'text',
        unique: true
    })
    username: string;

    @Column('text')
    password: string;

    @OneToMany(type => IdeaEntity, idea => idea.author)
    ideas: IdeaEntity[];

    @ManyToMany(type => IdeaEntity, {cascade: true})
    @JoinTable()
    bookmarks: IdeaEntity[];

    @BeforeInsert()
    async hasPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    toResponseObject(showToken: boolean = true): UserRO {
        const { id, created, username, token } = this;
        const responseObject: any = { id, created, username };
        if(showToken) {
            responseObject.token = token;
        }
        if (this.ideas) {
            responseObject.ideas = this.ideas;
        }
        if (this.bookmarks) {
            responseObject.bookmarks = this.bookmarks;
        }
        return responseObject;
    }

    async comparePassword(attemp: string) {
        return await bcrypt.compare(attemp, this.password);
    }

    private get token() {
        const {id, username} = this;
        return jwt.sign({
            id, username
        }, process.env.SECRET, {expiresIn: '7d'})
    }

}