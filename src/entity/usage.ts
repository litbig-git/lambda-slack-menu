import { getDateTimeStamp } from '@utils/util';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('table_usage')
export class Usage extends BaseEntity {

    parseMap(date: Date, map: Map<string, string>) {
        this.datetime = getDateTimeStamp(date)
        this.token = map.get('token')
        this.team_id = map.get('team_id')
        this.team_domain = map.get('team_domain')
        this.channel_id = map.get('channel_id')
        this.channel_name = map.get('channel_name')
        this.user_id = map.get('user_id')
        this.user_name = map.get('user_name')
        this.command = map.get('command')
        this.text = map.get('text')
        this.api_app_id = map.get('api_app_id')
        this.is_enterprise_install = map.get('is_enterprise_install')
        this.response_url = map.get('response_url')
        this.trigger_id = map.get('trigger_id')
        return this
    }

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('text')
    datetime: string

    @Column('text')
    token: string

    @Column('text')
    team_id: string

    @Column('text')
    team_domain: string

    @Column('text')
    channel_id: string

    @Column('text')
    channel_name: string

    @Column('text')
    user_id: string

    @Column('text')
    user_name: string

    @Column('text')
    command: string

    @Column('text')
    text: string

    @Column('text')
    api_app_id: string

    @Column('text')
    is_enterprise_install: string

    @Column('text')
    response_url: string

    @Column('text')
    trigger_id: string
}
