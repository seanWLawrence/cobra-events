<script lang="ts">
	import SpaceBetween from '$lib/components/space-between/space-between.svelte';
	import Heading from '$lib/components/heading/heading.svelte';
	import Paragraph from '$lib/components/paragraph/paragraph.svelte';
	import List from '$lib/components/list/list.svelte';
	import ListItem from '$lib/components/list-item/list-item.svelte';
	import Button from '$lib/components/button/button.svelte';
	import Textarea from '$lib/components/textarea/textarea.svelte';
	import Input from '$lib/components/input/input.svelte';
	import Label from '$lib/components/label/label.svelte';
</script>

<main class="p-10">
	<SpaceBetween size="xl" direction="vertical">
		<Heading as="h1" size="3xl">Design system</Heading>

		<Paragraph>This is the design system for Cobra Events.</Paragraph>

		<Heading as="h2" size="2xl">Tenets</Heading>
		<List>
			<ListItem>
				Font is large and easy to read. Colors are bold and highly contrasted - everything is easy
				to see <strong>no matter how bad your eyesight is</strong>.
			</ListItem>

			<ListItem>
				Everything on the page is critical to the user and works fast. No fancy animations.
			</ListItem>
		</List>

		<SpaceBetween size="xl" direction="vertical">
			<Heading as="h1" size="3xl">Heading 1</Heading>

			<Heading as="h2" size="2xl">Heading 2</Heading>

			<Heading as="h3" size="xl">Heading 3</Heading>

			<Heading as="h4" size="l">Heading 4</Heading>

			<Heading as="h5" size="m">Heading 5</Heading>

			<Heading as="h6" size="s">Heading 6</Heading>

			<Paragraph>
				I&apos;m baby humblebrag hammock quinoa leggings cred lomo bruh twee next level gochujang
				tofu mlkshk. Twee chambray pabst, lumbersexual farm-to-table jianbing whatever craft beer
				aesthetic umami. Vexillologist messenger bag ugh, venmo readymade waistcoat wolf polaroid
				direct trade seitan sartorial offal. Tonx kombucha man bun yes plz organic gluten-free photo
				booth. Gatekeep pitchfork chambray, hell of try-hard messenger bag mlkshk Brooklyn put a
				bird on it seitan. Intelligentsia bitters chartreuse, pork belly keytar semiotics
				typewriter.
			</Paragraph>

			<Label>
				Name
				<Input />
			</Label>

			<Label>
				Bio
				<Textarea />
			</Label>

			<SpaceBetween size="l" direction="horizontal">
				<div>
					<Button variant="primary">Primary</Button>
				</div>
				<div>
					<Button variant="secondary">Secondary</Button>
				</div>
			</SpaceBetween>
		</SpaceBetween>
	</SpaceBetween>
</main>
