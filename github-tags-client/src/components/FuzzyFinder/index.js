import React, { useState } from 'react';
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
  const [filteredData, setFilteredData] = useState(null);

  const handleSearchHint = (hint) => {
    setSearchHint(hint);
    const filtered = data.filter(item => {
      return getHint(item).toString().includes(hint);
    });
    setFilteredData(filtered);
  };

  const displayList = searchHint && filteredData && filteredData.length
    ? filteredData : data;

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
        {displayList.map(item => (
          <RowRenderer key={keyExtractor(item)} {...item} />
        ))}
      </div>
    </div>
  )
}
