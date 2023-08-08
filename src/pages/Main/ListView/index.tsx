import React from 'react';
import { View } from 'react-native'
import { Card, Paragraph } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigate } from "../../../hooks/useNavigate";
import styles from './style';
import { Point } from '../../../ts/interfaces/point-interfaces';
import { SystemRoutes } from '../../../ts/enums/routes';
import StoreSvg from '../../../assets/store.svg';

interface IProps {
    points: Point[];
}

function List({ points }: IProps) {
    const { changeRoute } = useNavigate();

    function handleNavigateToDetail(id: number) {
        changeRoute(SystemRoutes.Details, { id });
    }

    return (
        <View style={{ flex: 1 }}>
            {points.length !== 0 ?
                <ScrollView
                    contentContainerStyle={{
                        paddingHorizontal: 8,
                        paddingBottom: 8,
                    }}>
                    {points.map(point => (
                        <Card style={styles.card} onPress={() => handleNavigateToDetail(point.id)} key={point.id}>
                            <Card.Content>
                                <StoreSvg width={100} height={100} style={{ alignSelf: 'center', justifyContent: 'center', margin: 4, width: 16, height: 16 }} />
                                <Paragraph>Nome da feira: {point.siteName}</Paragraph>
                                <Paragraph style={styles.description}>Descrição: {point.description}</Paragraph>
                                <Paragraph style={styles.description}>Endereço: {point.address}, {point.city + ' - ' + point.uf}</Paragraph>
                                <Paragraph style={styles.description}>Aberto em: {point.dayWeek}</Paragraph>
                            </Card.Content>
                        </Card>
                    ))}

                </ScrollView>
                :
                <View>
                    <Paragraph>adfad</Paragraph>
                </View>
            }
        </View>
    );
}

export default List;