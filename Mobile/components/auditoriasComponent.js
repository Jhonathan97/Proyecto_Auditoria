import React, {Component} from 'react';
import {FlatList, Text} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import {AUDITORIAS} from '../shared/auditorias';
class Auditorias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auditorias: AUDITORIAS,
    };
  }

  render() {
    const renderMenuItem = ({item, index}) => {
      const clientes = item.nombre_clientes.map((cliente) => {
        return (
          <Text key={cliente._id}>
            {cliente.nombre} {cliente.apellido}
          </Text>
        );
      });
      return (
        <ListItem key={index}>
          <Avatar source={require('./images/logo-auditoria.jpg')} />
          <ListItem.Content>
            <ListItem.Title>{item.nombre}</ListItem.Title>
            <ListItem.Subtitle>
              Lider Auditor: {item.lider_auditor.nombre}{' '}
              {item.lider_auditor.apellido}
            </ListItem.Subtitle>
            <ListItem.Subtitle>Clientes: {clientes}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      );
    };

    return (
      <FlatList
        data={this.state.auditorias}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item._id.toString()}
      />
    );
  }
}

export default Auditorias;
