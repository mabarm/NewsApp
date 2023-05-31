import React, {useEffect, useState} from 'react';
import RNBootSplash from 'react-native-bootsplash';

import NewsList from './src/features/NewsList';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App() {
  async function fadeSplash() {
    await RNBootSplash.hide();
  }
  useEffect(() => {
    fadeSplash();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NewsList />
    </GestureHandlerRootView>
  );
}

export default App;
