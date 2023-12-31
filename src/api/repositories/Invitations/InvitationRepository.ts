import { EntityRepository } from 'typeorm';
import { Invitation } from '@api/models/Invitations/Invitation';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';

@EntityRepository(Invitation)
export class InvitationRepository extends RepositoryBase<Invitation> {
  public async getInvitationByCode(code: string) {
    return await this.findOne({ code });
  }
  public async createInvitation(data: object) {
    let invitation = this.create(data);

    return await this.save(invitation);
  }
  public async updateInvitation(invitation: Invitation, data: object) {
    console.log(invitation);
  }
}
