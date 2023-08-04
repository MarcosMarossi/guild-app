import { useNavigation } from '@react-navigation/core';
import { StackActions } from '@react-navigation/native';

export function useNavigate() {
  const navigation = useNavigation();

  function changeRoute(route: string, params?: object) {
    navigation.navigate(route as never, params as never);
  }

  function resetPages(page: string): void {
    navigation.dispatch(StackActions.replace(page));
  }

  function goBack(): void {
    navigation.goBack();
  }

  return { changeRoute, resetPages, goBack };
}