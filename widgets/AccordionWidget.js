import React from 'react';
import createReactClass from 'create-react-class';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  PixelRatio
} from 'react-native';

var WidgetMixin = require('../mixins/WidgetMixin.js');
var TimerMixin = require('react-timer-mixin');


module.exports = createReactClass({
  mixins: [TimerMixin, WidgetMixin],

  getInitialState() {
    return {
        collapsed: true
    }
  },
  
  getDefaultProps() {
    return {
      type: 'AccordionWidget',
      onPress: () => {},
      disclosure: true,
    };
  },

  renderDisclosure() {
    if (this.props.disclosure === true) {
      return (
        <Image
          style={this.getStyle('disclosure')}
          resizeMode="contain"
          source={require('../icons/disclosure.png')}
        />
      );
    }
    return null;
  },
  
  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child) => {
        if(!!child){
            return React.cloneElement(child, {
                formStyles: this.props.formStyles,
                openModal: this.props.openModal,
                formName: this.props.formName,
                navigator: this.props.navigator,
                onFocus: this.props.onFocus,
                onBlur: this.props.onBlur,
                onValidation: this.props.onValidation,
                onValueChange: this.props.onValueChange
            });
        }
    });
    return (
      <View style={this.getStyle('rowContainer')}>
        <TouchableHighlight
          onPress={() => {
            this.requestAnimationFrame(() => {
              this.props.onPress();
              this.setState(prevState => ({ collapsed: !prevState.collapsed }));
            });
          }}
          underlayColor={this.getStyle('underlayColor').pop()}
          {...this.props}
        >
          <View style={this.getStyle('row')}>
            {this._renderImage()}
            <Text numberOfLines={1} style={this.getStyle('title')}>{this.props.title}</Text>
            <View style={this.getStyle('alignRight')}>
              <Text numberOfLines={1} style={this.getStyle('value')}>{this.state.value}</Text>
            </View>
            {this._renderDisclosure()}
          </View>
        </TouchableHighlight>
        {!this.state.collapsed && childrenWithProps}
      </View>
    );
  },
  
  defaultStyles: {
    rowImage: {
      height: 20,
      width: 20,
      marginLeft: 10,
    },
    rowContainer: {
      backgroundColor: '#FFF',
      borderBottomWidth: 1 / PixelRatio.get(),
      borderColor: '#c8c7cc',
    },
    row: {
      flexDirection: 'row',
      height: 44,
      alignItems: 'center',
    },
    underlayColor: '#c7c7cc',
    disclosure: {
      transform: [{rotate: '-90deg'}],
      marginLeft: 10,
      marginRight: 10,
      width: 11,
    },
    title: {
      flex: 1,
      fontSize: 15,
      color: '#000',
      paddingLeft: 10,
    },
    value: {
      fontSize: 15,
      color: '#c7c7cc',
      paddingRight: 10,
    },
    disclosure: {
        marginLeft: 10,
        marginRight: 10,
        width: 11,
    },
  },
});
