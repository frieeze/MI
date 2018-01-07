{{#each this}}
<span class="accountInfo" {{#ifColor solde}} color="green" {{else}} color="red" {{/ifColor}}>{{name}} - Promo {{promo}} - N° {{numberAccount}} - Solde : {{solde}}</span>
{{/each}}