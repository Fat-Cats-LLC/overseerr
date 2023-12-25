import Button from '@app/components/Common/Button';
import SensitiveInput from '@app/components/Common/SensitiveInput';
import { useUser } from '@app/hooks/useUser';
import { UserIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { defineMessages, useIntl } from 'react-intl';
import * as Yup from 'yup';
import {useEffect} from "react";

const messages = defineMessages({
  missingusername: 'You must provide a username.',
  invalidemail: 'You must provide a valid email address.',
  shortpassword: 'Your password is too short, it should be a minimum of 8 characters.'
});

type StepOneProps = {
  onComplete: () => void;
};

const StepOne = ({ onComplete }: StepOneProps) => {
  const { revalidate } = useUser();
  const intl = useIntl();

  const CreateUserSchema = Yup.object().shape({
    username: Yup.string()
      .required(intl.formatMessage(messages.missingusername)),
    email: Yup.string()
      .required(intl.formatMessage(messages.invalidemail))
      .email(intl.formatMessage(messages.invalidemail)),
    password: Yup.lazy((value) =>
      !value
        ? Yup.string()
        : Yup.string().min(
          8,
          intl.formatMessage(messages.shortpassword)
        )
    ),
  });

  // Check if the user is already logged in if we're on the first step, move along if so.
  (async () => {
      try {
        await axios.get(`/api/v1/auth/me`);
      } catch (err) {
        return;
      }
      onComplete();
    })();

  return (
    <>
      <div className="mx-auto max-w-xl">
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
          }}
          onSubmit={async (values) => {
            try {
              await axios.post('/api/v1/auth/local', {
                username: values.username,
                email: values.email,
                password: values.password,
              });
              revalidate();
              onComplete();
            } catch (e) {
              console.log(e.message);
            }
          }}
          validationSchema={CreateUserSchema}
        >
          {({isSubmitting, errors, touched, isValid}) => (
            <Form>
              <div>

                <div className="mt-1 mb-2 sm:col-span-2 sm:mt-0 flex flex-row">
                  <div className="form-input-field username-email-field">
                    <label htmlFor="username" className="text-label">
                      Username
                    </label>
                    <Field
                      id="username"
                      name="username"
                      type="text"
                      inputMode="text"
                      data-testid="username"
                    />
                    {errors.username &&
                      touched.username &&
                      typeof errors.username === 'string' && (
                        <div className="error">{errors.username}</div>
                      )}
                  </div>
                  <div className="form-input-field username-email-field">
                    <label htmlFor="email" className="text-label">
                      Email
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="text"
                      inputMode="email"
                      data-testid="email"
                    />
                    {errors.email &&
                      touched.email &&
                      typeof errors.email === 'string' && (
                        <div className="error">{errors.email}</div>
                      )}
                  </div>
                </div>

                <div className="mt-1 mb-2 sm:col-span-2 sm:mt-0">

                </div>
                <label htmlFor="password" className="text-label">
                  Password
                </label>
                <div className="mt-1 mb-2 sm:col-span-2 sm:mt-0">
                  <div className="form-input-field">
                    <SensitiveInput
                      as="field"
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      data-testid="password"
                    />
                  </div>
                  {errors.password &&
                    touched.password &&
                    typeof errors.password === 'string' && (
                      <div className="error">{errors.password}</div>
                    )}
                </div>
              </div>
              <div className="mt-8 border-t border-gray-700 pt-5">
                <div className="flex justify-center">
                  <Button
                    buttonType="primary"
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    data-testid="local-signin-button"
                  >
                    <UserIcon/>
                    <span>
                      {isSubmitting
                        ? 'Creating Account...'
                        : 'Create Account'}
                    </span>
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default StepOne;
