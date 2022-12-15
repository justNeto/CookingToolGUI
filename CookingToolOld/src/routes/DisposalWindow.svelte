<script lang="ts">
	//const messagePromise = window.ipcRenderer?.invoke('getMessage');
	import { Dialog, Select, Checkbox, Container, Row, Col, TextField } from 'svelte-materialify';
	import { createEventDispatcher } from 'svelte';

	let food = '';

	const selectFood = ['Pickled vegetables', 'Beer', 'Grilled bird meat', 'Vinegar'];

	const foods: { [key: string]: string[] } = {
		'': ['', '', '', ''],
		'Pickled vegetables': ['Vegetable', 'Vinegar', 'Leaving agent', 'Sugar'],
		Beer: ['Cereal', 'Mineral water', 'Leaving agent', 'Sugar'],
		'Grilled bird meat': ['Bird meat', 'Deep frying oil', 'Salt', 'Cooking wine'],
		Vinegar: ['Fruit', 'Cereal', 'Leaving agent', 'Sugar'],
		'Essence of liquor': ['Flour', 'Fruit', 'Leaving agent']
	}; // recipees to cook

	const operations = {
		'Pickled vegetables': [8, 4, 2, 2],
		Beer: [5, 6, 2, 1],
		'Grilled bird meat': [1, 1, 1]
	};

	$: [igrdt1, igrdt2, igrdt3, igrdt4] = foods[food];

	function getIngredients(index: number, quantity: number) {}

	function igrdt1Listener() {}

	function igrdt2Listener() {}

	function igrdt3Listener() {}

	function igrdt4Listener() {}
</script>

<Container>
	<Row>
		<Col>
			<Select placeholder="Food" bind:value={food} items={selectFood} />
		</Col>
	</Row>
	<Row>
		<Col>
			<TextField on:change={igrdt1Listener} placeholder="Value" filled>{igrdt1}</TextField>
			<TextField on:change={igrdt2Listener} placeholder="Value" filled>{igrdt2}</TextField>
			<br /><br />
		</Col>

		<Col>
			<TextField on:change={igrdt3Listener} placeholder="Value" filled>{igrdt3}</TextField>
			<TextField on:change={igrdt4Listener} placeholder="Value" filled>{igrdt4}</TextField>
			<br /><br />
		</Col>
	</Row>
</Container>

<style>
	:global(.s-item-group.s-list-item-group) {
		max-height: 100px;
	}
</style>
