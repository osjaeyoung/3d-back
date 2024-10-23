import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  userId: string;

  @Exclude()
  @Column({ type: 'varchar', nullable: false })
  pwd: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @BeforeInsert()
  private beforeInsert() {
    this.pwd = bcrypt.hashSync(this.pwd, 10);
  }

  constructor(entity?: Partial<User>) {
    if (entity) Object.assign(this, entity);
  }
}
