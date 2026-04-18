import Ionicons from '@expo/vector-icons/Ionicons';
import { type ReactNode, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActionSheetIOS,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { validateBarcode } from '../../domain/barcode';
import { BarcodeFormat } from '../../domain/card';
import { i18n } from '../../infra/i18n';
import { tid } from '../testIds';
import { StyleSheet, useUnistyles } from '../theme/unistyles';
import { CodeInputTrailing } from './CodeInputTrailing';
import { ColorPicker } from './ColorPicker';
import { FavoriteRow } from './FavoriteRow';
import { FORMAT_DISPLAY_NAME } from './FormatBadge';
import { FormSubmitButton } from './FormSubmitButton';

export interface CardFormValues {
  name: string;
  code: string;
  format: BarcodeFormat;
  color?: string;
  isFavorite?: boolean;
}

interface CardFormProps {
  initialValues?: CardFormValues;
  onSubmit: (values: CardFormValues) => void;
  onValuesChange?: (values: Pick<CardFormValues, 'name' | 'code' | 'format'>) => void;
  submitLabel: string;
  /** Hide the color picker (used in Add screen where the design omits it) */
  hideColorPicker?: boolean;
  /** Show icons inside inputs (Add screen design) */
  showInputIcons?: boolean;
  /** Use solid teal button instead of gradient */
  solidButton?: boolean;
  /** Rendered inside the ScrollView, between fields and the submit button */
  renderBelowFields?: ReactNode;
}

const ALL_FORMATS = Object.values(BarcodeFormat) as BarcodeFormat[];

function showIosPicker(onChange: (f: BarcodeFormat) => void): void {
  const labels = ALL_FORMATS.map((f) => FORMAT_DISPLAY_NAME[f]);
  ActionSheetIOS.showActionSheetWithOptions(
    { options: [...labels, i18n.t('common.cancel')], cancelButtonIndex: labels.length },
    (index) => {
      if (index >= ALL_FORMATS.length) return;
      const f = ALL_FORMATS[index];
      if (f !== undefined) onChange(f);
    },
  );
}

function showAndroidPicker(onChange: (f: BarcodeFormat) => void): void {
  Alert.alert(i18n.t('form.selectBarcodeType'), undefined, [
    ...ALL_FORMATS.map((f) => ({
      text: FORMAT_DISPLAY_NAME[f],
      onPress: () => onChange(f),
      style: 'default',
    })),
    { text: i18n.t('common.cancel'), style: 'cancel' },
  ]);
}

function showFormatPicker(_current: BarcodeFormat, onChange: (f: BarcodeFormat) => void): void {
  if (Platform.OS === 'ios') {
    showIosPicker(onChange);
    return;
  }
  showAndroidPicker(onChange);
}

function validateName(
  name: string,
  errorRequired: string,
  errorTooLong: string,
): string | undefined {
  if (name.length === 0) return errorRequired;
  if (name.length > 50) return errorTooLong;
  return;
}

function validateCode(
  code: string,
  format: BarcodeFormat,
  errorRequired: string,
): string | undefined {
  if (code.length === 0) return errorRequired;
  const result = validateBarcode(code, format);
  if (!result.valid && result.error) return result.error;
  return;
}

function buildFormErrors(
  nameError: string | undefined,
  codeError: string | undefined,
): { name?: string; code?: string } | null {
  if (nameError === undefined && codeError === undefined) return null;
  return {
    ...(nameError !== undefined && { name: nameError }),
    ...(codeError !== undefined && { code: codeError }),
  };
}

function resolveInitialValues(initial?: CardFormValues) {
  return {
    name: initial?.name ?? '',
    code: initial?.code ?? '',
    format: initial?.format ?? BarcodeFormat.CODE128,
    color: initial?.color,
    isFavorite: initial?.isFavorite ?? false,
  };
}

export function CardForm({
  initialValues,
  onSubmit,
  onValuesChange,
  submitLabel,
  hideColorPicker = false,
  showInputIcons = false,
  solidButton = false,
  renderBelowFields,
}: CardFormProps): React.JSX.Element {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const resolved = resolveInitialValues(initialValues);
  // Use refs to always read the current native text, bypassing controlled-input
  // reset issues that occur with automated testing tools (e.g. Maestro on iOS).
  const nameRef = useRef<TextInput>(null);
  const codeRef = useRef<TextInput>(null);
  const nameText = useRef(resolved.name);
  const codeText = useRef(resolved.code);
  const [_name, setName] = useState(resolved.name);
  const [code, setCode] = useState(resolved.code);
  const [format, setFormat] = useState<BarcodeFormat>(resolved.format);
  const [color, setColor] = useState<string | undefined>(resolved.color);
  const [isFavorite, setIsFavorite] = useState(resolved.isFavorite);
  const [errors, setErrors] = useState<{ name?: string; code?: string }>({});

  function notifyChange(n: string, c: string, f: BarcodeFormat) {
    onValuesChange?.({ name: n, code: c, format: f });
  }

  function handleNameChange(text: string) {
    nameText.current = text;
    setName(text);
    setErrors((prev) => ({ code: prev.code }));
    notifyChange(text, codeText.current, format);
  }

  function handleCodeChange(text: string) {
    codeText.current = text;
    setCode(text);
    setErrors((prev) => ({ name: prev.name }));
    notifyChange(nameText.current, text, format);
  }

  function handleFormatChange(f: BarcodeFormat) {
    setFormat(f);
    notifyChange(nameText.current, codeText.current, f);
  }

  function handleSubmit() {
    // Read from refs to get the true current value (works even if onChangeText
    // was not fired by the test runner due to controlled-input quirks).
    const trimmedName = nameText.current.trim();
    const nameError = validateName(
      trimmedName,
      t('form.validationNameRequired'),
      t('form.validationNameTooLong'),
    );
    const codeError = validateCode(codeText.current, format, t('form.validationCodeRequired'));
    const formErrors = buildFormErrors(nameError, codeError);
    if (formErrors) {
      setErrors(formErrors);
      return;
    }
    onSubmit({
      name: trimmedName,
      code: codeText.current,
      format,
      ...(color === undefined ? {} : { color }),
      isFavorite,
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Store Name */}
        <View style={styles.field}>
          <Text style={styles.label}>{t('form.storeName')}</Text>
          <View style={styles.inputWrapper}>
            {showInputIcons && (
              <View style={styles.inputIconLeft}>
                <Ionicons name="storefront-outline" size={18} color={theme.colors.textTertiary} />
              </View>
            )}
            <TextInput
              ref={nameRef}
              style={[
                styles.input,
                showInputIcons && styles.inputWithIcon,
                errors.name ? styles.inputError : undefined,
              ]}
              defaultValue={resolved.name}
              onChangeText={handleNameChange}
              placeholder={t('form.storeNamePlaceholder')}
              placeholderTextColor={theme.colors.textPlaceholder}
              maxLength={50}
              accessibilityLabel={t('form.storeNameLabel')}
              {...tid('cardNameInput')}
            />
          </View>
          {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}
        </View>

        {/* Card Number / Code */}
        <View style={styles.field}>
          <Text style={styles.label}>{t('form.cardCode')}</Text>
          <View style={styles.inputWrapper}>
            {showInputIcons && (
              <View style={styles.inputIconLeft}>
                {/* biome-ignore lint/style/noJsxLiterals: decorative placeholder */}
                <Text style={styles.inputIconText}>123</Text>
              </View>
            )}
            <TextInput
              ref={codeRef}
              style={[
                styles.input,
                styles.codeInput,
                showInputIcons && styles.inputWithIcon,
                errors.code ? styles.inputError : undefined,
              ]}
              defaultValue={resolved.code}
              onChangeText={handleCodeChange}
              placeholder={t('form.cardCodePlaceholder')}
              placeholderTextColor={theme.colors.textPlaceholder}
              accessibilityLabel={t('form.cardCodeLabel')}
              {...tid('cardCodeInput')}
            />
            <CodeInputTrailing
              showInputIcons={showInputIcons}
              hasCode={code.length > 0}
              onClear={() => {
                codeRef.current?.clear();
                codeText.current = '';
                setCode('');
                notifyChange(nameText.current, '', format);
              }}
            />
          </View>
          {errors.code ? <Text style={styles.error}>{errors.code}</Text> : null}
        </View>

        {/* Barcode Type */}
        <View style={styles.field}>
          <Text style={styles.label}>{t('form.barcodeType')}</Text>
          <Pressable
            style={styles.formatDropdown}
            onPress={() => showFormatPicker(format, handleFormatChange)}
            accessibilityLabel={`${t('form.barcodeType')}: ${FORMAT_DISPLAY_NAME[format]}`}
            accessibilityRole="button"
            {...tid('formatPicker')}
          >
            <Ionicons name="barcode-outline" size={20} color={theme.colors.textSecondary} />
            <Text style={styles.formatDropdownText}>{FORMAT_DISPLAY_NAME[format]}</Text>
            <Ionicons name="chevron-down" size={16} color={theme.colors.textTertiary} />
          </Pressable>
        </View>

        {/* Color Picker (hidden in add-screen mode) */}
        {!hideColorPicker && (
          <View style={styles.field}>
            <Text style={styles.label}>{t('form.color')}</Text>
            <ColorPicker value={color} onChange={setColor} />
          </View>
        )}

        {/* Mark as Favorite */}
        <FavoriteRow isFavorite={isFavorite} onToggle={setIsFavorite} />

        {/* Slot for card preview or other content before the button */}
        {renderBelowFields}

        <FormSubmitButton label={submitLabel} solidButton={solidButton} onPress={handleSubmit} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create((theme) => ({
  flex: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
    gap: theme.spacing.lg,
  },
  field: {
    gap: theme.spacing.xs,
  },
  label: {
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIconLeft: {
    position: 'absolute',
    left: 14,
    zIndex: 1,
    justifyContent: 'center',
  },
  inputIconText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textTertiary,
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.containerLowest,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 14,
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text,
    minHeight: 56,
    ...theme.subtleShadow,
  },
  inputWithIcon: {
    paddingLeft: 44,
  },
  inputError: {
    backgroundColor: theme.colors.errorContainer,
  },
  error: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.error,
  },
  codeInput: {
    paddingRight: 44,
  },
  formatDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.containerLowest,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 16,
    minHeight: 56,
    ...theme.subtleShadow,
  },
  formatDropdownText: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text,
  },
}));
