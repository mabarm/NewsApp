import AsyncStorage from '@react-native-async-storage/async-storage';
const storeNewsData = async data => {
  try {
    const serializedData = JSON.stringify(data);
    await AsyncStorage.setItem('newsData', serializedData);
  } catch (error) {}
};

export {storeNewsData};
