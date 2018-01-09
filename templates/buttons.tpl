<div>
<h3>Produits Disponibles</h3>
</div>
<div id="produits">
    <div id="formule">
    {{#each formules}}
        <div class="formule">{{name}}<br/>{{price}}</div>
    {{/each}}
    </div>
    <br/>
    <div id="produit">
    {{#each soloProd}}
        <div class="prod">{{name}}<br/>{{price}}</div>
    {{/each}}
    </div>
</div>