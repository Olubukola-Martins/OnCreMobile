import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  type DimensionValue,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '@/theme';

export type SkeletonProps = {
  width?: DimensionValue;
  height?: number;
  radiusValue?: number;
  /** Render on a navy surface (uses a translucent white block instead). */
  onInverse?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** Pulsing placeholder shown until real content returns. */
export function Skeleton({
  width = '100%',
  height = 16,
  radiusValue,
  onInverse = false,
  style,
}: SkeletonProps) {
  const { colors, radius } = useTheme();
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius: radiusValue ?? radius.sm,
          backgroundColor: onInverse ? 'rgba(255,255,255,0.18)' : colors.skeleton.base,
          opacity,
        },
        style,
      ]}
    />
  );
}
