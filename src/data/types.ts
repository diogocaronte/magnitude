export enum DataTypeEnum {
    CIRCLE_COLLISION,
    INVENTORY,
}

export type Data = {
    type: DataTypeEnum;
    entity: number;
};
