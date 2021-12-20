import React from 'react';
import { SemanticWIDTHS, Grid } from 'semantic-ui-react';
import { Card as CardType } from '../store/models';
import Card from './Card';

interface Props {
  cards: CardType[];
  columns?: SemanticWIDTHS;
}

const Cards: React.FC<Props> = ({ cards, columns = 4 }) => {
  return (
    <Grid columns={columns} stackable doubling centered stretched>
      {cards?.map(card => (
        <Grid.Column key={card.id}>
          <Card key={card.id} {...card} />
        </Grid.Column>
      ))}
    </Grid>
  );
};

export default Cards;
