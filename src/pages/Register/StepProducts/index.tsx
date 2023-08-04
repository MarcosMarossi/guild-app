import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { useRoute } from "@react-navigation/native";
import { Text, Appbar } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import * as yup from 'yup';

import styles from './styles';
import Contact from '../../../components/Contacts';
import { setLocale } from 'yup';
import api from '../../../services';
import { useNavigate } from '../../../hooks/useNavigate';
import { SystemRoutes } from '../../../ts/enums/routes';
import { toastValidation } from '../../../utils/toast-utils';

interface Params {
  name: string,
  email: string,
  whatsapp: string,
  password: string
}

interface Item {
  id: number,
  name: string
}

interface ListItem {
  label: string,
  value: string
}

const StepProducts = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [items, setItems] = useState<ListItem[]>([]);

  const screenHeight = Dimensions.get('window').height;
  const route = useRoute();
  const routeParams = route.params as Params;
  const { changeRoute, goBack } = useNavigate();
  
  setLocale({
    mixed: {
      required: 'A lista de ${path} deve ser preenchida.',
    }
  });

  const validSchema = yup.object().shape({
    produtos: yup.array().of(yup.number()).required()
  });

  useEffect(() => {
    api.get("/products").then((response) => {
      const { data } = response;
      setItems(data.map((item: Item): ListItem => ({
        label: item.name + '', 
        value: item.id + ''
      })));        
    });
  }, []);

  function handleNavigationToRegister() {
    changeRoute(SystemRoutes.Register);
  } 

  function handleNavigationToFair() {
    validSchema.validate({ produtos: selectedItems }).then( valid => {
      changeRoute(SystemRoutes.StepFair, {
        idsProduct: selectedItems.map(value => ({
          idProduct: value,
        })),
        name: routeParams.name,
        email: routeParams.email,
        whatsapp: routeParams.whatsapp,
        password: routeParams.password,
      })
    }).catch(function (err) {
      err.errors.map((error: any) => {
        toastValidation(`${error as string}`);
      });            
    });
  }

  return (
    <View>            
      <Appbar.Header style={{ backgroundColor: 'white' }}>
          <Appbar.BackAction onPress={handleNavigationToRegister} color="#448aff" />
          <Appbar.Content title="Adicionar Produtos" color="#448aff" /> 
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
              placeholder="Selecione seus produtos"
              containerStyle={{ height: 50 }}              
              items={items} 
              multiple={true}
              multipleText="Itens selecionados: %d"
              setItems={item => setSelectedItems(item)}
              searchable={true}
              searchPlaceholder="Busque um produto"
              searchPlaceholderTextColor="gray"
            />   
            <Image style={styles.image} source={require('../../assets/sacola.png')}/> 
            
            <TouchableOpacity onPress={handleNavigationToFair} style={styles.button}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>  
          </View> 

          <Contact>Precisa de algum produto não lisado?</Contact>   
        </ScrollView>
      </View>      
    </View>
  );
}

export default StepProducts;