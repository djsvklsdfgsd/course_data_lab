import { prisma } from './prisma_init'

export interface CourseWithStudentCount {
    id: number
    title: string
    description: string | null
    studentCount: number
}

export async function find_courses_with_student_count(): Promise<CourseWithStudentCount[]> {
    // TODO: Найти все курсы с количеством уникальных студентов, имеющих оценки по этому курсу
    // Вернуть массив курсов с дополнительным полем studentCount
        const courses = await prisma.course.findMany({
        include: {
            grades: {
                select: {
                    studentId: true
                },
                distinct: ['studentId'] 
            }
        }
    });
    
    return courses.map(course => ({
        id: course.id,
        title: course.title,
        description: course.description,
        studentCount: course.grades.length 
    }));
}
