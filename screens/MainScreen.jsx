import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import GlobalStyles from '../assets/styles/GlobalStyles';
import icons from '../assets/icons';

import { HomeScreen, CategoryScreen, PopularScreen, NotificationScreen, ProfileScreen } from '../screens';
import { TabBarIcon, TabBarLabel } from '../components/tabbar';

const Tab = createBottomTabNavigator();

function MainScreen() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
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
    );
}

export default MainScreen;
