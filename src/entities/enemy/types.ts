import { EnemyAppearenceEnum } from '@/assets/enemy/types';

export type EnemyProps = {
    x?: number;
    y?: number;
    value?: number;
    maximum?: number;
    radius?: number;
    appearence?: EnemyAppearenceEnum;
};