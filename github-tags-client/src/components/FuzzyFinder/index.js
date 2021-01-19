import React, { useState, useEffect } from 'react';
import { FormControl } from 'react-bootstrap';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Styles from './index.module.scss';

export default function FuzzyFinder({
  data,
  rowRenderer: RowRenderer,
  keyExtractor,
  getHint,
  placeholder,
  isLoading
}) {
  const [searchHint, setSearchHint] = useState('');
  const [displayData, setDisplayData] = useState(data);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setDisplayData(filteredData);
  }, [filteredData]);

  const handleSearchHint = (hint) => {
    setSearchHint(hint);
    const filtered = data.filter(item => {
      const data = getHint(item);
      if (data instanceof Array) {
        const innerResults = data.filter(item => item.includes(hint));
        return !!innerResults.length;
      }
      return data.includes(hint);
    });
    setFilteredData(filtered);
  };

  return (
    <div
      className={Styles.FuzzyFinderContainer}
      data-testid="fuzzy-finder-container"
    >
      <FormControl
        type="text"
        name="searchHint"
        placeholder={placeholder}
        value={searchHint}
        onChange={e => handleSearchHint(e.target.value)}
      />
      <div
        className={Styles.FuzzyFinderResults}
        data-testid="fuzzy-finder-results"
      >
        {isLoading && (
          <FontAwesomeIcon
            className={Styles.LoadingResults}
            icon={faSpinner}
            spin
            size="6x"
          />
        )}
        {!isLoading && (!searchHint ? data : displayData).map(item => (
          <RowRenderer key={keyExtractor(item)} {...item} />
        ))}
      </div>
    </div>
  )
}
