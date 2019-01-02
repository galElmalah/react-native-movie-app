/**
 * Sample React Native ScreenNum1
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import { Text } from 'react-native-ui-lib'; //eslint-disable-line

const Tag = ({ label }) => {
  return <Text style={styles.tag}>{label}</Text>;
};

const Title = ({ text }) => <Text style={styles.title}>{text}</Text>;
const MovieDetails = ({
  movie: { spoken_languages, overview, title, genres, production_companies },
}) => (
  <View style={styles.container}>
    <Text
      style={[
        { fontSize: 40 },
        { fontWeight: 'bold' },
        { marginTop: 20 },
        { marginLeft: 'auto' },
        { marginRight: 'auto' },
        { borderBottomWidth: 4 },
        { borderColor: 'gray' },
      ]}
    >
      {title}
    </Text>

    <Title text={'Overview'} />
    <Text style={[{ fontSize: 20 }]}>{overview}</Text>
    {genres.length > 0 && (
      <View style={styles.tagsContainer}>
        <Title text={'Genres'} />
        <FlatList
          style={styles.tags}
          horizontal={true}
          data={genres}
          keyExtractor={genere => genere.id}
          renderItem={({ item: { name, id }, index }) => (
            <Tag label={name} id={id} />
          )}
        />
      </View>
    )}

    {production_companies.length > 0 && (
      <View style={styles.tagsContainer}>
        <Title text={'Production Companies'} />
        <FlatList
          style={styles.tags}
          horizontal={true}
          data={production_companies}
          keyExtractor={genere => genere.id}
          renderItem={({ item: { name, id }, index }) => (
            <Tag label={name} id={id} />
          )}
        />
      </View>
    )}
    {spoken_languages[0] && (
      <>
        <Title text={'language'} />
        <Text style={[{ fontSize: 20 }, { marginTop: 10 }]}>
          {spoken_languages[0].name}
        </Text>
      </>
    )}
  </View>
);

export default class MovieScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      loading: true,
    };
  }

  setMovie = data => {
    this.setState({ movie: data, loading: false });
  };

  componentDidMount() {
    const { movieId } = this.props;
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=aa1e090b4600f097e262b6c46cc2cd66`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(this.setMovie);
  }

  render() {
    const { movie, loading } = this.state;
    return (
      <ScrollView style={styles.container}>
        {loading ? (
          <Text
            style={[
              { fontSize: 35 },
              { fontWeight: 'bold' },
              { marginTop: 100 },
              { marginLeft: 'auto' },
              { marginRight: 'auto' },
            ]}
          >
            Loading...
          </Text>
        ) : (
          <MovieDetails movie={movie} />
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginTop: 10,
    display: 'flex',
    fontSize: 28,
    fontWeight: 'bold',
  },
  tag: {
    marginRight: 5,
    marginBottom: 5,
    padding: 5,
    fontSize: 15,
    color: 'white',
    fontWeight: '500',
    backgroundColor: 'dodgerblue',
    display: 'flex',
    textAlign: 'center',
    borderRadius: 10,
    height: 33,
  },
  tags: {
    marginTop: 10,
  },
  tagsContainer: {
    height: 100,
  },
  container: {
    backgroundColor: '#F1F4F5',
    height: '100%',
    padding: 10,
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
