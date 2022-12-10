import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StoreProvider } from './store';
import GlobalStyles from './assets/styles/GlobalStyles';
import icons from './assets/icons';

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
    CategoryScreen,
    SignInScreen,
    SignUpScreen,
} from './screens';
import TabBarIcon from './components/tabbar/TabBarIcon';
import TabBarLabel from './components/tabbar/TabBarLabel';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <StoreProvider>
            <NavigationContainer>
                <Tab.Navigator initialRouteName='SignIn' screenOptions={{ headerShown: false }}>
                    <Tab.Screen name='SignIn' component={SignInScreen} options={{ tabBarButton: () => null }} />
                    <Tab.Screen name='SignUp' component={SignUpScreen} options={{ tabBarButton: () => null }} />
                    <Tab.Screen name='PostDetail' component={PostDetailScreen} options={{ tabBarButton: () => null }} />
                    <Tab.Screen name='Search' component={SearchScreen} options={{ tabBarButton: () => null }} />
                    <Tab.Screen
                        name='SearchResult'
                        component={SearchResultScreen}
                        options={{ tabBarButton: () => null }}
                    />
                    <Tab.Screen
                        name='EditProfile'
                        component={EditProfileScreen}
                        options={{ tabBarButton: () => null }}
                    />
                    <Tab.Screen
                        name='ChangePassword'
                        component={ChangePasswordScreen}
                        options={{ tabBarButton: () => null }}
                    />
                    <Tab.Screen name='CreatePost' component={CreatePostScreen} options={{ tabBarButton: () => null }} />

                    <Tab.Screen
                        name='Home'
                        component={HomeScreen}
                        options={({ route }) => ({
                            tabBarIcon: ({ focused }) => {
                                const icon = focused ? icons.homeActive : icons.home;
                                return <TabBarIcon icon={icon} />;
                            },
                            tabBarLabel: ({ focused }) => {
                                const color = focused ? GlobalStyles.colors.accent : GlobalStyles.colors.secondary;
                                return <TabBarLabel text={route.name} color={color} />;
                            },
                        })}
                    />
                    <Tab.Screen
                        name='Category'
                        component={CategoryScreen}
                        options={({ route }) => ({
                            tabBarIcon: ({ focused }) => {
                                const icon = focused ? icons.categoryActive : icons.category;
                                return <TabBarIcon icon={icon} />;
                            },
                            tabBarLabel: ({ focused }) => {
                                const color = focused ? GlobalStyles.colors.accent : GlobalStyles.colors.secondary;
                                return <TabBarLabel text={route.name} color={color} />;
                            },
                        })}
                    />
                    <Tab.Screen
                        name='Popular'
                        component={PopularScreen}
                        options={({ route }) => ({
                            tabBarIcon: ({ focused }) => {
                                const icon = focused ? icons.popularActive : icons.popular;
                                return <TabBarIcon icon={icon} />;
                            },
                            tabBarLabel: ({ focused }) => {
                                const color = focused ? GlobalStyles.colors.accent : GlobalStyles.colors.secondary;
                                return <TabBarLabel text={route.name} color={color} />;
                            },
                        })}
                    />
                    <Tab.Screen
                        name='Notification'
                        component={NotificationScreen}
                        options={({ route }) => ({
                            tabBarIcon: ({ focused }) => {
                                const icon = focused ? icons.notificationActive : icons.notification;
                                return <TabBarIcon icon={icon} />;
                            },
                            tabBarLabel: ({ focused }) => {
                                const color = focused ? GlobalStyles.colors.accent : GlobalStyles.colors.secondary;
                                return <TabBarLabel text={route.name} color={color} />;
                            },
                        })}
                    />
                    <Tab.Screen
                        name='Profile'
                        component={ProfileScreen}
                        options={({ route }) => ({
                            tabBarIcon: ({ focused }) => {
                                const icon = focused ? icons.userActive : icons.user;
                                return <TabBarIcon icon={icon} />;
                            },
                            tabBarLabel: ({ focused }) => {
                                const color = focused ? GlobalStyles.colors.accent : GlobalStyles.colors.secondary;
                                return <TabBarLabel text={route.name} color={color} />;
                            },
                        })}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </StoreProvider>
    );
}
