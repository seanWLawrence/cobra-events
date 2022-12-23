import type { MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  type ErrorBoundaryComponent,
  type CatchBoundaryComponent,
} from "@remix-run/react";

import * as components from "~/components/index.component";

import styles from "~/tailwind.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

function Document({
  children,
  title = `Remix: So great, it's funny!`,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export const CatchBoundary: CatchBoundaryComponent = () => {
  const caught = useCatch();

  return (
    <Document title="Error">
      <main className="m-10">
        <components.SpaceBetween direction="vertical" size="l">
          <components.Heading as="h1" size="xxxl">
            Error
          </components.Heading>

          <components.Paragraph>
            Something unexpected happened. See below for more details.
          </components.Paragraph>

          <components.Paragraph>
            Status code: {caught.status}
          </components.Paragraph>

          <pre className="bg-slate-100 space-y-5 p-10">
            <code className="text-sm text-rose-900">
              {JSON.stringify(caught.data, null, 2)}
            </code>
          </pre>
        </components.SpaceBetween>
      </main>
    </Document>
  );
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <Document title="Error">
      <main className="m-10">
        <components.SpaceBetween direction="vertical" size="l">
          <components.Heading as="h1" size="xxxl">
            Error
          </components.Heading>

          <components.Paragraph>
            Something unexpected happened. See below for more details.
          </components.Paragraph>

          <pre className="bg-slate-100 p-10 space-y-5 ">
            <code className="text-sm text-rose-900">{error.stack}</code>
          </pre>
        </components.SpaceBetween>
      </main>
    </Document>
  );
};
