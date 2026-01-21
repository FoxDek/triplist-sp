import { useEffect, useState, useMemo } from "react";
import { getCountries, type Country } from "../api/countries";

const PAGE_SIZE = 20;

export function useCountries() {
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    getCountries()
      .then((data) => {
        if (mounted) {
          setAllCountries(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return allCountries;

    const q = search.toLowerCase();
    return allCountries.filter((c) => c.name.toLowerCase().includes(q));
  }, [allCountries, search]);
  const visibleCountries = useMemo(() => {
    if (search.trim()) {
      return filtered;
    }
    return filtered.slice(0, page * PAGE_SIZE);
  }, [filtered, page, search]);

  const hasMore = !search.trim() && visibleCountries.length < allCountries.length;

  const loadMore = () => {
    if (hasMore) {
      setPage((p) => p + 1);
    }
  };

  return {
    countries: visibleCountries,
    loading,
    hasMore,
    loadMore,
    search,
    setSearch,
    allCountries
  };
}