// import { auth } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';

// export default async function Dashboard() {
//   const { userId } = await auth();

//   if (!userId) {
//     return redirect('/auth/sign-in');
//   } else {
//     redirect('/dashboard/overview');
//   }
// }
import React from 'react';

const Page = () => {
  return <div>Dashboard root page</div>;
};

export default Page;
