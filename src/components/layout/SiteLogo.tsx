import { siteConfig } from '../../config/site';

export function SiteLogo() {
  return (
    <a href="#inicio" className="inline-flex shrink-0 items-center gap-2 rounded-md font-bold text-content-primary">
      <img
        src={`${import.meta.env.BASE_URL}images/logo-ecoalerta-128.png`}
        alt=""
        width={36}
        height={36}
        className="h-9 w-9 rounded-xl"
      />
      {siteConfig.name}
    </a>
  );
}
