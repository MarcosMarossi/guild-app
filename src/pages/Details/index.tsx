import React, { useEffect, useState } from 'react';
import { useRoute } from "@react-navigation/native";
import { ActivityIndicator, Appbar, Paragraph } from 'react-native-paper';
import { Image, Linking, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import styles from './style';
import { Data } from '../../ts/interfaces/fair-interfaces';
import { User } from '../../ts/interfaces/user-interfaces';
import api from '../../services';
import { formatNumberUtil } from '../../utils/format-utils';
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
      setCustomers(response.data.users);

      console.log(response.data.users);
    });
  }, []);

  const handleLinkToWhatsapp = (props: string) => {
    Linking.openURL(`whatsapp://send?phone=55${props}`);
  }

  return (
    <View >
      <Appbar.Header style={{ backgroundColor: '#fff' }}>
        <Appbar.BackAction onPress={() => { changeRoute(SystemRoutes.Main) }} color="#448aff" />
        <Appbar.Content title="Detalhes" color="#448aff" />
      </Appbar.Header>

      {data ?
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 8,
            paddingBottom: 84,
          }}
        >
          <View style={styles.container}>
            <Image style={styles.image} source={require('../../assets/impedir.png')} />
            <Paragraph style={styles.title}>{data.siteName}</Paragraph>
            <Paragraph style={styles.description}>Descrição: {data.description}</Paragraph>
            <Paragraph style={styles.description}>Endereço: {data.address}, {data.city + ' - ' + data.uf}</Paragraph>
            <Paragraph style={styles.description}>Número de Feirantes: <Paragraph>{customers.length}</Paragraph></Paragraph>
          </View>

          {customers.length !== 0 ? customers.map(customer => (
            <View key={customer.email} style={styles.container}>
              {/* <Image style={styles.image} source={cart} />   */}
              <Paragraph>Feirante: {customer.name}</Paragraph>
              <Paragraph style={{ fontSize: 14 }}>Produtos: {customer.listProduct}</Paragraph>
              <Paragraph style={styles.description}>E-mail: {customer.email}</Paragraph>
              <Paragraph style={styles.description}>Whatsapp: {formatNumberUtil(customer.whatsapp)}</Paragraph>

              <TouchableOpacity onPress={() => handleLinkToWhatsapp(customer.whatsapp)} style={styles.button}>
                {/* <Image style={styles.buttonIcon} source={whatsappIcon}/> */}
                <Text style={styles.buttonText}>Entrar em contato</Text>
              </TouchableOpacity>
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