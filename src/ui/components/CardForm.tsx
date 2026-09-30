import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { brandById } from '@/domain/brand';
import { type BarcodeFormat, type CardId, FORMAT_LABEL } from '@/domain/card';
import { Button, icons, ListRow, ListSection, Switch, TextField } from '@/ui/primitives';
import { tid } from '@/ui/testIds';
import { defaultCardColor } from '@/ui/theme';
import { CardTile } from './CardTile';
import { BrandChips } from './form/BrandChips';
import { BrandSuggestions } from './form/BrandSuggestions';
import { ColorPicker } from './form/ColorPicker';
import { FormatSection } from './form/FormatSection';
import { FormWarnings } from './form/FormWarnings';
import { PhotoSection } from './form/PhotoSection';
import { type CardFormInitial, type CardFormValues, useCardForm } from './form/useCardForm';
import type { CodeIssue, NameIssue } from './form/validation';

export type { CardFormInitial, CardFormValues } from './form/useCardForm';

type Props = {
  readonly initialValues?: CardFormInitial | undefined;
  readonly editingId?: CardId | undefined;
  readonly submitLabel: string;
  readonly autoFocus?: boolean;
  readonly warnRotating?: boolean;
  readonly onSubmit: (values: CardFormValues) => void;
  readonly onScanInstead?: (() => void) | undefined;
  readonly onDelete?: (() => void) | undefined;
};

const NAME_MESSAGE = {
  required: 'form.nameRequired',
  tooLong: 'form.nameTooLong',
} as const satisfies Record<NameIssue, string>;

function autoColorOf(name: string, brandId: string | undefined): string {
  return brandById(brandId)?.color ?? defaultCardColor(name.trim());
}

function Preview({
  name,
  owner,
  color,
  brandId,
}: {
  readonly name: string;
  readonly owner: string;
  readonly color: string | undefined;
  readonly brandId: string | undefined;
}): React.JSX.Element {
  const { t } = useTranslation();
  const trimmed = name.trim();
  const card = {
    name: trimmed || t('form.namePlaceholder'),
    color: color ?? autoColorOf(trimmed, brandId),
    brandId,
    owner: owner.trim() || undefined,
    isPlaceholder: !trimmed,
  };
  return (
    <View style={styles.preview}>
      <CardTile
        card={card}
        accessibilityLabel={[t('form.preview'), card.name, card.owner].filter(Boolean).join(', ')}
        {...tid('cardPreview')}
      />
    </View>
  );
}

function useCodeMessage(issue: CodeIssue | undefined, format: BarcodeFormat): string | undefined {
  const { t } = useTranslation();
  if (issue === 'required') return t('form.codeRequired');
  if (issue === 'invalid') return t('form.codeInvalid', { format: FORMAT_LABEL[format] });
  return;
}

export function CardForm({
  initialValues,
  editingId,
  submitLabel,
  autoFocus = false,
  warnRotating = false,
  onSubmit,
  onScanInstead,
  onDelete,
}: Props): React.JSX.Element {
  const { t } = useTranslation();
  const form = useCardForm(initialValues, { autoLinkBrand: editingId === undefined });
  const codeMessage = useCodeMessage(form.issues.code, form.format);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive"
      automaticallyAdjustKeyboardInsets
    >
      <Preview
        name={form.draft.name}
        owner={form.draft.owner}
        color={form.color}
        brandId={form.brandId}
      />
      <FormWarnings code={form.draft.code} editingId={editingId} warnRotating={warnRotating} />
      <BrandChips
        brandId={form.brandId}
        region={form.region}
        onPick={form.pickBrand}
        onRemove={form.clearBrand}
        onMore={() => router.push('/card/brands')}
      />

      <View style={styles.group}>
        <TextField
          key={form.nameField.key}
          label={t('form.name')}
          placeholder={t('form.namePlaceholder')}
          defaultValue={form.nameField.value}
          onChangeText={form.onNameChange}
          inputRef={form.nameRef}
          error={form.issues.name ? t(NAME_MESSAGE[form.issues.name]) : undefined}
          autoFocus={autoFocus}
          autoCapitalize="words"
          autoCorrect={false}
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => form.codeRef.current?.focus()}
          {...tid('cardNameInput')}
        />
        <BrandSuggestions
          query={form.draft.name}
          brandId={form.brandId}
          region={form.region}
          onPick={form.pickBrand}
        />
        <TextField
          label={t('form.number')}
          placeholder={t('form.numberPlaceholder')}
          defaultValue={form.start.code}
          onChangeText={form.onCodeChange}
          inputRef={form.codeRef}
          error={codeMessage}
          monospace
          autoCapitalize="characters"
          autoCorrect={false}
          spellCheck={false}
          returnKeyType="done"
          {...tid('cardCodeInput')}
        />
        {onScanInstead ? (
          <Button
            label={t('form.scanInstead')}
            variant="ghost"
            icon={icons.barcode}
            onPress={onScanInstead}
          />
        ) : null}
      </View>

      <FormatSection format={form.format} onChange={form.setFormat} />
      <ColorPicker
        autoColor={autoColorOf(form.draft.name, form.brandId)}
        value={form.color}
        onChange={form.setColor}
      />

      <TextField
        label={t('form.owner')}
        placeholder={t('form.ownerPlaceholder')}
        hint={t('form.ownerHint')}
        defaultValue={form.start.owner}
        onChangeText={form.onOwnerChange}
        autoCapitalize="words"
        autoCorrect={false}
        returnKeyType="done"
        {...tid('ownerInput')}
      />

      <TextField
        label={t('form.note')}
        placeholder={t('form.notePlaceholder')}
        defaultValue={form.start.note}
        onChangeText={form.onNoteChange}
        {...tid('noteInput')}
        multiline
        scrollEnabled={false}
        autoCapitalize="sentences"
      />

      <PhotoSection photos={form.photos} onAdd={form.addPhoto} onRemove={form.removePhoto} />

      <ListSection>
        <ListRow
          title={t('form.pin')}
          accessory={
            <Switch
              value={form.isPinned}
              onValueChange={form.setPinned}
              accessibilityLabel={t('form.pin')}
              {...tid('pinSwitch')}
            />
          }
        />
      </ListSection>

      <Button
        label={submitLabel}
        size="lg"
        onPress={() => form.submit(onSubmit)}
        {...tid('saveCardButton')}
      />

      {onDelete ? (
        <ListSection>
          <ListRow
            title={t('form.deleteCard')}
            destructive
            onPress={onDelete}
            {...tid('deleteCardButton')}
          />
        </ListSection>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.space(4),
    paddingBottom: rt.insets.bottom + theme.space(6),
    gap: theme.space(5),
  },
  preview: {
    width: '100%',
    maxWidth: 300,
    alignSelf: 'center',
  },
  group: {
    gap: theme.space(4),
  },
}));
