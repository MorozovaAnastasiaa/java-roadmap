export interface Category {
  id: string;
  name: string;
  order: number;
  topics: Topic[];
}

export interface Topic {
  id: string;
  name: string;
  categoryId: string;
  questionCount?: number;
}
