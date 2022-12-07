import { forwardRef } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import GlobalStyles from '../assets/styles/GlobalStyles';

const styles = StyleSheet.create({
    label: {
        paddingLeft: 16,
        marginBottom: 4,
        fontSize: 16,
        color: GlobalStyles.colors.secondary,
    },
    input: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        color: GlobalStyles.colors.textColor,
        backgroundColor: GlobalStyles.colors.background,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: GlobalStyles.colors.secondary90,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
});

const Input = forwardRef(
    (
        { style, label, placeholder, secureTextEntry, value, setValue, onSubmitEditing, returnKeyType, blurOnSubmit },
        ref,
    ) => {
        return (
            <View style={[style]}>
                <Text style={styles.label}>{label}</Text>
                <TextInput
                    ref={ref}
                    style={styles.input}
                    selectionColor={GlobalStyles.colors.textColor}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    value={value}
                    blurOnSubmit={blurOnSubmit}
                    returnKeyType={returnKeyType}
                    onChangeText={(value) => setValue(value)}
                    onSubmitEditing={onSubmitEditing}
                />
            </View>
        );
    },
);

export default Input;
