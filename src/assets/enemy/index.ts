import {  EnemyAppearenceEnum, IEnemyAppearence } from './types';

export const EnemyAppearences: IEnemyAppearence[] = [];

EnemyAppearences[EnemyAppearenceEnum.WHITE] = {
    fillColor: '#FFF',
    strokeColor: '#FFF',
};

EnemyAppearences[EnemyAppearenceEnum.GREY] = {
    fillColor: '#b5b5b5',
    strokeColor: '#FFF',
};