import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {User, UserRelations, Nickname} from '../models';
import {DatabaseDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {NicknameRepository} from './nickname.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly nicknames: HasManyRepositoryFactory<Nickname, typeof User.prototype.id>;

  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource, @repository.getter('NicknameRepository') protected nicknameRepositoryGetter: Getter<NicknameRepository>,
  ) {
    super(User, dataSource);
    this.nicknames = this.createHasManyRepositoryFactoryFor('nicknames', nicknameRepositoryGetter,);
    this.registerInclusionResolver('nicknames', this.nicknames.inclusionResolver);
  }
}
