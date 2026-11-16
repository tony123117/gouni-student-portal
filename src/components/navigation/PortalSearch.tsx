import { Search, X } from 'lucide-react';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { getNavigationTargets } from './navigation';

interface PortalSearchProps {
  idPrefix?: string;
  onNavigate?: () => void;
}

export function PortalSearch({
  idPrefix = 'portal',
  onNavigate,
}: PortalSearchProps = {}) {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const resultsId = `${idPrefix}-search-results`;
  const getOptionId = (index: number) =>
    `${idPrefix}-search-option-${index}`;

  const results = useMemo(() => {
    const normalised = query.trim().toLowerCase();

    if (!normalised) {
      return [];
    }

    return getNavigationTargets()
      .filter(
        (target) =>
          target.label.toLowerCase().includes(normalised) ||
          target.group?.toLowerCase().includes(normalised),
      )
      .slice(0, 6);
  }, [query]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !containerRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const selectTarget = (to: string) => {
    navigate(to);
    setQuery('');
    setIsOpen(false);
    inputRef.current?.blur();
    onNavigate?.();
  };

  const showResults = isOpen && query.trim().length > 0;

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
      return;
    }

    if (!showResults || results.length === 0) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % results.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex(
        (current) => (current - 1 + results.length) % results.length,
      );
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const target = results[activeIndex];

      if (target) {
        selectTarget(target.to);
      }
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-[680px]">
      <div className="relative">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-navy-600"
          strokeWidth={2.25}
        />
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-label="Search student portal pages"
          aria-expanded={showResults}
          aria-controls={resultsId}
          aria-autocomplete="list"
          aria-activedescendant={
            showResults && results[activeIndex]
              ? getOptionId(activeIndex)
              : undefined
          }
          placeholder="Search pages"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (query.trim()) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          className="h-11 w-full rounded-xl border border-transparent bg-[#e9effa] pl-10 pr-9 text-[13px] font-medium text-navy-950 outline-none transition-colors placeholder:font-normal placeholder:text-slate-500 hover:bg-[#e2eaf7] focus:border-navy-300 focus:bg-white focus:ring-2 focus:ring-navy-100 lg:h-[46px] lg:text-[13.5px] [&::-webkit-search-cancel-button]:hidden"
        />
        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-navy-50 hover:text-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600"
          >
            <X aria-hidden="true" className="size-3" />
          </button>
        ) : null}
      </div>

      {showResults ? (
        <div className="absolute left-0 right-0 z-50 mt-1.5 overflow-hidden rounded-lg border border-portal-line bg-white shadow-[0_8px_24px_rgba(5,36,85,0.10)]">
          {results.length > 0 ? (
            <ul id={resultsId} role="listbox">
              {results.map((target, index) => (
                <li key={target.to}>
                  <button
                    type="button"
                    id={getOptionId(index)}
                    role="option"
                    aria-selected={index === activeIndex}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => selectTarget(target.to)}
                    className={`flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-navy-600 ${
                      index === activeIndex
                        ? 'bg-navy-50 text-navy-900'
                        : 'text-slate-700 hover:bg-portal-surface'
                    }`}
                  >
                    <span className="truncate text-[12.5px] font-medium">
                      {target.label}
                    </span>
                    {target.group ? (
                      <span className="shrink-0 text-[9.5px] font-medium uppercase tracking-[0.08em] text-slate-400">
                        {target.group}
                      </span>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p
              id={resultsId}
              className="px-4 py-3 text-xs text-slate-500"
            >
              No pages match “{query.trim()}”.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
