import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { TextInput, Button, Paragraph } from 'react-native-paper';
import { useNavigate } from '../../../hooks/useNavigate';
import LogoSVG from '../../../assets/logo.svg';
import styles from './style';
import { sendCustomerCode } from '../../../controllers';
import { ACCOUNT_SID_TWILIO, AUTH_TOKEN_TWILIO } from '@env';
import { SystemRoutes } from '../../../ts/enums/routes';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { showToast } from '../../../utils/message-utils';

const StepCode = () => {
    const { changeRoute } = useNavigate();
    const screenHeight: number = Dimensions.get('window').height;

    const SignupSchema = Yup.object().shape({
        phone: Yup.string()
            .required('O campo de celular é requerido!')
            .min(8, 'É necessário pelo menos 8 dígitos.'),
    });

    return (
        <Formik
            initialValues={{ phone: '' }}
            validationSchema={SignupSchema}
            onSubmit={({ phone }) => {
                sendCustomerCode({
                    accountSID: ACCOUNT_SID_TWILIO,
                    authToken: AUTH_TOKEN_TWILIO,
                    recipient: phone,
                    sender: '+12514414935'
                }).then(() => {
                    changeRoute(SystemRoutes.StepPassword, {
                        phone
                    });

                    showToast('Foi enviado o código de verificação com sucesso. Cheque nas mensagens do seu celular.');
                }).catch(() => {
                    showToast('Ocorreu um problema ao gerar o código de autorização!');
                });
            }}
        >
            {({ handleChange, handleSubmit, errors }) => (
                <View>
                    <View style={{ height: "auto", maxHeight: screenHeight }}>
                        <ScrollView
                            contentContainerStyle={{
                                paddingHorizontal: 0,
                                paddingBottom: 78,
                            }}
                        >
                            <View style={[styles.container, { marginTop: 40 }]}>
                                <LogoSVG width={100} height={100} style={styles.image} />

                                <Paragraph>
                                    Passo 1: Digite seu número de celular para ser enviado um código de autorização para criar uma nova senha!
                                </Paragraph>

                                <TextInput
                                    keyboardType="number-pad"
                                    mode="outlined"
                                    style={styles.input}
                                    label="Celular"
                                    accessibilityIgnoresInvertColors
                                    onChangeText={handleChange('phone')}
                                />

                                {errors.phone &&
                                    <Paragraph style={{ color: 'red' }}>{errors.phone}</Paragraph>
                                }

                                <Button style={{ marginTop: 32 }} icon="message-processing-outline" mode="contained" onPress={() => handleSubmit()}>
                                    Enviar
                                </Button>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            )}
        </Formik>
    );
}

export default StepCode;