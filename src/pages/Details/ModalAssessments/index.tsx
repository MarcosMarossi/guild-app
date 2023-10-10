import React, { useEffect, useState } from 'react';
import { Button, Modal, Paragraph, Portal, TextInput } from 'react-native-paper';
import styles from './style';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AvatarSVG from '../../../assets/avatar.svg';
import { ScrollView, View } from 'react-native';
import { findAssessmentByFairId, handleAssessement } from '../../../controllers';
import { AssessmentResponse } from '../../../ts/interfaces/assessments-interfaces';
import * as Device from 'expo-device';
import RatingSvg from '../../../assets/rating.svg';
import { showToast } from '../../../utils/message-utils';

interface IProps {
    idFair: number;
    showAssessments: boolean;
    setShowAssessments: Function;
}

const AssessmentsModal = ({ idFair, showAssessments, setShowAssessments }: IProps) => {
    const [assessment, setAssessment] = useState<AssessmentResponse[]>([]);

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .required('O campo de nome é requerido!')
            .min(3, 'É necessário pelo menos 3 dígitos.'),
        comment: Yup.string()
            .required('O campo de e-mail é requerido!')
            .min(5, 'É necessário pelo menos 5 dígitos.')
    });

    useEffect(() => {
        findAssessmentByFairId(idFair)
            .then((response) => {
                setAssessment(response.data);
            })
    }, [showAssessments]);

    return (
        <Formik
            initialValues={
                {
                    name: '',
                    comment: ''
                }
            }
            validationSchema={SignupSchema}
            onSubmit={({ name, comment }) => {
                handleAssessement({
                    name,
                    comment,
                    idFair,
                    serialNumber: `${Device.osBuildId}`
                }).then(() => {
                    setShowAssessments(false);
                    showToast('Comentário publicado com sucesso!');
                }).catch(() => {
                    showToast('Ocorreu um problema ao fazer a publição.');
                });
            }}
        >
            {({ handleChange, handleSubmit, errors }) => (
                <Portal>
                    <Modal visible={showAssessments} onDismiss={() => setShowAssessments(false)} contentContainerStyle={styles.modalContainer}>
                        <ScrollView
                            contentContainerStyle={{
                                paddingHorizontal: 0,
                                paddingBottom: 0,
                            }}
                        >
                            <Button style={styles.backButton} icon="keyboard-backspace" mode="contained" onPress={() => setShowAssessments(false)}>
                                Voltar
                            </Button>

                            <RatingSvg width={128} height={128} style={styles.image} />

                            {assessment && assessment.length > 0 && (
                                <Paragraph style={styles.textRate}>Avaliações dos usuários</Paragraph>
                            )}

                            {assessment && assessment.length > 0 && assessment.map((item, key) => (
                                <View
                                    key={key}
                                    style={styles.commentContainer}>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <AvatarSVG width={32} height={32} />
                                        <Paragraph style={{ marginLeft: 8 }}>{item.name}</Paragraph>
                                    </View>

                                    <Paragraph style={{ marginTop: 8 }}>{item.comment}</Paragraph>
                                </View>
                            ))}

                            <Paragraph style={{ textAlign: 'justify', marginTop: 16 }}>Faça seu comentário sobre a feira livre! Ajude outros usuários a encontrar um local de qualidade.</Paragraph>

                            <TextInput
                                mode="outlined"
                                label="Nome"
                                numberOfLines={5}
                                style={{ marginTop: 16 }}
                                onChangeText={handleChange('name')}
                            />

                            {errors.name &&
                                <Paragraph style={{ color: 'red' }}>{errors.name}</Paragraph>
                            }

                            <TextInput
                                mode="outlined"
                                label="Comentário"
                                numberOfLines={5}
                                style={{ height: 128, marginTop: 16 }}
                                multiline
                                onChangeText={handleChange('comment')}
                            />

                            {errors.comment &&
                                <Paragraph style={{ color: 'red' }}>{errors.comment}</Paragraph>
                            }

                            <Button style={{ marginTop: 24 }} icon="login" mode="contained" onPress={() => handleSubmit()}>
                                Enviar
                            </Button>

                        </ScrollView>
                    </Modal>
                </Portal>
            )}
        </Formik>
    );
};

export default AssessmentsModal;