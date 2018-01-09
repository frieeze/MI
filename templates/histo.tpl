<h3>Historique des Transactions</h3>
{{#each this}}
    <span class="transac" {{#ifColor soldeAfter}} color="green" {{else}} color="red" {{/ifColor}}>{{date}} - {{soldeBefore}} € - {{price}} € - {{soldeAfter}} €</span><br/>
{{/each}}