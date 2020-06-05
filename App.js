import React from 'react';
import { Text, View, StatusBar, ScrollView, TouchableOpacity, Image, Modal, TouchableWithoutFeedback, ToastAndroid } from 'react-native';
import Theme from './constants/Theme';

export default class App extends React.Component {
  state = {
    digimons: [],
    modalVisible: false,
    selectedDigimon: null
  }

  ToggleModal() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  componentDidMount() {
    (async () => {

      let response = await fetch('https://digimon-api.herokuapp.com/api/digimon', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      response = await response.json();

      this.setState({ digimons: response });

    })();
  }

  render() {
    return (
      <>
        <StatusBar backgroundColor={Theme.primaryDark} />
        <View style={{ backgroundColor: Theme.primary, padding: 10, height: 60, elevation: 10 }}>
          <Text style={{ fontSize: 24, textAlignVertical: 'center', height: '100%' }}>Digimon API</Text>
        </View>
        <ScrollView style={{ backgroundColor: '#eee' }} contentContainerStyle={{ flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center' }}>
          {this.state.digimons.length != 0 ? this.state.digimons.map((digimon, index) => (
            <View key={index} style={{ width: '50%', padding: 5 }}>
              <TouchableOpacity onPress={() => {
                this.ToggleModal();
                this.setState({ selectedDigimon: digimon })
              }}>
                <View style={{ backgroundColor: Theme.gray, borderRadius: 5 }}>
                  <Image source={{ uri: digimon.img }} style={{ height: 90, resizeMode: 'center', backgroundColor: Theme.white, borderRadius: 5 }} />
                  <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 24 }}>{digimon.name}</Text>
                    <Text style={{ fontSize: 16 }}>{digimon.level}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))
            :
            <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ height: '100%', textAlignVertical: 'center', marginVertical: 250 }}>Carregando...</Text>
            </View>}
        </ScrollView>
        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          onRequestClose={() => this.ToggleModal()}>
          <TouchableWithoutFeedback onPress={() => this.ToggleModal()}>
            <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.4)', justifyContent: 'center', padding: 30 }}>
              <TouchableWithoutFeedback>
                <View style={{ backgroundColor: '#ddd', borderRadius: 5, justifyContent: 'space-between' }}>
                  <Image source={{ uri: this.state.selectedDigimon?.img }} style={{ height: '30%', resizeMode: 'center', backgroundColor: Theme.white, borderRadius: 5 }} />
                  <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 30, fontWeight: '700', marginBottom: 20 }}>{this.state.selectedDigimon?.name}</Text>
                    <Text style={{ fontSize: 20, marginBottom: 20 }}>{this.state.selectedDigimon?.level}</Text>
                  </View>
                  <TouchableOpacity
                    style={{ backgroundColor: Theme.primary, height: 60 }}
                    onPress={() => {
                      this.ToggleModal();
                      ToastAndroid.show('Thanks for checking it out', ToastAndroid.LONG);
                    }}>
                    <Text style={{ fontWeight: '700', fontSize: 22, color: '#fff', textAlignVertical: 'center', textAlign: 'center', height: '100%' }}>OK</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </>
    );
  }
}
