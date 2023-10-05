import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Paragraph, TextInput, Button } from 'react-native-paper';
import styles from './style';
import { error, success } from '../../utils/toast-utils';
import { Product } from '../../ts/interfaces/product-interfaces';
import { useNavigate } from '../../hooks/useNavigate';
import { SystemRoutes } from '../../ts/enums/routes';
import UserSVG from '../../assets/user.svg';
import BackButton from '../../components/BackButton';
import { getCustomerById, updateCustomer } from '../../controllers';
import Loading from '../../components/Loading';

function Profile() {
    const [products, setProducts] = useState<Product[]>();
    const [whatsapp, setWhatsapp] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);
    const { changeRoute } = useNavigate();

    useEffect(() => {
        getCustomerById().then(response => {
            setProducts(response.data.products);
            setEmail(response.data.email);
            setName(response.data.name);
            setWhatsapp(response.data.whatsapp);
        });
    }, []);

    async function updateProfile() {
        updateCustomer({
            name, email, whatsapp, password, newPassword
        }).then(() => {
            success('A alteração solicitada ocorreu com sucesso.');
            changeRoute(SystemRoutes.Main);
        }).catch((e) => {
            error('Não conseguimos cadastrar suas atualizações.');
        });
    }

    return (
        <View>
            {products ?
                <ScrollView
                    contentContainerStyle={{
                        paddingHorizontal: 8,
                        paddingBottom: 100,
                    }}>
                    <View style={[styles.container, { marginTop: 32 }]}>

                        <BackButton />
                        <Paragraph style={{ marginTop: 16 }}>Olá {name}, nesta página você pode alterar suas informações!</Paragraph>
                        <UserSVG width={128} height={128} style={styles.image} />

                        <View>
                            <TextInput
                                mode="outlined"
                                style={{ marginTop: 8 }}
                                label="Nome"
                                value={name}
                                onChangeText={text => setName(text)}
                            />
                            <TextInput
                                keyboardType={"email-address"}
                                mode="outlined"
                                style={{ marginTop: 8 }}
                                label="E-mail"
                                value={email}
                                onChangeText={text => setEmail(text)}
                            />
                            <TextInput
                                keyboardType={"numeric"}
                                mode="outlined"
                                style={{ marginTop: 8 }}
                                label="WhatsApp"
                                value={whatsapp}
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

                            <Button icon="content-save" mode="outlined" style={styles.button} onPress={() => updateProfile()}>Salvar</Button>
                            <Button icon="account-edit" mode="outlined" style={styles.button} onPress={() => { setVisible(!visible) }}>Alterar senha</Button>
                        </View>
                    </View>
                </ScrollView>
                :
                <>
                    <Loading />                    
                </>
            }
        </View>
    );
}

export default Profile;