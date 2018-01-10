<h3>Historique des Transactions</h3>
<table class="view" {{#ifColor soldeAfter}} bgcolor="green" {{else}} color="red" {{/ifColor}}>
	<tr>
		<th>Date</th>
		<th>Solde Prec</th>
		<th>Débit</th>
		<th>Nouv Solde</th>
	</tr>
{{#each this}}
	<tr>
    	<td>{{date}}</td>
		<td>{{soldeBefore}} €</td>
		<td>{{price}} €</td>
		<td>{{soldeAfter}} €</td>
	</tr>
{{/each}}
</table>