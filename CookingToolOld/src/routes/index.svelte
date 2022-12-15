<script lang="ts">
	import { MaterialApp } from 'svelte-materialify';
	import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
	import MainWindow from './MainWindow.svelte';
	import DisposalWindow from './DisposalWindow.svelte';
	import Results from './Results.svelte';

	function eventListener(event: CustomEvent)
	{
		console.log(event.detail);
	}

</script>

<div class="App-container">
	<MaterialApp theme="dark">
		<Tabs>
	  		<TabList>
	    			<Tab>LT recipee calculator</Tab>
				<Tab>Disposal calculator</Tab>
				<Tab>Cooking...</Tab>
	  		</TabList>

		  	<TabPanel>
				<MainWindow on:TransportData={eventListener} ></MainWindow>
		  	</TabPanel>

			<TabPanel>
				  <DisposalWindow></DisposalWindow>
			</TabPanel>

			<TabPanel>
				<Results></Results>
			</TabPanel>
		</Tabs>
	</MaterialApp>
</div>

<style>
	:global(.svelte-tabs .svelte-tabs__tab-list) {
        	display: flex;
        	justify-content: center;
    	}

	:global(.svelte-tabs li.svelte-tabs__selected)
	{
		color : white;
	}

	:global(.svelte-tabs li.svelte-tabs__tab)
	{
		color : white;
	}

	.App-container
	{
		height : 100vh;
		overflow-y : hidden;
	}
</style>
