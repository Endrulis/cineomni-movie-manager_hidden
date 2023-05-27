import { Routes } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import { CatInDarkToneVideoBackground } from '../../components/app/media/CatInDarkToneVideoBackground';

type AppContentTemplateProps = {
  shouldLoadVideo: boolean;
  videoLoaded: boolean;
  handleVideoLoad: () => void;
  children: React.ReactNode;
};

export const AppContentTemplate: React.FC<AppContentTemplateProps> = ({
  shouldLoadVideo,
  videoLoaded,
  handleVideoLoad,
  children,
}) => {
  return (
    <div className="relative h-screen">
      {shouldLoadVideo && (
        <CatInDarkToneVideoBackground handleVideoLoad={handleVideoLoad} />
      )}
      {videoLoaded ? (
        <div className="relative z-10">
          <Routes>{children}</Routes>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <RingLoader color="#000" />
        </div>
      )}
    </div>
  );
};
