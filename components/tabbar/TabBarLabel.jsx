import { Text } from 'react-native';

function TabBarLabel({ text, color }) {
    return <Text style={{ fontSize: 12, color: color }}>{text}</Text>;
}

export default TabBarLabel;
