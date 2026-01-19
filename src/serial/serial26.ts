/* 
	Доработайте код для сбора всех ID книг в массив.
	Пример XML в файле saxXML.ts
*/

import { SAXParser } from "sax";

// Исходный код
export function collectBookIds(xml: string): string[] {
  const parser = new SAXParser(true);
  const ids: string[] = [];
  
  // TODO: При открытии тега 'book' добавляйте значение атрибута 'id' в массив ids
  
  parser.onopentag = (node) => {
    if (node.name === 'book' && node.attributes.id) {
      ids.push(node.attributes.id.toString());
    }
  };
  
  parser.write(xml).close();
  return ids;
}
