import React, { useEffect, useState } from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import * as yup from 'yup';
import styles from './style';
import Contact from '../../components/Contacts';
import { toastError, toastValidation, toastSuccess } from '../../utils/toast-utils';
import { setLocale } from 'yup';
import { useNavigate } from '../../hooks/useNavigate';
import { SystemRoutes } from '../../ts/enums/routes';
import { Button, Paragraph } from 'react-native-paper';
import ProductsSVG from '../../assets/products.svg';
import SelectBox from '../../components/SelectBox';
import { ListItem } from '../../ts/interfaces/items-interfaces';
import BackButton from '../../components/BackButton';
import { Fair } from '../../ts/interfaces/fair-interfaces';
import { productAssociation, findAllProducts, getCustomerById } from '../../controllers';
import { Product } from '../../ts/interfaces/product-interfaces';

function Products() {
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
        findAllProducts().then((response) => {
            setItems(response.data.map((item: Product): ListItem => ({
                name: item.name + '',
                id: item.id + ''
            })));
        })

        getCustomerById().then((response) => {
            setSelectedItems(response.data.products.map((item: Fair) => item.id + ''));
        });
    }, []);

    async function handleSubmit(): Promise<void> {
        validSchema.validate({ fairs: selectedItems }).then(async () => {
            productAssociation(selectedItems).then(() => {
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
                <ScrollView
                    horizontal={false}
                    contentContainerStyle={{
                        paddingHorizontal: 0,
                        paddingBottom: 0,
                    }}
                >
                    <View style={[styles.container, { marginTop: 32 }]}>
                        <BackButton />

                        <ProductsSVG width={132} height={132} style={styles.image} />

                        <Paragraph style={{ marginBottom: 8 }}>
                            Olá, precisa atualizar seus produtos?
                        </Paragraph>

                        <SelectBox
                            selectText='Selecione seus produtos'
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

export default Products;