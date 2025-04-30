"use client";
import HomeHeader from "@/components/home-header/home-header";
import HomeProjectsList from "@/components/home-projects-list/home-projects-list";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <HomeHeader />
      <main>
        <h2>Your projects</h2>
        <HomeProjectsList />
      </main>
    </div>
    
  );
}

export default HomePage;
