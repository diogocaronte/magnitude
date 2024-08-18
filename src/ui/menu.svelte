<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatcher = createEventDispatcher();
</script>

<main class="w-full h-full grid place-items-center">
    <button class="" on:click={() => dispatcher('start')}>Start game</button>
</main>
