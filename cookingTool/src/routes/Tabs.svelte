<script lang="ts">
      import { in_use } from '$lib/stores';
      import { message } from '@tauri-apps/api/dialog';

      export let items = []; // list of svelte components passed from +page.svel
      export let activeTabValue = 1; // first tab is always active at first lo
      const handleClick = tabValue => () => (activeTabValue = tabValue); // when click on a tab change to that tab

      async function notify()
      {
            console.log($in_use);
            await message('Not input info found', { title: 'Warning', type: 'error' });
      }


// {#each items as item} 
// 	{#if activeTabValue == item.value}
// 		<svelte:component this={item.component}/>
// 	{/if}
// {/each}

</script>

<ul class>
      {#each items as item} <!-- For each item in items -->
            {#if (item.value == 3) && (!$in_use)}
                  <li>
		            <span class="unselectable" on:click={notify}>{item.label}</span> <!-- When clicking on the tab then set the activeTabValue as the current item label -->
                  </li>
            {:else if (item.value == 3) && ($in_use)}
	            <li class={activeTabValue === item.value ? 'active' : ''}> <!-- If active tab value is the same as the item then set to active, else do nothing-->
		            <span class="unselectable" on:click={handleClick(item.value)}>Results 🔓</span> <!-- When clicking on the tab then set the activeTabValue as the current item label -->
	            </li>
            {:else}
	            <li class={activeTabValue === item.value ? 'active' : ''}> <!-- If active tab value is the same as the item then set to active, else do nothing-->
		            <span class="unselectable" on:click={handleClick(item.value)}>{item.label}</span> <!-- When clicking on the tab then set the activeTabValue as the current item label -->
	            </li>
            {/if}
      {/each}
</ul>

<!-- Render the app-->
{#each items as item} 
	{#if activeTabValue == item.value}
		<svelte:component this={item.component}/>
	{/if}
{/each}

<style>
      .unselectable
      {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
      }

      ul
      {
            display: flex;
            flex-wrap: wrap;
            padding-left: 0;
            margin-bottom: 0;
            list-style: none;
      }

      li
      {
            margin-bottom: -1px;
      }

      span 
      {
      border: 1px solid transparent;
      border-top-left-radius: 0.25rem;
      border-top-right-radius: 0.25rem;
      display: block;
      padding: 0.5rem 1rem;
      cursor: pointer;
      }

      span:hover 
      {
            border-color: #e9ecef #e9ecef #dee2e6;
      }

      li.active > span 
      {
      color: #dee2e6;
      /* background-color: #fff; */
      border-color: #dee2e6 #dee2e6 #fff;
      }

</style>