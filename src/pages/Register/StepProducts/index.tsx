import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { Button, Paragraph } from 'react-native-paper';
import MultiSelect from 'react-native-multiple-select';
import styles from './styles';
import Contact from '../../../components/Contacts';
import api from '../../../services';
import { useNavigate } from '../../../hooks/useNavigate';
import { SystemRoutes } from '../../../ts/enums/routes';
import { useFarmerContext } from '../../../store';
import ProductsSVG from '../../../assets/products.svg';

interface Product {
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
  const screenHeight: number = Dimensions.get('window').height;

  const { changeRoute } = useNavigate();
  const { fair, setFair } = useFarmerContext();

  useEffect(() => {
    api.get<Product[]>("/products").then((response) => {
      setItems(response.data.map((item: Product): ListItem => ({
        name: item.name + '',
        id: item.id + ''
      })));
    });
  }, []);

  function handleNavigationToRegister(): void {
    changeRoute(SystemRoutes.Register);
  }

  function handleNavigationToFair(): void {
    const idsProduct = selectedItems.map(value => ({
      idProduct: value,
    }));

    setFair({ ...fair, idsProduct });
    changeRoute(SystemRoutes.StepFair);
  }

  return (
    <View>
      <View style={{ height: "auto", maxHeight: screenHeight }}>
        <View style={[styles.container, { marginTop: 32 }]}>
          <ProductsSVG width={128} height={128} style={{ alignSelf: 'center', justifyContent: 'center', margin: 4 }} />

          <Paragraph style={{ marginBottom: 8 }}>Olá, precisamos que preencha as informações de usuário para gerenciamento de suas feiras livres!</Paragraph>
          <MultiSelect
            hideSubmitButton={true}
            uniqueKey="id"
            displayKey="name"
            items={items}
            onSelectedItemsChange={(items: string[]) => setSelectedItems([...items])}
            selectedItems={selectedItems}
            selectText="Selecione seus produtos"
            searchInputPlaceholderText="Busque os itens"
            tagRemoveIconColor="#5e35b1"
            tagBorderColor="#5e35b1"
            textColor='#424242'
            tagTextColor="#5e35b1"
            selectedItemTextColor="#5e35b1"
            selectedItemIconColor="#5e35b1"
            itemTextColor="#5e35b1"
            styleListContainer={{ height: 128 }}
            searchInputStyle={{ color: '#5e35b1', height: 50 }}
            submitButtonColor="#5e35b1"
            styleIndicator={{ height: 32, borderColor: '#5e35b1' }}
          />
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 0,
              paddingBottom: 0,
            }}
          >
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Button style={{ margin: 16 }} icon="arrow-left-circle-outline" mode="contained" onPress={handleNavigationToRegister}>
                Anterior
              </Button>
              <Button style={{ margin: 16 }} icon="arrow-right-circle-outline" mode="contained" onPress={handleNavigationToFair}>
                Próximo
              </Button>
            </View>
            <Contact>Precisa de algum produto não listado? Envie-nos uma mensagem!</Contact>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

export default StepProducts;