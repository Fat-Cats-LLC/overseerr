import PlexLogo from '@app/assets/services/plex.svg';
import Badge from '@app/components/Common/Badge';
import Button from '@app/components/Common/Button';
import SettingsPlex from '@app/components/Settings/SettingsPlex';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import {useEffect, useState} from 'react';
import { defineMessages, useIntl } from 'react-intl';
import axios from "axios";

const messages = defineMessages({
  continue: 'Continue',
  goback: 'Go Back',
  tip: 'Tip',
  scanbackground:
    'Scanning will run in the background. You can continue the setup process in the meantime.',
});

type ConfigureMediaServersProps = {
  onComplete: () => void;
};

type ConfigureStatus = {
  configuring?: 'plex';
};

const ConfigureMediaServers = ({ onComplete }: ConfigureMediaServersProps) => {
  const intl = useIntl();
  const [configureStatus, setConfigureStatus] = useState<ConfigureStatus>();
  const [plexConfigured, setPlexConfigured] = useState(false);

  // Check if Plex is available, if so, mark it as configured.
  (async () => {
    try {
      const response = await axios.get(`/api/v1/settings/plex`);
      if (response.data && response.data['ip']) { // FIXME: This API sets plexAvailable based on if we're logged in. I should add another value for "plexConfigured".
        setPlexConfigured(true)
      }
    } catch (err) {
      return;
    }
  })();

  return (
    <>
      {configureStatus?.configuring === 'plex' && (
        <>
          <SettingsPlex onComplete={() => setPlexConfigured(true)} />
          <div className="mt-4 text-sm text-gray-500">
            <span className="mr-2">
              <Badge>{intl.formatMessage(messages.tip)}</Badge>
            </span>
            {intl.formatMessage(messages.scanbackground)}
          </div>
          <div className="actions">
            <div className="flex flex-row-reverse justify-between">
              <Button
                buttonType="primary"
                disabled={!plexConfigured}
                onClick={() => {
                  setConfigureStatus({});
                  setPlexConfigured(true);
                }}
              >
                {intl.formatMessage(messages.continue)}
              </Button>
              {!plexConfigured && (
                <Button onClick={() => setConfigureStatus({})}>
                  {intl.formatMessage(messages.goback)}
                </Button>
              )}
            </div>
          </div>
        </>
      )}
      {!configureStatus?.configuring && (
        <>
          <h3 className="heading">Configure Media Servers</h3>
          <p className="description">
            Select the media servers you would like to configure below.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-52 divide-y divide-gray-700 rounded border border-gray-700 bg-gray-800 bg-opacity-20">
              <div className="flex flex-col items-center justify-center p-8">
                <PlexLogo className="w-full" />
              </div>
              {plexConfigured && (
                <div className="flex items-center justify-center space-x-2 pb-2" style={{['--tw-divide-opacity' as any]: 0}}>
                  <CheckCircleIcon className="w-6 text-green-500" />
                  <span>Configured</span>
                </div>
              )}
              <div className="flex items-center justify-center space-x-2 p-2">
                <Button
                  className="w-full"
                  onClick={() => setConfigureStatus({ configuring: 'plex' })}
                >
                  Configure Plex
                </Button>
              </div>
            </div>
          </div>
          <div className="actions">
            <div className="flex justify-end">
              <Button buttonType="primary" onClick={() => onComplete()}>
                {plexConfigured
                  ? 'Continue'
                  : 'Continue without a Media Server'}
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ConfigureMediaServers;
