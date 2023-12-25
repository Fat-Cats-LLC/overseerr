import AppDataWarning from '@app/components/AppDataWarning';
import Button from '@app/components/Common/Button';
import PageTitle from '@app/components/Common/PageTitle';
import LanguagePicker from '@app/components/Layout/LanguagePicker';
import SettingsServices from '@app/components/Settings/SettingsServices';
import CreateAccount from '@app/components/Setup/CreateAccount';
import ConfigureMediaServers from '@app/components/setup/ConfigureMediaServers';
import SetupSteps from '@app/components/Setup/SetupSteps';
import useLocale from '@app/hooks/useLocale';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { mutate } from 'swr';
import BackgroundImage from "@app/components/Common/BackgroundImage";

const messages = defineMessages({
  welcome: 'G\'day mate, welcome to Oversneedrr',
  signup: 'Get started by creating an account for yer instance.',
  login: 'Get started by logging into your account.',
  setup: 'Setup',
  finish: 'Finish Setup',
  finishing: 'Finishing…',
  continue: 'Continue',
  createaccount: 'Create an Account',
  configureservers: 'Configure your Media Servers',
  configureservices: 'Configure Services',
  tip: 'Tip',
  scanbackground:
    'Scanning will run in the background. You can continue the setup process in the meantime.',
});

const Setup = () => {
  const intl = useIntl();
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const { locale } = useLocale();

  const finishSetup = async () => {
    setIsUpdating(true);
    const response = await axios.post<{ initialized: boolean }>(
      '/api/v1/settings/initialize'
    );

    setIsUpdating(false);
    if (response.data.initialized) {
      await axios.post('/api/v1/settings/main', { locale });
      await mutate('/api/v1/settings/public');

      await router.push('/');
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center bg-gray-900 py-12">
      <PageTitle title={intl.formatMessage(messages.setup)} />
      <BackgroundImage backgroundImage="/sneeds-feed-and-seed.jpg" />
      <div className="absolute top-4 right-4 z-50">
        <LanguagePicker />
      </div>
      <div className="relative z-40 px-4 sm:mx-auto sm:w-full sm:max-w-4xl">
        <img
          src="/logo_stacked.svg"
          className="mb-10 max-w-full sm:mx-auto sm:max-w-md"
          alt="Logo"
        />
        <AppDataWarning />
        <nav className="relative z-50">
          <ul
            className="divide-y divide-gray-600 rounded-md border border-gray-600 bg-gray-800 bg-opacity-50 md:flex md:divide-y-0"
            style={{ backdropFilter: 'blur(5px)' }}
          >
            <SetupSteps
              stepNumber={1}
              description={intl.formatMessage(messages.createaccount)}
              active={currentStep === 1}
              completed={currentStep > 1}
            />
            <SetupSteps
              stepNumber={2}
              description={intl.formatMessage(messages.configureservers)}
              active={currentStep === 2}
              completed={currentStep > 2}
            />
            <SetupSteps
              stepNumber={3}
              description={intl.formatMessage(messages.configureservices)}
              active={currentStep === 3}
              isLastStep
            />
          </ul>
        </nav>
        <div className="mt-10 w-full rounded-md border border-gray-600 bg-gray-800 bg-opacity-50 p-4 text-white">
          {currentStep === 1 && (
            <>
              <div className="mb-2 flex justify-center text-xl font-bold">
                {intl.formatMessage(messages.welcome)}
              </div>
              <div className="mb-2 flex justify-center pb-6 text-sm">
                {intl.formatMessage(messages.signup)}
              </div>
              <CreateAccount onComplete={() => setCurrentStep(2)}/>
            </>
          )}
          {currentStep === 2 && (
            <ConfigureMediaServers onComplete={() => setCurrentStep(3)} />
          )}
          {currentStep === 3 && (
            <div>
              <SettingsServices/>
              <div className="actions">
                <div className="flex justify-end">
                  <span className="ml-3 inline-flex rounded-md shadow-sm">
                    <Button
                      buttonType="primary"
                      onClick={() => finishSetup()}
                      disabled={isUpdating}
                    >
                      {isUpdating
                        ? intl.formatMessage(messages.finishing)
                        : intl.formatMessage(messages.finish)}
                    </Button>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Setup;
