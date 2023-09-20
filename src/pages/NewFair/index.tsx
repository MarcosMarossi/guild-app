import React, { useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';
import styles from './style';
import Contact from '../../components/Contacts';
import { toastError, toastValidation, toastSuccess } from '../../utils/toast-utils';
import { setLocale } from 'yup';
import api from '../../services';
import { useNavigate } from '../../hooks/useNavigate';
import { SystemRoutes } from '../../ts/enums/routes';
import MultiSelect from 'react-native-multiple-select';
import { Button, Paragraph } from 'react-native-paper';
import FairSVG from '../../assets/fair.svg';

interface Item {
    id: number,
    siteName: string
}

interface ListItem {
    id: string,
    name: string
}

function Select() {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [items, setItems] = useState<ListItem[]>([]);
    const [id, setId] = useState<number>();
    const { changeRoute } = useNavigate();

    const screenHeight = Dimensions.get('window').height;

    const validSchema = yup.object().shape({
        feiras: yup.array().of(yup.number()).required()
    });

    setLocale({
        mixed: {
            required: 'Você precisa preencher a lista de ${path}',
        }
    });

    useEffect(() => {
        getCustumerId();
        api.get("/fairs").then((response) => {
            const { data } = response;
            setItems(data.map((item: Item): ListItem => ({
                name: item.siteName + '',
                id: item.id + ''
            })));
        });
    }, []);

    async function getCustumerId() {
        setId(Number(await AsyncStorage.getItem('@storage_Id')));
    }

    async function handleSubmit() {
        validSchema.validate({ feiras: selectedItems }).then(async valid => {
            console.log(await AsyncStorage.getItem('@storage_Key'))
            
            api.post('/customers/newfair', {
                customerId: id,
                idsFair: selectedItems.map(value => ({
                    idFair: value,
                }))
            },
                {
                    headers: {
                        'Authorization': `${await AsyncStorage.getItem('@storage_Key')}`,
                    }
                }).then(() => {
                    toastSuccess('Cadastro realizado com sucesso!');
                    changeRoute(SystemRoutes.Main);
                }).catch((err) => {
                    console.log(err)
                    toastError('Falha ao registrar a nova feira');
                })
        }).catch(function (err) {
            err.errors.map((error: any) => {
                toastValidation(`${error as string}.`);
            });
        });
    }

    return (
        <View>
            <View style={{ height: "auto", maxHeight: screenHeight }}>                
                <View style={[styles.container, { marginTop: 32 }]}>

                    <Button style={{ width: 118, backgroundColor: '#c62828' }} icon="keyboard-backspace" mode="contained" onPress={() => changeRoute(SystemRoutes.Main)}>
                        Voltar
                    </Button>

                    <FairSVG width={148} height={148} style={{ alignSelf: 'center', justifyContent: 'center', margin: 4 }}  />
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
                        tagRemoveIconColor="#5e35b1"
                        tagBorderColor="#5e35b1"
                        textColor='#424242'
                        tagTextColor="#5e35b1"
                        selectedItemTextColor="#5e35b1"
                        selectedItemIconColor="#5e35b1"
                        itemTextColor="#5e35b1"
                        styleListContainer={{ height: 128 }}
                        searchInputStyle={{ color: '#5e35b1', height: 50 }}
                        submitButtonColor="#5e35b1"
                        styleIndicator={{ height: 32, borderColor: '#5e35b1' }}
                    />

                    <Button style={{ marginTop: 16 }} icon="arrow-right-circle-outline" mode="contained" onPress={handleSubmit}>
                        Cadastrar
                    </Button>
                </View>
                <Contact>Precisa de uma feira não listada?</Contact>
            </View>
        </View>
    );
}

export default Select;