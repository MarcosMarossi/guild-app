import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Appbar, Button, Paragraph, Title } from 'react-native-paper';
import styles from './style';
import { toastError, toastSuccess } from '../../utils/toast-utils';
import api from '../../services';
import { Point } from '../../ts/interfaces/point-interfaces';
import { User } from '../../ts/interfaces/user-interfaces';
import { useNavigate } from '../../hooks/useNavigate';
import { SystemRoutes } from '../../ts/enums/routes';
import FairSVG from '../../assets/fair.svg';

function Profile() {
    const [id, setId] = useState<number>();
    const [fairs, setFairs] = useState<Point[]>();
    const [customer, setCustomer] = useState<User>();
    const [state, setState] = useState<boolean>(false);
    const { changeRoute } = useNavigate();

    const navigation = useNavigation();

    useEffect(() => {
        getCustumerId();
        if (typeof id !== 'undefined') {
            api.get(`/customers/${id}`).then(response => {
                setFairs(response.data.fairs)
                setCustomer(response.data)
                setState(false);
            });
        }
    }, [id, state]);

    async function handleExcludeFair(fairId: number) {
        api.delete('/customers', {
            params: {
                fairId,
                customerId: id
            },
            headers: {
                'Authorization': `${await AsyncStorage.getItem('@storage_Key')}`,
            },
        }).then(response => {
            setState(true);
            toastSuccess('Desvinculado com sucesso');
        }).catch(async err => {
            await AsyncStorage.setItem('@storage_Key', 'invalid');
            changeRoute(SystemRoutes.Main);
            toastError('Por favor, faça o login novamente! Suas credenciais podem ser inválidas.');
        });
    }

    async function getCustumerId() {
        setId(Number(await AsyncStorage.getItem('@storage_Id')));
    }

    return (
        <View>
            <Appbar.Header style={{ backgroundColor: 'white' }}>
                <Appbar.BackAction onPress={() => { navigation.goBack() }} color="#c62828" />
                <Appbar.Content title="Minhas Feiras" color="#c62828" />
            </Appbar.Header>

            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 8,
                    paddingBottom: 100,
                    marginBottom: 0
                }}>
                <View style={styles.container}>
                    <Paragraph style={[styles.description, { justifyContent: 'center', textAlign: 'justify' }]}>Olá, {customer?.name}. Nesta seção você pode remover feiras que não participa mais.</Paragraph>
                </View>

                {fairs?.length !== 0 ?

                    fairs?.map(fair => (
                        <View key={fair.id} style={styles.container}>
                            <FairSVG width={128} height={128} style={{ alignSelf: 'center', justifyContent: 'center', margin: 4 }} />

                            <Paragraph>Nome: {fair.siteName}</Paragraph>
                            <Paragraph style={styles.description}>Descrição: {fair.description}</Paragraph>
                            <Paragraph style={styles.description}>Endereço: {fair.address}, {fair.city + ' - ' + fair.uf}</Paragraph>
                            <Paragraph style={styles.description}>Aberto em: {fair.dayWeek}</Paragraph>

                            <Button icon="store-remove" style={{ marginTop: 16 }} mode="outlined" onPress={() => handleExcludeFair(fair.id)}>Desvincular</Button>
                        </View>
                    ))
                    :
                    <View style={styles.container}>
                        <Paragraph>Você não está associado a uma feira</Paragraph>
                        <Paragraph>Basta selecionar a opção 'Menu' e depois 'Nova Feira' para vincular-se a uma.</Paragraph>
                    </View>
                }
            </ScrollView>
        </View>
    );
}

export default Profile;