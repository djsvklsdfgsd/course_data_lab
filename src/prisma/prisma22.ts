import { prisma } from './prisma_init'

export async function find_courses_min_max_average() {
    // TODO: Найти курсы с минимальной и максимальной средней оценкой
    // Использовать обработку в TypeScript (не агрегацию Prisma)
    // Вернуть объект { min: курс, max: курс } с дополнительным полем averageGrade
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
            ...course,
            averageGrade: average
        });
    }

    if (coursesWithAverage.length === 0) {
        return { min: null, max: null };
    }

    let minCourse = coursesWithAverage[0];
    let maxCourse = coursesWithAverage[0];
    
    for (let i = 1; i < coursesWithAverage.length; i++) {
        const course = coursesWithAverage[i];
        
        if (course.averageGrade < minCourse.averageGrade) {
            minCourse = course;
        }
        
        if (course.averageGrade > maxCourse.averageGrade) {
            maxCourse = course;
        }
    }
    
    return {
        min: minCourse,
        max: maxCourse
    };
}