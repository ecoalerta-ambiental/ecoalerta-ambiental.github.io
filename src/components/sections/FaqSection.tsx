import { faq } from '../../content/faq';
import { Reveal } from '../motion/Reveal';
import { AccordionItem } from '../ui/AccordionItem';
import { SectionHeading } from '../ui/SectionHeading';

export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-background">
      <div className="mx-auto max-w-content px-6 py-20 sm:px-8 sm:py-24">
        <Reveal>
          <SectionHeading id="faq-title">Preguntas frecuentes</SectionHeading>
        </Reveal>
        <div className="mt-10 grid gap-3">
          {faq.map((item) => (
            <AccordionItem key={item.id} question={item.question}>{item.answer}</AccordionItem>
          ))}
        </div>
      </div>
    </section>
  );
}
