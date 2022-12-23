import { StyleSheet, Modal, View, Pressable, TouchableWithoutFeedback } from 'react-native';

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

function BottomModal({ children, showModal, setShowModal, bottom }) {
    return (
        <Modal animationType='fade' transparent={true} visible={showModal}>
            <Pressable
                style={[styles.wrapper, bottom ? styles.bottom : styles.center]}
                onPress={() => setShowModal(false)}
            >
                <TouchableWithoutFeedback onPress={(e) => e.preventDefault()}>{children}</TouchableWithoutFeedback>
            </Pressable>
        </Modal>
    );
}

export default BottomModal;
