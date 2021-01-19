import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FuzzyFinder from '../index';
import reposMock from './reposMock.json';
import { Repository } from '../../../pages/Repositories/RepositoryList';

const CONTAINER_ID = 'fuzzy-finder-container';
const testPlaceholder = 'Informe uma tag (ou parte dela)';

const mockProps = {
  data: reposMock,
  rowRenderer: Repository,
  keyExtractor: row => row.id,
  placeholder: testPlaceholder,
};

test('renders the component without errors', () => {
  render(<FuzzyFinder {...mockProps} />);
  expect(screen.getByTestId(CONTAINER_ID)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(testPlaceholder)).toBeInTheDocument();  
});
