
export type BoxType = 'question' | 'bonus' | 'zonk';

export interface Question {
  id: number;
  type: BoxType;
  title: string;
  description: string;
  answer?: number | string;
  points: number;
  hint?: string;
}

export interface GameState {
  score: number;
  openedBoxes: number[];
  currentQuestion: Question | null;
  isGameOver: boolean;
  totalBoxes: number;
}
