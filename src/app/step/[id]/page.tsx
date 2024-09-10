import StepHandler from '@/app/step/[id]/StepHandler'

export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
  ]
}

export default function Page({ params }: { params: { id: string } }) {
  return <StepHandler params={params} />
}