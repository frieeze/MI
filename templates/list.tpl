
<h3>Listes des Comptes</h3>
<button id="pos">Comptes positifs</button>
<button id="neg">Comptes négatifs</button>
<button id="all">Supprimer Filtres</button>
<table class="view">
	<tr>
		<th>Numéro</th>
		<th>Nom</th>
		<th>Promo</th>
		<th>Solde</th>
	</tr>
	{{#each this}}
	<tr class="line" id="{{num}}">
		<td>{{num}}</td>
		<td>{{nom}} {{prenom}}</td>
		<td>{{promo}}</td>
		<td>{{solde}} €</td>
	</tr>
{{/each}}
</table>
