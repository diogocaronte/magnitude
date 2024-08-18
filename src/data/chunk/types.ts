import { IData } from '../types';

export type CreateChunkDataProps = {
    entity: number;
    invalidator: number;
};

export type IChunkData = IData & {
    invalidator: number;
};
