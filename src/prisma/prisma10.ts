import { prisma } from './prisma_init'

export async function get_course_average_grade(courseTitle: string): Promise<number | null> {
    // TODO: Найти среднюю оценку по указанному курсу
    // Вернуть среднее значение или null если курс не найден или нет оценок
    const course = await prisma.course.findFirst({
        where: {
            title: courseTitle
        }
    });
    
    if (!course) {
        return null;
    }

    const grades = await prisma.grade.findMany({
        where: {
            courseId: course.id
        },
        select: {
            grade: true
        }
    });
    
    if (grades.length === 0) {
        return null;
    }
    
    const total = grades.reduce((sum, g) => sum + g.grade, 0);
    const average = total / grades.length;
    
    return average;
}