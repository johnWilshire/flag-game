import { useState, useEffect, useCallback, useRef } from 'react';
import { Country, GameState } from '../types';

export const useGameLogic = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [gameState, setGameState] = useState<GameState>({
    currentCountry: null,
    options: [],
    score: 0,
    totalQuestions: 0,
    isAnswered: false,
    selectedAnswer: null,
    isCorrect: null,
  });

  const countriesRef = useRef<Country[]>([]);

  // Load countries data
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const response = await fetch('/countries.json');
        const data: Country[] = await response.json();
        // Filter only enabled countries
        // const enabledCountries = data.filter(country => country.enabled);
        const enabledCountries = data;
        setCountries(enabledCountries);
        countriesRef.current = enabledCountries;
      } catch (error) {
        console.error('Failed to load countries:', error);
      }
    };

    loadCountries();
  }, []);

  // Generate random options for multiple choice
  const generateOptions = (correctCountry: Country, allCountries: Country[]) => {
    const options = [correctCountry];
    const availableCountries = allCountries.filter(c => c.id !== correctCountry.id);
    
    // Add 7 random incorrect options
    while (options.length < 8 && availableCountries.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableCountries.length);
      const randomCountry = availableCountries.splice(randomIndex, 1)[0];
      options.push(randomCountry);
    }
    
    // Shuffle the options
    return options.sort(() => Math.random() - 0.5);
  };

  // Start a new question
  const newQuestion = useCallback(() => {
    const currentCountries = countriesRef.current;
    if (currentCountries.length === 0) return;

    const randomIndex = Math.floor(Math.random() * currentCountries.length);
    const currentCountry = currentCountries[randomIndex];
    const options = generateOptions(currentCountry, [...currentCountries]);

    setGameState(prev => ({
      ...prev,
      currentCountry,
      options,
      isAnswered: false,
      selectedAnswer: null,
      isCorrect: null,
    }));
  }, []);

  // Handle answer selection
  const selectAnswer = useCallback((countryId: string) => {
    setGameState(prev => {
      if (prev.isAnswered || !prev.currentCountry) return prev;

      const isCorrect = countryId === prev.currentCountry.id;
      
      return {
        ...prev,
        isAnswered: true,
        selectedAnswer: countryId,
        isCorrect,
        score: isCorrect ? prev.score + 1 : prev.score,
        totalQuestions: prev.totalQuestions + 1,
      };
    });
  }, []);

  // Reset game
  const resetGame = useCallback(() => {
    setGameState({
      currentCountry: null,
      options: [],
      score: 0,
      totalQuestions: 0,
      isAnswered: false,
      selectedAnswer: null,
      isCorrect: null,
    });
  }, []);

  // Start first question when countries are loaded
  useEffect(() => {
    if (countries.length > 0 && !gameState.currentCountry) {
      newQuestion();
    }
  }, [countries.length, gameState.currentCountry, newQuestion]);

  return {
    gameState,
    newQuestion,
    selectAnswer,
    resetGame,
    isLoading: countries.length === 0,
  };
};
