import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import DiagonalSvgBackground from "@/components/background/DiagonalSvgBackground";
import SkillsForm from "@/components/forms/SkillsForm";
import Footer from "@/components/ui/Footer";

export default function KnowsCareerPage() {
  const location = useLocation();
  const preSelectedPath = location.state?.selectedPath;
  const careers = [
    { id: "infrastructure-security", name: "Infrastructure" },
    { id: "management-analysis", name: "Manajemen" },
    { id: "software-engineering", name: "Software Engineering" },
    { id: "support-design", name: "Technical Support" },
    { id: "data-science-ai", name: "Data & AI" },
  ];

  const preSelectedCareer = preSelectedPath
    ? careers.find((c) => c.id === preSelectedPath)
    : null;

  const memoizedBackground = useMemo(() => <DiagonalSvgBackground />, []);

  return (
    <>
      {memoizedBackground}

      <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-transparent font-sans text-foreground pt-16 pb-4 px-4 sm:px-4 md:px-6 md:pb-12 lg:pt-16 lg:pb-6 lg:px-6 xl:pt-16 xl:pb-6 xl:px-6 flex lg:items-center items-start justify-center relative">
        <div className="w-full max-w-7xl mx-auto h-auto lg:h-full flex flex-col justify-center">
          <SkillsForm career={preSelectedCareer} />
        </div>
      </div>
      <Footer />
    </>
  );
}
