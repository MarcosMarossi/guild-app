import React, { useState } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Appbar, TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import * as yup from 'yup';
import { setLocale } from 'yup';
import styles from './style';
import api from '../../../services';
import { toastError, toastSuccess, toastValidation } from '../../../utils/toast-utils';
import { useNavigate } from '../../../hooks/useNavigate';
import { SystemRoutes } from '../../../ts/enums/routes';

function Fair() {    
    const [siteName, setSiteName] = useState<string>('');  
    const [description, setDescription] = useState<string>('');  
    const [address, setAddress] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [uf, setUf] = useState<string>('');
    const screenHeight = Dimensions.get('window').height;
    const { changeRoute } = useNavigate();

    setLocale({
        mixed: {
          required: 'O campo ${path} não deve estar em branco!',
        },        
        string: {
            min: 'O campo de ${path} deve ser maior que ${min}',
            max: 'O campo de ${path} deve ser menor que ${max}',
        }
    });

    const validSchema = yup.object().shape({
        siteName: yup.string().min(5).required(),
        description: yup.string().min(8).required(),        
        address: yup.string().min(8).required(),
        city: yup.string().min(3).required(),
        uf: yup.string().max(2).required(),
    });
    
    function handleNavigationToMain() {
        changeRoute(SystemRoutes.Main);
        
    }

    async function handleSubmit(){        
        validSchema.validate({
            siteName,
            description,
            address,
            city,
            uf,
        }).then(async valid => {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address},${city},${uf}&key=AIzaSyAsh3H548BX7mdQ9l0xpuCJPRJRAWNBgzo`);
            const completeAddress = response.data.results[0].formatted_address;       
            const { lat, lng } = response.data.results[0].geometry.location;

            api.post('/fairs', {
                siteName: siteName.trim(),
                description: description.trim(),
                address: completeAddress,
                latitude: lat,
                longitude: lng,
                city: city.trim(),
                uf: uf.trim(),
                dayWeek: 'Todos os dias',
            }).then(response => {
                toastSuccess('Feira cadastrada com sucesso!');
                handleNavigationToMain();
            }).catch(error => {
                toastError('Ocorreu um erro ao cadastrar a feira.')
            });              
        }).catch(error => {            
            error.errors.map((error: string) => {
                toastValidation(`${error as string}.`);
            });
        })

    }

    return (
        <View>
            <Appbar.Header style={{ backgroundColor: '#fff'}}>
                <Appbar.BackAction onPress={handleNavigationToMain} color="#448aff" />
                <Appbar.Content title="Localidade" color="#448aff" /> 
            </Appbar.Header>

            <View style={{ height: "auto", maxHeight: screenHeight}}>                
                <ScrollView 
                    contentContainerStyle={{ 
                        paddingHorizontal: 0,
                        paddingBottom: 78,
                    }}
                > 
                    <View style={styles.container}>
                        {/* <Image style={styles.image} source={require('../../../assets/logo.png')}/> */}
                        
                        <TextInput
                            mode="outlined"
                            style={styles.input}
                            label="Nome do sítio ou feira"
                            value={siteName}
                            onChangeText={text => setSiteName(text)}
                        />

                        <TextInput
                            mode="outlined"
                            style={styles.input}
                            label="Descrição"
                            value={description}
                            onChangeText={text => setDescription(text)}
                        />

                        <TextInput
                            mode="outlined"
                            style={styles.input}
                            label="Endereço"
                            value={address}
                            onChangeText={text => setAddress(text)}
                        />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                            <TextInput
                                mode="outlined"
                                style={[styles.input, { width: "70%", marginRight: 0 }]}
                                label="Cidade"
                                value={city}
                                onChangeText={text => setCity(text)}
                            />

                            <TextInput
                                mode="outlined"
                                style={[styles.input, { width: "25%", marginLeft: 0 }]}
                                label="UF"
                                autoCapitalize="characters"
                                maxLength={2}
                                value={uf}
                                autoCorrect={false}
                                onChangeText={text => setUf(text)}
                            />
                        </View>

                        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                            <Text style={[styles.buttonText, {justifyContent: 'flex-end'}]}>Cadastrar</Text>
                        </TouchableOpacity>     

                    </View> 
                </ScrollView>   
            </View>              
        </View>
    );
}

export default Fair;