import { IData } from '../types';

export type CreateEnemyCollisionProps = {
    entity: number;
    hit?: boolean;
};

export type IEnemyCollisionData = IData & {
    hit: boolean;
};
