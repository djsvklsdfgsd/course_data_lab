import { prisma } from './prisma_init'

export async function find_students_with_most_courses() {
    // TODO: Найти студентов с максимальным количеством уникальных курсов
    // Использовать обработку данных в TypeScript (не агрегацию Prisma)
    // Вернуть массив студентов с информацией о person и количеством курсов
    const students = await prisma.student.findMany({
        include: {
            person: true,
            grades: {
                select: { courseId: true }
            }
        }
    });

    const studentsWithCounts = students.map(student => {
        const uniqueCourses = new Set(student.grades.map(g => g.courseId));
        return {
            ...student,
            courseCount: uniqueCourses.size
        };
    });

    const maxCount = Math.max(...studentsWithCounts.map(s => s.courseCount));

    return studentsWithCounts.filter(student => 
        student.courseCount === maxCount && student.courseCount > 0
    );
}