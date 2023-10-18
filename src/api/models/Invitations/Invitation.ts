import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { EntityBase } from "@base/infrastructure/abstracts/EntityBase";
import { User } from "../Users/User";

@Entity({ name: "invitations" })
export class Invitation extends EntityBase {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    code: string;

    @Column()
    used: boolean;

    @Column()
    user_id: number;

    @OneToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;
}
