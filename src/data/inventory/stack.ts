import { Items } from '../../assets/item';
import { InvalidAmount } from './errors';
import { CreateStackDataProps, StackData } from './types';

export function createStackData({ item }: CreateStackDataProps): StackData {
    return {
        item,
        amount: 0,
    };
}

export function getAvailableInStack(stack: StackData) {
    return Items[stack.item].maxStack - stack.amount;
}

export function addStackAmount(stack: StackData, amount: number) {
    if (amount < 0) throw new InvalidAmount(amount);

    const available = getAvailableInStack(stack);
    const add = Math.min(available, amount);
    stack.amount += add;

    return amount - add;
}

export function removeStackAmount(stack: StackData, amount: number) {
    if (amount < 0) throw new InvalidAmount(amount);

    const available = stack.amount;
    const remove = Math.min(available, amount);
    stack.amount -= remove;

    return amount - remove;
}
