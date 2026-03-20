export interface Category {
  id: string;
  name: string;
  order: number;
  topics: Topic[];
}

export interface Subtopic {
  id: string;
  name: string;
  topicId: string;
}

export interface Topic {
  id: string;
  name: string;
  categoryId: string;
  subtopics?: Subtopic[];
  questionCount?: number;
}
