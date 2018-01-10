<h3>Historique des Transactions</h3>
<span id="entete">Date - Solde Prec - Payé - Nouveau Solde</span><br/>
{{#each this}}
    <span class="transac" {{#ifColor soldeAfter}} color="green" {{else}} color="red" {{/ifColor}}>{{date}} - {{soldeAv}} € - {{prix}} € - {{soldeAp}} €</span><br/>
{{/each}}