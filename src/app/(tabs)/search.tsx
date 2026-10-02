import React from 'react';
import { router } from 'expo-router';
import { SearchScreen } from '../../screens';
import { useAuth } from '../../context/AuthContext';

export default function SearchRoute() {
  const { user } = useAuth();

  return (
    <SearchScreen
      userName={user?.name ?? 'User Name'}
      onSelectCar={(carId: string) => {
        router.push({ pathname: '/car-details', params: { carId } });
      }}
    />
  );
}
