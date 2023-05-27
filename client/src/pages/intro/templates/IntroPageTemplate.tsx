import './sass/IntroPageTemplate.css';

interface IntroPageTemplateProps {
  title: string;
  description: string;
}

export const IntroPageTemplate = ({
  title,
  description,
}: IntroPageTemplateProps) => {
  return (
    <div className="welcome-banner">
      <div className="welcome-banner__overlay"></div>
      <h1 className="welcome-banner__title">{title}</h1>
      <p className="welcome-banner__description">{description}</p>
    </div>
  );
};
