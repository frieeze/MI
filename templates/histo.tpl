<h3>Historique des Transactions</h3>
<table class="view" {{#ifColor soldeAfter}} bgcolor="green" {{else}} color="red" {{/ifColor}}>
	<tr>
		<th>Date</th>
		<th>Solde Prec</th>
		<th>Transaction</th>
		<th>Nouv Solde</th>
	</tr>
{{#each this}}
	<tr>
    	<td>{{date}}</td>
		<td>{{soldeAv}} €</td>
		<td>{{prix}} €</td>
		<td>{{soldeAp}} €</td>
	</tr>
{{/each}}
</table>
