import i18n from '../i18n';

/**
 * Composes localized strings from api error responses
 */
export const getApiErrorMessages = (data: any) => {
  let messages = data?.[0]?.messages ?? [];
  if (messages.length) {
    messages = messages.map((msg: any) => i18n.t(`error.${msg.id}`));
  }
  return messages;
};
