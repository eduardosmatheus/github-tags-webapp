import '@testing-library/jest-dom';
import React from 'react';
import FuzzyFinder from '../index';

import { render, fireEvent, screen } from '@testing-library/react';

test('shows the whole list when nothing is typed', () => {
  render(
    <FuzzyFinder
      data={[]}
    />
  );
  expect(screen.queryAllByText('')).toBe(123);

  
})