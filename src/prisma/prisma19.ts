import { prisma } from './prisma_init'

export async function find_most_popular_course() {
    // TODO: Найти курс с максимальным количеством уникальных студентов
    // Использовать агрегацию средствами Prisma (groupBy)
    // Вернуть объект курса с дополнительным полем studentCount
    const grouped = await prisma.grade.groupBy({
        by: ['courseId'],
        _count: {
            studentId: true
        }
    });
    
    if (grouped.length === 0) return null;

    let maxCourse = grouped[0];
    for (const course of grouped) {
        if (course._count.studentId > maxCourse._count.studentId) {
            maxCourse = course;
        }
    }

    const course = await prisma.course.findUnique({
        where: { 
            id: maxCourse.courseId 
        }
    });
    
    if (!course) return null;
    
    return {
        ...course,
        studentCount: maxCourse._count.studentId
    };
}