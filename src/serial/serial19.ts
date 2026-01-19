/* 
	Найти все кнопки (<button>) с классом primary.
*/

import { select } from 'xpath';

export function findPrimaryButtons(doc: Document): Node[] {
  const query = "//button[contains(concat(' ', @class, ' '), ' primary ')]"; // Тут нужно написать XPath запрос
  return select(query, doc) as Node[];
}
