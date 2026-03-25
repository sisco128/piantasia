import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const items: { value: string; question: string; paragraphs: string[] }[] = [
  {
    value: 'faq-1',
    question: 'What is Piantasia?',
    paragraphs: [
      'Piantasia is a collection of botanical blends created for slow, intentional rituals.',
      'Each blend is composed of carefully selected plants, designed to be experienced through texture, aroma, and presence.',
    ],
  },
  {
    value: 'faq-2',
    question: 'What are the blends made of?',
    paragraphs: [
      'Each composition is made from natural botanicals such as mullein, marshmallow leaf, raspberry leaf, lavender, and other aromatic plants.',
      'You will always find the full botanical composition listed on each product page.',
    ],
  },
  {
    value: 'faq-3',
    question: 'How can it be used?',
    paragraphs: [
      'Piantasia is designed as a personal ritual.',
      'It can be explored through scent, texture, and the gestures you create around it.',
      'Some people choose to incorporate the blends into atmospheric rituals such as incense, steam or bath, as part of a sensory experience.',
      'There is no single correct way to engage with it.',
    ],
  },
  {
    value: 'faq-4',
    question: 'Is it meant for consumption?',
    paragraphs: [
      'No.',
      'Piantasia blends are intended for aromatic and decorative use only.',
      'They are not designed for ingestion or inhalation.',
    ],
  },
  {
    value: 'faq-5',
    question: 'Does it contain nicotine or additives?',
    paragraphs: [
      'No.',
      'All blends are nicotine-free and contain no added chemicals or synthetic ingredients.',
    ],
  },
  {
    value: 'faq-6',
    question: 'Why Piantasia?',
    paragraphs: [
      'Piantasia was created as a way to reconnect with plants through slower, more intentional moments.',
      'It is less about function, and more about presence.',
    ],
  },
  {
    value: 'faq-7',
    question: 'Will every blend feel the same?',
    paragraphs: [
      'No.',
      'Each blend has its own texture, aroma, and character.',
      'Some feel light and airy, others more grounded or floral.',
      'Part of the experience is discovering what resonates with you.',
    ],
  },
  {
    value: 'faq-8',
    question: 'Shipping & returns',
    paragraphs: [
      'Orders are prepared in small batches and shipped within a few days.',
      'Returns are accepted within 14 days, provided the product is unopened and in its original condition.',
    ],
  },
];

const triggerClass =
  'font-sans text-base md:text-lg text-[#2B5142] font-medium hover:no-underline py-4 [&>svg]:text-[#2B5142]/60';

export function FaqSection() {
  return (
    <section
      id="faq"
      className="scroll-mt-16 md:scroll-mt-20 py-12 md:py-16 lg:py-20 bg-[#F5F2ED] border-t border-[#2B5142]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#2B5142] mb-8 sm:mb-12 text-center">
          FAQ
        </h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {items.map(({ value, question, paragraphs }) => (
              <AccordionItem
                key={value}
                value={value}
                className="border-[#2B5142]/15"
              >
                <AccordionTrigger className={triggerClass}>{question}</AccordionTrigger>
                <AccordionContent className="font-sans text-base text-[#2B5142]/80 leading-relaxed space-y-4 pb-2">
                  {paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
