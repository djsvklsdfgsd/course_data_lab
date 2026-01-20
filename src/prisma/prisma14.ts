import { prisma } from './prisma_init'

export async function find_students_above_course_average(courseTitle: string) {
    // TODO: Найти студентов, у которых есть оценки по указанному курсу выше среднего балла по этому курсу
    // Вернуть массив студентов с информацией о person и их оценкой
    // Использовать два отдельных запроса: первый для нахождения среднего балла, второй для поиска студентов
    const course = await prisma.course.findFirst({
        where: { 
            title: courseTitle 
        }
    });
    if (!course) return [];

    const grades = await prisma.grade.findMany({
        where: { 
            courseId: course.id 
        }
    });
    if (grades.length === 0) return [];

    const avg = grades.reduce((sum, g) => sum + g.grade, 0) / grades.length;

    const students = await prisma.student.findMany({
        where: {
            grades: {
                some: {
                    courseId: course.id,
                    grade: { 
                        gt: avg 
                    }
                }
            }
        },
        include: {
            person: true,
            grades: {
                where: {
                    courseId: course.id,
                    grade: { 
                        gt: avg 
                    }
                },
                select: {
                    grade: true
                }
            }
        }
    });

    return students.map(student => ({
        ...student,
        grade: student.grades[0]?.grade  
    }));
}