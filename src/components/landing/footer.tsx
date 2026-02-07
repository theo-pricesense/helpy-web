import { HelpyLogo } from "@/components/helpy-logo";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Integrations", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Status", href: "#" },
    { label: "Support", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-1">
            <HelpyLogo href="/" textClassName="text-card-foreground" />
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              AI-first Customer Service Platform
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-sm font-medium text-card-foreground">
                {category}
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 Helpy Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com/helpy"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Twitter"
            >
              Twitter
            </a>
            <a
              href="https://github.com/helpy"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/company/helpy"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
