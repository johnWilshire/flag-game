import React from 'react';
import { Image, Box, Loader, Text } from '@mantine/core';
import { Country } from '../types';

interface FlagDisplayProps {
  country: Country | null;
  isLoading?: boolean;
}

export const FlagDisplay: React.FC<FlagDisplayProps> = ({ country, isLoading }) => {
  if (isLoading || !country) {
    return (
      <Box style={{ textAlign: 'center', padding: '40px' }}>
        <Loader size="lg" />
        <Text mt="md">Loading flag...</Text>
      </Box>
    );
  }

  const flagUrl = `/flags/SVG/${country.code2l}.svg`;

  return (
    <Box style={{ textAlign: 'center', padding: '20px' }}>
      <Image
        src={flagUrl}
        alt={`Flag of ${country.name}`}
        width={200}
        height={150}
        fit="contain"
        style={{
          border: '2px solid #e9ecef',
          borderRadius: '8px',
          margin: '0 auto',
        }}
        fallbackSrc="/flags/SVG/UN.svg"
      />
    </Box>
  );
};
