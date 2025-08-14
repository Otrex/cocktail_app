import { isBrowser } from '@/lib/utils';
import { useState, useEffect, useCallback, type Dispatch, type SetStateAction } from 'react';

export default function useUrlState<T>(key: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] {
  const getInitialValue = (): T => {
    if (!isBrowser()) {
      return defaultValue;
    }

    const params = new URLSearchParams(window.location.search);
    const urlValue = params.get(key);

    if (urlValue === null) {
      return defaultValue;
    }

    try {
      return JSON.parse(urlValue) as T;
    } catch {
      return urlValue as T;
    }
  };

  const [state, setState] = useState(getInitialValue);
  const updateUrl = useCallback((newValue: T) => {
    if (!isBrowser()) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    if (newValue === defaultValue || newValue === '' || newValue === null || newValue === undefined) {
      params.delete(key);
    } else {
      const valueToStore = typeof newValue === 'string'
        ? newValue
        : JSON.stringify(newValue);
      params.set(key, valueToStore);
    }

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    window.history.replaceState(null, '', newUrl);
  }, [key, defaultValue]);

  const setUrlState: Dispatch<SetStateAction<T>> = useCallback((valueOrUpdater) => {
    setState((prevState: T) => {
      const newValue = typeof valueOrUpdater === 'function'
        ? (valueOrUpdater as (prevState: T) => T)(prevState)
        : valueOrUpdater;

      updateUrl(newValue);
      return newValue;
    });
  }, [updateUrl]);

  useEffect(() => {
    const handlePopState = () => {
      setState(getInitialValue());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, defaultValue]);

  useEffect(() => {
    const urlValue = getInitialValue();
    if (urlValue !== state) {
      setState(urlValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [state, setUrlState];
};
