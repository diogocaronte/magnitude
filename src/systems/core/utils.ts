import { enterQuery, exitQuery, IWorld } from 'bitecs';
import { InitializeComponentDataProps } from './types';

export function createInitializeData({ componentRef, query, data, factory }: InitializeComponentDataProps) {
    const enter = enterQuery(query);
    const exit = exitQuery(query);

    return (world: IWorld) => {
        for (const entity of enter(world)) {
            componentRef[entity] = data.push(factory(entity)) - 1;
        }

        for (const entity of exit(world)) {
            const last = data.pop()!;
            if (componentRef[entity] === data.length) continue;

            componentRef[last.entity] = componentRef[entity];
            data[componentRef[entity]] = last;
        }
    };
}
