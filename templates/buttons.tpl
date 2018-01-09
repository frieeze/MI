<div>
<h3>Produits Disponibles</h3>
</div>
<div id="produits">
    <div id="formule">
    {{#each formules}}
        <div class="formule" id="{{tag}}">{{name}}<br/><span id="{{tag}}Price">{{price}}</span></div>
    {{/each}}
    </div>
    <br/>
    <div id="produit">
    {{#each soloProd}}
        <div class="prod" id="{{tag}}">{{name}}<br/><span id="{{tag}}Price">{{price}}</span></div>
    {{/each}}
    </div>
</div>
