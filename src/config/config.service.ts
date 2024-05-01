import { inject, injectable } from 'inversify';
import { IConfigService } from './config.service.interface';
import { DotenvConfigOutput, DotenvParseOutput, config } from 'dotenv';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const res: DotenvConfigOutput = config();
		if (res.error) {
			this.logger.error('[ConfigService] Fail to read file. Or file not exist');
		} else {
			this.logger.log('[ConfigService] config .env downloaded');
			this.config = res.parsed as DotenvParseOutput;
		}
	}
	get(key: string): string {
		return this.config[key];
	}
}
