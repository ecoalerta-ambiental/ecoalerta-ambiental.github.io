import { useReducedMotion } from 'framer-motion';
import { useEffect, useId, useState } from 'react';
import { appScreens } from '../../content/appScreens';
import { PhoneMockup } from './PhoneMockup';

const SCREEN_INTERVAL_MS = 7000;

export function AppPreviewCarousel() {
  const reducedMotion = useReducedMotion();
  const [screens, setScreens] = useState({ current: 0, previous: 0 });
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const instructionsId = useId();
  const rotating = !hovered && !focused && !reducedMotion;
  const screen = appScreens[screens.current];

  function move(direction: number) {
    setScreens(({ current }) => ({
      previous: current,
      current: (current + direction + appScreens.length) % appScreens.length,
    }));
  }

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setTimeout(() => {
      setScreens(({ current }) => ({
        previous: current,
        current: (current + 1) % appScreens.length,
      }));
    }, SCREEN_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [screens.current, rotating]);

  return (
    <div
      role="group"
      aria-roledescription="carrusel"
      aria-label="Pantallas de EcoAlerta"
      aria-describedby={instructionsId}
      tabIndex={0}
      className="relative w-[65%] max-w-[20rem]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          move(event.key === 'ArrowRight' ? 1 : -1);
        }
      }}
    >
      <PhoneMockup
        image={screen.image}
        previousImage={screens.current !== screens.previous ? appScreens[screens.previous].image : undefined}
        loading="eager"
      />
      <p className="mt-3 text-center text-xs text-content-secondary">
        Capturas de la app con datos de ejemplo
      </p>
      <p id={instructionsId} className="sr-only">
        Usá las flechas izquierda y derecha para cambiar de pantalla.
      </p>
      <p className="sr-only" aria-live={focused ? 'polite' : 'off'}>
        Pantalla {screen.label}, {screens.current + 1} de {appScreens.length}
      </p>
    </div>
  );
}
