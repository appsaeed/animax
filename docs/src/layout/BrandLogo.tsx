interface Props {
  href: string;
  logo?: string;
}
export default function BrandLogo({ href, logo }: Props) {
  return (
    <a href={href} className="flex items-center">
      <img src={logo} alt="logo" className="h-8 mr-3" />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white max-sm:text-xl">
        {import.meta.env.VITE_NAME || "Saeed"}
      </span>
    </a>
  );
}
