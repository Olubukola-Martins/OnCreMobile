import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen } from '@/features/home';
import { ComponentsScreen } from '@/features/components/ComponentsScreen';
import { makePlaceholderScreen } from './PlaceholderScreen';
import { TabBar } from './TabBar';

export type RootTabParamList = {
  Home: undefined;
  Wallet: undefined;
  Recovery: undefined;
  Credit: undefined;
  More: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const WalletScreen = makePlaceholderScreen('Wallet', 'wallet');
const RecoveryScreen = makePlaceholderScreen('Recovery', 'loader');
const CreditScreen = makePlaceholderScreen('Credit', 'store');
// "More" hosts the living component gallery for now.
const MoreScreen = ComponentsScreen;

export function RootNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Recovery" component={RecoveryScreen} />
      <Tab.Screen name="Credit" component={CreditScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
}
