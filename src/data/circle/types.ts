import { Data } from '../types';

export type CreateCircleCollisionProps = {
    entity: number;
    check?: boolean;
};

export type CircleCollisionData = Data & {
    check: boolean;
};
