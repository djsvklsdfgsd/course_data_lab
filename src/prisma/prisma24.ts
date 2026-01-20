import { prisma } from './prisma_init'

export async function find_students_with_all_courses() {
    // TODO: Найти студентов, у которых есть оценки по всем существующим курсам
    // Использовать обработку в TypeScript
    // Вернуть массив студентов с информацией о person
    const allCourses = await prisma.course.findMany({
        select: { 
            id: true 
        }
    });
    const allCourseIds = allCourses.map(c => c.id);
    if (allCourseIds.length === 0) {
        return [];
    }

    const allStudents = await prisma.student.findMany({
        include: {
            person: true,
            grades: {
                select: {
                    courseId: true
                }
            }
        }
    });

    const result = [];
    
    for (const student of allStudents) {
        const studentCourseIds = new Set();
        for (const grade of student.grades) {
            studentCourseIds.add(grade.courseId);
        }

        let hasAllCourses = true;
        for (const courseId of allCourseIds) {
            if (!studentCourseIds.has(courseId)) {
                hasAllCourses = false;
                break;
            }
        }

        if (hasAllCourses) {
            result.push({
                ...student,
                person: student.person
            });
        }
    }
    
    return result;
}