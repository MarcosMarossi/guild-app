import React, { useState } from 'react';
import { TouchableOpacity, View, Image, Alert, ScrollView, Dimensions } from 'react-native';
import { TextInput, Text, Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './style';
import { useNavigate } from '../../hooks/useNavigate';
import { SystemRoutes } from '../../ts/enums/routes';
import api from '../../services';
import { toastError } from '../../utils/toast-utils';

const Login = () => {
    
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [token] = useState<string>('');
    const { changeRoute } = useNavigate();
    
    const screenHeight = Dimensions.get('window').height;
    
    function handleNavigationToMain() {     
        changeRoute(SystemRoutes.Main, { token });
    }

    async function authentication() {        
        api.post('/auth', {
            email: email.trim(),
            customerPassword: password.trim()
        }).then(async response => {
            const responseBody = response.data.tipo + ' ' + response.data.token;  
            const id = response.data.id + '';      
            await AsyncStorage.setItem('@storage_Id', id);         
            await AsyncStorage.setItem('@storage_Key', responseBody);
            handleNavigationToMain();
        }). catch(error => {
            toastError('Credenciais inválidas. Por favor, digite um e-mail e senha válidos.')
        });
    }

    return (
        <View>            
            <Appbar.Header style={{ backgroundColor: 'white' }}>
                <Appbar.BackAction onPress={handleNavigationToMain} color="#448aff" />
                <Appbar.Content title="Entrar" color="#448aff" /> 
            </Appbar.Header>

            <View style={{ height: "auto" , maxHeight: screenHeight }}>                
                <ScrollView 
                    contentContainerStyle={{ 
                        paddingHorizontal: 0,
                        paddingBottom: 78,
                    }}
                >  
                    <View style={styles.container}>
                        {/* <Image style={styles.image} source={logo}/> */}
                        
                        <Text style={[styles.description, { justifyContent: 'center', textAlign: 'center'}]}>
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

                        <TouchableOpacity onPress={authentication} style={styles.button}>
                            <Text style={styles.buttonText}>Entrar</Text>
                        </TouchableOpacity>           
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default Login;