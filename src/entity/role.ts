import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';


@Entity()
@Unique(["roleName"])
export default class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roleName: string;

    @Column()
    permissions: string;
}