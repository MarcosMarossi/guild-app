import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { Button, Paragraph, TextInput } from 'react-native-paper';
import * as yup from 'yup';
import styles from './style';
import { useNavigate } from '../../../hooks/useNavigate';
import { SystemRoutes } from '../../../ts/enums/routes';
import { Formik } from 'formik';
import { FairRequest, Fair, Locality } from '../../../ts/interfaces/fair-interfaces';
import LocalSVG from '../../../assets/local.svg';
import { useFarmerContext } from '../../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authentication, handleCustomer, handleFair } from '../../../controllers';
import { showToast } from '../../../utils/message-utils';

function LocalityStep() {
    const screenHeight: number = Dimensions.get('window').height;
    const { changeRoute } = useNavigate();
    const { fair, locality, setLocality } = useFarmerContext();

    const SignupSchema = yup.object().shape({
        siteName: yup.string().min(5).required(),
        description: yup.string().min(8).required(),
        address: yup.string().min(8).required(),
        city: yup.string().min(3).required(),
        uf: yup.string().max(2).required(),
        dayWeek: yup.string().min(5).required(),
    });

    async function onSubmit(data: Locality): Promise<void> {
        handleFair(data)
            .then((response) => {
                let auxFair: FairRequest = fair;
                auxFair.idsFair.push({ idFair: response.data.id ? `${response.data.id}` : '0' });
                handleCustomer(fair)
                    .then(() => {
                        authentication({ email: fair.email, password: fair.password })
                            .then(async (response) => {
                                await AsyncStorage.setItem('@storage_Key', response.data.type + ' ' + response.data.token);
                                await AsyncStorage.setItem('@storage_Id', String(response.data.id));
                                changeRoute(SystemRoutes.Main);
                            });
                    })
                    .catch(() => {
                        showToast('Falha ao registrar. Verifique novamente suas informações.');
                    });

            }).catch(() => {
                showToast('Ocorreu um erro ao cadastrar a feira.')
            });
    }

    return (
        <Formik
            initialValues={
                {
                    siteName: '',
                    description: '',
                    address: '',
                    city: '',
                    uf: '',
                    dayWeek: ''
                }
            }
            validationSchema={SignupSchema}
            onSubmit={(data) => {
                onSubmit(data);
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
                            <View style={[styles.container, { marginTop: 40 }]}>
                                <LocalSVG width={148} height={148} style={styles.image} />

                                <Paragraph style={{ marginBottom: 8, textAlign: 'justify' }}>
                                    Olá, precisamos que preencha as informações de localização da sua feira livre!
                                </Paragraph>

                                <TextInput
                                    mode="outlined"
                                    style={styles.input}
                                    label="Nome do sítio ou feira"
                                    placeholder='Exemplo: Feira Domingues'
                                    onChangeText={handleChange('siteName')}
                                />

                                {errors.siteName &&
                                    <Paragraph style={{ color: 'red' }}>{errors.siteName}</Paragraph>
                                }

                                <TextInput
                                    mode="outlined"
                                    style={styles.input}
                                    label="Descrição"
                                    placeholder='Exemplo: Feira familiar'
                                    onChangeText={handleChange('description')}
                                />

                                {errors.description &&
                                    <Paragraph style={{ color: 'red' }}>{errors.description}</Paragraph>
                                }

                                <TextInput
                                    mode="outlined"
                                    style={styles.input}
                                    label="Endereço"
                                    placeholder='Exemplo: Av. Paulista, 1811 - Bela Vista, 01311-200'
                                    onChangeText={handleChange('address')}
                                />

                                {errors.address &&
                                    <Paragraph style={{ color: 'red' }}>{errors.address}</Paragraph>
                                }

                                <TextInput
                                    mode="outlined"
                                    style={styles.input}
                                    label="Cidade"
                                    placeholder='Exemplo: São Paulo'
                                    onChangeText={handleChange('city')}
                                />

                                {errors.city &&
                                    <Paragraph style={{ color: 'red' }}>{errors.city}</Paragraph>
                                }

                                <TextInput
                                    mode="outlined"
                                    style={styles.input}
                                    label="UF"
                                    autoCapitalize="characters"
                                    maxLength={2}
                                    autoCorrect={false}
                                    placeholder='Exemplo: SP'
                                    onChangeText={handleChange('uf')}
                                />

                                {errors.uf &&
                                    <Paragraph style={{ color: 'red' }}>{errors.uf}</Paragraph>
                                }

                                <TextInput
                                    mode="outlined"
                                    style={styles.input}
                                    label="Disponibilidade"
                                    placeholder='Exemplo: Sexta-feira às 8:00'
                                    onChangeText={handleChange('dayWeek')}
                                />

                                {errors.dayWeek &&
                                    <Paragraph style={{ color: 'red' }}>{errors.dayWeek}</Paragraph>
                                }

                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Button style={{ margin: 16 }} icon="arrow-left-circle-outline" mode="contained" onPress={() => changeRoute(SystemRoutes.StepFair)}>
                                        Anterior
                                    </Button>
                                    <Button style={{ margin: 16 }} icon="check-decagram-outline" mode="contained" onPress={() => handleSubmit()}>
                                        Próximo
                                    </Button>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            )}
        </Formik>
    );
}

export default LocalityStep;