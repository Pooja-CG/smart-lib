import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-8 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-4 text-purple-800">📚 Welcome to SmartLib</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
        Manage your library effortlessly with smart search, AI-driven recommendations, and intuitive UI.
      </p>

      <div className="flex gap-4">
        <Button className="px-6 py-3 text-lg rounded-2xl shadow-md bg-purple-600 hover:bg-purple-700 text-white">
          Login
        </Button>
        <Button className="px-6 py-3 text-lg rounded-2xl shadow-md bg-white border border-purple-500 text-purple-600 hover:bg-purple-100">
          Register
        </Button>
      </div>

      <Card className="mt-10 w-full max-w-4xl shadow-xl">
        <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-purple-700 mb-2">🔍 Smart Search</h2>
            <p className="text-gray-600">Find books faster using our intelligent algorithms.</p>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-purple-700 mb-2">📈 AI Insights</h2>
            <p className="text-gray-600">Get analytics and insights into your reading trends.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
 