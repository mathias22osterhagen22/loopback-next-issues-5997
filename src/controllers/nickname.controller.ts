import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Nickname} from '../models';
import {NicknameRepository} from '../repositories';

export class NicknameController {
  constructor(
    @repository(NicknameRepository)
    public nicknameRepository : NicknameRepository,
  ) {}

  @post('/nicknames', {
    responses: {
      '200': {
        description: 'Nickname model instance',
        content: {'application/json': {schema: getModelSchemaRef(Nickname)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Nickname, {
            title: 'NewNickname',
            exclude: ['id'],
          }),
        },
      },
    })
    nickname: Omit<Nickname, 'id'>,
  ): Promise<Nickname> {
    return this.nicknameRepository.create(nickname);
  }

  @get('/nicknames/count', {
    responses: {
      '200': {
        description: 'Nickname model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Nickname) where?: Where<Nickname>,
  ): Promise<Count> {
    return this.nicknameRepository.count(where);
  }

  @get('/nicknames', {
    responses: {
      '200': {
        description: 'Array of Nickname model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Nickname, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Nickname) filter?: Filter<Nickname>,
  ): Promise<Nickname[]> {
    return this.nicknameRepository.find(filter);
  }

  @patch('/nicknames', {
    responses: {
      '200': {
        description: 'Nickname PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Nickname, {partial: true}),
        },
      },
    })
    nickname: Nickname,
    @param.where(Nickname) where?: Where<Nickname>,
  ): Promise<Count> {
    return this.nicknameRepository.updateAll(nickname, where);
  }

  @get('/nicknames/{id}', {
    responses: {
      '200': {
        description: 'Nickname model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Nickname, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Nickname, {exclude: 'where'}) filter?: FilterExcludingWhere<Nickname>
  ): Promise<Nickname> {
    return this.nicknameRepository.findById(id, filter);
  }

  @patch('/nicknames/{id}', {
    responses: {
      '204': {
        description: 'Nickname PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Nickname, {partial: true}),
        },
      },
    })
    nickname: Nickname,
  ): Promise<void> {
    await this.nicknameRepository.updateById(id, nickname);
  }

  @put('/nicknames/{id}', {
    responses: {
      '204': {
        description: 'Nickname PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() nickname: Nickname,
  ): Promise<void> {
    await this.nicknameRepository.replaceById(id, nickname);
  }

  @del('/nicknames/{id}', {
    responses: {
      '204': {
        description: 'Nickname DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.nicknameRepository.deleteById(id);
  }
}
