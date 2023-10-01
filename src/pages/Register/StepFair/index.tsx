import React, { useEffect, useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { Button, Checkbox, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';
import styles from './style';
import Contact from '../../../components/Contacts';
import { setLocale } from 'yup';
import { useNavigate } from '../../../hooks/useNavigate';
import { SystemRoutes } from '../../../ts/enums/routes';
import api from '../../../services';
import { toastError, toastSuccess, toastValidation } from '../../../utils/toast-utils';
import { useFarmerContext } from '../../../store';
import FairSVG from '../../../assets/fair.svg';
import SelectBox from '../../../components/SelectBox';
import { authentication, handleCustomer } from '../../../controllers';

interface Item {
    id: number,
    siteName: string
}

interface ListItem {
    id: string,
    name: string
}

function StepFair() {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [items, setItems] = useState<ListItem[]>([]);
    const [myLocal, setMyLocal] = useState<boolean>(false);
    const screenHeight: number = Dimensions.get('window').height;
    const { fair, setFair } = useFarmerContext();

    const { changeRoute } = useNavigate();

    setLocale({
        mixed: {
            required: 'A lista de ${path} deve ser preenchida.',
        }
    });

    const validSchema = yup.object().shape({
        feiras: yup.array().of(yup.number()).required()
    });

    useEffect(() => {
        api.get("/fairs").then((response) => {
            const { data } = response;
            setItems(data.map((item: Item): ListItem => ({
                name: item.siteName + '',
                id: item.id + ''
            })));
        });
    }, []);

    async function handleSubmit(): Promise<void> {
        if (myLocal) {
            setFair({ ...fair, idsFair: selectedItems.map(value => ({ idFair: value })) });
            changeRoute(SystemRoutes.StepLocality);
        }
        else {
            validSchema.validate({ selectedItems })
                .then(() => {
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
                            toastError('Falha ao registrar. Verifique novamente suas informações.');
                        });
                })
                .catch(function (err) {
                    err.errors.map((error: any) => {
                        toastValidation(`${error as string}`);
                    });
                });
        }
    }

    return (
        <View>
            <View style={{ height: "auto", maxHeight: screenHeight }}>
                <View style={[styles.container, { marginTop: 32 }]}>
                    <FairSVG width={148} height={148} style={styles.image} />

                    <Paragraph style={{ marginBottom: 8 }}>Olá, precisamos que preencha as informações de feira livre!</Paragraph>

                    <SelectBox
                        selectText='Selecione suas feiras'
                        items={items}
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                    />

                    <ScrollView
                        contentContainerStyle={{
                            paddingHorizontal: 0,
                            paddingBottom: 0,
                        }}
                    >
                        <Checkbox.Item
                            style={{ marginTop: 4 }}
                            label='Cadastrar meu local'
                            color='#5c6bc0'
                            status={myLocal ? 'checked' : 'unchecked'}
                            onPress={() => { setMyLocal(!myLocal); }}
                        />

                        <View style={styles.button}>
                            <Button style={{ margin: 16 }} icon='arrow-left-circle-outline' mode="contained" onPress={() => changeRoute(SystemRoutes.StepProduct)}>
                                Anterior
                            </Button>
                            <Button style={{ margin: 16 }} icon={myLocal ? 'arrow-right-circle-outline' : 'check-decagram-outline'} mode="contained" onPress={handleSubmit}>
                                {myLocal ? 'Próximo' : 'Finalizar'}
                            </Button>
                        </View>

                        <Contact>Não precisa cadastrar seu ponto de vendas e quer uma feira não listada? Envie-nos uma mensagem!</Contact>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}

export default StepFair;