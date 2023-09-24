import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { Appbar, Chip, Paragraph, TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import { toastError, toastValidation, toastSuccess } from '../../utils/toast-utils';
import api from '../../services';
import { Product } from '../../ts/interfaces/product-interfaces';
import { User } from '../../ts/interfaces/user-interfaces';
import { useNavigate } from '../../hooks/useNavigate';
import { SystemRoutes } from '../../ts/enums/routes';
import UserSVG from '../../assets/user.svg';
import ProductsSVG from '../../assets/products.svg';

function Profile() {
    const [id, setId] = useState<number>();
    const [products, setProducts] = useState<Product[]>();
    const [customer, setCustomer] = useState<User>({} as User);
    const [whatsapp, setWhatsapp] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);
    const { changeRoute } = useNavigate();

    const navigation = useNavigation();

    useEffect(() => {
        getCustumerId();
        if (typeof id !== "undefined") {
            api.get(`/customers/${id}`).then(response => {
                setProducts(response.data.products)
                setCustomer(response.data)
            });
        }
    }, [id]);

    async function getCustumerId() {
        setId(Number(await AsyncStorage.getItem('@storage_Id')));
    }

    async function updateProfile(email: string) {
        api.patch('/customers', {
            email,
            name,
            whatsapp,
            password,
            customerNewPassword: newPassword,
        },
            {
                headers: {
                    'Authorization': `${await AsyncStorage.getItem('@storage_Key')}`,
                }
            }).then(() => {
                toastSuccess('A alteração solicitada ocorreu com sucesso.');
                changeRoute(SystemRoutes.Main);
            }).catch(error => {
                console.log(error);
                toastError('Não conseguimos cadastrar suas atualizações.');
            });
    }

    return (
        <View>
            {typeof products !== 'undefined' ?

                <ScrollView
                    contentContainerStyle={{
                        paddingHorizontal: 8,
                        paddingBottom: 100,
                    }}>
                    <View style={[styles.container, { marginTop: 32 }]}>
                        <Button style={{ width: 118, backgroundColor: '#c62828' }} icon="keyboard-backspace" mode="contained" onPress={() => changeRoute(SystemRoutes.Main)}>
                            Voltar
                        </Button>
                        
                        <Paragraph style={{ marginTop: 16 }}>Olá {customer.name}, nesta página você pode alterar suas informações!</Paragraph>

                        <UserSVG width={128} height={128} style={{ alignSelf: 'center', justifyContent: 'center', margin: 4 }} />

                        <View>
                            <TextInput
                                mode="outlined"
                                style={{ marginTop: 8 }}
                                label="Nome"
                                value={name ? name : customer.name}
                                onChangeText={text => setName(text)}
                            />
                            <TextInput
                                keyboardType={"email-address"}
                                mode="outlined"
                                style={{ marginTop: 8 }}
                                label="E-mail"
                                value={email ? email : customer.email}
                                onChangeText={text => setEmail(text)}
                            />
                            <TextInput
                                keyboardType={"numeric"}
                                mode="outlined"
                                style={{ marginTop: 8 }}
                                label="WhatsApp"
                                value={whatsapp ? whatsapp : customer.whatsapp}
                                onChangeText={text => setWhatsapp(text)}
                            />

                            {visible &&
                                <>
                                    <TextInput
                                        mode="outlined"
                                        style={{ marginTop: 8 }}
                                        label="Senha atual"
                                        value={password}
                                        secureTextEntry={true}
                                        onChangeText={text => setPassword(text)}
                                    />
                                    <TextInput
                                        mode="outlined"
                                        style={{ marginTop: 8 }}
                                        label="Nova Senha"
                                        value={newPassword}
                                        secureTextEntry={true}
                                        onChangeText={text => setNewPassword(text)}
                                    />
                                </>
                            }

                            <Button icon="content-save" mode="outlined" style={styles.button} onPress={() => updateProfile(customer.email)}>Salvar</Button>
                            <Button icon="account-edit" mode="outlined" style={styles.button} onPress={() => { setVisible(!visible) }}>Alterar senha</Button>

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>


                        </View>
                    </View>

                    <View style={styles.container}>
                        <Paragraph style={{ fontWeight: 'bold' }}>Meus Produtos</Paragraph>
                        <ProductsSVG width={128} height={128} style={{ alignSelf: 'center', justifyContent: 'center', margin: 4 }} />

                        <Paragraph style={styles.subtitle}>
                            Nesta seção estão listados todos {'\n'}os meus produtos.
                        </Paragraph>

                        {products?.map(product => (
                            <Chip
                                mode={'outlined'}
                                icon='tag-heart'
                                key={product.name}
                                style={styles.chip}
                                onPress={() => { }}>
                                {product.name}
                            </Chip>
                        ))}
                    </View>
                </ScrollView>

                :
                <ActivityIndicator style={{ marginTop: '50%' }} size="large" />
            }
        </View>
    );
}

export default Profile;