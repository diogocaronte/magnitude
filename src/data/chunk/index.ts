import { DataTypeEnum } from '../types';
import { CreateChunkDataProps, IChunkData } from './types';

export const ChunkData: IChunkData[] = [];

export function createChunkData({ entity, invalidator }: CreateChunkDataProps): IChunkData {
    return {
        type: DataTypeEnum.CHUNK,
        entity,
        invalidator,
    };
}
