import { getDateTimeStamp } from '@utils/util';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('table_usage')
export class Usage extends BaseEntity {

    parseDict(date: Date, dict) {
        this.datetime = getDateTimeStamp(date)
        this.token = dict['token']
        this.team_id = dict['team_id']
        this.team_domain = dict['team_domain']
        this.channel_id = dict['channel_id']
        this.channel_name = dict['channel_name']
        this.user_id = dict['user_id']
        this.user_name = dict['user_name']
        this.command = dict['command']
        this.text = dict['text']
        this.api_app_id = dict['api_app_id']
        this.is_enterprise_install = dict['is_enterprise_install']
        this.response_url = dict['response_url']
        this.trigger_id = dict['trigger_id']
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
