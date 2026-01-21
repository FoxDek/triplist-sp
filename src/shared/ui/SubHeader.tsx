export default function SubHeader({ headerText, additionalClass }: { headerText: string, additionalClass?: string }) {
  return <h2 className={`text-xl font-bold text-text-color dark:text-text-color-dark ${additionalClass}`}>{headerText}</h2>;
}
