import React, { useEffect, useState } from 'react';
import { useRoute } from "@react-navigation/native";
import { ActivityIndicator, Appbar, Button, Modal, Paragraph, Portal } from 'react-native-paper';
import { Linking, Platform } from 'react-native';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './style';
import { Data } from '../../ts/interfaces/fair-interfaces';
import { User } from '../../ts/interfaces/user-interfaces';
import api from '../../services';
import { useNavigate } from '../../hooks/useNavigate';
import { SystemRoutes } from '../../ts/enums/routes';
import FairSVG from '../../assets/fair.svg';
import ProductsSVG from '../../assets/products.svg';

interface Params {
  id: number;
}

const Details = () => {
  const [data, setData] = useState<Data>({} as Data);
  const [customers, setCustomers] = useState<User[]>([]);
  const { changeRoute } = useNavigate();
  const [visible, setVisible] = React.useState(false);
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

  const handleLinkToMap = (lat: number, long: number): void => {
    const url: string = Platform.OS === 'ios'
      ? `http://maps.apple.com/?daddr=${lat},${long}`
      : `https://www.google.com/maps/dir/?api=1&destination=${lat},${long}&dir_action=navigate`;

    Linking.openURL(url);
  }

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <View>
      {data ?
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 8,
          }}
        >
          <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}>
              <Paragraph>Example Modal.  Click outside this area to dismiss.</Paragraph>
            </Modal>
          </Portal>

          <View style={[styles.container, { marginTop: 32 }]}>
            <Button style={{ width: 118, backgroundColor: '#c62828' }} icon="keyboard-backspace" mode="contained" onPress={() => changeRoute(SystemRoutes.Main)}>
              Voltar
            </Button>

            <Paragraph style={{ marginTop: 16, marginBottom: 16 }}>Olá, bom vindo(a) a feira: {data.siteName}, ela está disponível nos seguintes períodos: {data.dayWeek}. Venha visitar!</Paragraph>
            <FairSVG width={128} height={128} style={{ alignSelf: 'center', justifyContent: 'center', margin: 4 }} />
            <Paragraph style={{ fontWeight: 'bold' }}>Outas informações</Paragraph>
            <Paragraph style={styles.description}>Descrição: {data.description}</Paragraph>
            <Paragraph style={styles.description}>Endereço: {data.address}, {data.city + ' - ' + data.uf}</Paragraph>
            <Paragraph style={styles.description}>Quantidade de parceiros: <Paragraph>{customers.length}</Paragraph></Paragraph>

            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 16, gap: 50 }}>
              <Button mode='elevated' icon="map-marker-circle" onPress={() => handleLinkToMap(data.latitude, data.longitude)}>Ir até o local</Button>
              <Button mode='elevated' icon="star-shooting-outline" onPress={showModal}>
                Avaliações
              </Button>
            </View>
          </View>

          {customers && customers.length !== 0 ? customers.map(customer => (
            <View key={customer.email} style={styles.container}>
              <ProductsSVG width={128} height={128} style={{ alignSelf: 'center', justifyContent: 'center', margin: 4, width: 16, height: 16 }} />
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