import { IWorld, Query, TypedArray } from 'bitecs';
import { IData } from '../../data/types';

export type InitializeComponentDataProps = {
    query: Query<IWorld>;
    componentRef: TypedArray;
    data: IData[];
    factory: (entity: number) => IData;
};
