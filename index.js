import { AppRegistry } from 'react-native';
import App from './App';  // Import App component
import { name as appName } from './app.json';  // Import appName from app.json
AppRegistry.registerComponent(appName, () => App);  // Register the App component
