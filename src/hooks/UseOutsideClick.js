import { useEffect } from "react";

export default function useOutsideClick(ref, exceptionId, cb) {
  useEffect(() => {
    function handleOutsaideClick(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.id !== exceptionId
      )
        cb();
    }
    document.addEventListener("mousedown", handleOutsaideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsaideClick);
    };
  }, [ref, exceptionId, cb]);
}
