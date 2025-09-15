import { AuthHeaderComponent } from '@/features/auth/components';

export default async function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>
        <AuthHeaderComponent />
      </header>
      <main>{children}</main>
    </div>
  );
}
