import Home from './Home'

export function generateStaticParams() {
  return [{}]
}

export default function Page() {
  return <Home />
}