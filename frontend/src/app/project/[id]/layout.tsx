"use client";
import React from "react";

const ProjectLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* todo: project nav sidebar */}
      <div>
        {/* todo: project header */}
        <main>{children}</main>
      </div>
    </div>
  );
}
export default ProjectLayout;