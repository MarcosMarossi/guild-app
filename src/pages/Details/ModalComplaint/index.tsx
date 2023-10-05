import React from 'react';
import { Button, Modal, Paragraph, Portal, TextInput } from 'react-native-paper';
import styles from './style';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as Device from 'expo-device';
import { handleComplaint } from '../../../controllers';
import ComplaintSVG from '../../../assets/prohibited.svg';

interface IProps {
    showComplaints: boolean;
    setShowComplaints: Function;
    idFair: number;
}

const ModalComplaint = ({ showComplaints, setShowComplaints, idFair }: IProps) => {
    const SignupSchema = Yup.object().shape({
        reason: Yup.string()
            .required('O campo de nome é requerido!')
            .min(3, 'É necessário pelo menos 3 dígitos.'),
        description: Yup.string()
            .required('O campo de e-mail é requerido!')
            .min(5, 'É necessário pelo menos 5 dígitos.')
    });

    return (
        <Formik
            initialValues={
                {
                    reason: '',
                    description: ''
                }
            }
            validationSchema={SignupSchema}
            onSubmit={({ reason, description }) => {
                handleComplaint({
                    description,
                    reason,
                    idFair,
                    serialNumber: `${Device.osBuildId}`
                })
            }}
        >
            {({ handleChange, handleSubmit, errors }) => (
                <Portal>
                    <Modal visible={showComplaints} onDismiss={() => setShowComplaints(false)} contentContainerStyle={styles.modalContainer}>
                        <ComplaintSVG width={128} height={128} style={styles.image} />

                        <Paragraph style={{ textAlign: 'justify' }}>A denúncia serve como instrumento para correção de algum funcionamento indevido e que fere as regras da aplicação! Lembrando que a denuncia é anônima.</Paragraph>

                        <TextInput
                            mode="outlined"
                            label="Motivo"
                            style={{ marginTop: 16 }}
                            onChangeText={handleChange('reason')}
                        />

                        {errors.reason &&
                            <Paragraph style={{ color: 'red' }}>{errors.reason}</Paragraph>
                        }

                        <TextInput
                            mode="outlined"
                            label="Descrição"
                            numberOfLines={5}
                            style={{ height: 128, marginTop: 16 }}
                            multiline
                            onChangeText={handleChange('description')}
                        />

                        {errors.description &&
                            <Paragraph style={{ color: 'red' }}>{errors.description}</Paragraph>
                        }

                        <Button style={{ marginTop: 24 }} icon="login" mode="contained" onPress={() => handleSubmit()}>
                            Enviar
                        </Button>
                    </Modal>
                </Portal>
            )}
        </Formik>
    );
};

export default ModalComplaint;