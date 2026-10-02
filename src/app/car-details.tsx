import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { CarDetailsScreen } from '../screens';

export default function CarDetailsRoute() {
  const { carId } = useLocalSearchParams<{ carId?: string }>();

  return (
    <CarDetailsScreen
      carId={carId}
      onBackPress={() => {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace('/search');
        }
      }}
    />
  );
}
