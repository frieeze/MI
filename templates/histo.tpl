<h3>Historique :</h3>
<span id="entete">Date - Solde Prec - Payé - Nouveau Solde</span><br/>
{{#each this}}
    <span class="transac" {{#ifColor soldeAfter}} color="green" {{else}} color="red" {{/ifColor}}>{{date}} - {{soldeBefore}} € - {{price}} € - {{soldeAfter}} €</span><br/>
{{/each}}