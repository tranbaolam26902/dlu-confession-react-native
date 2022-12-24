import { StyleSheet, Modal, Pressable, TouchableWithoutFeedback, StatusBar } from 'react-native';

import GlobalStyles from '../assets/styles/GlobalStyles';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    center: {
        justifyContent: 'center',
    },
    bottom: {
        justifyContent: 'flex-end',
    },
});

function CustomModal({ children, showModal, setShowModal, bottom }) {
    return (
        <>
            <StatusBar
                animated={true}
                backgroundColor={showModal ? 'rgba(0, 0, 0, 0.5)' : GlobalStyles.colors.white}
                barStyle={'dark-content'}
            />
            <Modal animationType='fade' transparent={true} visible={showModal}>
                <Pressable
                    style={[styles.wrapper, bottom ? styles.bottom : styles.center]}
                    onPress={() => setShowModal(false)}
                >
                    <TouchableWithoutFeedback onPress={(e) => e.preventDefault()}>{children}</TouchableWithoutFeedback>
                </Pressable>
            </Modal>
        </>
    );
}

export default CustomModal;
