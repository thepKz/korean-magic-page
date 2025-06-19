export type GrammarLevel = 'beginner' | 'intermediate' | 'advanced';

export interface GrammarPoint {
  id: string;
  korean: string;
  english: string;
  structure: string;
  examples: {
    korean: string;
    english: string;
    romanization: string;
  }[];
  usage: string;
  level: GrammarLevel;
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