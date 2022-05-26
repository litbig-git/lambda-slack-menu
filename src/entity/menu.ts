import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('table_menu')
export class Menu extends BaseEntity {
    @PrimaryGeneratedColumn()
    date: string;

    @Column('text')
    breakfast: string

    @Column('text')
    lunch_a: string

    @Column('text')
    lunch_b: string

    @Column('text')
    lunch_side: string

    @Column('text')
    lunch_salad: string

    @Column('text')
    dinner: string
}
