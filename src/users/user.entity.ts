import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Unique(['email'])
  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column()
  isActive: boolean;

  @CreateDateColumn({
    default: 'now()',
    nullable: true,
  })
  createAt: string;

  @UpdateDateColumn({
    default: 'now()',
    nullable: true,
  })
  updatedAt: string;

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
