export interface Country {
  id: string;
  enabled: boolean;
  code3l: string;
  code2l: string;
  name: string;
  name_official: string;
  center: {
    latitude: string;
    longitude: string;
    zoom: string;
  };
  names: {
    [key: string]: {
      name: string;
      name_official: string;
    };
  };
}

export interface GameState {
  currentCountry: Country | null;
  options: Country[];
  score: number;
  totalQuestions: number;
  isAnswered: boolean;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
}
