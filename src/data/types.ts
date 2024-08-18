export enum DataTypeEnum {
    CIRCLE_QUADTREE,
    CIRCLE_COLLISION,
    INVENTORY,
    CHUNK,
}

export type IData = {
    type: DataTypeEnum;
    entity: number;
};
