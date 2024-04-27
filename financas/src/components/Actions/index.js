import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Actions = ({ onPressAddEntry, onPressAddSaida, onPressPaymentMethods, onPressMoviments }) => {
  return (
    <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false}>
      <TouchableOpacity style={styles.actionButton} onPress={onPressAddEntry}>
        <View style={styles.areaButton}>
          <AntDesign name="addfolder" size={23} color="#000"/>
        </View>
        <Text style={styles.labelButton}>Entradas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={onPressAddSaida}>
        <View style={styles.areaButton}>
          <AntDesign name="tagso" size={23} color="#000"/>
        </View>
        <Text style={styles.labelButton}>Saidas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={onPressPaymentMethods}>
        <View style={styles.areaButton}>
          <AntDesign name="creditcard" size={23} color="#000"/>
        </View>
        <Text style={styles.labelButton}>Meios de Pagamento</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}  onPress={onPressMoviments}>
        <View style={styles.areaButton}>
          <AntDesign name="barcode" size={23} color="#000"/>
        </View>
        <Text style={styles.labelButton}>Movimentos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <View style={styles.areaButton}>
          <AntDesign name="setting" size={23} color="#000"/>
        </View>
        <Text style={styles.labelButton}>Conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 80,
    maxHeight:  84,
    marginBottom: 14,
    marginTop: 18,
    paddingEnd: 14,
    paddingStart: 14,
  },
  actionButton: {
    alignItems: 'center',
    marginRight: 32,
  },
  areaButton: {
    backgroundColor: '#ecf0f1',
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  labelButton: {
    marginTop: 4,
    textAlign: 'center',
    fontWeight: 'bold'
  },
});

export default Actions;
