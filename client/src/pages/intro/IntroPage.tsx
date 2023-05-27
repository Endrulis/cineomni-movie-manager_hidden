import { useEffect } from 'react';
import { IntroPageTemplate } from './templates/IntroPageTemplate';

export const IntroPage = () => {
  useEffect(() => {
    const delay = 3000;

    const timeout = setTimeout(() => {
      window.location.href = '/home';
    }, delay);
    return () => clearTimeout(timeout);
  }, []);

  const title = 'Welcome to Cineomni!';
  const description =
    'Enjoy your journey and immerse yourself in your favorite movies!';

  return <IntroPageTemplate title={title} description={description} />;
};
