import React, { Component } from 'react';
import {
  Text,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {
  inject,
  observer,
} from 'mobx-react/native';
import uuidv4 from 'uuid/v4';
import TextButton from '../../components/TextButton';
import styles from './styles';

const initialState = {
  answer: '',
  question: '',
  submitDisabled: true,
};

@inject('deckStore')
@observer
class NewCardScreen extends Component {
  static navigationOptions = {
    title: 'Add Card',
  };

  state = initialState;

  handleAnswerChange = (answer) => {
    this.setState({ answer }, this.updateSubmitButtonState);
  }

  handleQuestionChange = (question) => { 
    this.setState({ question }, this.updateSubmitButtonState);
  }

  handleSubmit = () => {
    const { answer, question } = this.state;
    const key = uuidv4();
    const card = { answer, key, question };
    const { goBack, state } = this.props.navigation;
    const { deckId } = state.params;

    this.props.deckStore.addCardToDeck(deckId, card);
    goBack();
  };

  updateSubmitButtonState = () => {
    const { answer, question } = this.state;
    const submitDisabled = (answer === '') || (question === '');
    if (submitDisabled !== this.state.submitDisabled) {
      this.setState({ submitDisabled });
    }
  }

  render() {
    const {
      answer,
      question,
      submitDisabled,
    } = this.state;

    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={styles.NewCardScreen}
      >
        <TextInput
          onChangeText={this.handleQuestionChange}
          placeholder='Question'
          value={question}
        />
        <TextInput
          onChangeText={this.handleAnswerChange}
          multiline
          numberOfLines={4}
          placeholder='Answer'
          value={answer}
        />
        <TextButton
          onPress={this.handleSubmit}
          disabled={submitDisabled}
          label='Submit'
        />
        <Text>{JSON.stringify(this.props.deckStore.decks.values())}</Text>
        <Text>{JSON.stringify(this.state)}</Text>
      </KeyboardAvoidingView>
    );
  }
}

export default NewCardScreen;

/* `NewCardScreen`
- Una opción para introducir la nueva pregunta
- Una opción para introducir su respuesta
- Una opción para enviar la nueva pregunta */
