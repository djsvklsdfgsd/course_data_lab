import { prisma } from './prisma_init'

export async function find_top_courses(limit: number) {
    // TODO: Найти топ N курсов по средней оценке
    // Для каждого курса вычислить среднюю оценку из всех его оценок
    // Вернуть массив с id курса, названием и средней оценкой
    // Отсортировать по убыванию средней оценки
    // Использовать вычисление средней оценки в TypeScript коде (не через агрегацию Prisma)
    const courses = await prisma.course.findMany({
        include: {
            grades: true
        }
    });

    const coursesWithAverage = [];
    
    for (const course of courses) {
        if (course.grades.length === 0) {
            continue;
        }
        
        let total = 0;
        for (const grade of course.grades) {
            total += grade.grade;
        }

        const average = total / course.grades.length;
        
        coursesWithAverage.push({
            id: course.id,
            title: course.title,
            averageGrade: average
        });
    }

    coursesWithAverage.sort((a, b) => b.averageGrade - a.averageGrade);

    return coursesWithAverage.slice(0, limit);
}