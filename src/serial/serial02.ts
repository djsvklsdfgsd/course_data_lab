/* 
	Модифицируйте класс Team, чтобы массив members корректно восстанавливался как массив объектов User.
*/

import "reflect-metadata";
import { User } from "./user";
import { Type } from "class-transformer";

export class Team {
  name: string;
    
  @Type(() => User)
  members: User[]; // Требует декоратора
  
  constructor(name: string, members: User[]) {
	this.name = name;
	this.members = members;
  }
  
  listMembers() { return this.members.map(m => m.getFullName()).join(', '); }
}
