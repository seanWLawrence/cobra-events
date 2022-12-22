import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ context, params }: LoaderArgs) => {
  // await context.app.put("host#test", "Heyooo", {
  //   metadata: { hey: "something cool" },
  // });

  return json(await context.app.list({ prefix: "host" }));
};

export default function Index() {
  const hosts = useLoaderData<typeof loader>();

  if (!hosts) throw new Response(null, { status: 404 });

  return (
    <div>
      <h1>Hosts {hosts.name}</h1>
      <ul>
        {hosts.keys.map((host) => {
          return (
            <li key={host.name}>
              {host.name} {host.metadata.hey} SSS
            </li>
          );
        })}
      </ul>
    </div>
  );
}
