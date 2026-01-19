/* 	Напишите функцию findMostPopularTag, которая находит самый часто встречающийся тег в массиве постов и количество его повторений. Функция не должна использовать циклы.
*/

type Post = { tags: string[] };

export function findMostPopularTag(posts: Post[]): Record<string, number> {
    const allTags = posts.flatMap(post => post.tags);
    const counts: Record<string, number> = {};
    
    allTags.forEach(tag => {
        if (!counts.hasOwnProperty(tag)) {
            counts[tag] = 1;
        } else {
            counts[tag] = counts[tag] + 1;
        }
    });

    const tags = Object.keys(counts);
    let bestTag = tags[0] || "";
    let bestCount = counts[bestTag] || 0;
    
    tags.forEach(tag => {
        if (counts[tag] > bestCount) {
            bestTag = tag;
            bestCount = counts[tag];
        }
    });
    
    return counts;
}