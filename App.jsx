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
    PostsByCategoryScreen,
    ProfileScreen,
} from './screens';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <StoreProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='SignIn' screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                        name='SignIn'
                        component={SignInScreen}
                        options={{ animation: 'slide_from_right', tabBarButton: () => null }}
                    />
                    <Stack.Screen
                        name='SignUp'
                        component={SignUpScreen}
                        options={{ animation: 'slide_from_right', tabBarButton: () => null }}
                    />
                    <Stack.Screen
                        name='PostDetail'
                        component={PostDetailScreen}
                        options={({ route }) => ({
                            animation: 'slide_from_right',
                            tabBarButton: () => null,
                            headerShown: true,
                            title: `Bài viết của ${route.params.data.NickName}`,
                        })}
                    />
                    <Stack.Screen
                        name='PostsByCategory'
                        component={PostsByCategoryScreen}
                        options={({ route }) => ({
                            animation: 'slide_from_right',
                            tabBarButton: () => null,
                            headerShown: true,
                            title: `${route.params.data.Name}`,
                        })}
                    />
                    <Stack.Screen
                        name='Profile'
                        component={ProfileScreen}
                        options={({ route }) => ({
                            animation: 'slide_from_right',
                            tabBarButton: () => null,
                            headerShown: true,
                            title: `Trang cá nhân của ${route.params.data.Name}`,
                        })}
                    />
                    <Stack.Screen
                        name='Search'
                        component={SearchScreen}
                        options={{
                            animation: 'slide_from_right',
                            headerShown: true,
                        }}
                    />
                    <Stack.Screen
                        name='SearchResult'
                        component={SearchResultScreen}
                        options={{
                            animation: 'slide_from_right',
                            tabBarButton: () => null,
                            title: 'Kết quả tìm kiếm',
                            headerShown: true,
                        }}
                    />
                    <Stack.Screen
                        name='EditProfile'
                        component={EditProfileScreen}
                        options={{ animation: 'slide_from_right', tabBarButton: () => null }}
                    />
                    <Stack.Screen
                        name='ChangePassword'
                        component={ChangePasswordScreen}
                        options={{ animation: 'slide_from_right', tabBarButton: () => null }}
                    />
                    <Stack.Screen
                        name='CreatePost'
                        component={CreatePostScreen}
                        options={{ animation: 'slide_from_right', tabBarButton: () => null }}
                    />
                    <Stack.Screen
                        name='MainScreen'
                        component={MainScreen}
                        options={{ animation: 'slide_from_right' }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </StoreProvider>
    );
}
