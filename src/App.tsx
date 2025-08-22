import React from 'react';
import { MantineProvider, Container, Title, Space, Loader, Text, Center, Anchor, Group } from '@mantine/core';
import { useGameLogic } from './hooks/useGameLogic';
import { FlagDisplay } from './components/FlagDisplay';
import { AnswerOptions } from './components/AnswerOptions';
import { ScoreBoard } from './components/ScoreBoard';
import { GameControls } from './components/GameControls';
import '@mantine/core/styles.css';

function App() {
  const { gameState, newQuestion, selectAnswer, resetGame, isLoading } = useGameLogic();

  if (isLoading) {
    return (
      <MantineProvider>
        <Container size="md" py="xl">
          <Center style={{ height: '50vh' }}>
            <div style={{ textAlign: 'center' }}>
              <Loader size="xl" />
              <Text mt="md" size="lg">Loading countries...</Text>
            </div>
          </Center>
        </Container>
      </MantineProvider>
    );
  }

  return (
    <MantineProvider>
      <Container size="md" py="xl">
        <Title order={1} ta="center" mb="xl">
          🌍 Flag Guessing Game
        </Title>
        
        <ScoreBoard 
          score={gameState.score} 
          totalQuestions={gameState.totalQuestions} 
        />
        
        <FlagDisplay 
          country={gameState.currentCountry} 
          isLoading={false}
        />
        
        <Space h="xl" />
        
        <AnswerOptions
          options={gameState.options}
          selectedAnswer={gameState.selectedAnswer}
          correctAnswer={gameState.currentCountry?.id || null}
          isAnswered={gameState.isAnswered}
          onSelectAnswer={selectAnswer}
        />
        
        <GameControls
          isAnswered={gameState.isAnswered}
          isCorrect={gameState.isCorrect}
          correctCountryName={gameState.currentCountry?.name || null}
          onNextQuestion={newQuestion}
          onResetGame={resetGame}
        />
        
        <Space h="xl" />
        
        <Group justify="center">
          <Text size="sm" c="dimmed">
            Country and flag data from{' '}
            <Anchor 
              href="https://github.com/cristiroma/countries" 
              target="_blank" 
              rel="noopener noreferrer"
              size="sm"
            >
              cristiroma/countries
            </Anchor>
          </Text>
        </Group>
      </Container>
    </MantineProvider>
  );
}

export default App;
