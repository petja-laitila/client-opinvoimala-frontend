import { useParams as routerUseParams } from 'react-router';

interface Params {
  id: string;
}

export const useParams = () => {
  const params = routerUseParams<Params>();
  return params;
};
