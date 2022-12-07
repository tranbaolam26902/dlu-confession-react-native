import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StoreProvider } from './store';
import {
    ChangePasswordScreen,
    CreatePostScreen,
    EditProfileScreen,
    HomeScreen,
    NotificationScreen,
    PopularScreen,
    PostDetailScreen,
    ProfileScreen,
    SearchResultScreen,
    SearchScreen,
    SelectCategoryScreen,
    SignInScreen,
    SignUpScreen,
} from './screens';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <StoreProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='SignIn' component={SignInScreen} options={{ animation: 'slide_from_right' }} />
                    <Stack.Screen name='SignUp' component={SignUpScreen} options={{ animation: 'slide_from_right' }} />
                    <Stack.Screen name='Home' component={HomeScreen} options={{ animation: 'slide_from_right' }} />
                    <Stack.Screen
                        name='SelectCategory'
                        component={SelectCategoryScreen}
                        options={{ animation: 'slide_from_right' }}
                    />
                    <Stack.Screen
                        name='Popular'
                        component={PopularScreen}
                        options={{ animation: 'slide_from_right' }}
                    />
                    <Stack.Screen
                        name='Notification'
                        component={NotificationScreen}
                        options={{ animation: 'slide_from_right' }}
                    />
                    <Stack.Screen
                        name='Profile'
                        component={ProfileScreen}
                        options={{ animation: 'slide_from_right' }}
                    />
                    <Stack.Screen
                        name='CreatePost'
                        component={CreatePostScreen}
                        options={{ animation: 'slide_from_right' }}
                    />
                    <Stack.Screen
                        name='PostDetail'
                        component={PostDetailScreen}
                        options={{ animation: 'slide_from_right' }}
                    />
                    <Stack.Screen name='Search' component={SearchScreen} options={{ animation: 'slide_from_right' }} />
                    <Stack.Screen
                        name='SearchResult'
                        component={SearchResultScreen}
                        options={{ animation: 'slide_from_right' }}
                    />
                    <Stack.Screen
                        name='EditProfile'
                        component={EditProfileScreen}
                        options={{ animation: 'slide_from_right' }}
                    />
                    <Stack.Screen
                        name='ChangePassword'
                        component={ChangePasswordScreen}
                        options={{ animation: 'slide_from_right' }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </StoreProvider>
    );
}
