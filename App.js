/**
 * Sample React Native ScreenNum1
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Button, StyleSheet, View, FlatList } from 'react-native';
import { Colors, ListItem, Text, TextInput } from 'react-native-ui-lib';

const RenderMovie = ({ movie, id, onMovieItemClick }) => {
  const { title, vote_average: rating, release_date: releaseDate } = movie;
  return (
    <ListItem
      activeBackgroundColor={Colors.dark60}
      activeOpacity={0.3}
      height={90}
      onPress={() => onMovieItemClick(movie)}
    >
      <ListItem.Part containerStyle={[{ paddingLeft: 17 }]} left column>
        <Text>{`Movie title: ${title}`}</Text>
        <Text>{`Rating: ${rating}`}</Text>
      </ListItem.Part>

      <ListItem.Part
        middle
        column
        containerStyle={[styles.border, { paddingRight: 17 }]}
      >
        <ListItem.Part right>
          <Text text90 c numberOfLines={1}>
            {releaseDate}
          </Text>
        </ListItem.Part>
      </ListItem.Part>
    </ListItem>
  );
};

const { Navigation } = require('react-native-navigation');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      movies: [],
      loading: true,
    };
  }

  setMovies = data => {
    const movies = data.results.sort(
      (a, b) => new Date(b.release_date) - new Date(a.release_date)
    );
    this.setState({ movies, loading: false });
  };

  componentDidMount() {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=aa1e090b4600f097e262b6c46cc2cd66&query=$batman`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(this.setMovies);
  }

  onSearchButtonPress = () => {
    const { searchTerm } = this.state;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=aa1e090b4600f097e262b6c46cc2cd66&query=${searchTerm}`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(this.setMovies);
  };

  keyExtractor = movie => movie.id;

  onChangeText = text => this.setState({ searchTerm: text });

  onMovieItemClick = movie => {
    Navigation.push(this.props.componentId, {
      component: {
        passProps: {
          movieId: movie.id,
        },
        name: 'navigation.playground.movieScreen',
      },
    });
  };

  render() {
    const { movies, loading } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.text}> The best movie search app! </Text>
        <View style={styles.searchBar}>
          <TextInput
            style={[{ fontSize: 20 }]}
            placeholder={'search a movie...'}
            onChangeText={this.onChangeText}
            title
            floatOnFocus
          />
          <Button
            style={styles.button}
            title="search"
            onPress={this.onSearchButtonPress}
          />
        </View>
        {loading ? (
          <Text
            style={[
              { fontSize: 35 },
              { fontWeight: 'bold' },
              { marginTop: 100 },
            ]}
          >
            Loading...
          </Text>
        ) : (
          <FlatList
            style={styles.list}
            data={movies}
            keyExtractor={this.keyExtractor}
            renderItem={({ item, index }) => (
              <RenderMovie
                movie={item}
                id={index}
                onMovieItemClick={this.onMovieItemClick}
              />
            )}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F1F4F5',
    height: '100%',
    paddingTop: 10,
  },
  searchBar: {
    width: '100%',
    marginBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  list: {
    width: '100%',
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'powderblue',
  },
});
