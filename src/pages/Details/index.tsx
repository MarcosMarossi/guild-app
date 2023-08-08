import React, { useEffect, useState } from 'react';
import { useRoute } from "@react-navigation/native";
import { ActivityIndicator, Appbar, Button, Paragraph } from 'react-native-paper';
import { Linking } from 'react-native';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import StoreSvg from '../../assets/store.svg';
import FarmerSvg from '../../assets/farmer.svg';
import styles from './style';
import { Data } from '../../ts/interfaces/fair-interfaces';
import { User } from '../../ts/interfaces/user-interfaces';
import api from '../../services';
import { useNavigate } from '../../hooks/useNavigate';
import { SystemRoutes } from '../../ts/enums/routes';

interface Params {
  id: number;
}

const Details = () => {
  const [data, setData] = useState<Data>({} as Data);
  const [customers, setCustomers] = useState<User[]>([]);
  const { changeRoute } = useNavigate();

  const route = useRoute();
  const routeParams = route.params as Params;

  useEffect(() => {
    api.get(`fairs/${routeParams.id}`).then(response => {
      setData(response.data);
      setCustomers(response.data.customers);
    });
  }, []);

  const handleLinkToWhatsapp = (props: string) => {
    Linking.openURL(`whatsapp://send?phone=55${props}`);
  }

  return (
    <View >
      <Appbar.Header style={{ backgroundColor: '#fff' }}>
        <Appbar.BackAction onPress={() => { changeRoute(SystemRoutes.Main) }} color="#c62828" />
        <Appbar.Content title="Detalhes" color="#c62828" />
      </Appbar.Header>

      {data ?
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 8,
            paddingBottom: 84,
          }}
        >
          <View style={styles.container}>
            <StoreSvg style={{ alignSelf: 'center', justifyContent: 'center', margin: 4, width: 16, height: 16 }} />
            <Paragraph style={styles.title}>Nome da feira: {data.siteName}</Paragraph>
            <Paragraph style={styles.description}>Descrição: {data.description}</Paragraph>
            <Paragraph style={styles.description}>Endereço: {data.address}, {data.city + ' - ' + data.uf}</Paragraph>
            <Paragraph style={styles.description}>Número de Feirantes: <Paragraph>{customers.length}</Paragraph></Paragraph>
          </View>

          {customers && customers.length !== 0 ? customers.map(customer => (
            <View key={customer.email} style={styles.container}>
              <FarmerSvg height={80} width={80} style={{ alignSelf: 'center', justifyContent: 'center', margin: 4, width: 16, height: 16 }} />
              <Paragraph>Nome do Feirante: {customer.name}</Paragraph>
              <Paragraph style={{ fontSize: 14 }}>Produtos anunciados: {customer.listProduct}</Paragraph>
              <Paragraph style={styles.description}>E-mail: {customer.email}</Paragraph>

              <Button buttonColor='#4caf50' style={{ marginTop: 16 }} icon="whatsapp" mode="contained" onPress={() => handleLinkToWhatsapp(customer.whatsapp)}>
                Entrar em contato
              </Button>
            </View>
          ))
            :
            <View style={styles.container}>
              <Paragraph>Não há feirantes vinculados!</Paragraph>
              <Paragraph style={{ marginTop: 24 }}>O aplicativo não encontrou nenhum produtor ou feirante cadastrado nesta localidade.</Paragraph>
            </View>
          }
        </ScrollView>
        :
        <View>
          <ActivityIndicator style={{ marginTop: '50%' }} size="large" />
        </View>
      }
    </View>
  );
};

export default Details;