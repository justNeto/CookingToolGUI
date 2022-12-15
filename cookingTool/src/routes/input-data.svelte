<script lang="ts">
      import { message, confirm } from '@tauri-apps/api/dialog';
      import { in_use } from '$lib/stores';

	let selected_food;
	let selected_ftier;

      let MAX_CHAR_WEIGHT = null;
      let CURR_CHAR_WEIGHT = null;
      let BATCHES = 1;

      let VD_BUFF = false;
      let PoS_BUFF = false;

	let foods = [
		{ id: 0, text: `No food selected` },
		{ id: 1, text: `Beer` },
		{ id: 2, text: `Grilled bird meat` },
		{ id: 3, text: `Pickled vegetables` },
		{ id: 4, text: `Vinegar` }
	];

      let fairy_tiers = [

            {id: 0, text: `No fairy`},
            {id: 1, text: `Tier 1`},
            {id: 2, text: `Tier 2`},
            {id: 3, text: `Tier 3`},
            {id: 4, text: `Tier 4`},
      ];

      async function error(msg)
      {
            await message("No " + msg + " found!", { title: 'Missing', type: 'error' });
      }


      async function asking(msg)
      {
            let response = await confirm("No " + msg + " selected. Are you sure you want to continue?", { title: 'Warning', type: 'warning' });
            return response;
      }

      async function validate_process()
      {
            // Arrays to send error -> or ask for next move
            let errors = [];
            let missing = [];

            // Check all data exist and has a value
            console.log("Batches: ", BATCHES);
            console.log("Max char weigth: ", MAX_CHAR_WEIGHT);
            console.log("Curr char weigth: ", CURR_CHAR_WEIGHT);
            console.log("Verdure draught buff: ", VD_BUFF);
            console.log("Potion of swiftness buff: ", PoS_BUFF);
            console.log("Selected food: ", selected_food);
            console.log("Selected fairy tier: ", selected_ftier);

            if (selected_food.id == 0)
            {
                  errors.push("food");
            }

            if (MAX_CHAR_WEIGHT == null)
            {
                  errors.push("maximum character weight");
            }

            if (CURR_CHAR_WEIGHT == null)
            {
                  errors.push("current character weight")
            }

            console.log(errors);

            if (errors.length == 1)
            {
                  error(errors[0]);
            }

            if (errors.length > 1)
            {
                  let msg = "";

                  for (let i = 0; i < errors.length; i++)
                  {
                        if (i == 0)
                        {
                              msg += errors[i];
                              continue;
                        }

                        if (i == errors.length - 1)
                        {
                              msg += " and " + errors[i];
                              break;
                        }

                        msg += ", " + errors[i];
                  }

                  error(msg);
                  return;
            }

            // If no errors then go to dialog
            if (selected_ftier.id == 0)
            {
                  missing.push("fairy buff"); // missing fairy buff
            }

            if (!PoS_BUFF)
            {
                  missing.push("potion of swiftness buff"); // missing pos buff
            }

            if (!VD_BUFF)
            {
                  missing.push("verdure draught buff") // missing vd buff
            }

            if (missing.length == 1)
            {
                  let response = await asking(missing[0]);

                  if (response)
                  {
                        // If you sure you will continue
                        $in_use = true;
                  }

                  return;
            }

            if (missing.length > 1)
            {
                  let msg = "";

                  for (let i = 0; i < missing.length; i++)
                  {
                        if (i == 0)
                        {
                              msg += missing[i];
                              continue;
                        }

                        if (i == missing.length - 1)
                        {
                              msg += " and " + missing[i];
                              break;
                        }

                        msg += ", " + missing[i];
                  }

                  let response = await asking(msg);

                  if (response)
                  {
                        // If you sure you will continue
                        $in_use = true;
                  }

                  return;
            }
      }

</script>

<h2 class="unselectable">Please select recipee to cook, or go to waste tab</h2>

<div class="row">
        <div class="column"> 

            <p class="unselectable">
                  Listed maximum character weight
                  <br><input type=number bind:value={MAX_CHAR_WEIGHT} placeholder="MAX LT" min=1 max=3000><br><br>

                  Current character weight<br>
                  <input type=number bind:value={CURR_CHAR_WEIGHT} placeholder="CURRENT LT" min=1 max=3000>
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
            <p class="unselectable">Select fairy tier: <br>
            <select bind:value={selected_ftier}>
	            {#each fairy_tiers as ft}
		            <option value={ft}>
			            {ft.text}
		            </option>
	            {/each}
            </select>
            </p>

            <p class="unselectable">Potion of swiftness <input type=checkbox bind:checked={PoS_BUFF}> </p>
            <p class="unselectable">Verdure draught <input type=checkbox bind:checked={VD_BUFF}> </p>

            <br>

            <button on:click={validate_process}>Processing recipee</button>

            <!-- <br>
            <br>
            <h4>Credits</h4>
            <p> This calculator was done with contributions from Cameratsia and Mavrodrakos families. Guild: Renegade Brigade.</p>
            <img src="renegade.png" alt="renegade logo"> -->
        </div>
</div>

<!-- Selected food id is {selected_food ? selected_food.id : '[ :::waiting::: ]'} <br>
Selected ftier id is {selected_ftier ? selected_ftier.id : '[ :::waiting::: ]'} -->

<style class="scss">

      .unselectable
      {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
      }

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

      select
      {
            background-color: purple;
            color: white;
      }

      select:focus 
      {
            background-color: purple;
            color: white;
      }

      input::placeholder
      {
            font-size: 10px;
            text-justify: auto;
      }

</style>