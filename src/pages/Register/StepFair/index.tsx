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
import { useFarmerContext } from '../../../store';
import FairSVG from '../../../assets/fair.svg';
import SelectBox from '../../../components/SelectBox';
import { authentication, findAllFairs, handleCustomer } from '../../../controllers';
import { showToast } from '../../../utils/message-utils';
import { Fair, FairRequest } from '../../../ts/interfaces/fair-interfaces';

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
        findAllFairs().then((response) => {
            const { data } = response;
            setItems(data.map((item: Fair): ListItem => ({
                name: item.siteName + '',
                id: item.id + ''
            })));
        });
    }, []);

    async function handleSubmit(): Promise<void> {
        const request: FairRequest = { ...fair, idsFair: selectedItems.map(value => ({ idFair: value })) };

        if (myLocal) {
            setFair(request);
            changeRoute(SystemRoutes.StepLocality);
        }
        else {
            validSchema.validate({ feiras: selectedItems })
                .then(() => {
                    handleCustomer(request)
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
                })
                .catch(function (err) {
                    err.errors.map((error: any) => {
                        showToast(`${error as string}`);
                    });
                });
        }
    }

    return (
        <View>
            <View style={{ height: "auto", maxHeight: screenHeight }}>
                <ScrollView
                    horizontal={false}
                    contentContainerStyle={{
                        paddingHorizontal: 0,
                        paddingBottom: 0,
                    }}
                >
                    <View style={[styles.container, { marginTop: 40 }]}>
                        <FairSVG width={148} height={148} style={styles.image} />

                        <Paragraph style={{ marginBottom: 8 }}>Olá, precisamos que preencha as informações de feira livre!</Paragraph>

                        <SelectBox
                            selectText='Selecione suas feiras'
                            items={items}
                            selectedItems={selectedItems}
                            setSelectedItems={setSelectedItems}
                        />
                        
                        <Checkbox.Item
                            style={{ marginTop: 4 }}
                            label='Cadastrar meu local'
                            color='#5c6bc0'
                            status={myLocal ? 'checked' : 'unchecked'}
                            onPress={() => { setMyLocal(!myLocal); }}
                        />

                        <View style={styles.button}>
                            <Button style={{ margin: 8 }} icon='arrow-left-circle-outline' mode="contained" onPress={() => changeRoute(SystemRoutes.StepProduct)}>
                                Anterior
                            </Button>
                            <Button style={{ margin: 8 }} icon={myLocal ? 'arrow-right-circle-outline' : 'check-decagram-outline'} mode="contained" onPress={handleSubmit}>
                                {myLocal ? 'Próximo' : 'Finalizar'}
                            </Button>
                        </View>

                        <Contact>Não precisa cadastrar seu ponto de vendas e quer uma feira não listada? Envie-nos uma mensagem!</Contact>

                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default StepFair;