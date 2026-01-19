/* 	
	Обеспечьте сериализацию и десериализацию объектов классов Circle, Rectangle и Drawing
*/

import "reflect-metadata";
import { Type, Transform } from "class-transformer";

export abstract class Shape {
  abstract area(): number;
}

export class Circle extends Shape {
  radius: number;
  constructor(radius: number) {
    super();
    this.radius = radius;
  }
  area() {
    return Math.PI * this.radius * this.radius;
  }
}

export class Rectangle extends Shape {
  width: number;
  height: number;
  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
  }
  area() {
    return this.width * this.height;
  }
}

export class Drawing {
  name: string;

  @Transform(({ value }) => {
    if (!value || !Array.isArray(value)) return [];
    
    return value.map((item: any) => {
      if (item.radius !== undefined) {
        return Object.assign(new Circle(0), item);
      } else if (item.width !== undefined && item.height !== undefined) {
        return Object.assign(new Rectangle(0, 0), item);
      }
      return item;
    });
  }, { toClassOnly: true })
  @Type(() => Shape)
  shapes: Shape[];
  
  constructor(name: string, shapes: Shape[]) {
    this.name = name;
    this.shapes = shapes;
  }
}