import { prisma } from './prisma_init'

export async function update_student_names_pattern(oldPattern: string, newPattern: string) {
    // TODO: Обновить имена студентов, заменяя oldPattern на newPattern
    // Использовать обработку в TypeScript с отдельными запросами update
    // Вернуть количество обновленных студентов
    const students = await prisma.student.findMany({
        include: { 
            person: true 
        }
    });
    
    let count = 0;
    
    for (const student of students) {
        if (student.person.name.includes(oldPattern)) {
            const newName = student.person.name.replace(oldPattern, newPattern);
            
            await prisma.person.update({
                where: { 
                    id: student.person.id 
                },
                data: { 
                    name: newName 
                }
            });
            
            count++;
        }
    }
    
    return count;
}