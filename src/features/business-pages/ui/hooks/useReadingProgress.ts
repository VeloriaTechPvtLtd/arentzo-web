import { useState, useEffect } from 'react';

export const useReadingProgress = (): number => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const scrollableHeight = docHeight - windowHeight;

            if (scrollableHeight <= 0) {
                setProgress(0);
                return;
            }

            const currentProgress = (scrollTop / scrollableHeight) * 100;
            setProgress(Math.min(currentProgress, 100));
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return progress;
};
