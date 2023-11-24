import { CheckBox } from "@rneui/themed"
import { saveColor } from "../../../utils/constants"
import { StyleSheet, View, Text } from 'react-native'
import { Key } from "react"

interface CheckboxProps {
 checked: any,
 onPress?: any,
 key?: any,
 id?: any,
 styleCondition?: any,
 label: any,
 checkType?: 'square' | 'circle'
}

export default function Checkbox({
 checked,
 onPress,
 key,
 id,
 styleCondition,
 label,
 checkType = 'square'
}: CheckboxProps) {
 return (
  <View
   style={styles.checkbox__container}
   key={key}
   id={id}
  >
   <CheckBox
    size={24}
    iconType="font-awesome"
    checkedIcon={checkType === 'square' ? "check-square" : "dot-circle-o"}
    uncheckedIcon={checkType === 'square' ? "square-o" : 'circle-o'}
    checkedColor={saveColor}
    containerStyle={styles.checkbox__containerStyle}
    wrapperStyle={styles.checkbox__wrapperStyle}
    checked={checked}
    onPress={onPress}
   />
   <Text style={[
    styles.checkbox__label,
    styleCondition &&
    styles.checkbox__Selected
   ]}>
    {label}
   </Text>
  </View>

 )
}

const styles = StyleSheet.create({
 checkbox__container: {
  height: "auto",
  flexDirection: "row",
  padding: 0,
  margin: 0,
  width: "100%",
 },
 checkbox__Selected: {
  fontSize: 16,
  fontWeight: "600",
  color: "#000000",
 },
 checkbox__label: {
  fontSize: 16,
  fontWeight: "500",
  color: "#888888",
 },
 checkbox__wrapperStyle: {
  padding: 0,
  margin: 0,
  height: "auto",
  width: "auto"
 },
 checkbox__containerStyle: {
  padding: 0,
  margin: 0,
  paddingBottom: 8
 },
})