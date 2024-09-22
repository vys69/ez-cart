import { useRouter } from 'next/navigation';

export const handleGoShopping = () => {
  const router = useRouter();
  if (localStorage.getItem("setupSkipped")) {
    router.push('/cart');
  } else {
    router.push('/step/1');
  }
};