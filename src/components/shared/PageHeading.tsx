interface PageHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function PageHeading({
  eyebrow,
  title,
  description,
}: PageHeadingProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="text-[9.5px] font-bold uppercase tracking-[0.2em] text-navy-600">
          {eyebrow}
        </p>
      ) : null}
      <h1
        className={`${
          eyebrow ? 'mt-1.5' : ''
        } text-[28px] font-extrabold tracking-[-0.03em] text-navy-950 sm:text-[31px]`}
      >
        {title}
      </h1>
      <span
        aria-hidden="true"
        className="mt-2.5 block h-1 w-14 rounded-full bg-gold-400"
      />
      {description ? (
        <p className="mt-3 max-w-2xl text-[12.5px] font-medium leading-[22px] text-slate-600">
          {description}
        </p>
      ) : null}
    </div>
  );
}
