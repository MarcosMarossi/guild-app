import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Image, Text, ScrollView, Dimensions } from 'react-native';
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Appbar, Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';

import styles from './style';
import Contact from '../../../components/Contacts';
import { setLocale } from 'yup';
import { useNavigate } from '../../../hooks/useNavigate';
import { SystemRoutes } from '../../../ts/enums/routes';
import api from '../../../services';
import { toastError, toastSuccess, toastValidation } from '../../../utils/toast-utils';

interface Item {
    id: number,
    siteName: string
  }
  
  interface ListItem {
    label: string,
    value: string
  }

interface Params {
    name: string,
    email: string,
    whatsapp: string,
    password: string,
    idsProduct: any
}

function StepFair() {
    const [selectedItems, setSelectedItems] = useState<ListItem[]>([]);
    const [items, setItems] = useState<ListItem[]>([]);
    const [checked, setChecked] = useState<boolean>(false);

    const screenHeight = Dimensions.get('window').height;
    const route = useRoute();
    const routeParams = route.params as Params;

    const { changeRoute, goBack } = useNavigate();

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
            label: item.siteName + '', 
            value: item.id + ''
          })));        
        });
      }, []);

    async function handleSubmit(){  
        validSchema.validate({ feiras: selectedItems }).then(valid => {
            api.post('/customers', {
                name: routeParams.name.trim(),
                email: routeParams.email.trim(),
                whatsapp: routeParams.whatsapp.trim(),
                customerPassword: routeParams.password.trim(),
                idsProduct: routeParams.idsProduct,
                idsFair: selectedItems.map(value => ({ idFair: value })),
            }).then(response => {                
                api.post('/auth', {
                    email: routeParams.email, 
                    customerPassword: routeParams.password,
                }).then(async response => {
                    await AsyncStorage.setItem('@storage_Key', response.data.tipo + ' ' + response.data.token);
                    await AsyncStorage.setItem('@storage_Id', String(response.data.id));
                    
                    toastSuccess('Cadastro realizado com sucesso');                   
                    
                    if(checked) {                       
                        handleNavigationToLocality();
                        return;                        
                    }
                    
                    handleNavigationToMain();
                })
            }).catch(error => {
                toastError('Falha ao registrar. Verifique novamente suas informações.');
            });
        }).catch(function (err) {
            err.errors.map((error: any) => {
                toastValidation(`${error as string}`);
            });            
        });
    }
    
    return(
        <View>
            <Appbar.Header style={{ backgroundColor: 'white' }}>
                <Appbar.BackAction onPress={() => goBack()} color="#448aff" />
                <Appbar.Content title="Adicionar Feiras" color="#448aff" /> 
            </Appbar.Header>

            <View style={{ height: "auto", maxHeight: screenHeight}}>
                
                <ScrollView 
                    contentContainerStyle={{ 
                        paddingHorizontal: 0,
                        paddingBottom: 78,
                    }}
                >
                    <View style={styles.container}>
                        <DropDownPicker
                            open
                            setOpen={() => {}}
                            setValue={() => {}}
                            value={[]}
                            style={{ height: 60 }}
                            placeholder="Feiras em que participa"
                            containerStyle={{ height: 50 }}
                            items={items} 
                            setItems={(item) => setSelectedItems(item)}
                            multiple={true}
                            multipleText="Itens selecionados: %d"
                            searchable={true}
                            searchPlaceholder='Busque uma feira'
                            searchPlaceholderTextColor='gray'                            
                        />

                        <Image style={styles.image} source={require('../../assets/impedir.png')}/> 

                        <Checkbox.Item
                            style={{ marginTop: 4 }}
                            label='Desejo cadastrar minha residência'
                            labelStyle={{color: 'red'}}
                            color='#5c6bc0'
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => {setChecked(!checked);}}
                        />

                        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                            <Text style={styles.buttonText}>Cadastrar</Text>
                        </TouchableOpacity>     
                    </View>

                    <Contact>Precisa de uma feira não lisada?</Contact>
                </ScrollView>
            </View>
        </View>
    );
}

export default StepFair;