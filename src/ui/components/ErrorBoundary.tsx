import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { i18n } from '../../infra/i18n';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorCount: number;
}

const MAX_RETRIES = 3;

/**
 * Generic error boundary for screen-level crash isolation.
 * Uses plain RN StyleSheet (NOT Unistyles) so it never depends on
 * theme infrastructure that might itself be broken.
 *
 * Threat T-05-05: Tracks error count — after 3 consecutive errors,
 * shows "Please restart the app" instead of "Try Again" to prevent
 * infinite retry loops.
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorCount: 0 };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(_error: Error, _errorInfo: React.ErrorInfo): void {
    this.setState((prev) => ({ errorCount: prev.errorCount + 1 }));
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const canRetry = this.state.errorCount < MAX_RETRIES;

      return (
        <View style={styles.container}>
          {/* biome-ignore lint/style/noJsxLiterals: decorative symbol */}
          <Text style={styles.emoji}>!</Text>
          <Text style={styles.title}>{i18n.t('error.title')}</Text>
          <Text style={styles.message}>{this.state.error?.message ?? i18n.t('error.title')}</Text>
          {canRetry ? (
            <Pressable
              style={styles.retryButton}
              onPress={this.handleRetry}
              accessibilityLabel={i18n.t('error.tryAgainLabel')}
              accessibilityRole="button"
            >
              <Text style={styles.retryText}>{i18n.t('error.tryAgain')}</Text>
            </Pressable>
          ) : (
            <Text style={styles.restartText}>{i18n.t('error.restart')}</Text>
          )}
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  emoji: {
    fontSize: 48,
    fontWeight: '700',
    color: '#FF3B30',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 32,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#2D4739',
    borderRadius: 8,
  },
  retryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  restartText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
