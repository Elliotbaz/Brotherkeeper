import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Animated,
  Text
} from 'react-native';

class ShakingText extends Component {

  componentWillMount() {
    this.shakedValue = new Animated.Value(0);
  }

  get animatedStyle() {
    return {
      transform: [
        {
          translateY: this.shakedValue.interpolate({
            inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            outputRange: [0, 10, -15, 12, -9, 18, -7, 10, -11, 5, 0],
          }),
        },
        {
          translateX: this.shakedValue.interpolate({
            inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            outputRange: [0, 2, -3, 4, -4, 3, -3, 4, -5, 2, 0],
          }),
        },
      ],
    };
  }

  shake = () => {
    this.shakedValue.setValue(0);
    Animated.spring(this.shakedValue, {
      toValue: 1,
      friction: 3,
      tension: 10,
    }).start(() => this.shakedValue.setValue(0));
  };

  render() {
    return (
      <Animated.Text
        {...this.props}
        style={[this.animatedStyle, this.props.style]}
      />
    );
  }
}

ShakingText.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  style: Text.propTypes.style,
};

export default ShakingText;

// import React, { Component } from 'react';
// import { View, Text, FlatList, ActivityIndicator } from 'react-native';
// import { ListItem, SearchBar } from 'react-native-elements';

// class FlatListDemo extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       loading: false,
//       data: [],
//       error: null,
//     };

//     this.arrayholder = [];
//   }

//   componentDidMount() {
//     this.makeRemoteRequest();
//   }

//   makeRemoteRequest = () => {
//     const url = `https://randomuser.me/api/?&results=20`;
//     this.setState({ loading: true });

//     fetch(url)
//       .then(res => res.json())
//       .then(res => {
//         this.setState({
//           data: res.results,
//           error: res.error || null,
//           loading: false,
//         });
//         this.arrayholder = res.results;
//       })
//       .catch(error => {
//         this.setState({ error, loading: false });
//       });
//   };

//   renderSeparator = () => {
//     return (
//       <View
//         style={{
//           height: 1,
//           width: '86%',
//           backgroundColor: '#CED0CE',
//           marginLeft: '14%',
//         }}
//       />
//     );
//   };

//   searchFilterFunction = text => {
//     this.setState({
//       value: text,
//     });

//     const newData = this.arrayholder.filter(item => {
//       const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
//       const textData = text.toUpperCase();

//       return itemData.indexOf(textData) > -1;
//     });
//     this.setState({
//       data: newData,
//     });
//   };

//   renderHeader = () => {
//     return (
//       <SearchBar
//         placeholder="Type Here..."
//         lightTheme
//         round
//         onChangeText={text => this.searchFilterFunction(text)}
//         autoCorrect={false}
//         value={this.state.value}
//       />
//     );
//   };

//   render() {
//     if (this.state.loading) {
//       return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//           <ActivityIndicator />
//         </View>
//       );
//     }
//     return (
//       <View style={{ flex: 1 }}>
//         <FlatList
//           data={this.state.data}
//           renderItem={({ item }) => (
//             <ListItem
//               leftAvatar={{ source: { uri: item.picture.thumbnail } }}
//               title={`${item.name.first} ${item.name.last}`}
//               subtitle={item.email}
//             />
//           )}
//           keyExtractor={item => item.email}
//           ItemSeparatorComponent={this.renderSeparator}
//           ListHeaderComponent={this.renderHeader}
//         />
//       </View>
//     );
//   }
// }

// export default FlatListDemo;
