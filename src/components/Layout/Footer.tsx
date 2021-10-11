import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Wrapper from './Wrapper';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/storeContext';
import { Link } from 'react-router-dom';
import { Divider, Grid, Icon } from 'semantic-ui-react';
import { contentPageUrl } from '../../routes/routes';

const StyledFooter = styled.footer`
  background-color: ${p => p.theme.color.grey3};
  padding-top: ${p => p.theme.spacing.lg};

  ${p => p.theme.font.size.sm};

  .footer__description-text {
    margin: ${p => p.theme.spacing.md} 0;
    width: 40%;
  }

  ul.footer__social-media-list {
    list-style-type: none;
    li {
      margin: ${p => p.theme.spacing.md} 0;
      a {
        font-family: ${p => p.theme.font.secondary};
        color: ${p => p.theme.color.foreground};

        :hover {
          text-decoration: none;
        }

        i.inverted.circular.icon {
          margin-left: ${p => p.theme.spacing.md};
          background-color: ${p => p.theme.color.secondary} !important;
        }
      }
    }
  }

  ul.footer__links-list {
    margin: 0;
    padding: 0;
    li {
      display: inline-block;
      &:not(:first-child) {
        margin-left: ${p => p.theme.spacing.lg};
      }
    }
  }

  @media ${p => p.theme.breakpoint.mobile} {
    .footer__description-text {
      width: 100%;
    }
  }
`;

const LogoArea = styled.div`
  margin-top: 30px;
  background-color: ${p => p.theme.color.background};

  div.logo-area__image-container {
    display: flex;
    align-items: center;
    img {
      width: 80px;
      margin: ${p => p.theme.spacing.lg} 0;
    }
  }
`;

const Footer: React.FC = observer(() => {
  const { t } = useTranslation();

  const {
    settings: { settings },
  } = useStore();

  const { phone, email, description, organisation, socialMedia, logos, links } =
    settings ?? {};

  const copyright = `\u00A9 ${organisation}`;

  const renderInfo = () => (
    <>
      <h4>{settings?.appName ?? t('app_name')}</h4>

      {description && <p>{description}</p>}

      {!!email && <a href={`mailto:${email}`}>{`${email}`}</a>}
      {!!phone && <p>{`${t('phone_abbrv')} ${phone}`}</p>}
    </>
  );

  const renderSocialMediaLinks = () => (
    <ul className="footer__social-media-list">
      {socialMedia?.map(({ id, platform, label, url }) => {
        if (!url) return null;
        return (
          <li key={id}>
            <a href={url} target="_blank" rel="noreferrer">
              {label}
              <Icon circular inverted name={(platform ?? 'linkify') as any} />
            </a>
          </li>
        );
      })}
    </ul>
  );

  const renderLinks = () => (
    <ul className="footer__links-list">
      {links?.map(({ id, label, page }) => (
        <li key={id}>
          <Link to={contentPageUrl(page)}>{label}</Link>
        </li>
      ))}
    </ul>
  );

  const renderLogos = () => {
    if (!logos?.length) return;

    return (
      <LogoArea>
        <Wrapper>
          <Grid verticalAlign="middle">
            {logos.map(({ id, url, alternativeText }) => (
              <div key={id} className="logo-area__image-container">
                <img src={url} alt={alternativeText ?? ''} />
              </div>
            ))}
          </Grid>
        </Wrapper>
      </LogoArea>
    );
  };

  return (
    <StyledFooter>
      <Wrapper>
        <Grid columns={2}>
          <Grid.Column>{renderInfo()}</Grid.Column>
          <Grid.Column textAlign="right">
            {renderSocialMediaLinks()}
          </Grid.Column>
        </Grid>

        <Divider section />

        <Grid columns={2}>
          <Grid.Column verticalAlign="middle">{renderLinks()}</Grid.Column>
          <Grid.Column verticalAlign="middle" textAlign="right">
            {copyright}
          </Grid.Column>
        </Grid>
      </Wrapper>

      {renderLogos()}
    </StyledFooter>
  );
});

export default Footer;
