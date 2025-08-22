import React from 'react';
import { Button, SimpleGrid } from '@mantine/core';
import { Country } from '../types';

interface AnswerOptionsProps {
  options: Country[];
  selectedAnswer: string | null;
  correctAnswer: string | null;
  isAnswered: boolean;
  onSelectAnswer: (countryId: string) => void;
}

export const AnswerOptions: React.FC<AnswerOptionsProps> = ({
  options,
  selectedAnswer,
  correctAnswer,
  isAnswered,
  onSelectAnswer,
}) => {
  const getButtonColor = (option: Country) => {
    if (!isAnswered) return 'blue';
    
    if (option.id === correctAnswer) return 'green';
    if (option.id === selectedAnswer && option.id !== correctAnswer) return 'red';
    return 'gray';
  };

  const getButtonVariant = (option: Country) => {
    if (!isAnswered) return 'outline';
    
    if (option.id === correctAnswer) return 'filled';
    if (option.id === selectedAnswer && option.id !== correctAnswer) return 'filled';
    return 'outline';
  };

  return (
    <SimpleGrid 
      cols={{ base: 1, sm: 2 }} 
      spacing="md" 
      style={{ maxWidth: 800, margin: '0 auto' }}
    >
      {options.map((option) => (
        <Button
          key={option.id}
          size="lg"
          color={getButtonColor(option)}
          variant={getButtonVariant(option)}
          onClick={() => onSelectAnswer(option.id)}
          disabled={isAnswered}
          style={{
            textAlign: 'left',
            justifyContent: 'flex-start',
            height: 'auto',
            padding: '12px 20px',
            minHeight: '48px',
          }}
        >
          {option.name}
        </Button>
      ))}
    </SimpleGrid>
  );
};
