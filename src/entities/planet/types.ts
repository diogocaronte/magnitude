import { PlanetAppearenceEnum } from '@/assets/planet/types';

export type PlanetProps = {
    x?: number;
    y?: number;
    angle?: number;
    radius?: number;
    appearence?: PlanetAppearenceEnum;
};
