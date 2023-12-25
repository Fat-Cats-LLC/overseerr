import PlexLoginButton from '@app/components/PlexLoginButton';
import { useUser } from '@app/hooks/useUser';
import axios from 'axios';
import { useEffect, useState } from 'react';

type LoginWithPlexProps = Omit<
  React.ComponentPropsWithoutRef<typeof PlexLoginButton>,
  'onAuthToken'
> & {
  onComplete: () => void;
};

const LoginWithPlex = ({
                         onComplete,
                         ...plexLoginButtonProps
                       }: LoginWithPlexProps) => {

  const [authToken, setAuthToken] = useState<string | undefined>(undefined);
  const { revalidate } = useUser();

  // Effect that is triggered when the `authToken` comes back from the Plex OAuth
  // We take the token and attempt to login. If we get a success message, we will
  // ask swr to revalidate the user which _shouid_ come back with a valid user.

  useEffect(() => {
    const login = async () => {
      const response = await axios.post('/api/v1/auth/plex', { authToken });

      if (response.data?.id) {
        const user = await revalidate();
        if (user) {
          setAuthToken(undefined);
          onComplete();
        }
      }
    };
    if (authToken) {
      login();
    }
  }, [authToken, revalidate, onComplete]);

  return (
    <form>
      <PlexLoginButton
        onAuthToken={(authToken) => setAuthToken(authToken)}
        {...plexLoginButtonProps}
      />
    </form>
  );
};

export default LoginWithPlex;
