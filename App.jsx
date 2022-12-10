import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StoreProvider } from './store';

import {
    ChangePasswordScreen,
    CreatePostScreen,
    EditProfileScreen,
    PostDetailScreen,
    SearchResultScreen,
    SearchScreen,
    SignInScreen,
    SignUpScreen,
    MainScreen,
    HomeScreen,
} from './screens';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <StoreProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='SignIn' screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='SignIn' component={SignInScreen} options={{ tabBarButton: () => null }} />
                    <Stack.Screen name='SignUp' component={SignUpScreen} options={{ tabBarButton: () => null }} />
                    <Stack.Screen
                        name='PostDetail'
                        component={PostDetailScreen}
                        options={{ tabBarButton: () => null }}
                    />
                    <Stack.Screen name='Search' component={SearchScreen} options={{ tabBarButton: () => null }} />
                    <Stack.Screen
                        name='SearchResult'
                        component={SearchResultScreen}
                        options={{ tabBarButton: () => null }}
                    />
                    <Stack.Screen
                        name='EditProfile'
                        component={EditProfileScreen}
                        options={{ tabBarButton: () => null }}
                    />
                    <Stack.Screen
                        name='ChangePassword'
                        component={ChangePasswordScreen}
                        options={{ tabBarButton: () => null }}
                    />
                    <Stack.Screen
                        name='CreatePost'
                        component={CreatePostScreen}
                        options={{ tabBarButton: () => null }}
                    />
                    <Stack.Screen name='MainScreen' component={MainScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </StoreProvider>
    );
}
