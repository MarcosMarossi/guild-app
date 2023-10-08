import React, { useState } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { Button, Paragraph, TextInput } from 'react-native-paper';
import LogoSVG from '../../../assets/logo.svg';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from './style';
import { updateCustomerPassword } from '../../../controllers';
import { useRoute } from "@react-navigation/native";
import { error, success } from '../../../utils/toast-utils';
import { useNavigate } from '../../../hooks/useNavigate';
import { SystemRoutes } from '../../../ts/enums/routes';

interface Params {
    phone: string;
}

const StepPassword = () => {
    const screenHeight: number = Dimensions.get('window').height;
    const route = useRoute();
    const routeParams: Params = route.params as Params;
    const { changeRoute } = useNavigate();

    const SignupSchema = Yup.object().shape({
        code: Yup.number()
            .required('O campo de nome é requerido!')
            .min(6, 'É necessário pelo menos 3 dígitos.'),
        password: Yup.string()
            .required('O campo de senha é requerido!')
            .min(8, 'É necessário pelo menos 8 dígitos.')
    });

    return (
        <Formik
            initialValues={
                {
                    code: 0,
                    password: ''
                }
            }
            validationSchema={SignupSchema}
            onSubmit={({ code, password }) => {
                updateCustomerPassword({
                    code,
                    password,
                    whatsapp: routeParams.phone
                }).then(() => {
                    success('Senha alterada com sucesso!');
                    changeRoute(SystemRoutes.Login);
                }).catch(() => {
                    error('Erro ao alterar a senha. Verifique as informações novamente!');
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
                            <View style={[styles.container, { marginTop: 32 }]}>
                                <LogoSVG width={100} height={100} style={styles.image} />

                                <Paragraph>
                                    Passo 2: Digite seu código verificador e a nova senha!
                                </Paragraph>

                                <TextInput
                                    mode="outlined"
                                    label="Código"
                                    style={styles.input}
                                    onChangeText={handleChange('code')}
                                />

                                {errors.code &&
                                    <Paragraph style={{ color: 'red' }}>{errors.code}</Paragraph>
                                }

                                <TextInput
                                    mode="outlined"
                                    label="Senha"
                                    style={styles.input}
                                    secureTextEntry={true}
                                    onChangeText={handleChange('password')}
                                />

                                {errors.password &&
                                    <Paragraph style={{ color: 'red' }}>{errors.password}</Paragraph>
                                }

                                <Button style={{ marginTop: 32 }} icon="content-save" mode="contained" onPress={() => handleSubmit()}>
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

export default StepPassword;