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
                <Stack.Navigator>
                    <Stack.Screen name='SignIn' component={SignInScreen} />
                    <Stack.Screen name='SignUp' component={SignUpScreen} />
                    <Stack.Screen name='Home' component={HomeScreen} />
                    <Stack.Screen name='SelectCategory' component={SelectCategoryScreen} />
                    <Stack.Screen name='Popular' component={PopularScreen} />
                    <Stack.Screen name='Notification' component={NotificationScreen} />
                    <Stack.Screen name='Profile' component={ProfileScreen} />
                    <Stack.Screen name='CreatePost' component={CreatePostScreen} />
                    <Stack.Screen name='PostDetail' component={PostDetailScreen} />
                    <Stack.Screen name='Search' component={SearchScreen} />
                    <Stack.Screen name='SearchResult' component={SearchResultScreen} />
                    <Stack.Screen name='EditProfile' component={EditProfileScreen} />
                    <Stack.Screen name='ChangePassword' component={ChangePasswordScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </StoreProvider>
    );
}
