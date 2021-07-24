import React from "react";
import AntDesign  from "react-native-vector-icons/AntDesign";

import Colors from "../constants/Colors";

const TabBarIcon = ({ name, focused }) => (
  <AntDesign
    name={name}
    size={22}
    style={{ marginBottom: -3 }}
    color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
  />
);

export default TabBarIcon;
