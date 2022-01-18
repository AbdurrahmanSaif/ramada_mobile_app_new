import AsyncStorage from '@react-native-async-storage/async-storage';

export function setToken(key, data) {
  try {
    AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    return null;
  }
}

export async function getToken(key) {
  try {
    const data = await AsyncStorage.getItem(key);

    if (data) {
      return JSON.parse(data);
    }

    return null;
  } catch (error) {
    return null;
  }
}

export function removeToken(key) {
  try {
    AsyncStorage.removeItem(key);
  } catch (error) {
    return null;
  }
}
