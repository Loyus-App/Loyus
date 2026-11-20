import { Button, ContextMenu, Host, RNHostView } from '@expo/ui/swift-ui';
import type { ReactElement } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { cardActionList, openCard } from './cardActions';
import type { CardLinkProps } from './CardLink';
import { CardPeek, usePeekWidth } from './CardPeek';

export type { CardPressHandlers } from './CardLink';

export function CardLink({ card, width, children }: CardLinkProps): ReactElement {
  const peekWidth = usePeekWidth();

  return (
    <Host matchContents>
      <ContextMenu>
        <ContextMenu.Items>
          {cardActionList(card).map((action) => (
            <Button
              key={action.name}
              label={action.label}
              systemImage={action.icon.ios}
              role={action.destructive ? 'destructive' : 'default'}
              onPress={action.run}
            />
          ))}
        </ContextMenu.Items>
        <ContextMenu.Trigger>
          <RNHostView matchContents>
            <View style={styles.box(width)}>
              {children({ onPress: () => openCard(card), onLongPress: undefined })}
            </View>
          </RNHostView>
        </ContextMenu.Trigger>
        <ContextMenu.Preview>
          <RNHostView matchContents>
            <View style={styles.box(peekWidth)}>
              <CardPeek card={card} />
            </View>
          </RNHostView>
        </ContextMenu.Preview>
      </ContextMenu>
    </Host>
  );
}

const styles = StyleSheet.create({
  box: (width: number) => ({
    width,
  }),
});
