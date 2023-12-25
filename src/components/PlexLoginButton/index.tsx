import Button from '@app/components/Common/Button';
import globalMessages from '@app/i18n/globalMessages';
import PlexIcon from '@app/assets/services/plex-icon.svg';
import PlexOAuth from '@app/utils/plex';
import { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  signinwithplex: 'Sign In with Plex',
  signingin: 'Signing In…',
});

const plexOAuth = new PlexOAuth();

type PlexLoginButtonProps = Pick<
  React.ComponentPropsWithoutRef<typeof Button>,
  'buttonSize' | 'buttonType'
> & {
  onAuthToken: (authToken: string) => void;
  isProcessing?: boolean;
  onError?: (message: string) => void;
  textOverride?: string;
  svgIcon?: React.ReactNode;
  disabled?: boolean;
};

const PlexLoginButton = ({
                           onAuthToken,
                           onError,
                           isProcessing,
                           textOverride,
                           buttonType = 'plex',
                           buttonSize,
                           disabled,
                         }: PlexLoginButtonProps) => {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);

  const getPlexLogin = async () => {
    setLoading(true);
    try {
      const authToken = await plexOAuth.login();
      setLoading(false);
      onAuthToken(authToken);
    } catch (e) {
      if (onError) {
        onError(e.message);
      }
      setLoading(false);
    }
  };
  return (
    <span className="block w-full rounded-md shadow-sm">
      <Button
        type="button"
        onClick={() => {
          plexOAuth.preparePopup();
          setTimeout(() => getPlexLogin(), 1500);
        }}
        disabled={loading || isProcessing || disabled}
        buttonType={buttonType}
        buttonSize={buttonSize}
      >
        <PlexIcon />
        <span>
          {loading
            ? intl.formatMessage(globalMessages.loading)
            : isProcessing
              ? intl.formatMessage(messages.signingin)
              : textOverride
                ? textOverride
                : intl.formatMessage(messages.signinwithplex)}
        </span>
      </Button>
    </span>
  );
};

export default PlexLoginButton;
