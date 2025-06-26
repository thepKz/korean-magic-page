export type GrammarLevel = 'beginner' | 'intermediate' | 'advanced';

export interface GrammarExample {
  korean: string;
  english: string;
  vietnamese: string;
  romanization: string;
}

export interface GrammarPoint {
  _id: string;
  id: string;
  korean: string;
  english: string;
  vietnamese: string;
  structure: string;
  examples: GrammarExample[];
  usage: string;
  usageVi?: string;
  level: GrammarLevel;
  topikLevel: number;
  category: string;
  difficulty: number;
  tags: string[];
  explanation: string;
  explanationVi?: string;
}

export interface Room {
  id: string;
  name: {
    korean: string;
    english: string;
  };
  description: {
    korean: string;
    english: string;
  };
  grammarPoints: GrammarPoint[];
  color: string;
  icon: string;
}