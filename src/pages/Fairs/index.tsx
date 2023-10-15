import React, { useEffect, useState } from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import * as yup from 'yup';
import styles from './style';
import Contact from '../../components/Contacts';
import { setLocale } from 'yup';
import { useNavigate } from '../../hooks/useNavigate';
import { SystemRoutes } from '../../ts/enums/routes';
import { Button, Paragraph } from 'react-native-paper';
import FairSVG from '../../assets/fair.svg';
import SelectBox from '../../components/SelectBox';
import { ListItem } from '../../ts/interfaces/items-interfaces';
import BackButton from '../../components/BackButton';
import { Fair } from '../../ts/interfaces/fair-interfaces';
import { fairAssociation, findAllFairs, getCustomerById } from '../../controllers';
import { showToast } from '../../utils/message-utils';

function Fairs() {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [items , setItems] = useState<ListItem[]>([]);
    const { changeRoute } = useNavigate();
    const screenHeight: number = Dimensions.get('window').height;

    const validSchema = yup.object().shape({
        fairs: yup.array().of(yup.number()).required()
    });

    setLocale({
        mixed: {
            required: 'Você precisa preencher a lista de feiras',
        }
    });

    useEffect(() => {
        findAllFairs().then((response) => {
            setItems(response.data.map((item: Fair): ListItem => ({
                name: item.siteName + '',
                id: item.id + ''
            })));
        })

        getCustomerById().then((response) => {
            setSelectedItems(response.data.fairs.map((item: Fair) => item.id + ''));
        });
    }, []);

    async function handleSubmit(): Promise<void> {
        validSchema.validate({ fairs: selectedItems }).then(async () => {
            fairAssociation(selectedItems).then(() => {
                showToast('Cadastro realizado com sucesso!');
                changeRoute(SystemRoutes.Main);
            }).catch(() => {
                showToast('Falha ao registrar a nova feira');
            })
        }).catch(function (err) {
            err.errors.map((error: any) => {
                showToast(`${error as string}.`);
            });
        });
    }

    return (
        <View>
            <View style={{ height: "auto", maxHeight: screenHeight }}>
                <ScrollView
                    contentContainerStyle={{
                        paddingHorizontal: 0,
                        paddingBottom: 0,
                    }}
                >
                    <View style={[styles.container, { marginTop: 40 }]}>
                        <BackButton />

                        <FairSVG width={132} height={132} style={styles.image} />

                        <Paragraph>
                            Olá, precisa atualizar suas feiras livres? Faça a edição aqui!
                        </Paragraph>

                        <SelectBox
                            selectText='Selecione suas feiras'
                            items={items}
                            selectedItems={selectedItems}
                            setSelectedItems={setSelectedItems}
                        />

                        <Button style={{ marginTop: 16 }} icon="update" mode="contained" onPress={handleSubmit}>
                            Atualizar
                        </Button>
                    </View>

                    <Contact>
                        Não precisa cadastrar seu ponto de vendas e quer uma feira não listada? Envie-nos uma mensagem!
                    </Contact>
                </ScrollView>
            </View>
        </View>
    );
}

export default Fairs;