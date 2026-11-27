import React from 'react';
import { View } from 'react-native';

import { Card } from '@/components/Card';
import { Divider } from '@/components/Divider';
import { ListRow } from '@/components/ListRow';
import { Text } from '@/components/Text';
import type { IconName } from '@/components/Icon';

export type GetStartedItem = {
  key: string;
  title: string;
  description: string;
  icon: IconName;
  disabled?: boolean;
  onPress?: () => void;
};

export type GetStartedListProps = {
  items: GetStartedItem[];
};

/** Prompts shown on a brand-new account (UC-A1 step 22). */
export function GetStartedList({ items }: GetStartedListProps) {
  return (
    <View style={{ gap: 12 }}>
      <Text variant="h4" color="primary">
        Get started
      </Text>
      <Card padding="md">
        {items.map((item, index) => (
          <View key={item.key} style={{ opacity: item.disabled ? 0.5 : 1 }}>
            {index > 0 ? <Divider inset={52} /> : null}
            <ListRow
              leadingIcon={item.icon}
              title={item.title}
              description={item.description}
              showChevron={!item.disabled}
              onPress={item.disabled ? undefined : item.onPress}
            />
          </View>
        ))}
      </Card>
    </View>
  );
}
