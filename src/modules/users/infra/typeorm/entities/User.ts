import { Entity,Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  @Exclude()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('varchar')
  avatar_url: string;

  @Expose({name: 'avatar_full_url'})
  getavatar(): string | null{
    return this.avatar_url ? `${process.env.APP_API_URL}/files/${this.avatar_url}` : null;
  }


}

export default User;
