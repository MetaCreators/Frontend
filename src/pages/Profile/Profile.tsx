import { useAuth } from '@/context/AuthContext';

const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-chatbg text-white">Loading profile...</div>;
  }

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen bg-chatbg text-white">You need to be logged in to view this page.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-chatbg text-white">
      <h1 className="text-4xl mb-4">Profile Page</h1>
      <p className="text-xl">Email: {user.email}</p>
      {/* Add more profile information here later */}
    </div>
  );
};

export default Profile; 