import { toComma } from '@utils/util';
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

    getMenuToComma() {
        this.breakfast = toComma(this.breakfast)
        this.lunch_a = toComma(this.lunch_a)
        this.lunch_b = toComma(this.lunch_b)
        this.lunch_salad = toComma(this.lunch_salad)
        this.lunch_side = toComma(this.lunch_side)
        this.dinner = toComma(this.dinner)

        return this
    }
}
