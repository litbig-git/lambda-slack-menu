import { EntityRepository, Repository } from "typeorm";
import { Menu } from "@entity/menu";

@EntityRepository(Menu)
export class MenuRepository extends Repository<Menu> {
    async getMenuByDate(date: string): Promise<Menu> {
        return await this.createQueryBuilder('table_menu')
            .where('table_menu.date = :date', { date: date })
            .getOne();
    }
}
