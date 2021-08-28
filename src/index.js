import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {LANGUAGES, NAMES} from '../constants';
import Config from 'react-native-config';
import Clipboard from '@react-native-clipboard/clipboard';

const downIcon = <Icon name="caretdown" size={12} color="black" />;

class TranslateKing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceText: '',
      targetText: '',
      source: LANGUAGES.ENGLISH,
      target: LANGUAGES.HINDI,
    };
    this.timeout = 0;
  }

  openSource = () => {};

  openTarget = () => {};

  toggleLang = () => {
    this.setState(prevState => {
      return {source: prevState.target, target: prevState.source};
    });
  };

  translateText = () => {
    console.log('11111');
    const {sourceText, source, target} = this.state;
    fetch('https://translation.googleapis.com/language/translate/v2', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: sourceText,
        source: source,
        target: target,
        key: Config.GOOGLE_TRANSLATE_API_KEY,
      }),
    }).then(result => {
      console.log('result ----', result);
      //Translated Text
      this.setState({targetText: 'TRANSLATED RESULT'});
    });
  };

  copyToClipboard = () => {
    Clipboard.setString('hello world');
  };

  render() {
    const {source, target, targetText} = this.state;
    return (
      <>
        <View
          style={{padding: 16, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.headingText}>TRANSLATE KING</Text>
        </View>
        <View style={styles.headingContainer}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={this.openSource}
            style={{flexDirection: 'row', alignItems: 'center', width: '45%'}}>
            <Text style={{fontSize: 16, marginRight: 4}}>{NAMES[source]}</Text>
            {downIcon}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={this.toggleLang}
            style={{flexDirection: 'row', alignItems: 'center', width: '10%'}}>
            <Text>
              <Icon name="swap" size={20} color="black" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.openTarget}
            activeOpacity={1}
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              width: '45%',
            }}>
            <Text style={{fontSize: 16, marginRight: 4}}>{NAMES[target]}</Text>
            {downIcon}
          </TouchableOpacity>
        </View>
        {/*<View>*/}
        <TextInput
          style={styles.inputBox}
          multiline={true}
          numberOfLines={4}
          placeholder="Enter Input Text"
          onChangeText={text => this.setState({sourceText: text})}
          value={this.state.sourceText}
          onEndEditing={this.translateText}
        />
        {targetText.length > 0 && (
          <>
            <View style={{paddingHorizontal: 16, paddingVertical: 8}}>
              <Text style={{fontSize: 16}}>Translated Text</Text>
            </View>
            <TextInput
              style={styles.inputBox}
              multiline={true}
              numberOfLines={4}
              onChangeText={text => this.setState({targetText: text})}
              value={targetText}
            />
            <Text>
              <Icon name="swap" size={20} color="black" />
            </Text>
          </>
        )}
        {/*</View>*/}
      </>
    );
  }
}

const styles = StyleSheet.create({
  headingText: {fontSize: 18},
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 12,
  },
  inputBox: {
    height: 100,
    margin: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
});

export default TranslateKing;
