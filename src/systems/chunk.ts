import { Chunk } from '@/components/chunk';
import { Position } from '@/components/position';
import { ChunkData, createChunkData } from '@/data/chunk';
import { createChunk } from '@/entities/chunk';
import { GeneratesChunk } from '@/tags/generates-chunk';
import { defineQuery, exitQuery, IWorld, removeEntity } from 'bitecs';

export const chunkSize = 1000;

export function createChunkSystem(world: IWorld) {
    const generates = defineQuery([Position, GeneratesChunk]);

    const chunks = defineQuery([Position, Chunk]);
    const exitChunk = exitQuery(chunks);

    // TODO: move it to outside
    const chunksMap = new Map();

    function positionToChunk(x: number, y: number) {
        return {
            x: Math.floor(x / chunkSize),
            y: Math.floor(y / chunkSize),
        };
    }

    function chunkToPosition(x: number, y: number) {
        return {
            x: x * chunkSize,
            y: y * chunkSize,
        };
    }

    function hashChunkPosition(x: number, y: number) {
        return `${x}-${y}`;
    }

    let invalidator = 0;

    return () => {
        invalidator = (invalidator + 1) % 2;

        for (const entity of generates(world)) {
            const { x, y } = positionToChunk(Position.x[entity], Position.y[entity]);
            const id = hashChunkPosition(x, y);
            if (chunksMap.has(id)) {
                ChunkData[Chunk.index[entity]].invalidator = invalidator;
                continue;
            }

            const chunk = createChunk(world, chunkToPosition(x, y));
            const chunkData = createChunkData({ entity: chunk, invalidator });
            chunksMap.set(id, chunkData);
            Chunk.index[chunk] = ChunkData.push(chunkData) - 1;
        }

        for (const chunk of chunks(world)) {
            if (ChunkData[Chunk.index[chunk]].invalidator === invalidator) continue;

            removeEntity(world, chunk);
        }

        for (const chunk of exitChunk(world)) {
            const { x, y } = positionToChunk(Position.x[chunk], Position.y[chunk]);
            const id = hashChunkPosition(x, y);
            chunksMap.delete(id);

            const last = ChunkData.pop()!;
            if (Chunk.index[chunk] === ChunkData.length) continue;

            Chunk.index[last.entity] = Chunk.index[chunk];
            ChunkData[Chunk.index[chunk]] = last;
        }
    };
}
