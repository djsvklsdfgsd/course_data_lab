import { prisma } from './prisma_init'

export async function find_top_students(limit: number) {
    // TODO: Найти топ N студентов по среднему баллу
    // Учитывать только студентов, у которых есть хотя бы одна оценка
    // Вернуть массив с id студента, именем, средним баллом и количеством оценок
    // Отсортировать по убыванию среднего балла
    const students = await prisma.student.findMany({
        where: {
            grades: {
                some: {}
            }
        },
        include: {
            person: true,
            grades: true
        }
    });
    
    const studentsWithStats = students.map(student => {
        const grades = student.grades;
        const total = grades.reduce((sum, grade) => sum + grade.grade, 0);
        const average = total / grades.length;
        
        return {
            studentId: student.id,
            studentName: student.person.name,
            averageGrade: average,
            gradeCount: grades.length
        };
    });

    studentsWithStats.sort((a, b) => b.averageGrade - a.averageGrade);

    return studentsWithStats.slice(0, limit);
}