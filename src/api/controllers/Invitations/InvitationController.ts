import { Param, Get, JsonController, Post, Body, Put, Delete, HttpCode, UseBefore, QueryParams } from "routing-controllers";
import { Service } from "typedi";
import { AuthCheck } from "@base/infrastructure/middlewares/Auth/AuthCheck";
import { ControllerBase } from "@base/infrastructure/abstracts/ControllerBase";
import { OpenAPI } from "routing-controllers-openapi";
import { RequestQueryParser } from "typeorm-simple-query-parser";
import { HasRole } from "@base/infrastructure/middlewares/Auth/HasRole";
import { InvitationService } from "@base/api/services/Invitations/InvitationService";
import { InivtationCreateRequest } from "@base/api/requests/Invitations/InvitationCreateRequest";

@Service()
@OpenAPI({
    security: [{ bearerAuth: [] }],
})
@JsonController("/invitations")
export class InvitationController extends ControllerBase {
    public constructor(private invitationService: InvitationService) {
        super();
    }

    @UseBefore(AuthCheck, HasRole("Admin"))
    @Get()
    public async getAll(@QueryParams() parseResourceOptions: RequestQueryParser) {
        const resourceOptions = parseResourceOptions.getAll();

        return await this.invitationService.getAll(resourceOptions);
    }

    @UseBefore(AuthCheck, HasRole("Admin"))
    @Get("/:id([0-9]+)")
    public async getOne(@Param("id") id: number, @QueryParams() parseResourceOptions: RequestQueryParser) {
        const resourceOptions = parseResourceOptions.getAll();

        return await this.invitationService.findOneById(id, resourceOptions);
    }

    @UseBefore(AuthCheck, HasRole("Admin"))
    @Put("/:id")
    public async update(@Param("id") id: number, @Body() invitation: InivtationCreateRequest) {
        return await this.invitationService.updateOneById(id, invitation);
    }

    @UseBefore(AuthCheck, HasRole("Admin"))
    @Post()
    @HttpCode(201)
    public async create(@Body() invitation: InivtationCreateRequest) {
        return await this.invitationService.create(invitation);
    }

    @UseBefore(AuthCheck, HasRole("Admin"))
    @Delete("/:id")
    @HttpCode(204)
    public async delete(@Param("id") id: number) {
        return await this.invitationService.deleteOneById(id);
    }

    @HttpCode(200)
    @Get("/verify/:code")
    public async verify(@Param("code") code: string) {
        return await this.invitationService.verify(code);
    }
}
