import React from 'react';
import { View } from 'react-native'
import { Card, Paragraph } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigate } from "../../../hooks/useNavigate";
import styles from './style';
import { Point } from '../../../ts/interfaces/point-interfaces';
import { SystemRoutes } from '../../../ts/enums/routes';
import FairSVG from '../../../assets/fair.svg';


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
                                <FairSVG width={148} height={148} style={styles.image} />

                                <Paragraph>Nome da feira: {point.siteName}</Paragraph>
                                <Paragraph>Descrição: {point.description}</Paragraph>
                                <Paragraph>Endereço: {point.address}, {point.city + ' - ' + point.uf}</Paragraph>
                                <Paragraph>Aberto em: {point.dayWeek ? point.dayWeek : 'Nenhuma informação cadastrada'}</Paragraph>
                            </Card.Content>
                        </Card>
                    ))}

                </ScrollView>
                :
                <View>
                    <Paragraph>Nenhuma feira encontrada!</Paragraph>
                </View>
            }
        </View>
    );
}

export default List;