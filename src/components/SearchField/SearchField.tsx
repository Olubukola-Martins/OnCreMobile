import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { fontFamily, useTheme } from '@/theme';
import { Icon } from '@/components/Icon';

export type SearchFieldProps = Omit<TextInputProps, 'style'> & {
  containerStyle?: StyleProp<ViewStyle>;
};

/** Rounded search field used in lists (e.g. "Search name or phone"). */
export function SearchField({
  placeholder = 'Search name or phone',
  containerStyle,
  ...rest
}: SearchFieldProps) {
  const { colors, radius, typography } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.bg.secondary, borderRadius: radius.full },
        containerStyle,
      ]}
    >
      <Icon name="search" size={20} color={colors.text.tertiary} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.text.tertiary}
        style={[styles.input, typography.bodyLarge, { color: colors.text.primary, fontFamily }]}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    height: 48,
  },
  input: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
});
