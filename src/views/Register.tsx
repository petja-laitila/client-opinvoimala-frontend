import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Trans, useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { Divider } from 'semantic-ui-react';
import { Checkbox, Input } from '../components/inputs';
import Button from '../components/inputs/Button';
import Layout from '../components/Layout';
import { path } from '../routes/routes';
import { useStore } from '../store/storeContext';
import { validatePassword } from '../utils/string';

interface Props {}

export const Register: React.FC<Props> = observer(() => {
  const history = useHistory();
  const { t } = useTranslation();

  const {
    auth: { state, register },
  } = useStore();

  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const isValidForm =
    !!email.length && password1 === password2 && validatePassword(password1);

  const isBusy = state === 'PROCESSING';

  const handleChange =
    (setter: Dispatch<SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setter(event.currentTarget.value);
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isValidForm && !isBusy) {
      const params = { email, password: password1 };
      const success = await register(params);
      if (success) {
        history.push('/');
      } else {
        // TODO: Registration failed!
      }
    }
  };

  const hero = {
    title: t('route.register'),
  };

  const getTermsAndConditionsLabel = () => {
    const termsLink = <Link to={`/${path('terms')}`}>terms</Link>;
    const conditionsLink = (
      <Link to={`/${path('conditions')}`}>conditions</Link>
    );
    return (
      <Trans i18nKey="view.register.terms_and_conditions_text">
        I accept {termsLink} and {conditionsLink}
      </Trans>
    );
  };

  return (
    <Layout hero={hero} wrapperSize="sm">
      <form onSubmit={handleSubmit}>
        <h3>{t('view.register.email_title')}</h3>
        <p>{t('view.register.email_info')}</p>
        <Input
          id="register-view__email-input"
          label={t('label.email')}
          name="email"
          type="email"
          value={email}
          onChange={handleChange(setEmail)}
        />
        <Divider hidden />
        <h3>{t('view.register.password_title')}</h3>
        <p>{t('view.register.password_info')}</p>
        <Input
          id="register-view__password-input"
          label={t('label.password')}
          name="password"
          type="password"
          value={password1}
          onChange={handleChange(setPassword1)}
        />
        <Input
          id="register-view__confirm-password-input"
          label={t('label.password_confirm')}
          name="confirm-password"
          type="password"
          value={password2}
          onChange={handleChange(setPassword2)}
        />
        <Checkbox
          id="register-view__terms_and_conditions_checkbox"
          label={getTermsAndConditionsLabel()}
        />
        <Button
          id="register-view__register-button"
          text={t('action.register')}
          type="submit"
          disabled={!isValidForm || isBusy}
          noMargin
        />
      </form>
    </Layout>
  );
});
