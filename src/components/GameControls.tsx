import React from 'react';
import { Button, Group, Text } from '@mantine/core';

interface GameControlsProps {
  isAnswered: boolean;
  isCorrect: boolean | null;
  correctCountryName: string | null;
  onNextQuestion: () => void;
  onResetGame: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({
  isAnswered,
  isCorrect,
  correctCountryName,
  onNextQuestion,
  onResetGame,
}) => {
  if (!isAnswered) return null;

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <Text size="lg" fw={600} mb="md" c={isCorrect ? 'green' : 'red'}>
        {isCorrect ? '🎉 Correct!' : `❌ Wrong! It was ${correctCountryName}`}
      </Text>
      
      <Group justify="center" gap="md">
        <Button
          size="lg"
          onClick={onNextQuestion}
          color="blue"
        >
          Next Flag
        </Button>
        
        <Button
          size="lg"
          variant="outline"
          onClick={onResetGame}
          color="gray"
        >
          Reset Game
        </Button>
      </Group>
    </div>
  );
};
