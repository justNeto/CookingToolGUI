<script lang="ts">
	let selected_food;
	let selected_ftier;

      let MAX_CHAR_WEIGHT;
      let CURR_CHAR_WEIGHT;
      let BATCHES;

      let VD_BUFF;
      let PoS_BUFF;

	let foods = [
		{ id: 1, text: `Beer` },
		{ id: 2, text: `Grilled bird meat` },
		{ id: 3, text: `Pickled vegetables` },
		{ id: 4, text: `Vinegar` }
	];

      let fairy_tiers = [
            {id: 1, text: `Tier 1`},
            {id: 2, text: `Tier 2`},
            {id: 3, text: `Tier 3`},
            {id: 4, text: `Tier 4`},
      ];

</script>

<h2> Please select recipee to cook, or go to waste tab</h2>

<div class="row">
        <div class="column"> 

            <p>
                  Listed character maximum weight
                  <br><input type=number bind:value={MAX_CHAR_WEIGHT} min=0 max=3000><br><br>
                  
                  Current character weight<br>
                  <input type=number bind:value={CURR_CHAR_WEIGHT} min=0 max=3000>
                  <br><br>

                  Select food to prepare<br>
                  <select bind:value={selected_food}>
	                  {#each foods as food}
		                  <option value={food}>
			                  {food.text}
		                  </option>
	                  {/each}
                  </select>
                  <br><br>

                  Number of batches to cook<br>
                  <input type=number bind:value={BATCHES} min=0 max=2000>
                  <br><br>
            </p>

      </div>

        <div class="column">
            <p>Select fairy tier: <br>
            <select bind:value={selected_ftier}>
	            {#each fairy_tiers as ft}
		            <option value={ft}>
			            {ft.text}
		            </option>
	            {/each}
            </select>
            </p>

            <p>Potion of swiftness <input type=checkbox bind:checked={VD_BUFF}> </p>
            <p>Verdure draught <input type=checkbox bind:checked={PoS_BUFF}> </p>

            <br>
            <button>Processing recipee</button>

            <!-- <br>
            <br>
            <h4>Credits</h4>
            <p> This calculator was done with contributions from Cameratsia and Mavrodrakos families. Guild: Renegade Brigade.</p>
            <img src="renegade.png" alt="renegade logo"> -->
        </div>
</div>

<p>
      Selected food id is {selected_food ? selected_food.id : '[ :::waiting::: ]'} <br>
      Selected ftier id is {selected_ftier ? selected_ftier.id : '[ :::waiting::: ]'}
</p>

<style class="scss">
    .column 
    {
      float: left;
      width: 50%;
    }

    .row:after 
    {
      content: "";
      display: flex;
      clear: both;
    }
</style>