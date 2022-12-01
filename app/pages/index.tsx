import Head from "next/head";
import * as components from "../components/index.component";

interface ComponentExampleProps {
  title: string;
  children: React.ReactNode;
}

const ComponentExamples: React.FC<ComponentExampleProps> = (props) => {
  return (
    <components.SpaceBetween direction="vertical" size="m">
      <components.H3>{props.title}</components.H3>

      {props.children}
    </components.SpaceBetween>
  );
};

export default function Home() {
  return (
    <div>
      <Head>
        <title>Cobra Events</title>
        <meta
          name="description"
          content="Events and ticket management made simple"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-10">
        <components.SpaceBetween size="xl" direction="vertical">
          <components.H1>Design system</components.H1>

          <components.SpaceBetween size="xl" direction="vertical">
            <components.H2>Buttons</components.H2>

            <ComponentExamples title="Button colors">
              <components.SpaceBetween size="xl" direction="horizontal">
                <div>
                  <components.Button>Default</components.Button>
                </div>

                <div>
                  <components.Button color="primary">Primary</components.Button>
                </div>

                <div>
                  <components.Button color="secondary">
                    Secondary
                  </components.Button>
                </div>
              </components.SpaceBetween>
            </ComponentExamples>

            <ComponentExamples title="Button sizes">
              <components.SpaceBetween size="xl" direction="horizontal">
                <components.Button size="s">Small</components.Button>
                <components.Button size="m">Medium</components.Button>
                <components.Button size="l">Large</components.Button>
              </components.SpaceBetween>
            </ComponentExamples>

            <ComponentExamples title="Button outlines">
              <components.SpaceBetween size="xl" direction="horizontal">
                <components.Button outlined>Outline</components.Button>
                <components.Button outlined={false}>
                  No outline
                </components.Button>
              </components.SpaceBetween>
            </ComponentExamples>
          </components.SpaceBetween>
        </components.SpaceBetween>
      </main>
    </div>
  );
}
