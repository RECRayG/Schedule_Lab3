import { useCallback, useEffect, useState } from 'react';

// @ts-ignore
import { Meteor } from 'meteor/meteor';

export const useMeteorCall = <T>(method: string, params?: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<unknown>();

  // @ts-ignore
  const request = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await Meteor.callAsync(method, params);
      setData(data);
      setIsLoading(false);
    } catch (e) {
      console.log('e', e);
      console.log('data', data);
      console.log('params', params);
      console.log('method', method);
      setIsLoading(false);
      setError(e);
    }
  }, [method]);

  useEffect(() => {
    request();
  }, [request]);
  return { isLoading, error, request, data };
};
