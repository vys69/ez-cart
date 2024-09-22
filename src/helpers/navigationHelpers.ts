import { NextRouter } from 'next/router';

export const handleGoShopping = (router: NextRouter) => {
  if (localStorage.getItem("setupSkipped")) {
    router.push('/cart');
  } else {
    router.push('/step/1');
  }
};