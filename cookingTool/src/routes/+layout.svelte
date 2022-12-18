<script lang="ts">
  import { in_use } from '$lib/stores';
  import { message } from '@tauri-apps/api/dialog';

  import "../app.css";

  async function notify(e:any)
  {
    if (!$in_use)
    {
      e.preventDefault();
      await message('Not input info found', { title: 'Warning', type: 'error' });
      return;
    }

    // Go to route
  }

</script>

<ul>
	  <li> <!-- If active tab value is the same as the item then set to active, else do nothing-->
		  <a href="/">
        <span class="unselectable">Input</span>
      </a><!-- When clicking on the tab then set the activeTabValue as the current item label -->
	  </li>
	  <li> <!-- If active tab value is the same as the item then set to active, else do nothing-->
		  <a href="/waste">
        <span class="unselectable">Waste</span>
      </a><!-- When clicking on the tab then set the activeTabValue as the current item label -->
	  </li>
	  <li> <!-- If active tab value is the same as the item then set to active, else do nothing-->
		  <a href="/process" on:click={notify}>
        <span class="unselectable">Process 🔒</span>
      </a><!-- When clicking on the tab then set the activeTabValue as the current item label -->
	  </li>
</ul>

<main class="container">
  <slot />
</main>

<style lang="scss">
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

            a
            {
              color: white;
            }
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