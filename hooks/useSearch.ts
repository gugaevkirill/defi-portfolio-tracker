import { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';

const useSearch = (initial = '') => {
  const [currentValue, setSearch] = useState(initial);
  const [search, _setSearch] = useState(initial);

  const debounced = useRef(debounce(_setSearch, 650));
  useEffect(() => debounced.current(currentValue), [currentValue]);

  return { currentValue, search, setSearch };
};

export default useSearch;
