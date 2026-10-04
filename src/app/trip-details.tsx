import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { TripDetailsScreen } from '../screens';

export default function TripDetailsRoute() {
  const { carId } = useLocalSearchParams<{ carId?: string }>();

  return (
    <TripDetailsScreen
      carId={carId}
      onBackPress={() => {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace({ pathname: '/car-details', params: carId ? { carId } : {} });
        }
      }}
    />
  );
}
