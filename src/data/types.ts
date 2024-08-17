export enum DataTypeEnum {
    CIRCLE_QUADTREE,
    CIRCLE_COLLISION,
    INVENTORY,
}

export type IData = {
    type: DataTypeEnum;
    entity: number;
};
