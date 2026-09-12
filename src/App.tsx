import { useEffect } from "react";

import { Contact } from "@/components/Contact";
import { ContactSheet } from "@/components/ContactSheet";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ModeLoader } from "@/components/ModeLoader";
import { Culture } from "@/components/dev/Culture";
import { DevHero } from "@/components/dev/DevHero";
import { Experience } from "@/components/dev/Experience";
import { Hire } from "@/components/dev/Hire";
import { Stack } from "@/components/dev/Stack";
import { Pricing } from "@/components/studio/Pricing";
import { Process } from "@/components/studio/Process";
import { Services } from "@/components/studio/Services";
import { StudioHero } from "@/components/studio/StudioHero";
import { Work } from "@/components/studio/Work";
import { useI18n } from "@/hooks/useI18n";
import { useMode } from "@/hooks/useMode";

export default function App() {
  const { isDev } = useMode();
  const { t } = useI18n();

  useEffect(() => {
    document.title = t(isDev ? "meta.title.dev" : "meta.title.studio");
  }, [isDev, t]);

  return (
    <>
      <ModeLoader />
      {/* keyed by mode so the mobile menu resets on switch */}
      <Header key={isDev ? "dev" : "studio"} />
      <main>
        {isDev ? (
          <>
            <DevHero />
            <Experience />
            <Stack />
            <Culture />
            <Work />
            <Hire />
          </>
        ) : (
          <>
            <StudioHero />
            <Services />
            <Work />
            <Process />
            <Pricing />
          </>
        )}
        <Contact />
      </main>
      <Footer />
      <ContactSheet />
    </>
  );
}
