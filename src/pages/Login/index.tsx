import React, { useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigate } from '../../hooks/useNavigate';
import { SystemRoutes } from '../../ts/enums/routes';
import LogoSVG from '../../assets/logo.svg';
import styles from './style';
import { authentication } from '../../controllers';
import { Link } from '@react-navigation/native';
import { showToast } from '../../utils/message-utils';
import BackButton from '../../components/BackButton';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [token] = useState<string>('');
    const { changeRoute } = useNavigate();

    const screenHeight: number = Dimensions.get('window').height;

    function handleNavigationToMain(): void {
        changeRoute(SystemRoutes.Main, { token });
    }

    async function handleSubmit(): Promise<void> {
        authentication({ email, password })
            .then(async response => {
                const responseBody = response.data.type + ' ' + response.data.token;
                const id = response.data.id + '';
                await AsyncStorage.setItem('@storage_Id', id);
                await AsyncStorage.setItem('@storage_Key', responseBody);
                handleNavigationToMain();
            }).catch(() => {
                showToast('Credenciais inválidas. Por favor, digite um e-mail e senha válidos.')
            });
    }

    return (
        <View>
            <View style={{ height: "auto", maxHeight: screenHeight }}>
                <ScrollView
                    contentContainerStyle={{
                        paddingHorizontal: 0,
                        paddingBottom: 78,
                    }}
                >
                    <View style={[styles.container, { marginTop: 40 }]}>
                        <BackButton />
                        
                        <LogoSVG width={100} height={100} style={styles.image} />

                        <Text style={styles.description}>
                            Bem-vindo(a) novamente!
                            {"\n"}Faça a login com seu e-mail e senha para gerenciar suas feiras.
                        </Text>

                        <TextInput
                            keyboardType="email-address"
                            mode="outlined"
                            style={styles.input}
                            label="Email"
                            value={email}
                            accessibilityIgnoresInvertColors
                            onChangeText={text => setEmail(text)}
                        />

                        <TextInput
                            mode="outlined"
                            style={styles.input}
                            label="Senha"
                            value={password}
                            secureTextEntry={true}
                            onChangeText={text => setPassword(text)}
                        />

                        <Link to={{ screen: SystemRoutes.StepCode }} style={styles.link}>
                            Esqueci minha senha
                        </Link>

                        <Button style={{ marginTop: 32 }} icon="login" mode="contained" onPress={handleSubmit}>
                            Entrar
                        </Button>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default Login;