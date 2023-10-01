import React, { useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import * as yup from 'yup';
import styles from './style';
import Contact from '../../components/Contacts';
import { toastError, toastValidation, toastSuccess } from '../../utils/toast-utils';
import { setLocale } from 'yup';
import { useNavigate } from '../../hooks/useNavigate';
import { SystemRoutes } from '../../ts/enums/routes';
import { Button, Paragraph } from 'react-native-paper';
import FairSVG from '../../assets/fair.svg';
import SelectBox from '../../components/SelectBox';
import { ListItem } from '../../ts/interfaces/items-interfaces';
import BackButton from '../../components/BackButton';
import { Fair } from '../../ts/interfaces/fair-interfaces';
import { associate, findAllFairs } from '../../controllers';

function Fairs() {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [items, setItems] = useState<ListItem[]>([]);
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
            const { data } = response;
            setItems(data.map((item: Fair): ListItem => ({
                name: item.siteName + '',
                id: item.id + ''
            })));

            setSelectedItems(data.map((item: Fair) => item.id + ''));
        });
    }, []);

    async function handleSubmit(): Promise<void> {
        validSchema.validate({ fairs: selectedItems }).then(async () => {
            associate(selectedItems).then(() => {
                toastSuccess('Cadastro realizado com sucesso!');
                changeRoute(SystemRoutes.Main);
            }).catch(() => {
                toastError('Falha ao registrar a nova feira');
            })
        }).catch(function (err) {
            err.errors.map((error: any) => {
                toastValidation(`${error as string}.`);
            });
        });
    }

    return (
        <View>
            <View style={{ height: "auto", maxHeight: screenHeight }}>
                <View style={[styles.container, { marginTop: 32 }]}>
                    <BackButton />

                    <FairSVG width={148} height={148} style={styles.image} />

                    <Paragraph style={{ marginBottom: 8 }}>
                        Olá, precisamos que preencha as informações de usuário para gerenciamento de suas feiras livres!
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
            </View>
        </View>
    );
}

export default Fairs;