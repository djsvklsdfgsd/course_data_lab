/* 
	РДобавьте обработку ошибок для невалидного XML.
*/

import { SAXParser } from "sax";

// Исходный код
export function parseSafely(xml: string): { success: boolean; error?: string } {
  const parser = new SAXParser(true);
  const result = { success: true, error: undefined as string | undefined };
  
  // TODO: Добавьте обработчик ошибок, который установит success = false и сохранит сообщение об ошибке
  
  parser.onerror = (error) => {
    result.success = false;
    result.error = error.message;
  };
  
  try {
    parser.write(xml).close();
  } catch (e) {
    result.success = false;
  }
  return result;
}