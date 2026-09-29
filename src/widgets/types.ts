export type CardsWidgetCard = {
  readonly id: string;
  readonly name: string;
  readonly initials: string;
  readonly subtitle: string;
  readonly detail: string;
  readonly fill: string;
  readonly ink: string;
  readonly url: string;
};

export type CardsWidgetProps = {
  readonly cards: readonly CardsWidgetCard[];
  readonly emptyTitle: string;
  readonly emptyBody: string;
  readonly homeUrl: string;
  readonly surfaceLight: string;
  readonly surfaceDark: string;
};

export type CardsWidgetStrings = {
  readonly emptyTitle: string;
  readonly emptyBody: string;
  readonly ownerLine: (owner: string, format: string) => string;
};
