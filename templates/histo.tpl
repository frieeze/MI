<h3>Historique :</h3>
{{#each transac}}
    <span class="transac" {{#ifColor soldeAfter}} color="green" {{#else}} color="red" {{/if}}>{{date}} - {{soldeBefore}} € - {{price}} € - {{soldeAfter}} €</span>
{{/each}}