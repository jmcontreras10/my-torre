import AuthCard from '../Components/Cards/AuthCard';

const AuthPage = () => {
  return (
    <main className="flex h-screen w-screen bg-onTerceary font-sans text-white">
      <div className="m-auto">
        <AuthCard />
      </div>
    </main>
  );
};

export default AuthPage;