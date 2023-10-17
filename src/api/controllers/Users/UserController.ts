import { Param, Get, JsonController, Post, Body, Put, Delete, HttpCode, UseBefore, QueryParams } from 'routing-controllers';
import { UserService } from '@api/services/Users/UserService';
import { Service } from 'typedi';
import { UserCreateRequest } from '@api/requests/Users/UserCreateRequest';
import { AuthCheck } from '@base/infrastructure/middlewares/Auth/AuthCheck';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { UserUpdateRequest } from '@api/requests/Users/UserUpdateRequest';
import { OpenAPI } from 'routing-controllers-openapi';
import { RequestQueryParser } from 'typeorm-simple-query-parser';
import { LoggedUser } from '@base/decorators/LoggedUser';
import { LoggedUserInterface } from '@api/interfaces/users/LoggedUserInterface';
import { HasRole } from '@base/infrastructure/middlewares/Auth/HasRole';

@Service()
@OpenAPI({
  security: [{ bearerAuth: [] }],
})
@JsonController('/users')
export class UserController extends ControllerBase {
  public constructor(private userService: UserService) {
    super();
  }

  @UseBefore(AuthCheck, HasRole('Admin'))
  @Get()
  public async getAll(@QueryParams() parseResourceOptions: RequestQueryParser) {
    const resourceOptions = parseResourceOptions.getAll();

    return await this.userService.getAll(resourceOptions);
  }

  @UseBefore(AuthCheck, HasRole('Admin'))
  @Get('/:id([0-9]+)')
  public async getOne(@Param('id') id: number, @QueryParams() parseResourceOptions: RequestQueryParser) {
    const resourceOptions = parseResourceOptions.getAll();

    return await this.userService.findOneById(id, resourceOptions);
  }

  // dont apply hasRole middleware here, because we need to get logged user
  @UseBefore(AuthCheck)
  @Get('/me')
  public async getMe(@QueryParams() parseResourceOptions: RequestQueryParser, @LoggedUser() loggedUser: LoggedUserInterface) {
    const resourceOptions = parseResourceOptions.getAll();

    return await this.userService.findOneById(loggedUser.userId, resourceOptions);
  }

  @UseBefore(AuthCheck, HasRole('Admin'))
  @Post()
  @HttpCode(201)
  public async create(@Body() user: UserCreateRequest) {
    return await this.userService.create(user);
  }

  @UseBefore(AuthCheck, HasRole('Admin'))
  @Put('/:id')
  public async update(@Param('id') id: number, @Body() user: UserUpdateRequest) {
    return await this.userService.updateOneById(id, user);
  }

  @UseBefore(AuthCheck, HasRole('Admin'))
  @Delete('/:id')
  @HttpCode(204)
  public async delete(@Param('id') id: number) {
    return await this.userService.deleteOneById(id);
  }
}
