export function WelcomeHeader() {
  return (
    <section className="relative min-h-[184px] overflow-hidden rounded-2xl bg-navy-950 px-5 py-6 text-white shadow-[0_16px_36px_rgba(5,42,94,0.18)] sm:min-h-[196px] sm:px-7 sm:py-8 lg:min-h-0 lg:overflow-visible lg:rounded-none lg:bg-transparent lg:p-0 lg:text-navy-950 lg:shadow-none">
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl lg:hidden">
        <span
          aria-hidden="true"
          className="absolute -right-20 -top-24 size-64 rounded-full bg-[#0b3875]"
        />
        <span
          aria-hidden="true"
          className="absolute right-0 top-5 size-44 rotate-12 rounded-[42px] bg-[#0a3570]"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-0 right-0 h-[92px] w-[160px] overflow-hidden sm:h-[110px] sm:w-[190px]"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 220 210"
            fill="none"
            className="absolute -bottom-1 -right-1 h-[180px] w-[190px] sm:h-[210px] sm:w-[225px]"
          >
            <path
              d="M220 6C164 20 116 62 96 122C86 152 86 180 94 210"
              stroke="#dfe9f8"
              strokeOpacity="0.55"
              strokeWidth="34"
              strokeLinecap="round"
            />
            <path
              d="M220 30C172 42 132 78 114 128C104 156 104 182 112 210"
              stroke="#d2ad5c"
              strokeOpacity="0.72"
              strokeWidth="28"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#031e46]/35 to-transparent"
        />
      </span>

      <div className="relative">
        <h1 className="text-[30px] font-extrabold leading-[1.12] tracking-[-0.035em] sm:text-[34px] lg:text-[42px]">
          Welcome back!
        </h1>
        <p className="mt-2.5 max-w-[250px] text-[13.5px] font-medium leading-5 text-white/80 sm:max-w-sm sm:text-[14.5px] lg:mt-2.5 lg:max-w-xl lg:text-[15.5px] lg:font-semibold lg:leading-6 lg:text-navy-800">
          Here&apos;s what&apos;s happening with your student account.
        </p>
        <span
          aria-hidden="true"
          className="mt-4 block h-1 w-20 rounded-full bg-gold-400 sm:w-24 lg:mt-4 lg:w-32"
        />
      </div>
    </section>
  );
}
