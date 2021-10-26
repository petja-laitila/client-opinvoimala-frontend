import { useParams as routerUseParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import i18n from '../i18n';

interface Params {
  id: string;
  slug: string;
  code: string;
}

export const useParams = () => {
  const params = routerUseParams<Params>();
  return params;
};

export const useQuery = () => new URLSearchParams(useLocation().search);

/**
 * Returns query parameter values for given keys
 *
 * For example:
 * const { year, week } = useQueryParams('year', 'week');
 * when url is .../something?year=2021&week=1
 */
export const useQueryParams = (...params: string[]) => {
  const query = useQuery();

  // Try locale translation first and plain english after
  const getQueryParam = (param: string) =>
    query.get(i18n.t(param).toLowerCase()) ?? query.get(param);

  const values: { [key: string]: string | null } = {};

  params.forEach(param => (values[param] = getQueryParam(param)));

  return values;
};
