import CatInDarkTone from '../../../assets/CatInDarkTone.mp4';

interface VideoBackgroundProps {
  handleVideoLoad: () => void;
}

export const CatInDarkToneVideoBackground = ({
  handleVideoLoad,
}: VideoBackgroundProps) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        src={CatInDarkTone}
        autoPlay
        loop
        muted
        className="w-full h-full object-cover object-center inset-0 -z-10 fixed"
        onLoadedData={handleVideoLoad}
      />
    </div>
  );
};
