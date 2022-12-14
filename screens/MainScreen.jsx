import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import icons from '../assets/icons';

import { HomeScreen, CategoryScreen, PopularScreen, NotificationScreen, UserProfileScreen } from '../screens';

const Tab = createBottomTabNavigator();

function MainScreen() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        const icon = focused ? icons.homeActive : icons.home;
                        return <Image source={icon} style={{ width: 28, height: 28 }} />;
                    },
                    tabBarLabel: () => null,
                }}
            />
            <Tab.Screen
                name='Category'
                component={CategoryScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        const icon = focused ? icons.categoryActive : icons.category;
                        return <Image source={icon} style={{ width: 28, height: 28 }} />;
                    },
                    tabBarLabel: () => null,
                }}
            />
            <Tab.Screen
                name='Popular'
                component={PopularScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        const icon = focused ? icons.popularActive : icons.popular;
                        return <Image source={icon} style={{ width: 28, height: 28 }} />;
                    },
                    tabBarLabel: () => null,
                }}
            />
            <Tab.Screen
                name='Notification'
                component={NotificationScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        const icon = focused ? icons.notificationActive : icons.notification;
                        return <Image source={icon} style={{ width: 28, height: 28 }} />;
                    },
                    tabBarLabel: () => null,
                }}
            />
            <Tab.Screen
                name='UserProfile'
                component={UserProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        const icon = focused ? icons.userActive : icons.user;
                        return <Image source={icon} style={{ width: 28, height: 28 }} />;
                    },
                    tabBarLabel: () => null,
                }}
            />
        </Tab.Navigator>
    );
}

export default MainScreen;
