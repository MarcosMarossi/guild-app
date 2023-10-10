import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { Button, Paragraph } from 'react-native-paper';
import styles from './styles';
import Contact from '../../../components/Contacts';
import { useNavigate } from '../../../hooks/useNavigate';
import { SystemRoutes } from '../../../ts/enums/routes';
import { useFarmerContext } from '../../../store';
import ProductsSVG from '../../../assets/products.svg';
import SelectBox from '../../../components/SelectBox';
import { findAllProducts } from '../../../controllers';

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
    findAllProducts().then((response) => {
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
        <View style={[styles.container, { marginTop: 40 }]}>
          <ProductsSVG width={128} height={128} style={styles.image} />

          <Paragraph style={{ marginBottom: 8 }}>Olá, precisamos que preencha as informações de usuário para gerenciamento de suas feiras livres!</Paragraph>
          
          <SelectBox
            selectText='Selecione seus produtos'
            items={items} 
            selectedItems={selectedItems} 
            setSelectedItems={setSelectedItems}                      
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