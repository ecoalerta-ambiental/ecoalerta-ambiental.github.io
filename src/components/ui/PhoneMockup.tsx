export interface PhoneMockupProps {
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    isIllustrative: boolean;
  };
  className?: string;
  loading?: 'eager' | 'lazy';
  previousImage?: PhoneMockupProps['image'];
}

export function PhoneMockup({
  image,
  previousImage,
  className = '',
  loading = 'lazy',
}: PhoneMockupProps) {
  return (
    <figure className={['m-0 w-full max-w-[20rem]', className].filter(Boolean).join(' ')}>
      <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-slate-700 bg-background p-2 shadow-glass">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-3 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-background"
        />
        <div className="relative overflow-hidden rounded-[1.8rem]">
          {previousImage && (
            <img
              src={previousImage.src}
              alt=""
              aria-hidden="true"
              width={previousImage.width}
              height={previousImage.height}
              className="absolute inset-0 h-full w-full object-contain"
            />
          )}
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading={loading}
            decoding="async"
            className={`relative block h-auto w-full ${previousImage ? 'phone-screen-transition' : ''}`}
          />
        </div>
      </div>
      {image.isIllustrative && (
        <figcaption className="mt-3 text-center text-sm text-content-secondary">
          Ejemplo ilustrativo
        </figcaption>
      )}
    </figure>
  );
}
