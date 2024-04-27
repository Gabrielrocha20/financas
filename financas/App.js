import 'react-native-reanimated'
import 'react-native-gesture-handler';
import Home from './src/pages/Home'
import LoginScreen from './src/pages/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MeiosPagamento from './src/pages/MeiosPagamento';
import Movimentos from './src/pages/Movimentos';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="MeiosPagamento" component={MeiosPagamento} options={{ headerShown: false }}/>
        <Stack.Screen name="Movimentos" component={Movimentos} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
