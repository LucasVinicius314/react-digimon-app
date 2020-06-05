import React from 'react';
import { Text, View, StatusBar, ScrollView, TouchableOpacity, Image } from 'react-native';
import Theme from './constants/Theme';

export default class App extends React.Component {
  state = {
    digimons: []
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
          <Text style={{ fontSize: 24, fontWeight: '700', textAlignVertical: 'center', height: '100%' }}>Digimon API</Text>
        </View>
        <ScrollView style={{ backgroundColor: '#eee' }} contentContainerStyle={{ flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center' }}>
          {this.state.digimons.map((digimon, index) => (
            <View key={index} style={{ width: '50%', padding: 5 }}>
              <TouchableOpacity>
                <View style={{ backgroundColor: Theme.gray, borderRadius: 5 }}>
                  <Image source={{ uri: digimon.img }} style={{ height: 90, resizeMode: 'center', backgroundColor: Theme.white, borderRadius: 5 }} />
                  <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 24 }}>{digimon.name}</Text>
                    <Text style={{ fontSize: 16 }}>{digimon.level}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </>
    );
  }
}
