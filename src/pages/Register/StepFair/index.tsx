import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Image, Text, ScrollView, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Appbar, Button, Checkbox, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';
import MultiSelect from 'react-native-multiple-select';
import styles from './style';
import Contact from '../../../components/Contacts';
import { setLocale } from 'yup';
import { useNavigate } from '../../../hooks/useNavigate';
import { SystemRoutes } from '../../../ts/enums/routes';
import api from '../../../services';
import { toastError, toastSuccess, toastValidation } from '../../../utils/toast-utils';
import StoreSvg from '../../../assets/store.svg';
import { useFarmerContext } from '../../../store';

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
    const [checked, setChecked] = useState<boolean>(false);
    const screenHeight: number = Dimensions.get('window').height;
    const { fair, setFair } = useFarmerContext();
    
    const { changeRoute } = useNavigate();

    function handleNavigationToMain() {
        changeRoute(SystemRoutes.Main);
    }

    function handleNavigationToLocality() {
        changeRoute(SystemRoutes.Locality);
    }

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

    function handleNavigationToProducts() {
        changeRoute(SystemRoutes.StepProduct);
    }

    async function handleSubmit() {
        validSchema.validate({ feiras: selectedItems }).then(valid => {
            api.post('/customers', {
                name: fair.name.trim(),
                email: fair.email.trim(),
                whatsapp: fair.whatsapp,
                customerPassword: fair.password.trim(),
                idsProduct: fair.idsProduct,
                idsFair: selectedItems.map(value => ({ idFair: value })),
            }).then(() => {
                api.post('/auth', {
                    email: fair.email,
                    customerPassword: fair.password,
                }).then(async response => {
                    await AsyncStorage.setItem('@storage_Key', response.data.tipo + ' ' + response.data.token);
                    await AsyncStorage.setItem('@storage_Id', String(response.data.id));

                    toastSuccess('Cadastro realizado com sucesso');

                    if (checked) {
                        handleNavigationToLocality();
                        return;
                    }

                    handleNavigationToMain();
                })
            }).catch(() => {
                toastError('Falha ao registrar. Verifique novamente suas informações.');
            });
        }).catch(function (err) {
            err.errors.map((error: any) => {
                toastValidation(`${error as string}`);
            });
        });
    }

    return (
        <View>
            <View style={{ height: "auto", maxHeight: screenHeight }}>
                <View style={[styles.container, { marginTop: 48 }]}>
                    <StoreSvg style={{ alignSelf: 'center', justifyContent: 'center', margin: 4, width: 16, height: 16 }}  />
                    <Paragraph style={{ marginBottom: 8 }}>Olá, precisamos que preencha as informações de usuário para gerenciamento de suas feiras livres!</Paragraph>

                    <MultiSelect
                        hideSubmitButton={true}
                        uniqueKey="id"
                        displayKey="name"
                        items={items}
                        onSelectedItemsChange={(items: string[]) => setSelectedItems([...items])}
                        selectedItems={selectedItems}
                        selectText="Selecione suas feiras"
                        searchInputPlaceholderText="Busque os itens"
                        tagRemoveIconColor="#009688"
                        tagBorderColor="#009688"
                        textColor='#009688'
                        tagTextColor="#009688"
                        selectedItemTextColor="#009688"
                        selectedItemIconColor="#009688"
                        itemTextColor="#009688"
                        styleListContainer={{ height: 128 }}
                        searchInputStyle={{ color: '#009688', height: 50 }}
                        submitButtonColor="#009688"
                        styleIndicator={{ height: 32, borderColor: '#009688' }}
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
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => { setChecked(!checked); }}
                        />

                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Button style={{ margin: 16 }} icon="arrow-left-circle-outline" mode="contained" onPress={handleNavigationToProducts}>
                                Anterior
                            </Button>
                            <Button style={{ margin: 16 }} icon="check-decagram-outline" mode="contained" onPress={handleSubmit}>
                                Finalizar
                            </Button>
                        </View>

                        <Contact>Precisa de uma feira não lisada?</Contact>

                    </ScrollView>
                </View>
            </View>
        </View>
    );
}

export default StepFair;