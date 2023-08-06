import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, View } from 'react-native';
import { useRoute } from "@react-navigation/native";
import { Appbar, Button } from 'react-native-paper';
import MultiSelect from 'react-native-multiple-select';
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
  id: string,
  name: string
}

const StepProducts = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [items, setItems] = useState<ListItem[]>([]);

  const screenHeight = Dimensions.get('window').height;
  const route = useRoute();
  const routeParams = route.params as Params;
  const { changeRoute } = useNavigate();

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
        name: item.name + '',
        id: item.id + ''
      })));
    });
  }, []);

  function handleNavigationToRegister() {
    changeRoute(SystemRoutes.Register);
  }

  function handleNavigationToFair() {
    validSchema.validate({ produtos: selectedItems }).then(valid => {
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

      <View style={{ height: "auto", maxHeight: screenHeight }}>
        <View style={styles.container}>
          <MultiSelect
            hideSubmitButton={true}
            uniqueKey="id"
            displayKey="name"
            items={items}
            onSelectedItemsChange={(items: string[]) => setSelectedItems([...items])}
            selectedItems={selectedItems}
            selectText="Selecione seus produtos"
            searchInputPlaceholderText="Busque os itens"
            tagRemoveIconColor="#212121"
            tagBorderColor="#212121"
            textColor='#212121'
            tagTextColor="#212121"
            selectedItemTextColor="#212121"
            selectedItemIconColor="#212121"
            itemTextColor="#212121"
            searchInputStyle={{ color: '#212121', height: 50 }}
            submitButtonColor="#212121"
            styleIndicator={{ height: 32, borderColor: 'grey' }}
          />
          
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 0,
              paddingBottom: 0,
            }}
          >
            <Image style={styles.image} source={require('../../../assets/sacola.png')} />

            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Button style={{ margin: 16 }} icon="arrow-left-circle-outline" mode="contained" onPress={handleNavigationToFair}>
                Anterior
              </Button>
              <Button style={{ margin: 16 }} icon="arrow-right-circle-outline" mode="contained" onPress={() => changeRoute(SystemRoutes.Register)}>
                Próximo
              </Button>
            </View>
          </ScrollView>
        </View>
        <Contact>Precisa de algum produto não lisado?</Contact>
      </View>
    </View>
  );
}

export default StepProducts;