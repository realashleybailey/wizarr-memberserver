import { UnauthorizedError } from 'routing-controllers';

export class InvitationNotFoundException extends UnauthorizedError {
  constructor() {
    super('Invitation not found!');
  }
}
