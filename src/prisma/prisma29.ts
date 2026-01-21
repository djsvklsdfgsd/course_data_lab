import { prisma } from './prisma_init'

export async function find_students_with_same_names() {
    // TODO: Найти студентов с одинаковыми именами
    // Использовать обработку в TypeScript
    // Вернуть массив групп студентов с одинаковыми именами
    const allStudents = await prisma.student.findMany({
        include: {
            person: true
        }
    });

    const nameGroups: { [key: string]: any[] } = {};
    
    for (const student of allStudents) {
        const name = student.person.name;
        
        if (!nameGroups[name]) {
            nameGroups[name] = [];
        }
        
        nameGroups[name].push(student);
    }

    const result = [];
    
    for (const name in nameGroups) {
      if (nameGroups[name].length > 1) {
            result.push({
                name: name,
                students: nameGroups[name]
            });
        }
    }
    
    return result;
}