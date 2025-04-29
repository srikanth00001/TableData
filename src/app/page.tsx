// src/app/page.tsx
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <div>
      <h3 className="text-3xl font-bold text-blue text-center mt-8">Light and Dark Mode</h3>
      <div className="flex justify-center mt-4">
        <ModeToggle />
      </div>
    </div>
  );
}