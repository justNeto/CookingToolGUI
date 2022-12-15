<script lang="ts">
	//const messagePromise = window.ipcRenderer?.invoke('getMessage');
	import { Dialog, Button, Select, Checkbox, Container, Row, Col, TextField} from 'svelte-materialify';
	import { createEventDispatcher } from 'svelte';

	const foods = ['Pickled Vegetables', 'Beer', 'Grilled bird meet', 'Vinegar']; // recipees to cook
	const pctgs = [ { name :'0%', value: '0'},
	{name : '110%', value: '1.1'},
	{name: '115%', value : '1.15'},
	{name: '120%', value : '1.2'},
	{name: '125%', value: '1.25'}

	]; // fairy percentages

	// Variables
	let warning = false;
	let alert = false;
	let msg = "";

	// Control variables
	let currLT = "";
	let maxLT = "";
	let food = "";

	let PoS = false; // potion of swiftness
	let VD = false;
	let fairy = pctgs[0].value;

	const dispatch = createEventDispatcher(); // create an event dispatcher

	const weight_validator = [
		(v) => {
			const pattern = /^(?!0*[.,]0*$|[.,]0*$|0*$)\d+[,.]?\d{0,1}$/; // checks if positive decimal number up to two decimals
			return pattern.test(v) || 'Invalid number.';
		},
	];

	function dispatchEvent() {
		dispatch("TransportData",
			{fairy : Number(fairy), currLT : Number(currLT), maxLT : Number(maxLT), food, PoS, VD}
		);
	}

	function clickHandler () {

		if (!currLT)
		{
			msg = "Please make sure the current weight field is filled.";
			alert = true;
			return;
		}

		if (!maxLT)
		{
			msg = "Please make sure the maximum weight field is filled.";
			alert = true;
			return;
		}

		if (!food)
		{
			msg = "Which food will you cook?";
			alert = true;
			return;
		}

		const missing = [];

		if (fairy == '0') missing.push('fairy buff');
		if (!PoS) missing.push('potion of swiftness');
		if (!VD) missing.push('verdure draught');

		if (missing.length != 1) missing[missing.length-1] = "and " + missing[missing.length-1];

		if (missing.length)
		{
			msg = "You do not have " + missing.join(', ') + ". Are you sure you want to continue?";
			warning = true;
		}
	}

</script>


<Dialog class="pa-4" bind:active={alert}>
	{msg}
</Dialog>

<Dialog class="pa-4" bind:active={warning}>
	{msg}
	<br>
	<br>
 	<center>
		<Button class="red white-text" on:click={dispatchEvent}>Yes</Button>
		<Button class="blue white-text" on:click={() => warning = false} >No</Button>
	</center>
</Dialog>

<Container>
	<Row>
		  <Col>
			  <TextField bind:value={maxLT} rules={weight_validator} placeholder="Value" filled>Maximum weight</TextField>
				  <TextField bind:value={currLT} placeholder="Value" rules={weight_validator} filled>Current weight</TextField>
					  <Select placeholder="Food" bind:value={food} items={foods}></Select>
				<br><br>
				<Button on:click={clickHandler} class="primary-color">Calculate</Button>
		  </Col>

		  <Col>
			<Select placeholder="Value" bind:value={fairy} items={pctgs}>Fairy's feathery steps percentage</Select> <!-- Fairy -->
				<Checkbox bind:checked={PoS} >Potion of Swiftness</Checkbox>
					<Checkbox bind:checked={VD} >Verdure Draught</Checkbox>

				<br>
				<p>Calculator made by Mavrodrakos family.</p>
				<p>Contributions by Cameratsia family & github.com/naratna</p>
		</Col>
	</Row>

</Container>

<style>
	:global(.s-item-group.s-list-item-group) {
        	max-height: 100px;
	}

</style>
