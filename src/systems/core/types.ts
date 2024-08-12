import { IWorld, Query, TypedArray } from 'bitecs';
import { Data } from '../../data/types';

export type InitializeComponentDataProps = {
    query: Query<IWorld>;
    componentRef: TypedArray;
    data: Data[];
    factory: (entity: number) => Data;
};
