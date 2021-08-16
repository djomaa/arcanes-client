import 'reflect-metadata';
import { DisplayObject, InteractionData, Sprite, Texture } from "pixi.js";
import { Game } from "../game";
import { Position, PositionLike } from "../helpers/position.class";
import { Entity } from './abstract.entity';
import { BaseEntity } from './abstract.base-entity';
const SIZE = 256;

const KEY = 'INTERACTION';
export enum ACTION {
  MOUSE_OVER = 'mouseover',
  MOUSE_OUT = 'mouseout',
  CLICK = 'click',
}

function getMetadata<T>(key: string, target: object): T | undefined {
  return Reflect.hasMetadata(key, target) ? Reflect.getMetadata(key, target) as T : undefined;
}

interface IInteractable {
  object: DisplayObject;
  new(...args: any): any;
}
// TODO: fix extends classes
export function Interactive<T extends typeof BaseEntity>(target: T): T {
  // @ts-ignore
  return class extends target {
    constructor(...args: any[]) {
      super(args[0], args[1]);
      const map = getMetadata<IMap<this>>(KEY, target);
      // @ts-ignore
      // console.log('this.object', this.object)
      // @ts-ignore
      this.object.interactive = true;
      if (map) {
        for (const action in map) {
          const keys = map[action as ACTION];
          for (const key of keys) {
            // @ts-ignore
            this.object.on(action, this[key] as any, this);
          }
        }
      }
    }
  };
}

type IMap<T extends object> = Record<ACTION, (keyof T)[]>;
export function Interaction(action: ACTION) {
  return <TObj extends object, TKey extends keyof TObj = keyof TObj>(target: TObj, key: TKey) => {
    const map = getOrCreateMetadata({} as IMap<TObj>, KEY, target.constructor);
    if (map[action]) {
      map[action].push(key);
    } else {
      map[action] = [key];
    }
  }
}

function getOrCreateMetadata<T>(value: T, key: any, target: any): T {
  if (Reflect.hasMetadata(key, target)) {
    return Reflect.getMetadata(key, target);
  } else {
    Reflect.defineMetadata(key, value, target);
    return value;
  }
}
