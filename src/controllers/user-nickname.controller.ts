import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  Nickname,
} from '../models';
import {UserRepository} from '../repositories';

export class UserNicknameController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/nicknames', {
    responses: {
      '200': {
        description: 'Array of User has many Nickname',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Nickname)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Nickname>,
  ): Promise<Nickname[]> {
    return this.userRepository.nicknames(id).find(filter);
  }

  @post('/users/{id}/nicknames', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Nickname)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Nickname, {
            title: 'NewNicknameInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) nickname: Omit<Nickname, 'id'>,
  ): Promise<Nickname> {
    return this.userRepository.nicknames(id).create(nickname);
  }

  @patch('/users/{id}/nicknames', {
    responses: {
      '200': {
        description: 'User.Nickname PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Nickname, {partial: true}),
        },
      },
    })
    nickname: Partial<Nickname>,
    @param.query.object('where', getWhereSchemaFor(Nickname)) where?: Where<Nickname>,
  ): Promise<Count> {
    return this.userRepository.nicknames(id).patch(nickname, where);
  }

  @del('/users/{id}/nicknames', {
    responses: {
      '200': {
        description: 'User.Nickname DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Nickname)) where?: Where<Nickname>,
  ): Promise<Count> {
    return this.userRepository.nicknames(id).delete(where);
  }
}
