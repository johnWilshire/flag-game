import React from 'react';
import { Paper, Text, Group, Badge, Progress } from '@mantine/core';

interface ScoreBoardProps {
  score: number;
  totalQuestions: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, totalQuestions }) => {
  const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
  
  const getScoreColor = () => {
    if (percentage >= 80) return 'green';
    if (percentage >= 60) return 'yellow';
    return 'red';
  };

  return (
    <Paper shadow="sm" p="md" radius="md" style={{ marginBottom: '20px' }}>
      <Group justify="space-between" align="center">
        <Text size="lg" fw={600}>
          Flag Guessing Game
        </Text>
        <Group gap="md">
          <Badge color={getScoreColor()} size="lg">
            {score} / {totalQuestions}
          </Badge>
          {totalQuestions > 0 && (
            <Text size="sm" c="dimmed">
              {percentage.toFixed(1)}%
            </Text>
          )}
        </Group>
      </Group>
      
      {totalQuestions > 0 && (
        <Progress 
          value={percentage} 
          color={getScoreColor()} 
          size="sm" 
          mt="sm"
          radius="xl"
        />
      )}
    </Paper>
  );
};
