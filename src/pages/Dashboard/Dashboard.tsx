// src/pages/Dashboard.tsx
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { FileText, MessageSquare, Image } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const options = [
    {
      title: "Script Generator",
      description: "Generate engaging video scripts with AI",
      icon: "📝",
      path: "/script",
    },
    {
      title: "Description Generator",
      description: "Create SEO-optimized video descriptions",
      icon: "💬",
      path: "/description",
    },
    {
      title: "Thumbnail Generator",
      description: "Design eye-catching video thumbnails",
      icon: "🖼️",
      path: "/thumbnail",
    },
    {
      title: "Personalized Thumbnail Generator",
      description: "Design eye-catching video thumbnails",
      icon: "🖼️",
      path: "/imagefinetune",
    },
  ];

  // Add auth state change listener
  useEffect(() => {
  let isSubscribed = true;

  const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user?.email && isSubscribed) {
      const isGoogleUser = session.user.app_metadata.provider === 'google';
      if (isGoogleUser) {
        try {
          const checkResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/check`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: session.user.email,
            }),
          });

          if (!checkResponse.ok) {
            throw new Error('Failed to check user existence');
          }

          const { user } = await checkResponse.json();

          if (!user && isSubscribed) {
            const createResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: session.user.email,
              }),
            });

            if (!createResponse.ok) {
              throw new Error('Failed to create user in database');
            }
          }
        } catch (dbError) {
          console.error('Database operation error:', dbError);
        }
      }
    }
  });
  return () => {
    isSubscribed = false;
    subscription.unsubscribe();
  };
}, []);

  return (
    <div className="h-screen overflow-hidden bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1a237e]">LitHouse</h1>
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="w-full max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose a Tool
            </h2>
            <p className="text-gray-600">
              Select one of our AI-powered tools to get started
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {options.map((option) => (
              <Card
                key={option.path}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(option.path)}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-[#1a237e]/10 rounded-lg flex items-center justify-center text-2xl">
                    {option.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {option.title}
                  </h3>
                  <p className="text-gray-600">{option.description}</p>
                  <Button className="w-full rounded-full bg-[#ef5350] hover:bg-blue-500">
                    Get Started
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
