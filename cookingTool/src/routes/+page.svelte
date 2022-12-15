<script>
  import Tab1 from "./input-data.svelte";
	import Tab2 from "./process-data.svelte";
	import Tab3 from "./waste.svelte";
	import Tabs from "./Tabs.svelte";

  // List of tab items with labels, values and assigned components
  let items = [
    { label: "Input",
      value: 1,
		  component: Tab1
		},
    { label: "Waste",
		  value: 2,
		  component: Tab2
		},
    { label: "Recipee results",
		  value: 3,
		  component: Tab3
		}
  ];
</script>

<Tabs {items} />