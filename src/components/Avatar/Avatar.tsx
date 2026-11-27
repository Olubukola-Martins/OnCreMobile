import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/theme';
import { Text } from '@/components/Text';

export type AvatarProps = {
  /** Full name — initials are derived from the first two words. */
  name: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export function initialsFromName(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return '?';
  }
  if (words.length === 1) {
    return words[0]!.slice(0, 2).toUpperCase();
  }
  return (words[0]![0]! + words[1]![0]!).toUpperCase();
}

/** Circular avatar using initials from the verified name. */
export function Avatar({ name, size = 40, style }: AvatarProps) {
  const { colors } = useTheme();
  const initials = initialsFromName(name);
  // Scale text roughly with the circle; cap at amountMedium for big avatars.
  const fontSize = Math.round(size * 0.4);

  return (
    <View
      accessibilityLabel={name}
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.brand.subtle,
        },
        style,
      ]}
    >
      <Text
        style={{ color: colors.brand.strong, fontSize, fontWeight: '600' }}
        allowFontScaling={false}
      >
        {initials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
