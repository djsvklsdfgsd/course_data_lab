import type { Db } from "mongodb"

export class Course {
    title: string
    department: string
    credits: number
    constructor(title: string, department: string, credits: number) {
        this.title = title
        this.department = department
        this.credits = credits
    }
}

export async function find_courses_in_departments(db: Db, departments: string[]): Promise<Course[]> {
    // TODO: Найти все курсы, принадлежащие любому из указанных отделов
    const query = {
        department: { $in: departments } 
    }
    
    const courses = await db.collection("courses").find(query).toArray()
    
    return courses.map(course => new Course(course.title, course.department, course.credits))
}