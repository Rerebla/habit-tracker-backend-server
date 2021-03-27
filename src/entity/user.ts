import { Field, Int, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, Unique, BaseEntity } from "typeorm";

@ObjectType()
@Entity()
@Unique(["email"])
export default class User extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    userName: string;

    @Column()
    password: string;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    accountCreationTime: string;

    @Field(() => String)
    @Column({ name: 'email' })
    email: string;

    @Column({
        default: () => 0
    })
    tokenVersion: number;

    @Column()
    permissions: string;

    @Column()
    roles: string;
}