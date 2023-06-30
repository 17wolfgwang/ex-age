// In App.js in a new project

import * as React from 'react';
import { View, Text, StyleSheet, FlatList, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

function HomeScreen() {
  const scrollX = new Animated.Value(0);

  const renderItem = ({ item, index }) => {
    const opacity = scrollX.interpolate({
      inputRange: [(index - 1) * wp(42), (index) * wp(42), (index + 1) * wp(42)],
      outputRange: [0.2, 1, 0.2],
      extrapolate: "clamp",
    })

    return (
      <Animated.View style={{
        width: wp(40), height: hp(30),
        marginHorizontal: wp(1), justifyContent: "center", alignItems: "center",
        opacity: opacity
      }}>
        <Text style={{ fontSize: hp(10), fontWeight: "bold", fontFamily: "Academy Engraved LET", fontStyle: "italic" }}>{item}</Text>
      </Animated.View>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", fontSize: hp(4), fontWeight: "bold" }}>Select Your Age</Text>
      <View style={{ marginTop: hp(5) }}>
        <Animated.FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[10, 20, 30, 40, 50, 60, 70]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          snapToInterval={wp(42)}
          contentContainerStyle={{ paddingHorizontal: wp(30) }}
          onScroll={Animated.event(
            [{
              nativeEvent: {
                contentOffset: {
                  x: scrollX
                }
              }
            }], { useNativeDriver: true }
          )}
        />
      </View>
    </View>
  );
}

function DetailScreen() {
  return (
    <View style={styles.container}>
      <Text>Detail Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(10),
    alignItems: 'center',
  }
})