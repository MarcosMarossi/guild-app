import React, { useState } from 'react';
import { View, Text, Alert, Image, Dimensions } from 'react-native'
import { Appbar, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as yup from 'yup';
import { setLocale } from 'yup';

import styles from './style';
import { useNavigate } from '../../hooks/useNavigate';
import { SystemRoutes } from '../../ts/enums/routes';
import { toastValidation } from '../../utils/toast-utils';

function Register() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [whatsapp, setWhatsapp] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { changeRoute } = useNavigate();
    
    const screenHeight = Dimensions.get('window').height;

    setLocale({
        mixed: {
          required: 'O campo ${path} não deve estar em branco!',
        },        
        string: {
            min: 'O campo de ${path} deve ser maior que ${min} caracteres',
            max: 'O campo de ${path} deve ser menor que ${max} caracteres',
            email: 'Por favor, digite um email válido!'
        },
    });

    const navigation = useNavigation();

    function handleNavigationToMain() {
        navigation.goBack();
    }

    const validSchema = yup.object().shape({
        nome: yup.string().min(5).required(),
        email: yup.string().min(8).email().required(),        
        whatsapp: yup.string().min(11).max(11).required(),
        senha: yup.string().min(8).required(),
    });

    function handleNavigationToProducts() {
        validSchema.validate( { nome: name, email: email, whatsapp: whatsapp, senha: password }).then( () => {
            changeRoute(SystemRoutes.StepProduct, { name, email, whatsapp, password })
        }).catch(function (err: { errors: any[]; }) {           
            err.errors.map((error: any) => {
                toastValidation(`${error as string}.`);
            });            
        });
    }
    
    return (
        <View>
            <Appbar.Header style={{ backgroundColor: 'white' }}>
                <Appbar.BackAction onPress={handleNavigationToMain} color="#448aff" />
                <Appbar.Content title="Cadastro" color="#448aff" /> 
            </Appbar.Header>
            
            <View style={{ height: "auto", maxHeight: screenHeight}}>                
                <ScrollView 
                    contentContainerStyle={{ 
                        paddingHorizontal: 0,
                        paddingBottom: 78,
                    }}
                >  
                    <View style={styles.container}>  
                        {/* <Image style={styles.image} source={logo}/>     
                        <LogoImage /> */}

                        <TextInput
                            mode="outlined"
                            style={[styles.input, {marginTop: 16}]}
                            label="Nome completo"
                            value={name}
                            onChangeText={text => setName(text) }
                        />

                        <TextInput
                            keyboardType={"email-address"}
                            mode="outlined"
                            style={styles.input}
                            label="E-mail"
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />

                        <TextInput
                            keyboardType={"numeric"}
                            mode="outlined"
                            style={styles.input}
                            label="Whatsapp"
                            maxLength={11}
                            value={whatsapp}
                            onChangeText={text => setWhatsapp(text)}
                        />

                        <TextInput
                            mode="outlined"
                            style={styles.input}                    
                            label="Senha"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={text => setPassword(text)}
                        />  

                        <TouchableOpacity onPress={handleNavigationToProducts} style={styles.button}>
                            <Text style={styles.buttonText}>Registrar</Text>
                        </TouchableOpacity> 
                    </View>                
                </ScrollView>
            </View>
        </View>
    );
}

export default Register;