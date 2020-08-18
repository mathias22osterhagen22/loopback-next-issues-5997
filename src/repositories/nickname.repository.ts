import {DefaultCrudRepository} from '@loopback/repository';
import {Nickname, NicknameRelations} from '../models';
import {DatabaseDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class NicknameRepository extends DefaultCrudRepository<
  Nickname,
  typeof Nickname.prototype.id,
  NicknameRelations
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(Nickname, dataSource);
  }
}
