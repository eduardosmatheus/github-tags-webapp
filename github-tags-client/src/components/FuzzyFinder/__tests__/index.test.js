import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FuzzyFinder from '../index';
import reposMock from './reposMock.json';
import { Repository } from '../../../pages/Repositories/RepositoryList';

test('shows the whole list when nothing is typed', () => {
  render(
    <FuzzyFinder
      data={reposMock}
      rowRenderer={Repository}
      keyExtractor={row => row.id}
    />
  );
  expect(screen.queryByText('retrofit')).toBeInTheDocument();  
});