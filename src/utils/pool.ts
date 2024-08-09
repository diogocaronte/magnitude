import { ConstructorOf } from './types';

export class Pool<T> {
    template: ConstructorOf<T>;
    items: T[] = [];

    constructor(template: ConstructorOf<T>) {
        this.template = template;
    }

    create() {
        const instance = this.items.pop() ?? new this.template();
        return instance as T;
    }

    release(instance: T) {
        this.items.push(instance);
    }
}
