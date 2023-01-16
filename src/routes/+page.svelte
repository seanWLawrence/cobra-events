<script lang="ts">
	import Heading from '$lib/components/heading/heading.svelte';
	import Paragraph from '$lib/components/paragraph/paragraph.svelte';
	import SpaceBetween from '$lib/components/space-between/space-between.svelte';
	import Link from '$lib/components/link/link.svelte';
</script>

<main class="p-10">
	<SpaceBetween direction="vertical" size="l">
		<Heading as="h1">Cobra Events</Heading>
		<Paragraph>
			This application is under active development on <Link
				href="https://github.com/seanWlawrence/cobra-events"
			>
				this Github repository
			</Link>.
		</Paragraph>

		<Paragraph>
			Visit <Link href="https://docs.cobra.events">docs.cobra.events</Link> to read the documentation.
		</Paragraph>

		<Paragraph>
			You can also peek at the <Link href="/design-system">design system for this site</Link> as it's
			being worked on.
		</Paragraph>
	</SpaceBetween>
</main>
