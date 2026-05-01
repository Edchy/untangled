import { ModuleCard } from "@/components/ui/module-card";
import { SiteHeader } from "@/components/ui/site-header";
import { getModuleList } from "@/lib/content";

export default function ModulesPage() {
  const modules = getModuleList();

  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
          Reference path
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-5xl font-semibold leading-tight text-balance sm:text-6xl">
          Ten chapters from the first machines to modern language models.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/72">
          The experience is linear while you are learning, then open as a
          reference once modules exist.
        </p>
        <div className="mt-12">
          {modules.map((module) => (
            <ModuleCard key={module.slug} module={module} />
          ))}
        </div>
      </section>
    </main>
  );
}
