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
  getHint: row => row.name
};

test('renders the component without errors', () => {
  render(<FuzzyFinder {...mockProps} />);
  expect(screen.getByTestId(CONTAINER_ID)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(testPlaceholder)).toBeInTheDocument();
});

test('renders only components with the specified hint', () => {
  render(<FuzzyFinder {...mockProps } />);
  const searchHintInput = screen.getByPlaceholderText(testPlaceholder);
  
  fireEvent.change(searchHintInput, { target: { value: 'k' }});
  
  const resultsContainer = screen.getByTestId('fuzzy-finder-results');
  const kotlinRepo = screen.queryByTestId('repository-kotlin');
  const museScoreRepo = screen.queryByTestId('repository-MuseScore');

  expect(museScoreRepo).toBeNull();
  expect(kotlinRepo).toBeInTheDocument();
  expect(resultsContainer).toContainElement(kotlinRepo);
});

test('render items compared through an array of strings', () => {
  const mapRepositoryTagsNames = (row) => {
    return row.tags.map(({ tag }) => tag.name);
  };

  render(
    <FuzzyFinder
      {...mockProps}
      getHint={mapRepositoryTagsNames}
    />
  );
  const searchHintInput = screen.getByPlaceholderText(testPlaceholder);

  fireEvent.change(searchHintInput, { target: { value: 'kotlin' }});
  
  const resultsContainer = screen.getByTestId('fuzzy-finder-results');

  const kotlinRepo = screen.queryByTestId('repository-kotlin');
  const museScoreRepo = screen.queryByTestId('repository-MuseScore');

  const retrofitRepo = screen.queryByTestId('repository-retrofit');
  const awsEbRepo = screen.queryByTestId('repository-eb-java-scorekeep');

  expect(kotlinRepo).toBeNull();
  expect(museScoreRepo).toBeNull();
  expect(retrofitRepo).toBeInTheDocument();
  expect(awsEbRepo).toBeInTheDocument();
  expect(resultsContainer).toContainElement(retrofitRepo);
  expect(resultsContainer).toContainElement(awsEbRepo);
});
