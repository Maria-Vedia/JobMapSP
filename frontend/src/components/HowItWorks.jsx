const steps = [
  {
    title: 'Creá tu perfil',
    description: 'Cargá tus datos, experiencia y habilidades.',
  },
  {
    title: 'Explorá oportunidades',
    description: 'Buscá empleos según tus intereses.',
  },
  {
    title: 'Conectá',
    description: 'Postulate y acercate a nuevas oportunidades.',
  },
];

export default function HowItWorks() {
  return (
    <section aria-labelledby="como-funciona" className="mt-14">
      <h2 id="como-funciona" className="text-2xl font-semibold text-ink sm:text-3xl">
        Cómo funciona JOBMAP SP
      </h2>
      <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="min-h-[130px] rounded-lg border border-line bg-white p-5 shadow-card"
          >
            <h3 className="text-lg font-semibold text-ink">
              {index + 1}. {step.title}
            </h3>
            <p className="mt-3 text-muted">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
