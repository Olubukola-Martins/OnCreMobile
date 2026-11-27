import React, { useState, type ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';
import {
  Avatar,
  Badge,
  BottomSheet,
  Button,
  Card,
  Checkbox,
  ChoiceCard,
  Divider,
  InlineAlert,
  Keypad,
  ListRow,
  OtpInput,
  PhoneField,
  PinDots,
  Radio,
  ScreenTitle,
  SearchField,
  SectionHeader,
  SegmentedControl,
  SelectField,
  StepProgress,
  Switch,
  Text,
  TextField,
  TopBar,
} from '@/components';

/** Section wrapper with a heading + descriptive caption. */
function Section({ title, caption, children }: { title: string; caption?: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text variant="h3" color="primary">
        {title}
      </Text>
      {caption ? (
        <Text variant="body" color="secondary" style={styles.caption}>
          {caption}
        </Text>
      ) : null}
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}

/** Living style guide for the OnCRE component library. */
export function ComponentsScreen() {
  const { colors, spacing } = useTheme();
  const insets = useSafeAreaInsets();

  const [checked, setChecked] = useState(true);
  const [toggle, setToggle] = useState(true);
  const [choice, setChoice] = useState('bvn');
  const [segment, setSegment] = useState<'all' | 'open'>('all');
  const [otp, setOtp] = useState('');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [text, setText] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.canvas }}>
      <View style={{ paddingTop: insets.top }}>
        <TopBar leading="none" title="Components" />
      </View>
      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + spacing.xl }]}>
        <ScreenTitle title="OnCRE components" subtitle="Built once, themed from the Foundations tokens." />

        <Section title="Buttons" caption="Pill buttons, 56px. Blue is the one primary action; secondary is grey; ghost is a text link.">
          <Button label="Continue" onPress={() => {}} />
          <Button label="Continue" variant="secondary" onPress={() => {}} />
          <Button label="Continue" variant="ghost" onPress={() => {}} fullWidth={false} />
          <Button label="Loading" loading onPress={() => {}} />
          <Button label="Disabled" disabled onPress={() => {}} />
        </Section>

        <Section title="Inputs" caption="Label inside a 56px box, helper or error under it. Focus is navy; errors keep what was typed.">
          <TextField label="Label" placeholder="Placeholder" helper="Helper text" value={text} onChangeText={setText} />
          <TextField label="Label" placeholder="Placeholder" error="Say what to fix" value="Typed value" />
          <TextField label="Label" placeholder="Placeholder" helper="Helper text" disabled />
          <PhoneField helper="Helper text" />
          <SelectField label="Label" placeholder="Choose one" helper="Helper text" onPress={() => setSheetOpen(true)} />
        </Section>

        <Section title="Code, PIN and keypad" caption="Code cells for the 6-digit SMS code, PIN dots, and one custom keypad.">
          <OtpInput value={otp} onChange={setOtp} />
          <PinDots filled={3} />
          <Card surface="subtle" padding="sm">
            <Keypad onPressKey={d => setOtp(prev => (prev + d).slice(0, 6))} onDelete={() => setOtp(prev => prev.slice(0, -1))} onBiometric={() => {}} />
          </Card>
        </Section>

        <Section title="Selection controls" caption="Navy for on and checked states.">
          <View style={styles.row}>
            <Checkbox checked={checked} onChange={setChecked} />
            <Switch value={toggle} onValueChange={setToggle} />
            <Radio selected onSelect={() => {}} />
          </View>
        </Section>

        <Section title="Feedback" caption="Status colour lives only in badges and inline alerts.">
          <View style={styles.badges}>
            <Badge label="Neutral" />
            <Badge label="Brand" tone="brand" />
            <Badge label="Success" tone="success" />
            <Badge label="Warning" tone="warning" />
            <Badge label="Error" tone="error" />
          </View>
          <InlineAlert tone="info" message="Message goes here." />
          <InlineAlert tone="success" message="Message goes here." />
          <InlineAlert tone="warning" message="Message goes here." />
          <InlineAlert tone="error" message="Message goes here." />
        </Section>

        <Section title="Identity & search">
          <View style={styles.row}>
            <Avatar name="Ada Obi" size={32} />
            <Avatar name="Ada Obi" size={40} />
            <Avatar name="Ada Obi" size={56} />
          </View>
          <SearchField />
          <SegmentedControl
            options={[
              { label: 'All', value: 'all' },
              { label: 'Open', value: 'open' },
            ]}
            value={segment}
            onChange={setSegment}
          />
          <StepProgress current={2} total={5} />
        </Section>

        <Section title="Lists and choices" caption="Choice cards for picking one option; list rows for settings and menus.">
          <ChoiceCard title="Use BVN" description="Bank Verification Number" leadingIcon="id-card" selected={choice === 'bvn'} onSelect={() => setChoice('bvn')} />
          <ChoiceCard title="Use NIN" description="National Identity Number" leadingIcon="id-card" selected={choice === 'nin'} onSelect={() => setChoice('nin')} />
          <Card padding="md">
            <ListRow leadingIcon="file-text" title="Title" description="Description" showChevron onPress={() => {}} />
            <Divider inset={52} />
            <ListRow leadingIcon="file-text" title="Title" description="Description" trailing={<Switch value={toggle} onValueChange={setToggle} />} />
          </Card>
        </Section>

        <Section title="Overlays" caption="Bottom sheet for short decisions that branch a flow.">
          <SectionHeader title="Open a sheet" onPress={() => setSheetOpen(true)} />
        </Section>
      </ScrollView>

      <BottomSheet
        visible={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title="Sheet title"
        subtitle="One or two sentences on what happens next."
      >
        <Button label="Continue" onPress={() => setSheetOpen(false)} />
        <Button label="Cancel" variant="ghost" onPress={() => setSheetOpen(false)} />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
    gap: 28,
    paddingTop: 12,
  },
  section: {
    gap: 4,
  },
  caption: {
    marginBottom: 4,
  },
  sectionBody: {
    gap: 12,
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});
