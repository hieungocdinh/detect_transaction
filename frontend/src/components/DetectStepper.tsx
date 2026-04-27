interface DetectStepperProps {
  currentStep: 1 | 2;
}

const steps = [
  { index: 1, title: 'Upload ảnh' },
  { index: 2, title: 'Kiểm tra kết quả' },
] as const;

function DetectStepper({ currentStep }: DetectStepperProps) {
  return (
    <section className="card stepper" aria-label="Tiến trình detect giao dịch">
      {steps.map((step) => {
        const isActive = step.index === currentStep;
        const isCompleted = step.index < currentStep;

        return (
          <div key={step.index} className={`stepper__item${isActive ? ' stepper__item--active' : ''}${isCompleted ? ' stepper__item--completed' : ''}`}>
            <span className="stepper__badge">{step.index}</span>
            <div>
              <p className="stepper__label">Bước {step.index}</p>
              <strong>{step.title}</strong>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default DetectStepper;
