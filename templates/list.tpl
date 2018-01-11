
<h3>Listes des Comptes</h3>
<div class="btnDisplay">
	<button id="all">Tous les Comptes</button>
	<button id="pos">Comptes positifs</button>
	<button id="neg">Comptes négatifs</button>
</div>
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
