import { Service } from 'typedi';
import { UserRepository } from '@api/repositories/Users/UserRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';
// import { EventDispatcher, EventDispatcherInterface } from '@base/decorators/EventDispatcher';
import { AuthService } from '@base/infrastructure/services/auth/AuthService';
import { InvitationRepository } from '@base/api/repositories/Invitations/InvitationRepository';
import { RegisterRequest } from '@base/api/requests/Auth/RegisterRequest';
import { InvitationNotFoundException } from '@base/api/exceptions/Invitations/InvitationNotFoundException';

@Service()
export class RegisterService {
  constructor(
    @InjectRepository() private userRepository: UserRepository,
    @InjectRepository() private invitationRepository: InvitationRepository,
    // @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
    private authService: AuthService,
  ) {
    //
  }

  public async register(data: RegisterRequest) {
    let invite = await this.invitationRepository.getInvitationByCode(data.invite_code);

    if (!invite || invite.used) {
      throw new InvitationNotFoundException();
    }

    let user = await this.userRepository.createUser(data);

    user = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['role'],
    });

    // this.eventDispatcher.dispatch('onUserRegister', user);

    this.invitationRepository.update(invite.id, { used: true, user_id: user.id });

    return this.authService.sign(
      {
        userId: user.id,
        email: user.email,
        role_id: user.role_id,
        role: user.role.name,
      },
      { user: { id: user.id, email: user.email, role: user.role.name } },
    );
  }
}
