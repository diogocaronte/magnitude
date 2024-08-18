import { IData } from '@/data/types';
import { IWorld, Query, TypedArray } from 'bitecs';

export type InitializeComponentDataProps = {
    query: Query<IWorld>;
    componentRef: TypedArray;
    data: IData[];
    factory: (entity: number) => IData;
};