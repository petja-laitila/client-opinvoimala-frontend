import React from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import styled from 'styled-components';

const DAY_SIZE = 32;

const Container = styled.div`
  .react-datepicker {
    border: none;
    &__header {
      background-color: transparent;
      border-bottom: none;
    }
    &__current-month {
      font-size: 14px;
      padding-bottom: ${p => p.theme.spacing.md};
    }

    &__header,
    &__day-name {
      text-transform: capitalize;
    }

    &__day,
    &__day-name {
      width: ${DAY_SIZE}px;
      height: ${DAY_SIZE}px;
      line-height: ${DAY_SIZE}px;
    }

    &__day-name {
      width: ${DAY_SIZE}px;
      height: ${DAY_SIZE * 0.5}px;
      line-height: ${DAY_SIZE}px;
      font-size: 12px;
      color: ${p => p.theme.color.secondary};
    }

    &__day {
      width: ${DAY_SIZE}px;
      height: ${DAY_SIZE}px;
      line-height: ${DAY_SIZE}px;
      font-size: 16px;
      border-radius: 20px;
      color: ${p => p.theme.color.foreground};

      &--highlighted {
        background-color: ${p => p.theme.color.grey3};
      }
      &--selected {
        background-color: ${p => p.theme.color.primary};
        color: ${p => p.theme.color.background};
        font-weight: normal;
      }
      &--keyboard-selected {
        background-color: transparent;
      }
    }
  }
`;

interface Props extends ReactDatePickerProps {}

const DatePicker: React.FC<Props> = props => {
  return (
    <Container>
      <ReactDatePicker {...props} />
    </Container>
  );
};

export default DatePicker;
