import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
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

  copyToClipboard = isSourceText => () => {
    const {sourceText, targetText} = this.state;
    const text = isSourceText ? sourceText : targetText;
    console.log(`clipboard copied ${text}`);
    Clipboard.setString(`${text}`);
  };

  render() {
    const {source, target, sourceText, targetText} = this.state;
    return (
      <>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>TRANSLATE KING</Text>
        </View>
        <View style={styles.subHeadingContainer}>
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
              <Icon name="swap" size={20} color="#f66" />
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
        <View>
          <TextInput
            style={styles.inputBox}
            multiline={true}
            numberOfLines={4}
            placeholder="Enter Input Text"
            onChangeText={text => this.setState({sourceText: text})}
            value={sourceText}
            onEndEditing={this.translateText}
          />
          {sourceText.length > 0 && (
            <Text
              style={{
                position: 'absolute',
                zIndex: 100,
                bottom: 20,
                right: 20,
              }}>
              <Feather
                onPress={this.copyToClipboard(true)}
                name="copy"
                size={20}
                color="black"
              />
            </Text>
          )}
        </View>
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
            <Text style={{position: 'absolute', bottom: 20, right: 20}}>
              <Feather
                onPress={this.copyToClipboard(false)}
                name="copy"
                size={20}
                color="black"
              />
            </Text>
          </>
        )}
        {/*</View>*/}
      </>
    );
  }
}

const styles = StyleSheet.create({
  headingText: {fontSize: 18, fontWeight: '600', color: 'white'},
  headingContainer: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f66',
  },
  subHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 12,
  },
  inputBox: {
    height: 100,
    margin: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#f66',
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
});

export default TranslateKing;
