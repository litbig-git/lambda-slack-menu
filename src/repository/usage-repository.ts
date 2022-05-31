import { EntityRepository, Repository } from "typeorm"
import { Usage } from "@entity/usage"

@EntityRepository(Usage)
export class UsageRepository extends Repository<Usage> {
    async getLog(dt: string): Promise<Usage> {
        return await this.createQueryBuilder('table_usage')
            .where('table_usage.dt = :dt', { dt: dt })
            .getOne()
    }

    async setLog(usage: Usage) {
        await this.save(usage)
    }
}
