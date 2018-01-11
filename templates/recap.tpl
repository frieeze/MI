<h3>Récapitulatif de la Commande</h3>
<table class="view">
	<tr>
	<th>Produit</th>
	<th>Prix</th>
	<th>Quantité</th>
	</tr>
	{{#each this}}
    <tr>
		<td>{{name}}</td>
		<td>{{price}} €</td>
		<td>{{quantity}}</td>
	</tr>
	{{/each}}
</table>