import { prisma } from './prisma_init'

export async function delete_students_without_person() {
    // TODO: Удалить студентов, у которых нет связанной записи в person
    // Использовать фильтрацию средствами Prisma
    // Вернуть количество удаленных записей
    const allPersons = await prisma.person.findMany({
        select: { 
            id: true 
        }
    });
    const personIds = allPersons.map(p => p.id);

    const result = await prisma.student.deleteMany({
        where: {
            personId: {
                notIn: personIds 
            }
        }
    });
    
    return result.count;
}