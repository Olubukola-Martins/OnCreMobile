import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';

import { useTheme } from '@/theme';

export type SwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  accessibilityLabel?: string;
};

const TRACK_W = 52;
const TRACK_H = 32;
const PAD = 3;
const THUMB = TRACK_H - PAD * 2;

/** Toggle. Navy for the on state, so blue stays on the primary button. */
export function Switch({ value, onValueChange, disabled, accessibilityLabel }: SwitchProps) {
  const { colors } = useTheme();
  const pos = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(pos, {
      toValue: value ? 1 : 0,
      duration: 160,
      useNativeDriver: true,
    }).start();
  }, [value, pos]);

  const translateX = pos.interpolate({
    inputRange: [0, 1],
    outputRange: [0, TRACK_W - THUMB - PAD * 2],
  });

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={() => onValueChange(!value)}
      style={[
        styles.track,
        {
          backgroundColor: value ? colors.control.trackOn : colors.control.trackOff,
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      <Animated.View
        style={[styles.thumb, { backgroundColor: colors.control.thumb, transform: [{ translateX }] }]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: TRACK_W,
    height: TRACK_H,
    borderRadius: TRACK_H / 2,
    padding: PAD,
    justifyContent: 'center',
  },
  thumb: {
    width: THUMB,
    height: THUMB,
    borderRadius: THUMB / 2,
  },
});
