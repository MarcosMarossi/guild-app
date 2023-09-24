import React from 'react';
import { Button } from 'react-native-paper';
import styles from './style';
import { useNavigate } from '../../hooks/useNavigate';
import { SystemRoutes } from '../../ts/enums/routes';

const BackButton = () => {
    const { changeRoute } = useNavigate();
    
    return (
        <Button style={styles.container} icon="keyboard-backspace" mode="contained" onPress={() => changeRoute(SystemRoutes.Main)}>
            Voltar
        </Button>
    );
};

export default BackButton;