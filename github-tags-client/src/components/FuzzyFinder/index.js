import React, { useState, useEffect } from 'react';
import { FormControl } from 'react-bootstrap';
import Styles from './index.module.scss';

export default function FuzzyFinder({
  data,
  rowRenderer: RowRenderer,
  keyExtractor,
  getHint,
  placeholder
}) {
  const [searchHint, setSearchHint] = useState('');
  const [displayData, setDisplayData] = useState(data);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setDisplayData(!filteredData.length ? data : filteredData);
  }, [filteredData]);

  const handleSearchHint = (hint) => {
    setSearchHint(hint);
    const filtered = data.filter(item => {
      const dataStr = getHint(item);
      return dataStr.includes(hint);;
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
        {displayData.map(item => (
          <RowRenderer key={keyExtractor(item)} {...item} />
        ))}
      </div>
    </div>
  )
}
