import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ProfitCalculator from '../ProfitCalculator';

describe('ProfitCalculator', () => {
  it('renders and updates rate when investment type changes', () => {
    render(
      <ProfitCalculator
        rates={{
          titulos: 10,
          fiis: 9,
          acoes: 12,
          crypto: 18,
        }}
      />,
    );

    expect(screen.getByText(/Taxa anual estimada/i)).toBeInTheDocument();
    expect(screen.getByText('10,00%')).toBeInTheDocument();

    fireEvent.change(screen.getByDisplayValue('Títulos'), {
      target: { value: 'crypto' },
    });

    expect(screen.getByText('18,00%')).toBeInTheDocument();
  });
});
