<button id="all">Tout les Comptes</button> -- <button id="pos">Comptes positifs</button> -- <button id="neg">Comptes négatifs</button>
<h3>Comptes : </h3>
{{#each this}}
<span class="accountInfo" {{#ifColor solde}} color="green" {{else}} color="red" {{/ifColor}}>{{nom}} {{prenom}} - Promo {{promo}} - N° {{num}} - Solde : {{solde}}</span><br/>
{{/each}}