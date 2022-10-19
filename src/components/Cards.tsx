import React from 'react';
import { SemanticWIDTHS, Grid } from 'semantic-ui-react';
import styled from 'styled-components';
import { Card as CardType } from '../store/models';
import Card from './Card';
import Heading, { HeadingLevel, HeadingSize } from './Heading';

const Container = styled.div<{ headingSize: HeadingSize }>`
  margin-top: ${p => p.theme.spacing.xl};
  margin-bottom: ${p => p.theme.spacing.xl};

  > .grid {
    margin-top: ${p => p.theme.spacing.sm};
    margin-bottom: ${p => p.theme.spacing.sm};
  }

  h2 {
    ${p => p.theme.font[p.headingSize]};
  }
`;

interface Props {
  title?: string | null;
  titleSize?: HeadingSize;
  cards: CardType[];
  columns?: SemanticWIDTHS;
  headingLevel?: HeadingLevel;
}

const Cards: React.FC<Props> = ({
  title,
  titleSize = 'h2',
  cards,
  columns = 4,
  headingLevel,
}) => {
  return (
    <Container headingSize={titleSize}>
      {!!title?.length && <Heading level="h2">{title}</Heading>}
      <Grid columns={columns} stackable doubling centered stretched>
        {cards?.map(card => (
          <Grid.Column key={card.id}>
            <Card
              key={card.id}
              headingLevel={title?.length ? 'h3' : 'h2'}
              {...card}
            />
          </Grid.Column>
        ))}
      </Grid>
    </Container>
  );
};

export default Cards;
