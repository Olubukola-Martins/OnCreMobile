import React from 'react';
import { View } from 'react-native';

import { Avatar } from '@/components/Avatar';
import { Card } from '@/components/Card';
import { Divider } from '@/components/Divider';
import { ListRow } from '@/components/ListRow';
import { SectionHeader } from '@/components/SectionHeader';
import { formatNairaShort } from '@/lib/currency';
import type { CaseItem } from '../api';

export type ActionNeededListProps = {
  cases: CaseItem[];
  /** Mask amounts when the balance is hidden. */
  hidden?: boolean;
  onPressSeeAll?: () => void;
  onPressCase?: (item: CaseItem) => void;
};

/** Cases OnCRE needs the user to act on (from UC-R4). Each row opens the case. */
export function ActionNeededList({
  cases,
  hidden = false,
  onPressSeeAll,
  onPressCase,
}: ActionNeededListProps) {
  if (cases.length === 0) {
    return null;
  }

  return (
    <View>
      <SectionHeader title="Action needed" count={cases.length} onPress={onPressSeeAll} />
      <Card padding="md" style={{ marginTop: 12 }}>
        {cases.map((item, index) => (
          <View key={item.id}>
            {index > 0 ? <Divider inset={52} /> : null}
            <ListRow
              leading={<Avatar name={item.name} size={40} />}
              title={item.name}
              description={item.statusLabel}
              trailingText={{
                primary: hidden ? '₦ ••••' : formatNairaShort(item.amountKobo),
                secondary: item.dueLabel,
              }}
              onPress={onPressCase ? () => onPressCase(item) : undefined}
            />
          </View>
        ))}
      </Card>
    </View>
  );
}
