import React from 'react';
import { View, Dimensions } from 'react-native'
import { Button, Paragraph, TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import * as Yup from 'yup';
import styles from './style';
import { useNavigate } from '../../hooks/useNavigate';
import { SystemRoutes } from '../../ts/enums/routes';
import { Formik } from 'formik';
import { useFarmerContext } from '../../store';
import UserSVG from '../../assets/user.svg';

function Register() {
    const { changeRoute } = useNavigate();
    const screenHeight = Dimensions.get('window').height;
    const { setFair } = useFarmerContext();

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .required('O campo de nome é requerido!')
            .min(3, 'É necessário pelo menos 3 dígitos.'),
        email: Yup.string()
            .required('O campo de e-mail é requerido!')
            .email('O campo informado não é um e-mail.')
            .min(3, 'É necessário pelo menos 3 dígitos.'),
        whatsapp: Yup.number()
            .required('O campo de Whatsapp é requerido!')
            .min(8, 'É necessário pelo menos 8 dígitos.'),
        password: Yup.string()
            .required('O campo de senha é requerido!')
            .min(8, 'É necessário pelo menos 8 dígitos.'),
    });

    return (
        <Formik
            initialValues={
                {
                    name: '',
                    email: '',
                    whatsapp: 0,
                    password: ''
                }
            }
            validationSchema={SignupSchema}
            onSubmit={({ name, email, whatsapp, password }) => {
                changeRoute(SystemRoutes.StepProduct, { name, email, whatsapp, password });
                setFair({ name, email, whatsapp, password });
            }}
        >
            {({ handleChange, handleSubmit, errors }) => (
                <View>
                    <View style={{ height: "auto", maxHeight: screenHeight }}>
                        <ScrollView
                            contentContainerStyle={{
                                paddingHorizontal: 0,
                                paddingBottom: 0,
                            }}
                        >
                            <View style={[styles.container, { marginTop: 48 }]}>
                                <UserSVG width={128} height={128} style={{ alignSelf: 'center', justifyContent: 'center', margin: 4 }} />

                                <Paragraph style={{ marginBottom: 8, marginTop: 8, textAlign: 'justify' }}>Olá feirante, precisamos que preencha as informações do seu usuário para seguirmos com seu cadastro!</Paragraph>

                                <TextInput
                                    mode="outlined"
                                    style={[styles.input, { marginTop: 0 }]}
                                    label="Nome completo"
                                    onChangeText={handleChange('name')}
                                />

                                {errors.name &&
                                    <Paragraph style={{ color: 'red' }}>{errors.name}</Paragraph>
                                }

                                <TextInput
                                    keyboardType={"email-address"}
                                    mode="outlined"
                                    style={styles.input}
                                    label="E-mail"
                                    onChangeText={handleChange('email')}
                                />
                                
                                {errors.email &&
                                    <Paragraph style={{ color: 'red' }}>{errors.email}</Paragraph>
                                }

                                <TextInput
                                    keyboardType={"numeric"}
                                    mode="outlined"
                                    style={styles.input}
                                    label="Whatsapp"
                                    maxLength={11}
                                    onChangeText={handleChange('whatsapp')}
                                />

                                {errors.whatsapp &&
                                    <Paragraph style={{ color: 'red' }}>{errors.whatsapp}</Paragraph>
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

                                <Button style={{ marginTop: 32 }} icon="arrow-right-circle-outline" mode="contained" onPress={() => handleSubmit()}>
                                    Próximo
                                </Button>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            )}
        </Formik>

    );
}

export default Register;