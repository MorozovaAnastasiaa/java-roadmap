import { TOPICS_DATA } from '../data';

/**
 * Возвращает массив ID всех дочерних элементов для данного topicId.
 * Работает для всех уровней иерархии:
 * - category → все subtopics и их items
 * - subtopic → все items
 * - item → пустой массив (нет детей)
 */
export function getChildrenIds(topicId: string): string[] {
  const children: string[] = [];

  for (const category of TOPICS_DATA) {
    // Если это категория — добавить все subtopics и items
    if (category.id === topicId) {
      for (const subtopic of category.subtopics) {
        children.push(subtopic.id);
        if (subtopic.items) {
          for (const item of subtopic.items) {
            children.push(item.id);
          }
        }
      }
      return children;
    }

    // Ищем среди subtopics
    for (const subtopic of category.subtopics) {
      if (subtopic.id === topicId) {
        // Если это subtopic — добавить все items
        if (subtopic.items) {
          for (const item of subtopic.items) {
            children.push(item.id);
          }
        }
        return children;
      }
    }
  }

  // Если это item — детей нет
  return children;
}
