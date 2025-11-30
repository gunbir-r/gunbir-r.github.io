import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import ThemeToggle from '../components/layout/ThemeToggle';
import { PortfolioThemeProvider } from '../components/theme/ThemeContext';

describe('ThemeToggle', () => {
  it('toggles between light and dark', () => {
    render(
      <PortfolioThemeProvider>
        <ThemeToggle />
      </PortfolioThemeProvider>
    );
    const btn = screen.getByRole('button');
    const initial = btn.textContent;
    fireEvent.click(btn);
    expect(btn.textContent).not.toEqual(initial);
  });
});
