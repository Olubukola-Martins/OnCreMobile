import React from 'react';
import { View } from 'react-native';

import { useTheme } from '@/theme';
import { Avatar } from '@/components/Avatar';
import { BottomSheet } from '@/components/BottomSheet';
import { Divider } from '@/components/Divider';
import { Icon } from '@/components/Icon';
import { ListRow } from '@/components/ListRow';
import { useSessionStore } from '@/store/session';

export type SwitchBusinessSheetProps = {
  visible: boolean;
  onClose: () => void;
};

/**
 * Lists every business this phone number belongs to, with the person's role.
 * Tapping one switches and reloads Home for it; tapping the active one or
 * outside just closes (design 4.8).
 */
export function SwitchBusinessSheet({ visible, onClose }: SwitchBusinessSheetProps) {
  const { colors } = useTheme();
  const businesses = useSessionStore(s => s.businesses);
  const activeId = useSessionStore(s => s.activeBusinessId);
  const switchBusiness = useSessionStore(s => s.switchBusiness);

  const handleSelect = (id: string) => {
    if (id !== activeId) {
      switchBusiness(id);
    }
    onClose();
  };

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title="Switch business"
      subtitle="Your phone number is on these businesses."
    >
      <View>
        {businesses.map((business, index) => {
          const isActive = business.id === activeId;
          return (
            <View key={business.id}>
              {index > 0 ? <Divider inset={52} /> : null}
              <ListRow
                leading={<Avatar name={business.name} size={40} />}
                title={business.name}
                description={business.role}
                trailing={
                  isActive ? <Icon name="check" size={22} color={colors.brand.strong} /> : <View />
                }
                onPress={() => handleSelect(business.id)}
              />
            </View>
          );
        })}
      </View>
    </BottomSheet>
  );
}
