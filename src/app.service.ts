import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    //@Inject('API_KEY') private apikey: string,
    @Inject('TASKS') private tasks: any[],
    //private config: ConfigService,
    @Inject(config.KEY) private confingService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    const apikey = this.confingService.apiKey;
    //const dbkey = this.config.get<string>('DATABASE_NAME');
    const dbkey = this.confingService.database.name;
    return `Hello World! ${apikey} ${dbkey}`;
  }
}
