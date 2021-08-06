import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Content {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({
      length: 11,
   })
   topic: string;

   @Column({ length: 50 })
   uid: string;

   @Column({ length: 200 })
   content_name: string;

   @Column({ length: 200 })
   detail: string;

   @Column({
      nullable: true,
      length: 25,
   })
   thumbnail: string;

   @Column({ length: 100 })
   file: string;

   @Column({ length: 20 })
   created: string;

   @Column({
      nullable: true,
      length: 20,
   })
   modified: string;

   @Column({ length: 20 })
   kindofPosts: string;

   @Column()
   date: Date;

   @Column({
      nullable: true,
      default: 0,
   })
   comment: number;
}
