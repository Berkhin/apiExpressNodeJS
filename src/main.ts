import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { ExeptionFilter } from './errors/exeption.filter';
import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { Container, ContainerModule, interfaces } from 'inversify';
import { IExeptionFilter } from './errors/exeptionFilter.inderface';
import { UserService } from './users/users.service';
import { IUserController } from './users/users.interface';
import { IUserService } from './users/users.service.interface';

export interface BootstrapType {
	app: App;
	appContainer: Container;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<App>(TYPES.Aplication).to(App);
});

function bootstrap(): BootstrapType {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Aplication);
	app.init();
	return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
