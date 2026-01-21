import { prisma } from './prisma_init'

export async function find_student_progress_by_semester() {
    // TODO: Найти прогресс студентов по семестрам (группировка по месяцу создания оценок)
    // Использовать обработку в TypeScript
    // Вернуть массив с прогрессом по студентам и месяцам
    const students = await prisma.student.findMany({
        include: {
            person: true,
            grades: true
        }
    });
    
    const result = [];
    
    for (const student of students) {
        const months: { [key: string]: { sum: number, count: number } } = {};
        
        for (const grade of student.grades) {
            const month = grade.createdAt.toISOString().slice(0, 7);
            
            if (!months[month]) {
                months[month] = { sum: 0, count: 0 };
            }
            
            months[month].sum += grade.grade;
            months[month].count++;
        }

        const progress = [];
        for (const month in months) {
            progress.push({
                month: month,
                averageGrade: months[month].sum / months[month].count,
                gradeCount: months[month].count
            });
        }
        
        result.push({
            studentId: student.id,
            studentName: student.person.name,
            progress: progress
        });
    }
    
    return result;
}