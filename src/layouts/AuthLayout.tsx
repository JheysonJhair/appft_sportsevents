
interface Props {
  children: React.ReactNode;
}

function AuthLayout({ children }: Props) {
  return (
    <div className="wrapper">
      {children}
    </div>
  );
}

export default AuthLayout;