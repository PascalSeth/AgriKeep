import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const SkeletonLoader = () => {
  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    );

    shimmerAnimation.start();

    return () => shimmerAnimation.stop();
  }, [shimmerValue]);

  const shimmerStyle = {
    opacity: shimmerValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
    }),
  };

  return (
    <View style={styles.skeletonContainer}>
      <Animated.View style={[styles.skeletonImage, shimmerStyle]} />
      <View style={styles.textContainer}>
        <Animated.View style={[styles.skeletonTitle, shimmerStyle]} />
        <Animated.View style={[styles.skeletonSubtitle, shimmerStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  skeletonImage: {
    width: 380,
    height: 200,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    marginBottom: 10,
  },
  textContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  skeletonTitle: {
    width: '80%',
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 5,
  },
  skeletonSubtitle: {
    width: '60%',
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
});

export default SkeletonLoader;
