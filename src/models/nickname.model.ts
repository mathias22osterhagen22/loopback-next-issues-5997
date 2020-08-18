import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_nickname_user: {
        name: 'fk_nickname_user',
        entity: 'User',
        entityKey: 'id',
        foreignKey: 'userId',
      },
    },
  },
})
export class Nickname extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  pseudo: string;

  @property({
    type: 'date',
    required: true,
  })
  created: string;

  @property({
    type: 'number',
  })
  userId?: number;

  constructor(data?: Partial<Nickname>) {
    super(data);
  }
}

export interface NicknameRelations {
  // describe navigational properties here
}

export type NicknameWithRelations = Nickname & NicknameRelations;
