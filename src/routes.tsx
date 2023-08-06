import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SystemRoutes } from "./ts/enums/routes";

import Main from "./pages/Main";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Details from "./pages/Details";
import StepFair from "./pages/Register/StepFair";
import StepProducts from "./pages/Register/StepProducts";

const Routes = () => {
  const AppStack = createStackNavigator();

  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{}}>
        <AppStack.Screen name={SystemRoutes.Main} component={Main} options={{ headerShown: false }} />
        <AppStack.Screen name={SystemRoutes.Register} component={Register} options={{ headerShown: false }} />
        <AppStack.Screen name={SystemRoutes.Login} component={Login} options={{ headerShown: false }} />
        <AppStack.Screen name={SystemRoutes.Details} component={Details} options={{ headerShown: false }} />
        <AppStack.Screen name={SystemRoutes.StepFair} component={StepFair} options={{ headerShown: false }} />
        <AppStack.Screen name={SystemRoutes.StepProduct} component={StepProducts} options={{ headerShown: false }} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;