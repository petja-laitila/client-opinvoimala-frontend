import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../store/storeContext';

interface UsePageTitleProps {
  title?: string | null;
}

/**
 * Sets document title based on given title
 */
export const usePageTitle = ({ title }: UsePageTitleProps) => {
  const { t } = useTranslation();

  const {
    settings: { settings },
  } = useStore();

  /**
   * Set page title
   */
  useEffect(() => {
    const baseTitle = settings?.appName ?? t('app_name') ?? '';

    const fullTitle = title ? `${baseTitle} - ${title}` : baseTitle;

    document.title = fullTitle;
  }, [settings, t, title]);
};
