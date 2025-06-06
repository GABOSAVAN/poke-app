import { useState, useEffect } from "react";

/**
 * Hook personalizado para implementar debounce
 * @param value - Valor a debounce
 * @param delay - Tiempo de retraso en milisegundos
 * @returns Valor con debounce aplicado
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;