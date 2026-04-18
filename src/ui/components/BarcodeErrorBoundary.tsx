import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { i18n } from '../../infra/i18n';

interface BarcodeErrorBoundaryProps {
  children: React.ReactNode;
}

interface BarcodeErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export class BarcodeErrorBoundary extends React.Component<
  BarcodeErrorBoundaryProps,
  BarcodeErrorBoundaryState
> {
  constructor(props: BarcodeErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): BarcodeErrorBoundaryState {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(_error: Error): void {
    // Error already captured in getDerivedStateFromError — no additional reporting needed.
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Ionicons name="alert-circle-outline" size={48} color="#666666" />
          <Text style={styles.title}>{i18n.t('error.barcodeRenderFailed')}</Text>
          <Text style={styles.message}>{this.state.errorMessage}</Text>
          <Text style={styles.hint}>{i18n.t('error.barcodeRenderHint')}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 12,
  },
  message: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
    textAlign: 'center',
  },
  hint: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
    fontStyle: 'italic',
  },
});
