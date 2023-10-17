import { Factory, Seeder } from 'typeorm-seeding';

import { Connection } from 'typeorm/connection/Connection';
import { User } from '@api/models/Users/User';
import { appConfig } from '@base/config/app';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // Create default admin user
    await factory(User)().create({
      first_name: 'Ashley',
      last_name: 'Bailey',
      email: 'admin@wizarr.dev',
      password: appConfig.defaultPassword,
      role_id: 1,
    });
  }
}
