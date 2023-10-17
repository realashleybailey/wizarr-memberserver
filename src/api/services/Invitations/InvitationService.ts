import { Service } from 'typedi';
import { EventDispatcher, EventDispatcherInterface } from '@base/decorators/EventDispatcher';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { InvitationRepository } from '@base/api/repositories/Invitations/InvitationRepository';
import { InvitationNotFoundException } from '@base/api/exceptions/Invitations/InvitationNotFoundException';

@Service()
export class InvitationService {
  constructor(@InjectRepository() private invitationRepository: InvitationRepository) {
    //
  }

  public async getAll(resourceOptions?: object) {
    return await this.invitationRepository.getManyAndCount(resourceOptions);
  }

  public async findOneById(id: number, resourceOptions?: object) {
    return await this.getRequestedInvitationOrFail(id, resourceOptions);
  }

  public async create(data: object) {
    let invitation = await this.invitationRepository.createInvitation(data);
    return invitation;
  }

  public async updateOneById(id: number, data: object) {
    const invitation = await this.getRequestedInvitationOrFail(id);

    return await this.invitationRepository.updateInvitation(invitation, data);
  }

  public async deleteOneById(id: number) {
    return await this.invitationRepository.delete(id);
  }

  private async getRequestedInvitationOrFail(id: number, resourceOptions?: object) {
    let invitation = await this.invitationRepository.getOneById(id, resourceOptions);

    if (!invitation) {
      throw new InvitationNotFoundException();
    }

    return invitation;
  }
}
