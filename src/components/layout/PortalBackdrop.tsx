export function PortalBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
    >
      {/*
       * Large pale lavender disc. It sits below the gold crescent and reads as a
       * soft counterweight to the dense navy sidebar.
       */}
      <span className="absolute -right-20 top-2 size-[430px] rounded-full bg-[#e8effb]" />

      {/*
       * Muted-gold crescent entering from the top-right edge. The oversized ring
       * is clipped by this small frame so only the intentional corner sweep
       * remains visible.
       */}
      <span className="absolute right-0 top-0 h-[360px] w-[360px] overflow-hidden">
        <span className="absolute -top-[300px] left-[230px] size-[600px] rounded-full border-[100px] border-gold-400/45" />
      </span>

      {/* Restrained pale ring echoing the reference's lower-left curve. */}
      <span className="absolute -left-24 top-[56%] size-[280px] rounded-full border-[44px] border-[#eef4fc]" />
    </div>
  );
}
