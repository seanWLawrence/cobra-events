import * as components from "~/components/index.component";

export default function DesignSystem() {
  return (
    <main className="p-10">
      <components.SpaceBetween size="xl" direction="vertical">
        <components.Heading as="h1" size="xxxl">
          Design system
        </components.Heading>

        <components.Paragraph>
          This is the design system for Cobra Events.
        </components.Paragraph>

        <components.Heading as="h2" size="xxl">
          Tenets
        </components.Heading>
        <components.List>
          <components.ListItem>
            Font is large and easy to read. Colors are bold and highly
            contrasted - everything is easy to see{" "}
            <strong>no matter how bad your eyesight is</strong>.
          </components.ListItem>

          <components.ListItem>
            Everything on the page is critical to the user and works fast. No
            fancy animations.
          </components.ListItem>
        </components.List>

        <components.SpaceBetween size="xl" direction="vertical">
          <components.Heading as="h1" size="xxxl">
            Heading 1
          </components.Heading>

          <components.Heading as="h2" size="xxl">
            Heading 2
          </components.Heading>

          <components.Heading as="h3" size="xl">
            Heading 3
          </components.Heading>

          <components.Heading as="h4" size="l">
            Heading 4
          </components.Heading>

          <components.Heading as="h5" size="m">
            Heading 5
          </components.Heading>

          <components.Heading as="h6" size="s">
            Heading 6
          </components.Heading>

          <components.Paragraph>
            I&apos;m baby humblebrag hammock quinoa leggings cred lomo bruh twee
            next level gochujang tofu mlkshk. Twee chambray pabst, lumbersexual
            farm-to-table jianbing whatever craft beer aesthetic umami.
            Vexillologist messenger bag ugh, venmo readymade waistcoat wolf
            polaroid direct trade seitan sartorial offal. Tonx kombucha man bun
            yes plz organic gluten-free photo booth. Gatekeep pitchfork
            chambray, hell of try-hard messenger bag mlkshk Brooklyn put a bird
            on it seitan. Intelligentsia bitters chartreuse, pork belly keytar
            semiotics typewriter.
          </components.Paragraph>

          <components.Input label="Name" />

          <components.Textarea label="Bio" />

          <components.SpaceBetween size="l" direction="horizontal">
            <div>
              <components.Button color="primary">Primary</components.Button>
            </div>
            <div>
              <components.Button color="secondary">Secondary</components.Button>
            </div>
          </components.SpaceBetween>
        </components.SpaceBetween>
      </components.SpaceBetween>
    </main>
  );
}
